"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { UserProfile } from "@/components/auth/user-profile";
import { ModeToggle } from "./ui/mode-toggle";
import { Sparkles, LayoutDashboard, Palette } from "lucide-react";
import { useSession } from "@/lib/auth-client";
import { cn } from "@/lib/utils";

export function SiteHeader() {
  const pathname = usePathname();
  const { data: session } = useSession();

  return (
    <header className="sticky top-0 z-50 border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 shadow-sm">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <div className="flex items-center gap-8">
          <h1 className="text-2xl font-bold">
            <Link
              href="/"
              className="flex items-center gap-3 group transition-all"
            >
              <div className="flex items-center justify-center w-10 h-10 rounded-xl bg-gradient-to-br from-primary to-primary/70 shadow-lg shadow-primary/25 group-hover:shadow-xl group-hover:shadow-primary/30 transition-all">
                <Sparkles className="h-6 w-6 text-primary-foreground" />
              </div>
              <span className="bg-gradient-to-r from-primary via-primary to-primary/60 bg-clip-text text-transparent">
                Designer Buddy
              </span>
            </Link>
          </h1>

          {/* Navigation Links - Only show when logged in */}
          {session && (
            <nav className="hidden md:flex items-center gap-2">
              <Link
                href="/dashboard"
                className={cn(
                  "flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-all",
                  pathname === "/dashboard"
                    ? "bg-primary/10 text-primary"
                    : "text-muted-foreground hover:bg-primary/10 hover:text-primary"
                )}
              >
                <LayoutDashboard className="h-4 w-4" />
                Dashboard
              </Link>
              <Link
                href="/design"
                className={cn(
                  "flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-all",
                  pathname === "/design"
                    ? "bg-primary/10 text-primary"
                    : "text-muted-foreground hover:bg-primary/10 hover:text-primary"
                )}
              >
                <Palette className="h-4 w-4" />
                Design
              </Link>
            </nav>
          )}
        </div>

        <div className="flex items-center gap-4">
          <UserProfile />
          <ModeToggle />
        </div>
      </div>
    </header>
  );
}
