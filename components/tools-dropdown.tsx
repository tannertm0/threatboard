"use client";

import { useEffect, useState } from "react";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { ChevronDown, Key, Search, Shield, Bug } from "lucide-react";
import Link from "next/link";
import { Button } from "./ui/button";
import { usePathname } from "next/navigation";

export default function ToolsDropdown() {
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
          Tools
          <ChevronDown className="ml-1 h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56">
        <DropdownMenuItem>
          <Link 
            href="/board" 
            prefetch={false}
            className={`flex w-full items-center gap-2 ${isActive('/board') ? 'text-foreground' : 'text-muted-foreground'}`}
          >
            <Shield className="h-4 w-4" />
            <span>Vulnerability Board</span>
          </Link>
        </DropdownMenuItem>
        
        <DropdownMenuItem>
          <Link 
            href="/tools/virus-scanner" 
            prefetch={false}
            className={`flex w-full items-center gap-2 ${isActive('/tools/virus') ? 'text-foreground' : 'text-muted-foreground'}`}
          >
            <Shield className="h-4 w-4" />
            <span>Virus Scanner</span>
          </Link>
        </DropdownMenuItem>
        
        <DropdownMenuItem>
          <Link 
            href="/tools/password-generator" 
            prefetch={false}
            className={`flex w-full items-center gap-2 ${isActive('/tools/password') ? 'text-foreground' : 'text-muted-foreground'}`}
          >
            <Key className="h-4 w-4" />
            <span>Password Generator</span>
          </Link>
        </DropdownMenuItem>
        
        <DropdownMenuItem>
          <Link 
            href="/tools/hash-lookup"
            prefetch={false} 
            className={`flex w-full items-center gap-2 ${isActive('/tools/hash') ? 'text-foreground' : 'text-muted-foreground'}`}
          >
            <Search className="h-4 w-4" />
            <span>Hash Lookup</span>
          </Link>
        </DropdownMenuItem>
        
        <DropdownMenuItem>
          <Link 
            href="/malware" 
            prefetch={false}
            className={`flex w-full items-center gap-2 ${isActive('/malware') ? 'text-foreground' : 'text-muted-foreground'}`}
          >
            <Bug className="h-4 w-4" />
            <span>Malware Samples</span>
          </Link>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
} 