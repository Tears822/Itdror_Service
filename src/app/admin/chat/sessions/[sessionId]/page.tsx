"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { useRouter, useParams } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, Send, MessageCircle, Trash2 } from "lucide-react";
import Pusher from "pusher-js";
import { setAdminLastRead } from "@/lib/admin-chat-storage";

type Message = {
  id: string;
  sender: string;
  content: string;
  createdAt: number;
};

export default function AdminConversationPage() {
  const router = useRouter();
  const params = useParams();
  const sessionId = params.sessionId as string;
  const [messages, setMessages] = useState<Message[]>([]);
  const [email, setEmail] = useState<string>("");
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(true);
  const [sending, setSending] = useState(false);
  const [clearing, setClearing] = useState(false);
  const [unauth, setUnauth] = useState(false);
  const listRef = useRef<HTMLDivElement>(null);
  const pusherRef = useRef<Pusher | null>(null);

  const fetchMessages = useCallback(async () => {
    const res = await fetch(`/api/chat/messages?sessionId=${sessionId}`);
    if (res.status === 401) {
      setUnauth(true);
      return;
    }
    const data = await res.json();
    setMessages(data.messages ?? []);
    const sessRes = await fetch("/api/chat/sessions");
    if (sessRes.ok) {
      const sessData = await sessRes.json();
      const s = (sessData.sessions ?? []).find((x: { id: string }) => x.id === sessionId);
      if (s) setEmail(s.email);
    }
  }, [sessionId]);

  useEffect(() => {
    fetchMessages().finally(() => setLoading(false));
  }, [fetchMessages]);

  useEffect(() => {
    if (unauth) {
      router.replace("/admin/chat");
      return;
    }
  }, [unauth, router]);

  // Pusher real-time (when credentials are set)
  useEffect(() => {
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

  // Polling fallback: fetch new messages every 8s (works without Pusher)
  useEffect(() => {
    const interval = setInterval(() => {
      fetch(`/api/chat/messages?sessionId=${encodeURIComponent(sessionId)}`)
        .then((res) => (res.ok ? res.json() : { messages: [] }))
        .then((data) => {
          const list = (data.messages ?? []) as Message[];
          setMessages((prev) => {
            const byId = new Map(prev.map((m) => [m.id, m]));
            list.forEach((m) => byId.set(m.id, m));
            return Array.from(byId.values()).sort((a, b) => a.createdAt - b.createdAt);
          });
        })
        .catch(() => {});
    }, 8000);
    return () => clearInterval(interval);
  }, [sessionId]);

  useEffect(() => {
    listRef.current?.scrollTo(0, listRef.current.scrollHeight);
  }, [messages]);

  // Mark this session as read when admin is viewing (so unread badge clears on sessions list)
  useEffect(() => {
    if (sessionId && messages.length >= 0) {
      setAdminLastRead(sessionId, messages.length);
    }
  }, [sessionId, messages.length]);

  const send = async () => {
    const text = input.trim();
    if (!text || sending) return;
    setSending(true);
    setInput("");
    try {
      const res = await fetch("/api/chat/messages", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          sessionId,
          sender: "admin",
          content: text,
        }),
      });
      if (!res.ok) {
        const data = await res.json();
        if (res.status === 401) router.replace("/admin/chat");
        else setInput(text);
        return;
      }
      const msg = await res.json();
      setMessages((prev) => [...prev, msg]);
    } catch {
      setInput(text);
    } finally {
      setSending(false);
    }
  };

  const clearHistory = async () => {
    if (clearing || !sessionId) return;
    if (!confirm("Clear all messages in this conversation? This cannot be undone.")) return;
    setClearing(true);
    try {
      const res = await fetch(`/api/chat/sessions/${encodeURIComponent(sessionId)}/messages`, {
        method: "DELETE",
      });
      if (res.status === 401) {
        router.replace("/admin/chat");
        return;
      }
      if (res.ok) {
        setMessages([]);
        setAdminLastRead(sessionId, 0);
      }
    } finally {
      setClearing(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-muted">Loading…</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col">
      <header className="border-b border-white/10 px-4 py-3 flex items-center gap-4">
        <Link
          href="/admin/chat/sessions"
          className="p-2 rounded-lg hover:bg-white/5 text-muted hover:text-foreground"
          aria-label="Back to sessions"
        >
          <ArrowLeft className="w-5 h-5" />
        </Link>
        <MessageCircle className="w-5 h-5 text-accent shrink-0" />
        <div className="min-w-0 flex-1">
          <p className="font-medium truncate">{email || sessionId}</p>
          <p className="text-xs text-muted">Session</p>
        </div>
        <button
          type="button"
          onClick={clearHistory}
          disabled={clearing || messages.length === 0}
          className="p-2 rounded-lg hover:bg-red-500/10 text-muted hover:text-red-400 disabled:opacity-50 disabled:pointer-events-none transition-colors"
          title="Clear chat history"
          aria-label="Clear chat history"
        >
          <Trash2 className="w-5 h-5" />
        </button>
      </header>

      <div
        ref={listRef}
        className="flex-1 overflow-y-auto p-4 space-y-3"
      >
        {messages.length === 0 ? (
          <p className="text-muted text-center py-8 text-sm">
            No messages yet. Say hello.
          </p>
        ) : (
          messages.map((m) => {
            const isAdmin = m.sender === "admin";
            const avatarLabel = isAdmin ? "You" : (email ? email.slice(0, 2).toUpperCase() : "??");
            return (
              <div
                key={m.id}
                className={`flex items-end gap-2 ${isAdmin ? "justify-start" : "justify-end"}`}
              >
                {isAdmin ? (
                  <>
                    <div
                      className="w-14 h-14 rounded-full bg-accent/30 shrink-0 flex items-center justify-center text-sm font-semibold text-foreground self-end mt-0.5"
                      aria-hidden
                      title="You"
                    >
                      {avatarLabel}
                    </div>
                    <div className="max-w-[85%] rounded-2xl px-4 py-2 bg-accent/20 text-foreground">
                      <p className="text-sm whitespace-pre-wrap">{m.content}</p>
                    </div>
                  </>
                ) : (
                  <>
                    <div className="max-w-[85%] rounded-2xl px-4 py-2 bg-white/10 text-muted">
                      <p className="text-sm whitespace-pre-wrap">{m.content}</p>
                    </div>
                    <div
                      className="w-14 h-14 rounded-full bg-white/20 shrink-0 flex items-center justify-center text-sm font-semibold text-foreground self-end mt-0.5"
                      aria-hidden
                      title={email}
                    >
                      {avatarLabel}
                    </div>
                  </>
                )}
              </div>
            );
          })
        )}
      </div>

      <form
        onSubmit={(e) => {
          e.preventDefault();
          send();
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
    </div>
  );
}
