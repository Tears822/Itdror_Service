"use client";

import { usePathname } from "next/navigation";
import { ChatProvider } from "@/contexts/ChatContext";
import { TawkToWidget } from "./TawkToWidget";

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
      {!isAdmin && <TawkToWidget />}
    </ChatProvider>
  );
}
