"use client";

import { useState, useEffect, useCallback } from "react";

interface Credits {
  totalCredits: number;
  usedCredits: number;
  remainingCredits: number;
}

interface UseCreditsOptions {
  enabled?: boolean;
}

export function useCredits(options: UseCreditsOptions = {}) {
  const { enabled = true } = options;
  const [credits, setCredits] = useState<Credits | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchCredits = useCallback(async () => {
    if (!enabled) {
      setLoading(false);
      return;
    }

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
  }, [enabled]);

  useEffect(() => {
    fetchCredits();
  }, [fetchCredits]);

  const refreshCredits = useCallback(() => {
    return fetchCredits();
  }, [fetchCredits]);

  return {
    credits,
    loading,
    error,
    refreshCredits,
  };
}
