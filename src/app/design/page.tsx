"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { authClient } from "@/lib/auth-client";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ImageUploader } from "@/components/design/image-uploader";
import { CreditBadge } from "@/components/design/credit-badge";
import { GeneratedImage } from "@/components/design/generated-image";
import { Skeleton } from "@/components/ui/skeleton";
import { Progress } from "@/components/ui/progress";
import { useCreditsContext } from "@/contexts/credits-context";
import { Sparkles, Loader2 } from "lucide-react";
import { toast } from "sonner";

const ROOM_TYPES = [
  "Living Room",
  "Bedroom",
  "Kitchen",
  "Bathroom",
  "Dining Room",
  "Office",
  "Outdoor",
];

const THEMES = [
  "Modern",
  "Summer",
  "Professional",
  "Tropical",
  "Coastal",
  "Vintage",
  "Industrial",
  "Neoclassic",
  "Tribal",
];

export default function DesignPage() {
  const router = useRouter();
  const { data: session, isPending } = authClient.useSession();
  const { credits, refreshCredits } = useCreditsContext();

  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [roomType, setRoomType] = useState<string>("living room");
  const [theme, setTheme] = useState<string>("modern");
  const [generatedImageUrl, setGeneratedImageUrl] = useState<string | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const [progress, setProgress] = useState(0);

  // Redirect to home if not authenticated
  useEffect(() => {
    if (!isPending && !session) {
      router.push("/");
    }
  }, [isPending, session, router]);

  // Simulate progress while generating
  useEffect(() => {
    if (isGenerating) {
      setProgress(0);
      const interval = setInterval(() => {
        setProgress((prev) => {
          if (prev >= 90) {
            return 90; // Cap at 90% until actual completion
          }
          return prev + 10;
        });
      }, 500);

      return () => clearInterval(interval);
    } else {
      setProgress(0);
    }
  }, [isGenerating]);

  const handleGenerate = async () => {
    if (!selectedImage) {
      toast.error("Please upload an image");
      return;
    }

    if (!roomType) {
      toast.error("Please select a room type");
      return;
    }

    if (!theme) {
      toast.error("Please select a theme");
      return;
    }

    if (credits && credits.remainingCredits <= 0) {
      toast.error("You have no credits remaining");
      return;
    }

    setIsGenerating(true);

    try {
      const formData = new FormData();
      formData.append("image", selectedImage);
      formData.append("roomType", roomType);
      formData.append("theme", theme);

      const response = await fetch("/api/design/generate", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || "Failed to generate design");
      }

      const data = await response.json();
      setProgress(100); // Complete the progress bar
      setGeneratedImageUrl(data.imageUrl);

      // Refresh credits
      await refreshCredits();

      toast.success("Design generated successfully!");
    } catch (error) {
      console.error("Error generating design:", error);
      toast.error(error instanceof Error ? error.message : "Failed to generate design");
    } finally {
      setIsGenerating(false);
    }
  };

  const handleReset = () => {
    setSelectedImage(null);
    setRoomType("living room");
    setTheme("modern");
    setGeneratedImageUrl(null);
  };

  if (isPending) {
    return (
      <main className="flex-1 container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto space-y-8">
          <Skeleton className="h-12 w-64" />
          <Skeleton className="h-96 w-full" />
        </div>
      </main>
    );
  }

  // Don't render anything if not authenticated (redirect in useEffect will handle it)
  if (!session) {
    return null;
  }

  if (generatedImageUrl) {
    return (
      <main className="flex-1 bg-gradient-to-b from-muted/30 to-background">
        <div className="container mx-auto px-4 py-12">
          <div className="max-w-5xl mx-auto space-y-8">
            <div className="flex items-center justify-between flex-wrap gap-4">
              <div>
                <h1 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent">Your Redesigned Space</h1>
                <p className="text-muted-foreground mt-2 text-lg">
                  Download your design or create a new one
                </p>
              </div>
              <CreditBadge />
            </div>

            <GeneratedImage imageUrl={generatedImageUrl} onReset={handleReset} />
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="flex-1 bg-gradient-to-b from-muted/30 to-background">
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-5xl mx-auto space-y-8">
          <div className="flex items-center justify-between flex-wrap gap-4">
            <div>
              <h1 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent">Design Your Space</h1>
              <p className="text-muted-foreground mt-2 text-lg">
                Upload a photo and let AI transform your room
              </p>
            </div>
            <CreditBadge />
          </div>

        <Card className="border-2 shadow-lg">
          <CardContent className="p-8 space-y-8">
            <div className="space-y-3">
              <label className="text-base font-semibold text-foreground flex items-center gap-2">
                <span className="flex items-center justify-center w-8 h-8 rounded-lg bg-primary/10 text-primary font-bold text-sm">1</span>
                Upload Room Photo
              </label>
              <ImageUploader
                onImageSelect={setSelectedImage}
                onClear={() => setSelectedImage(null)}
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-3">
                <label className="text-base font-semibold text-foreground flex items-center gap-2">
                  <span className="flex items-center justify-center w-8 h-8 rounded-lg bg-primary/10 text-primary font-bold text-sm">2</span>
                  Select Room Type
                </label>
                <Select value={roomType} onValueChange={setRoomType}>
                  <SelectTrigger className="h-12">
                    <SelectValue placeholder="Choose room type" />
                  </SelectTrigger>
                  <SelectContent>
                    {ROOM_TYPES.map((type) => (
                      <SelectItem key={type} value={type.toLowerCase()}>
                        {type}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-3">
                <label className="text-base font-semibold text-foreground flex items-center gap-2">
                  <span className="flex items-center justify-center w-8 h-8 rounded-lg bg-primary/10 text-primary font-bold text-sm">3</span>
                  Choose Design Theme
                </label>
                <Select value={theme} onValueChange={setTheme}>
                  <SelectTrigger className="h-12">
                    <SelectValue placeholder="Choose theme" />
                  </SelectTrigger>
                  <SelectContent>
                    {THEMES.map((t) => (
                      <SelectItem key={t} value={t.toLowerCase()}>
                        {t}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            <Button
              onClick={handleGenerate}
              disabled={
                !selectedImage ||
                !roomType ||
                !theme ||
                isGenerating ||
                (credits?.remainingCredits ?? 0) <= 0
              }
              size="lg"
              className="w-full text-lg h-14 shadow-lg shadow-primary/25 hover:shadow-xl hover:shadow-primary/30 transition-all"
            >
              {isGenerating ? (
                <>
                  <Loader2 className="mr-2 h-6 w-6 animate-spin" />
                  Generating Design...
                </>
              ) : (
                <>
                  <Sparkles className="mr-2 h-6 w-6" />
                  Generate Design (1 Credit)
                </>
              )}
            </Button>

            {isGenerating && (
              <div className="space-y-4 p-6 rounded-xl bg-gradient-to-br from-primary/5 to-accent/5 border-2 border-primary/20 shadow-inner">
                <Progress value={progress} className="h-3" />
                <div className="flex items-center justify-center gap-3">
                  <span className="text-base font-bold text-primary">
                    {progress}%
                  </span>
                  <span className="text-sm text-muted-foreground font-medium">
                    {progress < 90 ? "Processing your image..." : "Almost done..."}
                  </span>
                </div>
              </div>
            )}

            {credits && credits.remainingCredits <= 0 && (
              <p className="text-sm text-destructive text-center">
                You have no credits remaining. Please purchase more credits to continue.
              </p>
            )}
          </CardContent>
        </Card>
        </div>
      </div>
    </main>
  );
}
