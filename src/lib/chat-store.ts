/**
 * In-memory store for chat sessions and messages.
 * Replace with a database (e.g. Prisma) for production persistence.
 */

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

const sessions = new Map<string, ChatSession>();
const messagesBySession = new Map<string, ChatMessage[]>();

function generateId(): string {
  return `${Date.now()}-${Math.random().toString(36).slice(2, 11)}`;
}

export function createOrGetSession(email: string): ChatSession {
  const normalized = email.trim().toLowerCase();
  const existing = Array.from(sessions.values()).find(
    (s) => s.email.toLowerCase() === normalized
  );
  if (existing) return existing;

  const session: ChatSession = {
    id: generateId(),
    email: email.trim(),
    createdAt: Date.now(),
  };
  sessions.set(session.id, session);
  messagesBySession.set(session.id, []);
  return session;
}

export function getSession(sessionId: string): ChatSession | undefined {
  return sessions.get(sessionId);
}

export function getAllSessions(): ChatSession[] {
  return Array.from(sessions.values()).sort(
    (a, b) => b.createdAt - a.createdAt
  );
}

export function getMessages(sessionId: string): ChatMessage[] {
  return messagesBySession.get(sessionId) ?? [];
}

export function addMessage(
  sessionId: string,
  sender: "customer" | "admin",
  content: string
): ChatMessage | null {
  if (!sessions.has(sessionId)) return null;
  const msg: ChatMessage = {
    id: generateId(),
    sessionId,
    sender,
    content: content.trim(),
    createdAt: Date.now(),
  };
  const list = messagesBySession.get(sessionId)!;
  list.push(msg);
  return msg;
}
