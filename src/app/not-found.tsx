import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Home, ArrowLeft, Sparkles } from "lucide-react";

export default function NotFound() {
  return (
    <main className="flex-1 bg-gradient-to-b from-muted/30 to-background">
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-2xl mx-auto space-y-8">
          {/* 404 Header */}
          <div className="text-center space-y-4">
            <div className="flex items-center justify-center">
              <div className="flex items-center justify-center w-24 h-24 rounded-2xl bg-gradient-to-br from-primary to-primary/70 shadow-2xl shadow-primary/25">
                <Sparkles className="h-12 w-12 text-primary-foreground" />
              </div>
            </div>
            <h1 className="text-6xl md:text-8xl font-bold bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent">
              404
            </h1>
            <h2 className="text-2xl md:text-3xl font-semibold text-foreground">
              Page Not Found
            </h2>
            <p className="text-muted-foreground text-lg max-w-md mx-auto">
              Oops! The page you&apos;re looking for doesn&apos;t exist. It might have been moved or deleted.
            </p>
          </div>

          {/* Action Card */}
          <Card className="border-2 shadow-lg">
            <CardContent className="p-8">
              <div className="space-y-4">
                <h3 className="text-xl font-semibold text-center mb-6">
                  What would you like to do?
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <Button asChild size="lg" className="w-full h-auto py-6 shadow-lg shadow-primary/25 hover:shadow-xl hover:shadow-primary/30 transition-all">
                    <Link href="/" className="flex flex-col items-center gap-2">
                      <Home className="h-6 w-6" />
                      <div className="text-center">
                        <div className="font-bold text-base">Go Home</div>
                        <div className="text-xs font-normal opacity-90">Back to homepage</div>
                      </div>
                    </Link>
                  </Button>

                  <Button asChild variant="outline" size="lg" className="w-full h-auto py-6 border-2 hover:border-primary hover:bg-primary/10 hover:text-primary transition-all">
                    <Link href="/dashboard" className="flex flex-col items-center gap-2">
                      <ArrowLeft className="h-6 w-6" />
                      <div className="text-center">
                        <div className="font-bold text-base">Dashboard</div>
                        <div className="text-xs font-normal opacity-90">Go to dashboard</div>
                      </div>
                    </Link>
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Help Card */}
          <Card className="border-2 bg-gradient-to-br from-primary/5 to-accent/5">
            <CardContent className="pt-6">
              <div className="flex items-start gap-4">
                <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-primary/10 shrink-0">
                  <Sparkles className="h-5 w-5 text-primary" />
                </div>
                <div className="space-y-1">
                  <h3 className="font-semibold">Need help?</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    If you believe this is an error, please try refreshing the page or contact support.
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
