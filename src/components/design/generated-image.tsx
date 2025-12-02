"use client";

import { Download, RotateCcw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

interface GeneratedImageProps {
  imageUrl: string;
  onReset: () => void;
}

export function GeneratedImage({ imageUrl, onReset }: GeneratedImageProps) {
  const handleDownload = () => {
    const link = document.createElement("a");
    link.href = imageUrl;
    link.download = `designer-buddy-${Date.now()}.png`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <Card>
      <CardContent className="p-6 space-y-4">
        <div className="relative aspect-video w-full rounded-lg overflow-hidden border">
          <img
            src={imageUrl}
            alt="Generated design"
            className="w-full h-full object-cover"
          />
        </div>

        <div className="flex gap-3">
          <Button onClick={handleDownload} className="flex-1" size="lg">
            <Download className="mr-2 h-4 w-4" />
            Download Image
          </Button>
          <Button onClick={onReset} variant="outline" size="lg" className="flex-1">
            <RotateCcw className="mr-2 h-4 w-4" />
            New Design
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
