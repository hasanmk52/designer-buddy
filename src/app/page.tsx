"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Sparkles, Upload, Palette, Download } from "lucide-react";
import { authClient } from "@/lib/auth-client";

export default function Home() {
  const { data: session, isPending } = authClient.useSession();

  const handleSignIn = async () => {
    await authClient.signIn.social({
      provider: "google",
      callbackURL: "/design",
    });
  };

  return (
    <main className="flex-1">
      {/* Hero Section */}
      <section className="relative container mx-auto px-4 py-24 md:py-32 text-center overflow-hidden">
        {/* Background gradient */}
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-accent/5 -z-10" />

        <div className="max-w-4xl mx-auto space-y-8">
          <div className="flex items-center justify-center gap-3 mb-4 animate-in fade-in slide-in-from-bottom-4 duration-1000">
            <div className="flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br from-primary to-primary/70 shadow-lg shadow-primary/25">
              <Sparkles className="h-8 w-8 text-primary-foreground" />
            </div>
          </div>

          <h1 className="text-5xl md:text-7xl font-bold tracking-tight bg-gradient-to-r from-primary via-primary to-primary/60 bg-clip-text text-transparent animate-in fade-in slide-in-from-bottom-5 duration-1000 delay-150">
            Transform Your Space with AI
          </h1>

          <p className="text-lg md:text-2xl text-muted-foreground max-w-2xl mx-auto leading-relaxed animate-in fade-in slide-in-from-bottom-6 duration-1000 delay-300">
            Redesign any room in your home with the power of AI. Upload a photo, choose your style, and watch your space transform in seconds.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4 animate-in fade-in slide-in-from-bottom-7 duration-1000 delay-500">
            {isPending ? (
              <Button size="lg" className="text-lg px-8 shadow-lg shadow-primary/25" disabled>
                Loading...
              </Button>
            ) : session ? (
              <Button asChild size="lg" className="text-lg px-8 shadow-lg shadow-primary/25 hover:shadow-xl hover:shadow-primary/30 transition-all">
                <Link href="/design">
                  Start Designing
                  <Sparkles className="ml-2 h-5 w-5" />
                </Link>
              </Button>
            ) : (
              <Button onClick={handleSignIn} size="lg" className="text-lg px-8 shadow-lg shadow-primary/25 hover:shadow-xl hover:shadow-primary/30 transition-all">
                Start Designing
                <Sparkles className="ml-2 h-5 w-5" />
              </Button>
            )}
          </div>

          <p className="text-sm text-muted-foreground animate-in fade-in duration-1000 delay-700">
            Get started with 30 free credits • No credit card required
          </p>
        </div>
      </section>

      {/* How It Works */}
      <section className="bg-gradient-to-b from-muted/30 to-background py-20 md:py-28">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-foreground to-foreground/70 bg-clip-text text-transparent">
              How It Works
            </h2>
            <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto">
              Transform your room in three simple steps
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            <Card className="border-2 hover:border-primary/50 transition-all hover:shadow-lg hover:-translate-y-1 duration-300">
              <CardContent className="pt-8 text-center space-y-4">
                <div className="flex items-center justify-center w-20 h-20 rounded-2xl bg-gradient-to-br from-primary to-primary/70 mx-auto shadow-lg shadow-primary/25">
                  <Upload className="h-10 w-10 text-primary-foreground" />
                </div>
                <h3 className="text-xl font-bold">1. Upload Your Photo</h3>
                <p className="text-muted-foreground leading-relaxed">
                  Drag and drop a photo of your room or select one from your device
                </p>
              </CardContent>
            </Card>

            <Card className="border-2 hover:border-primary/50 transition-all hover:shadow-lg hover:-translate-y-1 duration-300 md:mt-4">
              <CardContent className="pt-8 text-center space-y-4">
                <div className="flex items-center justify-center w-20 h-20 rounded-2xl bg-gradient-to-br from-primary to-primary/70 mx-auto shadow-lg shadow-primary/25">
                  <Palette className="h-10 w-10 text-primary-foreground" />
                </div>
                <h3 className="text-xl font-bold">2. Choose Your Style</h3>
                <p className="text-muted-foreground leading-relaxed">
                  Select room type and theme - modern, tropical, vintage, and more
                </p>
              </CardContent>
            </Card>

            <Card className="border-2 hover:border-primary/50 transition-all hover:shadow-lg hover:-translate-y-1 duration-300">
              <CardContent className="pt-8 text-center space-y-4">
                <div className="flex items-center justify-center w-20 h-20 rounded-2xl bg-gradient-to-br from-primary to-primary/70 mx-auto shadow-lg shadow-primary/25">
                  <Download className="h-10 w-10 text-primary-foreground" />
                </div>
                <h3 className="text-xl font-bold">3. Download & Enjoy</h3>
                <p className="text-muted-foreground leading-relaxed">
                  Get your AI-redesigned room in seconds and download the result
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 md:py-28">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-foreground to-foreground/70 bg-clip-text text-transparent">
              Powerful Features
            </h2>
            <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto">
              Everything you need to redesign your space
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
            <div className="p-6 border-2 rounded-xl space-y-3 hover:border-primary/50 hover:shadow-md transition-all duration-300 bg-card">
              <h3 className="font-bold text-lg text-primary">Multiple Room Types</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Support for living rooms, bedrooms, kitchens, bathrooms, and more
              </p>
            </div>

            <div className="p-6 border-2 rounded-xl space-y-3 hover:border-primary/50 hover:shadow-md transition-all duration-300 bg-card">
              <h3 className="font-bold text-lg text-primary">8+ Design Themes</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Choose from modern, tropical, coastal, vintage, industrial, and more styles
              </p>
            </div>

            <div className="p-6 border-2 rounded-xl space-y-3 hover:border-primary/50 hover:shadow-md transition-all duration-300 bg-card">
              <h3 className="font-bold text-lg text-primary">Instant Results</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Get your redesigned room in seconds with AI-powered generation
              </p>
            </div>

            <div className="p-6 border-2 rounded-xl space-y-3 hover:border-primary/50 hover:shadow-md transition-all duration-300 bg-card">
              <h3 className="font-bold text-lg text-primary">High Quality Output</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Powered by Google Gemini for professional-quality results
              </p>
            </div>

            <div className="p-6 border-2 rounded-xl space-y-3 hover:border-primary/50 hover:shadow-md transition-all duration-300 bg-card">
              <h3 className="font-bold text-lg text-primary">Easy to Use</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Simple drag-and-drop interface with intuitive controls
              </p>
            </div>

            <div className="p-6 border-2 rounded-xl space-y-3 hover:border-primary/50 hover:shadow-md transition-all duration-300 bg-card">
              <h3 className="font-bold text-lg text-primary">30 Free Credits</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Start with 30 free design generations - no credit card required
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative py-20 md:py-32 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-accent/5 to-primary/5 -z-10" />
        <div className="container mx-auto px-4 text-center">
          <div className="max-w-3xl mx-auto space-y-8">
            <h2 className="text-3xl md:text-5xl font-bold bg-gradient-to-r from-primary via-primary to-primary/60 bg-clip-text text-transparent">
              Ready to Transform Your Space?
            </h2>
            <p className="text-lg md:text-xl text-muted-foreground leading-relaxed">
              {session
                ? "Start redesigning your rooms with AI today"
                : "Sign in with Google and start redesigning your rooms with AI today"
              }
            </p>
            {isPending ? (
              <Button size="lg" className="text-lg px-8 shadow-lg shadow-primary/25" disabled>
                Loading...
              </Button>
            ) : session ? (
              <Button asChild size="lg" className="text-lg px-8 shadow-lg shadow-primary/25 hover:shadow-xl hover:shadow-primary/30 transition-all">
                <Link href="/design">
                  Get Started Free
                  <Sparkles className="ml-2 h-5 w-5" />
                </Link>
              </Button>
            ) : (
              <Button onClick={handleSignIn} size="lg" className="text-lg px-8 shadow-lg shadow-primary/25 hover:shadow-xl hover:shadow-primary/30 transition-all">
                Sign In to Get Started
                <Sparkles className="ml-2 h-5 w-5" />
              </Button>
            )}
          </div>
        </div>
      </section>
    </main>
  );
}
