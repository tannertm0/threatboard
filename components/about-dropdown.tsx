"use client";

import { useEffect, useState } from "react";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { ChevronDown, Info, User } from "lucide-react";
import Link from "next/link";
import { Button } from "./ui/button";
import { usePathname } from "next/navigation";

export default function AboutDropdown() {
  const [mounted, setMounted] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    setMounted(true);
  }, []);

  // Don't render anything on the server-side to prevent hydration mismatch
  if (!mounted) {
    return null;
  }

  const isActive = (path: string) => pathname?.startsWith(path);

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="link" className="text-sm font-semibold p-0 hover:text-foreground/80 transition-colors flex items-center">
          About
          <ChevronDown className="ml-1 h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-48">
        <DropdownMenuItem>
          <Link 
            href="/about" 
            prefetch={false}
            className={`flex w-full items-center gap-2 ${isActive('/about') && !isActive('/about/project') ? 'text-foreground' : 'text-muted-foreground'}`}
          >
            <User className="h-4 w-4" />
            <span>About Developer</span>
          </Link>
        </DropdownMenuItem>
        
        <DropdownMenuItem>
          <Link 
            href="/about/project" 
            prefetch={false}
            className={`flex w-full items-center gap-2 ${isActive('/about/project') ? 'text-foreground' : 'text-muted-foreground'}`}
          >
            <Info className="h-4 w-4" />
            <span>About Project</span>
          </Link>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
} 