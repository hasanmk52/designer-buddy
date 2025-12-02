"use client";

import { useState, useCallback } from "react";
import { Upload, Image as ImageIcon, RefreshCw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { toast } from "sonner";

interface ImageUploaderProps {
  onImageSelect: (file: File) => void;
  onClear: () => void;
}

const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB
const ACCEPTED_TYPES = ["image/jpeg", "image/png", "image/webp"];

export function ImageUploader({
  onImageSelect,
  onClear,
}: ImageUploaderProps) {
  const [isDragging, setIsDragging] = useState(false);
  const [preview, setPreview] = useState<string | null>(null);

  const validateFile = (file: File): boolean => {
    if (!ACCEPTED_TYPES.includes(file.type)) {
      toast.error("Invalid file type. Please upload a JPG, PNG, or WebP image.");
      return false;
    }

    if (file.size > MAX_FILE_SIZE) {
      toast.error("File too large. Maximum size is 5MB.");
      return false;
    }

    return true;
  };

  const handleFile = useCallback(
    (file: File) => {
      if (validateFile(file)) {
        // Create preview first, then call onImageSelect
        const reader = new FileReader();
        reader.onloadend = () => {
          const result = reader.result as string;
          if (result) {
            setPreview(result);
            onImageSelect(file);
          }
        };
        reader.readAsDataURL(file);
      }
    },
    [onImageSelect]
  );

  const handleDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault();
      setIsDragging(false);

      const file = e.dataTransfer.files[0];
      if (file) {
        handleFile(file);
      }
    },
    [handleFile]
  );

  const handleChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0];
      if (file) {
        handleFile(file);
      }
    },
    [handleFile]
  );

  const handleClear = useCallback(() => {
    setPreview(null);
    onClear();
  }, [onClear]);

  if (preview) {
    return (
      <Card className="border-2 shadow-md overflow-hidden">
        <CardContent className="p-0">
          <div className="relative aspect-video w-full overflow-hidden bg-muted">
            <img
              src={preview}
              alt="Selected room"
              className="w-full h-full object-cover"
            />
          </div>
          <div className="p-4 bg-card flex items-center justify-between gap-3">
            <div className="flex items-center gap-2 text-sm">
              <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-primary/10">
                <ImageIcon className="h-4 w-4 text-primary" />
              </div>
              <span className="font-medium text-foreground">Image selected</span>
            </div>
            <Button
              variant="outline"
              size="sm"
              onClick={handleClear}
              className="hover:bg-primary/10 hover:text-primary hover:border-primary"
            >
              <RefreshCw className="h-4 w-4 mr-2" />
              Change Image
            </Button>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <div
      className={`relative border-2 border-dashed rounded-lg p-12 text-center transition-colors ${
        isDragging
          ? "border-primary bg-primary/5"
          : "border-muted-foreground/25 hover:border-muted-foreground/50"
      }`}
      onDragOver={(e) => {
        e.preventDefault();
        setIsDragging(true);
      }}
      onDragLeave={() => setIsDragging(false)}
      onDrop={handleDrop}
    >
      <input
        type="file"
        accept={ACCEPTED_TYPES.join(",")}
        onChange={handleChange}
        className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
      />

      <div className="flex flex-col items-center gap-4">
        <div className="flex items-center justify-center w-16 h-16 rounded-full bg-muted">
          {isDragging ? (
            <Upload className="h-8 w-8 text-primary" />
          ) : (
            <ImageIcon className="h-8 w-8 text-muted-foreground" />
          )}
        </div>

        <div className="space-y-2">
          <p className="text-lg font-medium">
            {isDragging ? "Drop your image here" : "Upload a room photo"}
          </p>
          <p className="text-sm text-muted-foreground">
            Drag and drop or click to browse
          </p>
          <p className="text-xs text-muted-foreground">
            JPG, PNG or WebP (max 5MB)
          </p>
        </div>
      </div>
    </div>
  );
}
