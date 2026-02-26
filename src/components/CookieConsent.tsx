"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

const STORAGE_KEY = "itdor_cookie_consent";

type ConsentStatus = "accepted" | "declined" | null;

export function CookieConsent() {
  const [status, setStatus] = useState<ConsentStatus>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY) as ConsentStatus | null;
      if (stored === "accepted" || stored === "declined") setStatus(stored);
      else setStatus(null);
    } catch {
      setStatus(null);
    }
    setMounted(true);
  }, []);

  const save = (value: ConsentStatus) => {
    try {
      localStorage.setItem(STORAGE_KEY, value ?? "");
      setStatus(value);
    } catch {
      setStatus(value);
    }
  };

  if (!mounted || status !== null) return null;

  return (
    <div
      role="dialog"
      aria-live="polite"
      aria-label="Cookie consent"
      className="fixed bottom-0 left-0 right-0 z-[100] p-4 md:p-5 pr-24 md:pr-28 bg-white/98 border-t border-black/10 shadow-[0_-4px_24px_rgba(0,0,0,0.08)]"
    >
      <div className="max-w-content mx-auto flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <p className="text-sm text-foreground/90 leading-relaxed pr-2">
          We use cookies to improve your experience, analyze traffic, and personalize content. By continuing, you agree to our use of cookies.{" "}
          <Link
            href="/privacy-policy"
            className="underline hover:no-underline text-primary font-medium focus:outline-none focus:ring-2 focus:ring-primary/50 rounded"
          >
            Privacy Policy
          </Link>
          {" · "}
          <Link
            href="/terms-of-service"
            className="underline hover:no-underline text-primary font-medium focus:outline-none focus:ring-2 focus:ring-primary/50 rounded"
          >
            Terms of Service
          </Link>
        </p>
        <div className="flex items-center gap-3 shrink-0">
          <button
            type="button"
            onClick={() => save("declined")}
            className="px-4 py-2.5 text-sm font-medium text-muted hover:text-foreground border border-black/12 hover:border-black/20 rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-primary/50"
          >
            Decline optional
          </button>
          <button
            type="button"
            onClick={() => save("accepted")}
            className="px-5 py-2.5 text-sm font-semibold text-white bg-primary hover:bg-primary-hover rounded-lg shadow-sm transition-colors focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
          >
            Accept all
          </button>
        </div>
      </div>
    </div>
  );
}
