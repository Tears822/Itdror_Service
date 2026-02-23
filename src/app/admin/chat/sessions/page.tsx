"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { MessageCircle, LogOut, ArrowLeft, Mail } from "lucide-react";
import Pusher from "pusher-js";
import { getAdminLastRead } from "@/lib/admin-chat-storage";

type Session = {
  id: string;
  email: string;
  createdAt: number;
  messageCount: number;
};

export default function AdminSessionsPage() {
  const router = useRouter();
  const [sessions, setSessions] = useState<Session[]>([]);
  const [loading, setLoading] = useState(true);
  const [unauth, setUnauth] = useState(false);
  const pusherRef = useRef<Pusher | null>(null);

  const fetchSessions = useCallback(async () => {
    const res = await fetch("/api/chat/sessions");
    if (res.status === 401) {
      setUnauth(true);
      return;
    }
    const data = await res.json();
    setSessions(data.sessions ?? []);
  }, []);

  useEffect(() => {
    fetchSessions().finally(() => setLoading(false));
  }, [fetchSessions]);

  // Poll sessions so message counts and unread badges stay up to date
  useEffect(() => {
    const interval = setInterval(fetchSessions, 5000);
    return () => clearInterval(interval);
  }, [fetchSessions]);

  useEffect(() => {
    const key = process.env.NEXT_PUBLIC_PUSHER_KEY;
    const cluster = process.env.NEXT_PUBLIC_PUSHER_CLUSTER || "us2";
    if (!key) return;
    const pusher = new Pusher(key, { cluster });
    pusherRef.current = pusher;
    const channel = pusher.subscribe("admin-sessions");
    channel.bind("new-session", () => fetchSessions());
    return () => {
      channel.unbind_all();
      pusher.unsubscribe("admin-sessions");
      pusher.disconnect();
      pusherRef.current = null;
    };
  }, [fetchSessions]);

  useEffect(() => {
    if (unauth) {
      router.replace("/admin/chat");
      return;
    }
  }, [unauth, router]);

  const handleLogout = async () => {
    await fetch("/api/admin/auth", { method: "DELETE" });
    router.replace("/admin/chat");
    router.refresh();
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
      <header className="border-b border-white/10 px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Link
            href="/admin/chat"
            className="p-2 rounded-lg hover:bg-white/5 text-muted hover:text-foreground"
            aria-label="Back"
          >
            <ArrowLeft className="w-5 h-5" />
          </Link>
          <MessageCircle className="w-6 h-6 text-accent" />
          <h1 className="font-semibold text-lg">Chat sessions</h1>
        </div>
        <button
          onClick={handleLogout}
          className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm text-muted hover:bg-white/5 hover:text-foreground transition-colors"
        >
          <LogOut className="w-4 h-4" />
          Log out
        </button>
      </header>

      <main className="flex-1 p-6 max-w-2xl mx-auto w-full">
        {sessions.length === 0 ? (
          <p className="text-muted text-center py-12">
            No chat sessions yet. When a customer opens live chat and enters their email, they’ll appear here.
          </p>
        ) : (
          <ul className="space-y-2">
            {sessions.map((s) => {
              const lastRead = getAdminLastRead(s.id);
              const unread = Math.max(0, s.messageCount - lastRead);
              return (
                <li key={s.id}>
                  <Link
                    href={`/admin/chat/sessions/${s.id}`}
                    className="flex items-center gap-4 p-4 rounded-xl border border-white/10 bg-white/5 hover:border-accent/30 hover:bg-white/[0.07] transition-colors"
                  >
                    <span className="relative flex items-center justify-center w-10 h-10 rounded-full bg-accent/20 text-accent shrink-0">
                      <Mail className="w-5 h-5" />
                      {unread > 0 && (
                        <span
                          className="absolute -top-0.5 -right-0.5 flex min-w-[1.25rem] h-5 items-center justify-center rounded-full bg-red-500 text-white text-xs font-bold px-1.5"
                          aria-label={`${unread} unread`}
                        >
                          {unread > 99 ? "99+" : unread}
                        </span>
                      )}
                    </span>
                    <div className="flex-1 min-w-0">
                      <p className="font-medium truncate">{s.email}</p>
                      <p className="text-sm text-muted">
                        {s.messageCount} message{s.messageCount !== 1 ? "s" : ""}
                        {unread > 0 && (
                          <span className="text-red-400 ml-1">· {unread} unread</span>
                        )}
                      </p>
                    </div>
                  </Link>
                </li>
              );
            })}
          </ul>
        )}
      </main>
    </div>
  );
}
