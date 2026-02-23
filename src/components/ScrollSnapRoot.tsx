"use client";

/// <reference path="../scroll-timeline-polyfill.d.ts" />
import { useEffect } from "react";

function useScrollTimelinePolyfill() {
  useEffect(() => {
    import("scroll-timeline-polyfill/src/index.js").catch(() => {});
  }, []);
}

/**
 * Optional wrapper to enable scroll-snap + view-timeline section effects on the home page.
 * Not used by default; home page uses normal scroll for a cleaner UI.
 */
export function ScrollSnapRoot({ children }: { children: React.ReactNode }) {
  useScrollTimelinePolyfill();
  return <>{children}</>;
}
