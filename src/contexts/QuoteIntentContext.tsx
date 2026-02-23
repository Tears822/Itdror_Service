"use client";

import { createContext, useContext, useState, useCallback, type ReactNode } from "react";

type QuoteIntentContextValue = {
  serviceName: string | null;
  setQuoteForService: (name: string | null) => void;
  clearQuoteIntent: () => void;
};

const QuoteIntentContext = createContext<QuoteIntentContextValue | null>(null);

export function QuoteIntentProvider({ children }: { children: ReactNode }) {
  const [serviceName, setServiceName] = useState<string | null>(null);

  const setQuoteForService = useCallback((name: string | null) => {
    setServiceName(name);
  }, []);

  const clearQuoteIntent = useCallback(() => setServiceName(null), []);

  return (
    <QuoteIntentContext.Provider value={{ serviceName, setQuoteForService, clearQuoteIntent }}>
      {children}
    </QuoteIntentContext.Provider>
  );
}

export function useQuoteIntent() {
  const ctx = useContext(QuoteIntentContext);
  if (!ctx) return { serviceName: null, setQuoteForService: () => {}, clearQuoteIntent: () => {} };
  return ctx;
}
