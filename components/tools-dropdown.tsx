"use client";

import { useEffect, useState } from "react";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger, DropdownMenuLabel, DropdownMenuSeparator } from "@/components/ui/dropdown-menu";
import { ChevronDown, Key, Search, Shield, Bug, Lock, AlertTriangle } from "lucide-react";
import Link from "next/link";
import { Button } from "./ui/button";
import { usePathname, useRouter } from "next/navigation";
import { createSupabaseClient } from "@/utils/supabase/client";
import { toast } from "sonner";

export default function ToolsDropdown() {
  const [mounted, setMounted] = useState(false);
  const [isPremium, setIsPremium] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const pathname = usePathname();
  const router = useRouter();
  const supabase = createSupabaseClient();

  useEffect(() => {
    setMounted(true);
     
    // Check user subscription status
    const checkSubscription = async () => {
      if (!supabase) return;
      
      setIsLoading(true);
      try {
        // Check if user is logged in
        const { data } = await supabase.auth.getUser();
        const user = data.user;
        setIsLoggedIn(!!user);
         
        // Here you would check if the user has a premium subscription
        // For now, we'll use a mock implementation
        // In a real app, you'd query your subscription database/service
        if (user) {
          // Mock implementation - replace with actual subscription check
          // const { data, error } = await supabase.from('subscriptions').select('*').eq('user_id', user.id).single();
          // setIsPremium(data?.is_premium || false);
           
          // For testing - 50% chance of being premium
          setIsPremium(Math.random() > 0.5);
        }
      } catch (error) {
        console.error('Error checking subscription:', error);
      } finally {
        setIsLoading(false);
      }
    };
     
    checkSubscription();
  }, []);

  // Don't render anything on the server-side to prevent hydration mismatch
  if (!mounted) {
    return null;
  }

  const isActive = (path: string) => pathname?.startsWith(path);
   
  const handlePremiumToolClick = (e: React.MouseEvent, path: string) => {
    if (!isPremium) {
      e.preventDefault();
      if (!isLoggedIn) {
        toast('Please sign in to access premium tools', {
          action: {
            label: "Sign In",
            onClick: () => router.push("/sign-in")
          }
        });
      } else {
        toast('This is a premium feature', {
          action: {
            label: "Upgrade",
            onClick: () => router.push("/upgrade")
          }
        });
      }
    }
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="link" className="text-sm font-semibold p-0 hover:text-foreground/80 transition-colors flex items-center">
          Tools
          <ChevronDown className="ml-1 h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56">
        <DropdownMenuLabel>Free Tools</DropdownMenuLabel>
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
        
        <DropdownMenuSeparator />
        <DropdownMenuLabel>Premium Tools</DropdownMenuLabel>
        
        <DropdownMenuItem 
          className={!isPremium ? "opacity-80" : ""}
          onClick={(e) => handlePremiumToolClick(e, '/board')}
        >
          <Link 
            href={isPremium ? "/board" : "#"}
            prefetch={false}
            className={`flex w-full items-center gap-2 ${isActive('/board') ? 'text-foreground' : 'text-muted-foreground'}`}
          >
            <Shield className="h-4 w-4" />
            <span>Vulnerability Board</span>
            {!isPremium && <Lock className="h-3 w-3 ml-auto" />}
          </Link>
        </DropdownMenuItem>
        
        <DropdownMenuItem
          className={!isPremium ? "opacity-80" : ""}
          onClick={(e) => handlePremiumToolClick(e, '/malware')}
        >
          <Link 
            href={isPremium ? "/malware" : "#"}
            prefetch={false}
            className={`flex w-full items-center gap-2 ${isActive('/malware') ? 'text-foreground' : 'text-muted-foreground'}`}
          >
            <Bug className="h-4 w-4" />
            <span>Malware Samples</span>
            {!isPremium && <Lock className="h-3 w-3 ml-auto" />}
          </Link>
        </DropdownMenuItem>
        
        <DropdownMenuItem
          className={!isPremium ? "opacity-80" : ""}
          onClick={(e) => handlePremiumToolClick(e, '/tools/advanced-security')}
        >
          <Link 
            href={isPremium ? "/tools/advanced-security" : "#"}
            prefetch={false}
            className={`flex w-full items-center gap-2 ${isActive('/tools/advanced-security') ? 'text-foreground' : 'text-muted-foreground'}`}
          >
            <AlertTriangle className="h-4 w-4" />
            <span>Advanced Security</span>
            {!isPremium && <Lock className="h-3 w-3 ml-auto" />}
          </Link>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
} 