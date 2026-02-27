"use client";

import { usePathname } from "next/navigation";
import { TawkToWidget } from "./TawkToWidget";

export function TawkToWidgetWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const isAdmin = pathname?.startsWith("/admin") ?? false;

  return (
    <>
      {children}
      {!isAdmin && <TawkToWidget />}
    </>
  );
}
