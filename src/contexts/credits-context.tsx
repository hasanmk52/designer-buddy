"use client";

import React, { createContext, useContext, useState, useCallback, useEffect } from "react";

interface Credits {
  totalCredits: number;
  usedCredits: number;
  remainingCredits: number;
}

interface CreditsContextType {
  credits: Credits | null;
  loading: boolean;
  error: string | null;
  refreshCredits: () => Promise<void>;
}

const CreditsContext = createContext<CreditsContextType | undefined>(undefined);

export function CreditsProvider({ children }: { children: React.ReactNode }) {
  const [credits, setCredits] = useState<Credits | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchCredits = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await fetch("/api/credits");

      if (!response.ok) {
        throw new Error("Failed to fetch credits");
      }

      const data = await response.json();
      setCredits(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchCredits();
  }, [fetchCredits]);

  const refreshCredits = useCallback(async () => {
    await fetchCredits();
  }, [fetchCredits]);

  return (
    <CreditsContext.Provider value={{ credits, loading, error, refreshCredits }}>
      {children}
    </CreditsContext.Provider>
  );
}

export function useCreditsContext() {
  const context = useContext(CreditsContext);
  if (context === undefined) {
    throw new Error("useCreditsContext must be used within a CreditsProvider");
  }
  return context;
}
