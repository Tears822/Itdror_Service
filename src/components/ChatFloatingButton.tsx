"use client";

import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { MessageCircle } from "lucide-react";
import { useChat } from "@/contexts/ChatContext";

export function ChatFloatingButton() {
  const { isOpen, openChat, unreadCount } = useChat();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (isOpen) return null;

  const button = (
    <button
      type="button"
      onClick={openChat}
      className="flex items-center justify-center w-14 h-14 rounded-full bg-primary hover:bg-primary-hover text-white shadow-lg hover:shadow-xl transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-accent focus:ring-offset-2 focus:ring-offset-background relative"
      style={{
        position: "fixed",
        bottom: "1.5rem",
        right: "1.5rem",
        left: "auto",
        top: "auto",
        zIndex: 99999,
      }}
      aria-label={unreadCount > 0 ? `Open live chat (${unreadCount} unread)` : "Open live chat"}
    >
      <MessageCircle className="w-7 h-7" strokeWidth={2} />
      {unreadCount > 0 && (
        <span className="absolute -top-1 -right-1 flex min-w-[1.25rem] h-5 items-center justify-center rounded-full bg-red-500 text-white text-xs font-bold px-1.5">
          {unreadCount > 99 ? "99+" : unreadCount}
        </span>
      )}
    </button>
  );

  if (typeof document !== "undefined" && mounted) {
    return createPortal(button, document.body);
  }
  return null;
}
