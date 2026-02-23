"use client";

import { ChatProvider } from "@/contexts/ChatContext";
import { ChatWidget } from "./ChatWidget";
import { ChatFloatingButton } from "./ChatFloatingButton";

export function ChatProviderWithWidget({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ChatProvider>
      {children}
      <ChatFloatingButton />
      <ChatWidget />
    </ChatProvider>
  );
}
