"use client";

import { Coins } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { useCreditsContext } from "@/contexts/credits-context";
import { Skeleton } from "@/components/ui/skeleton";

export function CreditBadge() {
  const { credits, loading } = useCreditsContext();

  if (loading) {
    return <Skeleton className="h-10 w-40 rounded-xl" />;
  }

  if (!credits) {
    return null;
  }

  const remainingCredits = credits.remainingCredits;
  const isLow = remainingCredits <= 5;

  return (
    <Badge
      variant={isLow ? "destructive" : "secondary"}
      className="text-sm px-4 py-2 gap-2 rounded-xl shadow-md border-2"
    >
      <Coins className="h-5 w-5" />
      <span className="font-bold text-base">{remainingCredits}</span>
      <span className="text-xs font-medium opacity-90">credits</span>
    </Badge>
  );
}
