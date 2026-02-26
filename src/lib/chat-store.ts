/**
 * File-based store for chat sessions and messages.
 * Uses JSON files: data/chat/index.json (session list) and data/chat/sessions/{sessionId}.json (messages).
 * Note: On Vercel/serverless the filesystem is read-only; writes will fail with EROFS. Use a DB or external store for production.
 */

import fs from "fs";
import path from "path";
import { chatLog, chatError } from "@/lib/chat-debug";

const CHAT_DIR = path.join(process.cwd(), "data", "chat");
const SESSIONS_DIR = path.join(CHAT_DIR, "sessions");
const INDEX_FILE = path.join(CHAT_DIR, "index.json");

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

function ensureDirs() {
  try {
    if (!fs.existsSync(CHAT_DIR)) {
      chatLog("Store", "Creating CHAT_DIR", CHAT_DIR);
      fs.mkdirSync(CHAT_DIR, { recursive: true });
    }
    if (!fs.existsSync(SESSIONS_DIR)) {
      chatLog("Store", "Creating SESSIONS_DIR", SESSIONS_DIR);
      fs.mkdirSync(SESSIONS_DIR, { recursive: true });
    }
  } catch (err) {
    chatError("Store", "ensureDirs failed", err);
    throw err;
  }
}

function generateId(): string {
  return `${Date.now()}-${Math.random().toString(36).slice(2, 11)}`;
}

function readIndex(): IndexData {
  ensureDirs();
  if (!fs.existsSync(INDEX_FILE)) {
    return { sessions: [] };
  }
  try {
    const raw = fs.readFileSync(INDEX_FILE, "utf-8");
    const data = JSON.parse(raw) as IndexData;
    return data && Array.isArray(data.sessions) ? data : { sessions: [] };
  } catch {
    return { sessions: [] };
  }
}

function writeIndex(data: IndexData) {
  ensureDirs();
  try {
    fs.writeFileSync(INDEX_FILE, JSON.stringify(data, null, 2), "utf-8");
    chatLog("Store", "writeIndex ok", { sessionCount: data.sessions.length });
  } catch (err) {
    chatError("Store", "writeIndex failed", err);
    throw err;
  }
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

function writeSessionFile(sessionId: string, data: SessionFile) {
  ensureDirs();
  const filePath = getSessionFilePath(sessionId);
  try {
    fs.writeFileSync(filePath, JSON.stringify(data, null, 2), "utf-8");
    chatLog("Store", "writeSessionFile ok", { sessionId, messageCount: data.messages.length });
  } catch (err) {
    chatError("Store", "writeSessionFile failed", { sessionId, filePath, err });
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
  writeSessionFile(session.id, { messages: [] });
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
  const file = readSessionFile(sessionId);
  return file.messages;
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
  const file = readSessionFile(sessionId);
  file.messages.push(msg);
  writeSessionFile(sessionId, file);
  return msg;
}

export function clearMessages(sessionId: string): boolean {
  if (!getSession(sessionId)) return false;
  writeSessionFile(sessionId, { messages: [] });
  return true;
}
