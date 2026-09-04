"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { authClient } from "@/lib/auth-client";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useCreditsContext } from "@/contexts/credits-context";
import { User, Mail, Calendar, CreditCard, Shield } from "lucide-react";
import { BackgroundGradient } from "@/components/ui/background-gradient";

export default function ProfilePage() {
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
          <div className="max-w-4xl mx-auto space-y-8">
            <Skeleton className="h-12 w-64" />
            <Skeleton className="h-96" />
          </div>
        </div>
      </main>
    );
  }

  // Don't render anything if not authenticated (redirect in useEffect will handle it)
  if (!session) {
    return null;
  }

  // Get user initials for avatar
  const getInitials = (name: string | null | undefined) => {
    if (!name) return "U";
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
      .slice(0, 2);
  };

  // Format date
  const formatDate = (date: Date | string | null | undefined) => {
    if (!date) return "N/A";
    return new Date(date).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  return (
    <main className="flex-1 bg-gradient-to-b from-muted/30 to-background">
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto space-y-8">
          {/* Header */}
          <div>
            <h1 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent">
              Your Profile
            </h1>
            <p className="text-muted-foreground mt-2 text-lg">
              Manage your account settings and preferences
            </p>
          </div>

          {/* Profile Card */}
          <BackgroundGradient className="rounded-[22px] p-0.5">
            <Card className="border-0 shadow-lg bg-card">
              <CardHeader className="pb-4">
                <div className="flex items-start justify-between flex-wrap gap-4">
                  <div className="flex items-center gap-4">
                    <Avatar className="h-20 w-20 border-4 border-primary/20 shadow-lg">
                      <AvatarImage src={session.user?.image || ""} alt={session.user?.name || "User"} />
                      <AvatarFallback className="bg-gradient-to-br from-primary to-primary/70 text-primary-foreground text-2xl font-bold">
                        {getInitials(session.user?.name)}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <CardTitle className="text-2xl">{session.user?.name || "User"}</CardTitle>
                      <CardDescription className="text-base mt-1">
                        {session.user?.email}
                      </CardDescription>
                      <div className="mt-2">
                        <Badge variant="secondary" className="font-medium">
                          <Shield className="h-3 w-3 mr-1" />
                          Active Account
                        </Badge>
                      </div>
                    </div>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Account Details */}
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold flex items-center gap-2">
                    <User className="h-5 w-5 text-primary" />
                    Account Details
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <User className="h-4 w-4" />
                        Full Name
                      </div>
                      <p className="font-medium pl-6">{session.user?.name || "Not set"}</p>
                    </div>
                    <div className="space-y-2">
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <Mail className="h-4 w-4" />
                        Email Address
                      </div>
                      <p className="font-medium pl-6">{session.user?.email || "Not set"}</p>
                    </div>
                    <div className="space-y-2">
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <Calendar className="h-4 w-4" />
                        Member Since
                      </div>
                      <p className="font-medium pl-6">{formatDate(session.user?.createdAt)}</p>
                    </div>
                    <div className="space-y-2">
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <Shield className="h-4 w-4" />
                        Account Status
                      </div>
                      <p className="font-medium pl-6">
                        <Badge variant="outline" className="font-normal">
                          {session.user?.emailVerified ? "Verified" : "Unverified"}
                        </Badge>
                      </p>
                    </div>
                  </div>
                </div>

                {/* Credits Information */}
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold flex items-center gap-2">
                    <CreditCard className="h-5 w-5 text-primary" />
                    Credits & Usage
                  </h3>
                  {creditsLoading ? (
                    <Skeleton className="h-24 w-full" />
                  ) : (
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <Card className="bg-primary/5 border-primary/20">
                        <CardContent className="pt-6">
                          <div className="text-center space-y-1">
                            <p className="text-sm text-muted-foreground">Total Credits</p>
                            <p className="text-3xl font-bold text-primary">
                              {credits?.totalCredits || 0}
                            </p>
                          </div>
                        </CardContent>
                      </Card>
                      <Card className="bg-green-500/5 dark:bg-green-500/10 border-green-500/20 dark:border-green-500/30">
                        <CardContent className="pt-6">
                          <div className="text-center space-y-1">
                            <p className="text-sm text-muted-foreground">Remaining</p>
                            <p className="text-3xl font-bold text-green-600 dark:text-green-400">
                              {credits?.remainingCredits || 0}
                            </p>
                          </div>
                        </CardContent>
                      </Card>
                      <Card className="bg-orange-500/5 dark:bg-orange-500/10 border-orange-500/20 dark:border-orange-500/30">
                        <CardContent className="pt-6">
                          <div className="text-center space-y-1">
                            <p className="text-sm text-muted-foreground">Used</p>
                            <p className="text-3xl font-bold text-orange-600 dark:text-orange-400">
                              {credits?.usedCredits || 0}
                            </p>
                          </div>
                        </CardContent>
                      </Card>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          </BackgroundGradient>

          {/* Info Card */}
          <Card className="border-2 bg-gradient-to-br from-primary/5 to-accent/5">
            <CardContent className="pt-6">
              <div className="flex items-start gap-4">
                <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-primary/10 shrink-0">
                  <Shield className="h-5 w-5 text-primary" />
                </div>
                <div className="space-y-1">
                  <h3 className="font-semibold">Your data is secure</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    We use industry-standard security measures to protect your account and personal information.
                    Your privacy is our top priority.
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
