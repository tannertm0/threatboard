"use client";

import React, { useState } from "react";
import { Button } from "./button";
import { Copy, Check } from "lucide-react";
import { cn } from "@/lib/utils";

interface CopyButtonProps {
  value: string;
  className?: string;
  variant?: "default" | "secondary" | "outline" | "ghost";
  size?: "default" | "sm" | "lg" | "icon";
}

export function CopyButton({
  value,
  className,
  variant = "outline",
  size = "icon",
}: CopyButtonProps) {
  const [copied, setCopied] = useState(false);
  const [showLines, setShowLines] = useState(false);

  const handleCopy = async () => {
    await navigator.clipboard.writeText(value);
    setCopied(true);
    setShowLines(true);
    
    // Hide lines after animation
    setTimeout(() => setShowLines(false), 700);
    
    // Reset the copied state after 2 seconds
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <Button
      variant={variant}
      size={size}
      onClick={handleCopy}
      className={cn("relative", className)}
    >
      {/* Show either Copy or Check icon */}
      {!copied ? (
        <Copy className="h-4 w-4" />
      ) : (
        <Check className="h-4 w-4 text-green-500" />
      )}
      
      {/* Animation lines - just burst effect */}
      {showLines && (
        <>
          {/* Top */}
          <span className="absolute w-[2px] h-0 bg-green-500 rounded-full animate-spring-out-vertical origin-center" 
                style={{ top: '0%', left: '50%', transform: 'translateX(-50%)' }}></span>
          
          {/* Right */}
          <span className="absolute h-[2px] w-0 bg-green-500 rounded-full animate-spring-out origin-center" 
                style={{ top: '50%', right: '0%', transform: 'translateY(-50%) rotate(90deg)' }}></span>
          
          {/* Bottom */}
          <span className="absolute w-[2px] h-0 bg-green-500 rounded-full animate-spring-out-vertical origin-center" 
                style={{ bottom: '0%', left: '50%', transform: 'translateX(-50%)' }}></span>
          
          {/* Left */}
          <span className="absolute h-[2px] w-0 bg-green-500 rounded-full animate-spring-out origin-center" 
                style={{ top: '50%', left: '0%', transform: 'translateY(-50%) rotate(90deg)' }}></span>
          
          {/* Top-Right Diagonal */}
          <span className="absolute w-[2px] h-0 bg-green-500 rounded-full animate-spring-out-vertical origin-center" 
                style={{ top: '5%', right: '15%', transform: 'rotate(45deg)' }}></span>
          
          {/* Top-Left Diagonal */}
          <span className="absolute w-[2px] h-0 bg-green-500 rounded-full animate-spring-out-vertical origin-center" 
                style={{ top: '5%', left: '15%', transform: 'rotate(-45deg)' }}></span>
          
          {/* Bottom-Right Diagonal */}
          <span className="absolute w-[2px] h-0 bg-green-500 rounded-full animate-spring-out-vertical origin-center" 
                style={{ bottom: '5%', right: '15%', transform: 'rotate(-45deg)' }}></span>
          
          {/* Bottom-Left Diagonal */}
          <span className="absolute w-[2px] h-0 bg-green-500 rounded-full animate-spring-out-vertical origin-center" 
                style={{ bottom: '5%', left: '15%', transform: 'rotate(45deg)' }}></span>
        </>
      )}
    </Button>
  );
} 