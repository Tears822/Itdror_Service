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
    <>
      <div className="fixed inset-0 z-[100] flex items-center justify-center p-4" aria-hidden>
        <div
          className="absolute inset-0 bg-black/20 backdrop-blur-[2px]"
          aria-hidden
        />
        <div
          role="dialog"
          aria-live="polite"
          aria-label="Cookie consent"
          className="relative z-10 w-full max-w-lg rounded-2xl border border-black/10 bg-white p-6 shadow-xl shadow-black/10"
        >
          <h3 className="text-lg font-semibold text-foreground mb-3">
            We use cookies
          </h3>
          <p className="text-sm text-foreground/90 leading-relaxed mb-5">
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
          <div className="flex flex-wrap items-center gap-3">
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
    </>
  );
}
