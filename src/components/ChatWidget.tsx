"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { X, Send, MessageCircle } from "lucide-react";
import { useChat } from "@/contexts/ChatContext";
import Pusher from "pusher-js";

const CHAT_STORAGE_KEY = "itdor_chat_session";
const CHAT_LAST_READ_KEY = "itdor_chat_last_read";

const CHAT_DEBUG = typeof window !== "undefined" && process.env.NODE_ENV === "development";

function chatClientLog(label: string, ...args: unknown[]) {
  if (CHAT_DEBUG) console.log("[ChatWidget]", label, ...args);
}

function chatClientError(label: string, status?: number, body?: unknown) {
  console.error("[ChatWidget]", label, status != null ? { status, body } : body);
}

type Message = {
  id: string;
  sender: string;
  content: string;
  createdAt: number;
};

function loadStoredSession(): { sessionId: string; email: string } | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = sessionStorage.getItem(CHAT_STORAGE_KEY);
    if (!raw) return null;
    const data = JSON.parse(raw) as { sessionId?: string; email?: string };
    if (data?.sessionId && data?.email) return { sessionId: data.sessionId, email: data.email };
  } catch {
    // ignore
  }
  return null;
}

function saveStoredSession(sessionId: string, email: string) {
  try {
    sessionStorage.setItem(CHAT_STORAGE_KEY, JSON.stringify({ sessionId, email }));
  } catch {
    // ignore
  }
}

function getLastReadAdminCount(): number {
  if (typeof window === "undefined") return 0;
  try {
    const v = sessionStorage.getItem(CHAT_LAST_READ_KEY);
    return v ? Math.max(0, parseInt(v, 10)) : 0;
  } catch {
    return 0;
  }
}

function setLastReadAdminCount(count: number) {
  try {
    sessionStorage.setItem(CHAT_LAST_READ_KEY, String(count));
  } catch {
    // ignore
  }
}

function clearStoredSession() {
  try {
    sessionStorage.removeItem(CHAT_STORAGE_KEY);
  } catch {
    // ignore
  }
}

export function ChatWidget() {
  const { isOpen, closeChat, setUnreadCount } = useChat();
  const [step, setStep] = useState<"email" | "chat">("email");
  const [email, setEmail] = useState("");
  const [sessionId, setSessionId] = useState<string | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [sending, setSending] = useState(false);
  const [error, setError] = useState("");
  const [restored, setRestored] = useState(false);
  const listRef = useRef<HTMLDivElement>(null);
  const pusherRef = useRef<Pusher | null>(null);
  const isOpenRef = useRef(isOpen);
  const messagesRef = useRef<Message[]>(messages);
  isOpenRef.current = isOpen;
  messagesRef.current = messages;

  // Restore session from sessionStorage on mount (persists across close + reopen and page navigation)
  // If server restarted, session is gone: API returns 404 → clear storage and stay on email step
  useEffect(() => {
    if (restored) return;
    setRestored(true);
    const stored = loadStoredSession();
    if (!stored) return;
    setSessionId(stored.sessionId);
    setEmail(stored.email);
    setStep("chat");
    chatClientLog("Restore: fetching messages", stored.sessionId);
    fetch(`/api/chat/messages?sessionId=${encodeURIComponent(stored.sessionId)}`)
      .then(async (res) => {
        if (res.status === 404) {
          chatClientLog("Restore: session not found (404), clearing storage");
          clearStoredSession();
          setSessionId(null);
          setStep("email");
          setMessages([]);
          setUnreadCount(0);
          return null;
        }
        const data = await res.json().catch(() => ({}));
        if (!res.ok) {
          chatClientError("Restore: messages GET failed", res.status, data);
          return { messages: [] };
        }
        chatClientLog("Restore: messages loaded", data.messages?.length ?? 0);
        return data;
      })
      .then((data) => {
        if (!data) return;
        const list = (data.messages ?? []) as Message[];
        setMessages(list);
        const adminCount = list.filter((m) => m.sender === "admin").length;
        setLastReadAdminCount(adminCount);
        setUnreadCount(0);
      })
      .catch((err) => {
        chatClientError("Restore: fetch error", undefined, err);
        setMessages([]);
      });
  }, [restored, setUnreadCount]);

  useEffect(() => {
    listRef.current?.scrollTo(0, listRef.current.scrollHeight);
  }, [messages]);

  // When widget is open, mark all messages as read and clear unread badge
  useEffect(() => {
    if (isOpen && step === "chat" && messages.length > 0) {
      const adminCount = messages.filter((m) => m.sender === "admin").length;
      setLastReadAdminCount(adminCount);
      setUnreadCount(0);
    }
  }, [isOpen, step, messages, setUnreadCount]);

  // Pusher real-time subscription (when credentials are set)
  useEffect(() => {
    if (!sessionId) return;
    const key = process.env.NEXT_PUBLIC_PUSHER_KEY;
    const cluster = process.env.NEXT_PUBLIC_PUSHER_CLUSTER || "us2";
    if (!key) return;

    const pusher = new Pusher(key, { cluster });
    pusherRef.current = pusher;
    const channel = pusher.subscribe(`chat-${sessionId}`);
    channel.bind("new-message", (payload: Message) => {
      setMessages((prev) => {
        if (prev.some((m) => m.id === payload.id)) return prev;
        return [...prev, payload];
      });
    });
    return () => {
      channel.unbind_all();
      pusher.unsubscribe(`chat-${sessionId}`);
      pusher.disconnect();
      pusherRef.current = null;
    };
  }, [sessionId]);

  // Polling: fetch messages periodically when we have a session (for unread badge when closed; fallback when Pusher not configured)
  useEffect(() => {
    if (!sessionId) return;
    const POLL_INTERVAL_MS = 8000; // 8s to reduce server load when Pusher is not set
    const poll = () => {
      fetch(`/api/chat/messages?sessionId=${encodeURIComponent(sessionId)}`)
        .then(async (res) => {
          if (res.status === 404) {
            clearStoredSession();
            setSessionId(null);
            setStep("email");
            setMessages([]);
            setUnreadCount(0);
            return null;
          }
          const data = await res.json().catch(() => ({}));
          if (!res.ok) {
            chatClientError("Poll: messages GET failed", res.status, data);
            return null;
          }
          return data;
        })
        .then((data) => {
          if (!data) return;
          const list = (data.messages ?? []) as Message[];
          const prev = messagesRef.current;
          const byId = new Map(prev.map((m) => [m.id, m]));
          list.forEach((m) => byId.set(m.id, m));
          const next = Array.from(byId.values()).sort((a, b) => a.createdAt - b.createdAt);
          setMessages(next);
          if (!isOpenRef.current) {
            const adminCount = next.filter((m) => m.sender === "admin").length;
            const lastRead = getLastReadAdminCount();
            setUnreadCount(Math.max(0, adminCount - lastRead));
          }
        })
        .catch(() => {});
    };
    poll();
    const interval = setInterval(poll, POLL_INTERVAL_MS);
    return () => clearInterval(interval);
  }, [sessionId, isOpen, setUnreadCount]);

  const handleEmailSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const value = email.trim();
    if (!value) return;
    setError("");
    setLoading(true);
    chatClientLog("Session: POST /api/chat/session", { email: value });
    try {
      const res = await fetch("/api/chat/session", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: value }),
      });
      const data = await res.json().catch(() => ({ error: "Invalid response" }));
      if (!res.ok) {
        chatClientError("Session: POST failed", res.status, data);
        setError(data.errorDetail || data.error || "Something went wrong");
        return;
      }
      chatClientLog("Session: created", data.sessionId);
      setSessionId(data.sessionId);
      setMessages(data.messages ?? []);
      setStep("chat");
      saveStoredSession(data.sessionId, data.email ?? value);
    } catch (err) {
      chatClientError("Session: fetch error", undefined, err);
      setError("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  const sendMessage = async () => {
    const text = input.trim();
    if (!text || !sessionId || sending) return;
    setSending(true);
    setInput("");
    chatClientLog("Messages: POST /api/chat/messages", { sessionId, contentLength: text.length });
    try {
      const res = await fetch("/api/chat/messages", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          sessionId,
          sender: "customer",
          content: text,
        }),
      });
      const data = await res.json().catch(() => ({}));
      if (res.status === 404) {
        clearStoredSession();
        setSessionId(null);
        setStep("email");
        setMessages([]);
        setUnreadCount(0);
        setInput(text);
        return;
      }
      if (!res.ok) {
        chatClientError("Messages: POST failed", res.status, data);
        setInput(text);
        return;
      }
      chatClientLog("Messages: sent", data.id);
      setMessages((prev) => [...prev, data]);
    } catch (err) {
      chatClientError("Messages: fetch error", undefined, err);
      setInput(text);
    } finally {
      setSending(false);
    }
  };

  if (!isOpen) return null;

  return (
    <>
      <div
        className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[90]"
        aria-hidden
        onClick={closeChat}
      />
      <div
        className="fixed bottom-4 right-4 w-full max-w-md h-[calc(100vh-8rem)] max-h-[560px] rounded-2xl border border-white/10 bg-background shadow-2xl flex flex-col z-[91]"
        role="dialog"
        aria-labelledby="chat-title"
      >
        <div className="flex items-center justify-between p-4 border-b border-white/10">
          <div className="flex items-center gap-2 text-accent">
            <MessageCircle className="w-6 h-6" />
            <h2 id="chat-title" className="font-semibold text-lg">
              Live Chat
            </h2>
          </div>
          <button
            type="button"
            onClick={closeChat}
            className="p-2 rounded-lg hover:bg-white/10 text-muted hover:text-foreground transition-colors"
            aria-label="Close chat"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {step === "email" ? (
          <div className="flex-1 flex flex-col items-center justify-center p-6">
            <p className="text-muted text-center mb-6">
              Enter your email to start chatting. We’ll get back to you shortly.
            </p>
            <form onSubmit={handleEmailSubmit} className="w-full max-w-sm">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="your@email.com"
                className="w-full px-4 py-3 rounded-xl bg-white border border-black/12 text-foreground placeholder:text-muted focus:outline-none focus:ring-2 focus:ring-accent/50 focus:border-accent/50 mb-4"
                required
              />
              {error && (
                <p className="text-sm text-red-400 text-center mb-4">{error}</p>
              )}
              <button
                type="submit"
                disabled={loading}
                className="w-full py-3 rounded-xl bg-primary hover:bg-primary-hover text-white font-semibold transition-colors disabled:opacity-50"
              >
                {loading ? "Starting…" : "Start chat"}
              </button>
            </form>
          </div>
        ) : (
          <>
            <div
              ref={listRef}
              className="flex-1 overflow-y-auto p-4 space-y-3"
            >
              {messages.length === 0 ? (
                <p className="text-muted text-center py-6 text-sm">
                  Say hello. We’ll reply as soon as we can.
                </p>
              ) : (
                messages.map((m) => (
                  <div
                    key={m.id}
                    className={`w-full flex items-end gap-2 ${m.sender === "customer" ? "justify-start" : "justify-start flex-row-reverse"}`}
                  >
                    {m.sender === "admin" ? (
                      <div className="w-8 h-8 rounded-full overflow-hidden bg-white/10 shrink-0 flex items-center justify-center">
                        <Image
                          src="/assets/favicon.png"
                          alt=""
                          width={32}
                          height={32}
                          className="w-full h-full object-cover"
                        />
                      </div>
                    ) : (
                      <div
                        className="w-8 h-8 rounded-full bg-accent/30 shrink-0 flex items-center justify-center text-[10px] font-semibold text-foreground"
                        aria-hidden
                      >
                        You
                      </div>
                    )}
                    <div
                      className={`max-w-[75%] rounded-2xl px-4 py-2 ${
                        m.sender === "customer"
                          ? "bg-accent/20 text-foreground"
                          : "bg-white/10 text-muted"
                      }`}
                    >
                      <p className="text-sm whitespace-pre-wrap">{m.content}</p>
                    </div>
                  </div>
                ))
              )}
            </div>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                sendMessage();
              }}
              className="p-4 border-t border-white/10"
            >
              <div className="flex gap-2">
                <input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="Type a message…"
                  className="flex-1 rounded-xl bg-white/5 border border-white/10 px-4 py-3 text-foreground placeholder:text-muted focus:outline-none focus:ring-2 focus:ring-accent/50"
                />
                <button
                  type="submit"
                  disabled={sending || !input.trim()}
                  className="p-3 rounded-xl bg-primary hover:bg-primary-hover text-white disabled:opacity-50 transition-colors"
                >
                  <Send className="w-5 h-5" />
                </button>
              </div>
            </form>
          </>
        )}
      </div>
    </>
  );
}
