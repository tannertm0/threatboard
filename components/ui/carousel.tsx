"use client";

import React, { useState, useEffect, useCallback } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "./button";

interface CarouselProps {
  children: React.ReactNode[];
  autoPlay?: boolean;
  interval?: number;
  showControls?: boolean;
  showIndicators?: boolean;
  className?: string;
  slideClassName?: string;
}

export function Carousel({
  children,
  autoPlay = true,
  interval = 5000,
  showControls = false,
  showIndicators = true,
  className,
  slideClassName,
}: CarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(autoPlay);
  const items = React.Children.toArray(children);

  const nextSlide = useCallback(() => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % items.length);
  }, [items.length]);

  const prevSlide = useCallback(() => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + items.length) % items.length);
  }, [items.length]);

  const goToSlide = (index: number) => {
    setCurrentIndex(index);
  };

  // Auto play functionality
  useEffect(() => {
    if (!isAutoPlaying) return;
    
    const interval_id = setInterval(() => {
      nextSlide();
    }, interval);
    
    return () => clearInterval(interval_id);
  }, [isAutoPlaying, interval, nextSlide]);

  // Pause auto play on hover
  const pauseAutoPlay = () => {
    if (autoPlay) {
      setIsAutoPlaying(false);
    }
  };

  const resumeAutoPlay = () => {
    if (autoPlay) {
      setIsAutoPlaying(true);
    }
  };

  return (
    <div 
      className={cn("relative w-full overflow-hidden", className)}
      onMouseEnter={pauseAutoPlay}
      onMouseLeave={resumeAutoPlay}
    >
      <div 
        className="flex transition-transform duration-500 ease-in-out"
        style={{ transform: `translateX(-${currentIndex * 100}%)` }}
      >
        {items.map((item, index) => (
          <div 
            key={index} 
            className={cn(
              "flex-shrink-0 w-full", 
              slideClassName
            )}
          >
            {item}
          </div>
        ))}
      </div>
      
      {/* Indicators */}
      {showIndicators && items.length > 1 && (
        <div className="mt-4 flex justify-center gap-2">
          {items.map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className={cn(
                "w-3 h-3 rounded-full transition-all",
                currentIndex === index 
                  ? "bg-primary" 
                  : "bg-primary/30 hover:bg-primary/50"
              )}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      )}
    </div>
  );
} 