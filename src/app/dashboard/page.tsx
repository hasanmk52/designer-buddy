"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { authClient } from "@/lib/auth-client";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { useCreditsContext } from "@/contexts/credits-context";
import { Sparkles, Palette, User, CreditCard } from "lucide-react";
import Link from "next/link";
import { BackgroundGradient } from "@/components/ui/background-gradient";

export default function DashboardPage() {
  const router = useRouter();
  const { data: session, isPending } = authClient.useSession();
  const { credits, loading: creditsLoading } = useCreditsContext();

  // Redirect to home if not authenticated
  useEffect(() => {
    if (!isPending && !session) {
      router.push("/");
    }
  }, [isPending, session, router]);

  if (isPending) {
    return (
      <main className="flex-1 bg-gradient-to-b from-muted/30 to-background">
        <div className="container mx-auto px-4 py-12">
          <div className="max-w-5xl mx-auto space-y-8">
            <Skeleton className="h-12 w-64" />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Skeleton className="h-48" />
              <Skeleton className="h-48" />
            </div>
          </div>
        </div>
      </main>
    );
  }

  // Don't render anything if not authenticated (redirect in useEffect will handle it)
  if (!session) {
    return null;
  }

  return (
    <main className="flex-1 bg-gradient-to-b from-muted/30 to-background">
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-5xl mx-auto space-y-8">
          {/* Header */}
          <div>
            <h1 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent">
              Dashboard
            </h1>
            <p className="text-muted-foreground mt-2 text-lg">
              Welcome back, {session.user?.name?.split(" ")[0] || "there"}!
            </p>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Credits Card */}
            <BackgroundGradient className="rounded-[22px] p-0.5">
              <Card className="border-0 shadow-lg hover:shadow-xl transition-all bg-card">
                <CardHeader>
                  <div className="flex items-center gap-3">
                    <div className="flex items-center justify-center w-12 h-12 rounded-xl bg-gradient-to-br from-primary to-primary/70 shadow-lg shadow-primary/25">
                      <CreditCard className="h-6 w-6 text-primary-foreground" />
                    </div>
                    <div>
                      <CardTitle>Your Credits</CardTitle>
                      <CardDescription>Available design generations</CardDescription>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  {creditsLoading ? (
                    <Skeleton className="h-16 w-32" />
                  ) : (
                    <div className="space-y-4">
                      <div className="flex items-baseline gap-2">
                        <span className="text-5xl font-bold text-primary">
                          {credits?.remainingCredits || 0}
                        </span>
                        <span className="text-muted-foreground">
                          / {credits?.totalCredits || 0}
                        </span>
                      </div>
                      <div className="text-sm text-muted-foreground">
                        {credits?.usedCredits || 0} credits used
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>
            </BackgroundGradient>

            {/* Account Card */}
            <BackgroundGradient className="rounded-[22px] p-0.5">
              <Card className="border-0 shadow-lg hover:shadow-xl transition-all bg-card">
                <CardHeader>
                  <div className="flex items-center gap-3">
                    <div className="flex items-center justify-center w-12 h-12 rounded-xl bg-gradient-to-br from-primary to-primary/70 shadow-lg shadow-primary/25">
                      <User className="h-6 w-6 text-primary-foreground" />
                    </div>
                    <div>
                      <CardTitle>Your Account</CardTitle>
                      <CardDescription>Profile information</CardDescription>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div>
                      <p className="text-sm text-muted-foreground">Name</p>
                      <p className="font-medium">{session.user?.name}</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Email</p>
                      <p className="font-medium">{session.user?.email}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </BackgroundGradient>
          </div>

          {/* Quick Actions */}
          <Card className="border-2 shadow-lg">
            <CardHeader>
              <CardTitle>Quick Actions</CardTitle>
              <CardDescription>Get started with your next design</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <Button asChild size="lg" className="w-full h-auto py-6 shadow-lg shadow-primary/25 hover:shadow-xl hover:shadow-primary/30 transition-all">
                  <Link href="/design" className="flex flex-col items-center gap-2">
                    <Sparkles className="h-6 w-6" />
                    <div className="text-center">
                      <div className="font-bold text-base">Generate Design</div>
                      <div className="text-xs font-normal opacity-90">Create a new room design</div>
                    </div>
                  </Link>
                </Button>

                <Button asChild variant="outline" size="lg" className="w-full h-auto py-6 border-2 hover:border-primary hover:bg-primary/10 hover:text-primary transition-all">
                  <Link href="/design" className="flex flex-col items-center gap-2">
                    <Palette className="h-6 w-6" />
                    <div className="text-center">
                      <div className="font-bold text-base">Browse Themes</div>
                      <div className="text-xs font-normal opacity-90">Explore design styles</div>
                    </div>
                  </Link>
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Info Card */}
          <Card className="border-2 bg-gradient-to-br from-primary/5 to-accent/5">
            <CardContent className="pt-6">
              <div className="flex items-start gap-4">
                <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-primary/10 shrink-0">
                  <Sparkles className="h-5 w-5 text-primary" />
                </div>
                <div className="space-y-1">
                  <h3 className="font-semibold">Ready to transform your space?</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    Upload a photo of any room and let AI redesign it with your chosen style.
                    Each generation uses 1 credit.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </main>
  );
}
