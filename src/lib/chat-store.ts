/**
 * Chat sessions and messages store.
 * - Local/dev: uses JSON files in data/chat/ (persistent).
 * - Vercel/serverless: uses in-memory store (read-only filesystem); data does not persist across invocations.
 * For production persistence on Vercel, use Vercel KV, Postgres, or similar.
 */

import fs from "fs";
import path from "path";
import { chatLog, chatError } from "@/lib/chat-debug";

const CHAT_DIR = path.join(process.cwd(), "data", "chat");
const SESSIONS_DIR = path.join(CHAT_DIR, "sessions");
const INDEX_FILE = path.join(CHAT_DIR, "index.json");

const isReadOnlyFS =
  typeof process.env.VERCEL !== "undefined" ||
  process.env.CHAT_USE_MEMORY === "1";

// Set to true on first EROFS so we use memory for the rest of this process (e.g. serverless without VERCEL)
let useMemoryFallback = false;

export type ChatSession = {
  id: string;
  email: string;
  createdAt: number;
};

export type ChatMessage = {
  id: string;
  sessionId: string;
  sender: "customer" | "admin";
  content: string;
  createdAt: number;
};

type IndexData = {
  sessions: ChatSession[];
};

type SessionFile = {
  messages: ChatMessage[];
};

// In-memory fallback for serverless (Vercel) where fs is read-only
const memorySessions = new Map<string, ChatSession>();
const memoryMessages = new Map<string, ChatMessage[]>();

function generateId(): string {
  return `${Date.now()}-${Math.random().toString(36).slice(2, 11)}`;
}

function isErofError(err: unknown): boolean {
  if (err instanceof Error) return err.message.includes("EROFS") || (err as NodeJS.ErrnoException).code === "EROFS";
  return false;
}

// ----- File-based (local) -----
function ensureDirs(): void {
  if (!fs.existsSync(CHAT_DIR)) {
    chatLog("Store", "Creating CHAT_DIR", CHAT_DIR);
    fs.mkdirSync(CHAT_DIR, { recursive: true });
  }
  if (!fs.existsSync(SESSIONS_DIR)) {
    chatLog("Store", "Creating SESSIONS_DIR", SESSIONS_DIR);
    fs.mkdirSync(SESSIONS_DIR, { recursive: true });
  }
}

function readIndexFile(): IndexData {
  try {
    if (!fs.existsSync(INDEX_FILE)) return { sessions: [] };
    const raw = fs.readFileSync(INDEX_FILE, "utf-8");
    const data = JSON.parse(raw) as IndexData;
    return data && Array.isArray(data.sessions) ? data : { sessions: [] };
  } catch {
    return { sessions: [] };
  }
}

function writeIndexFile(data: IndexData): void {
  ensureDirs();
  fs.writeFileSync(INDEX_FILE, JSON.stringify(data, null, 2), "utf-8");
  chatLog("Store", "writeIndex ok", { sessionCount: data.sessions.length });
}

function getSessionFilePath(sessionId: string): string {
  const safe = sessionId.replace(/[^a-z0-9-]/gi, "-");
  return path.join(SESSIONS_DIR, `${safe}.json`);
}

function readSessionFile(sessionId: string): SessionFile {
  const filePath = getSessionFilePath(sessionId);
  if (!fs.existsSync(filePath)) return { messages: [] };
  try {
    const raw = fs.readFileSync(filePath, "utf-8");
    const data = JSON.parse(raw) as SessionFile;
    return data && Array.isArray(data.messages) ? data : { messages: [] };
  } catch {
    return { messages: [] };
  }
}

function writeSessionFile(sessionId: string, data: SessionFile): void {
  ensureDirs();
  const filePath = getSessionFilePath(sessionId);
  fs.writeFileSync(filePath, JSON.stringify(data, null, 2), "utf-8");
  chatLog("Store", "writeSessionFile ok", { sessionId, messageCount: data.messages.length });
}

// ----- Public API (file-first with in-memory fallback) -----
function readIndex(): IndexData {
  if (isReadOnlyFS || useMemoryFallback) {
    const sessions = Array.from(memorySessions.values());
    return { sessions };
  }
  try {
    return readIndexFile();
  } catch (err) {
    useMemoryFallback = true;
    chatError("Store", "readIndex failed, using memory", err);
    return { sessions: Array.from(memorySessions.values()) };
  }
}

function writeIndex(data: IndexData): void {
  if (isReadOnlyFS || useMemoryFallback) {
    memorySessions.clear();
    data.sessions.forEach((s) => memorySessions.set(s.id, s));
    chatLog("Store", "writeIndex (memory)", { sessionCount: data.sessions.length });
    return;
  }
  try {
    writeIndexFile(data);
  } catch (err) {
    if (isErofError(err)) {
      useMemoryFallback = true;
      chatLog("Store", "Read-only filesystem detected (e.g. Vercel); using in-memory store. Data will not persist.");
      memorySessions.clear();
      data.sessions.forEach((s) => memorySessions.set(s.id, s));
      return;
    }
    chatError("Store", "writeIndex failed", err);
    throw err;
  }
}

function readMessages(sessionId: string): ChatMessage[] {
  if (isReadOnlyFS || useMemoryFallback) {
    return memoryMessages.get(sessionId) ?? [];
  }
  try {
    return readSessionFile(sessionId).messages;
  } catch (err) {
    const mem = memoryMessages.get(sessionId);
    if (mem) return mem;
    return [];
  }
}

function writeMessages(sessionId: string, messages: ChatMessage[]): void {
  if (isReadOnlyFS || useMemoryFallback) {
    memoryMessages.set(sessionId, messages);
    chatLog("Store", "writeMessages (memory)", { sessionId, count: messages.length });
    return;
  }
  try {
    writeSessionFile(sessionId, { messages });
  } catch (err) {
    if (isErofError(err)) {
      useMemoryFallback = true;
      chatLog("Store", "Read-only filesystem detected; using in-memory store.");
      memoryMessages.set(sessionId, messages);
      return;
    }
    chatError("Store", "writeSessionFile failed", err);
    throw err;
  }
}

export function createOrGetSession(email: string): ChatSession {
  chatLog("Store", "createOrGetSession", { email });
  const normalized = email.trim().toLowerCase();
  const index = readIndex();
  const existing = index.sessions.find((s) => s.email.toLowerCase() === normalized);
  if (existing) {
    chatLog("Store", "createOrGetSession: existing session", { sessionId: existing.id });
    return existing;
  }

  const session: ChatSession = {
    id: generateId(),
    email: email.trim(),
    createdAt: Date.now(),
  };
  index.sessions.push(session);
  writeIndex(index);
  writeMessages(session.id, []);
  chatLog("Store", "createOrGetSession: new session", { sessionId: session.id });
  return session;
}

export function getSession(sessionId: string): ChatSession | undefined {
  const index = readIndex();
  return index.sessions.find((s) => s.id === sessionId);
}

export function getAllSessions(): ChatSession[] {
  const index = readIndex();
  return [...index.sessions].sort((a, b) => b.createdAt - a.createdAt);
}

export function getMessages(sessionId: string): ChatMessage[] {
  return readMessages(sessionId);
}

export function addMessage(
  sessionId: string,
  sender: "customer" | "admin",
  content: string
): ChatMessage | null {
  if (!getSession(sessionId)) return null;
  const msg: ChatMessage = {
    id: generateId(),
    sessionId,
    sender,
    content: content.trim(),
    createdAt: Date.now(),
  };
  const messages = readMessages(sessionId);
  messages.push(msg);
  writeMessages(sessionId, messages);
  return msg;
}

export function clearMessages(sessionId: string): boolean {
  if (!getSession(sessionId)) return false;
  writeMessages(sessionId, []);
  return true;
}
