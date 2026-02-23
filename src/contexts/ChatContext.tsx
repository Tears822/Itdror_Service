"use client";

import React, { createContext, useContext, useState, useCallback } from "react";

type ChatContextValue = {
  isOpen: boolean;
  openChat: () => void;
  closeChat: () => void;
  unreadCount: number;
  setUnreadCount: (n: number) => void;
};

const ChatContext = createContext<ChatContextValue | null>(null);

export function ChatProvider({ children }: { children: React.ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);
  const [unreadCount, setUnreadCount] = useState(0);
  const openChat = useCallback(() => setIsOpen(true), []);
  const closeChat = useCallback(() => setIsOpen(false), []);

  return (
    <ChatContext.Provider value={{ isOpen, openChat, closeChat, unreadCount, setUnreadCount }}>
      {children}
    </ChatContext.Provider>
  );
}

export function useChat() {
  const ctx = useContext(ChatContext);
  if (!ctx) {
    return {
      isOpen: false,
      openChat: () => {},
      closeChat: () => {},
      unreadCount: 0,
      setUnreadCount: () => {},
    };
  }
  return ctx;
}
