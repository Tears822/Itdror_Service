"use client";

import { usePathname } from "next/navigation";
import { ChatProvider } from "@/contexts/ChatContext";
import { ChatWidget } from "./ChatWidget";
import { ChatFloatingButton } from "./ChatFloatingButton";

export function ChatProviderWithWidget({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const isAdmin = pathname?.startsWith("/admin") ?? false;

  return (
    <ChatProvider>
      {children}
      {!isAdmin && (
        <>
          <ChatFloatingButton />
          <ChatWidget />
        </>
      )}
    </ChatProvider>
  );
}
