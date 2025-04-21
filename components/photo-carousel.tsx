"use client";

import React, { useState } from "react";
import Image from "next/image";
import { Image as ImageIcon } from "lucide-react";
import { Carousel } from "@/components/ui/carousel";
import { Dialog, DialogContent, DialogTrigger, DialogTitle } from "@/components/ui/dialog";
import { VisuallyHidden } from "@/components/ui/visually-hidden";
import { cn } from "@/lib/utils";

export interface Photo {
  id: string;
  url?: string;
  alt: string;
  caption?: string;
}

interface PhotoCarouselProps {
  photos: Photo[];
  className?: string;
  aspectRatio?: "square" | "video" | "wide" | "auto";
  lightbox?: boolean;
}

export function PhotoCarousel({ 
  photos, 
  className, 
  aspectRatio = "video", 
  lightbox = true 
}: PhotoCarouselProps) {
  const [modalPhotoIndex, setModalPhotoIndex] = useState<number | null>(null);
  
  // Calculate aspect ratio class
  const aspectRatioClass = {
    square: "aspect-square",
    video: "aspect-video",
    wide: "aspect-[21/9]",
    auto: "aspect-auto"
  }[aspectRatio];

  return (
    <>
      <Carousel className={className} slideClassName="px-2">
        {photos.map((photo, index) => (
          <div 
            key={photo.id} 
            className="h-full flex flex-col"
            onClick={() => lightbox && setModalPhotoIndex(index)}
          >
            <div 
              className={cn(
                "relative w-full overflow-hidden rounded-lg cursor-pointer bg-muted",
                aspectRatioClass
              )}
            >
              {/* Only render Image if url exists and is a string */}
              {typeof photo.url === 'string' && photo.url.length > 0 && (
                <Image
                  src={photo.url}
                  alt={photo.alt}
                  fill
                  className="object-cover transition-transform hover:scale-105 duration-500"
                  onError={(e) => {
                    // If image fails to load, replace with a solid color background
                    const target = e.target as HTMLImageElement;
                    target.style.display = 'none';
                  }}
                />
              )}
              {/* Fallback for missing image */}
              <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-primary/10 to-primary/30">
                <ImageIcon className="h-16 w-16 opacity-50" />
              </div>
            </div>
            {photo.caption && (
              <p className="mt-2 mb-4 text-sm text-center text-muted-foreground">{photo.caption}</p>
            )}
          </div>
        ))}
      </Carousel>

      {/* Lightbox Modal */}
      {lightbox && (
        <Dialog open={modalPhotoIndex !== null} onOpenChange={(open) => !open && setModalPhotoIndex(null)}>
          <DialogContent className="max-w-5xl p-0 bg-background/80 backdrop-blur-sm">
            <DialogTitle>
              <VisuallyHidden>
                {modalPhotoIndex !== null ? `Photo: ${photos[modalPhotoIndex].alt}` : "Photo View"}
              </VisuallyHidden>
            </DialogTitle>
            {modalPhotoIndex !== null && (
              <div className="p-4">
                <div className="relative w-full aspect-[4/3] overflow-hidden rounded-lg bg-muted">
                  {modalPhotoIndex !== null && 
                   typeof photos[modalPhotoIndex].url === 'string' && 
                   photos[modalPhotoIndex].url.length > 0 ? (
                    <Image
                      src={photos[modalPhotoIndex].url as string}
                      alt={photos[modalPhotoIndex].alt}
                      fill
                      className="object-contain"
                    />
                  ) : (
                    <div className="absolute inset-0 flex items-center justify-center">
                      <ImageIcon className="h-24 w-24 opacity-30" />
                    </div>
                  )}
                </div>
                {modalPhotoIndex !== null && photos[modalPhotoIndex].caption && (
                  <p className="mt-4 text-center">{photos[modalPhotoIndex].caption}</p>
                )}
              </div>
            )}
          </DialogContent>
        </Dialog>
      )}
    </>
  );
} 