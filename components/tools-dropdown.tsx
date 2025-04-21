"use client";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Wrench } from "lucide-react";
import Link from "next/link";

const tools = [
  {
    name: "Vulnerability Board",
    description: "View the latest security vulnerabilities",
    href: "/board",
    implemented: true,
  },
  {
    name: "Virus Scanner",
    description: "Scan for potential security threats",
    href: "/tools/virus-scanner",
    implemented: true,
  },
  {
    name: "Password Generator/Checker",
    description: "Generate secure passwords",
    href: "/tools/password-generator",
    implemented: true,
  },
  {
    name: "Hash Lookup",
    description: "Look up file information by hash",
    href: "/tools/hash-lookup",
    implemented: true,
  },
  {
    name: "Network Monitor",
    description: "Monitor network activity",
    href: "/tools/network-monitor",
    implemented: false,
  },
  {
    name: "Log Analyzer",
    description: "Analyze system logs",
    href: "/tools/log-analyzer",
    implemented: false,
  },
  {
    name: "Port Scanner",
    description: "Scan open ports",
    href: "/tools/port-scanner",
    implemented: false,
  },
  {
    name: "Security Reports",
    description: "Generate security reports",
    href: "/tools/security-reports",
    implemented: false,
  },
  {
    name: "AI Image Detector",
    description: "Analyze images using AI classification",
    href: "/ai-detector",
    implemented: true,
  },
];

export function ToolsDropdown() {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="flex items-center gap-2">
          <Wrench className="h-4 w-4" />
          Tools
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-[600px] p-4">
        <div className="grid grid-cols-2 gap-2">
          {tools.map((tool) => (
            <Link
              key={tool.name}
              href={tool.implemented ? tool.href : "#"}
              onClick={(e) => !tool.implemented && e.preventDefault()}
              className={`flex flex-col gap-1 rounded-lg border p-3 hover:bg-accent hover:text-accent-foreground transition-colors relative ${!tool.implemented ? 'opacity-70 cursor-not-allowed' : ''}`}
            >
              <div className="flex items-center justify-between">
                <span className="font-medium">{tool.name}</span>
                {!tool.implemented && (
                  <span className="text-xs px-1.5 py-0.5 bg-yellow-500/20 text-yellow-700 dark:text-yellow-400 rounded-md font-medium">
                    Coming Soon
                  </span>
                )}
              </div>
              <p className="text-sm text-muted-foreground line-clamp-2">
                {tool.description}
              </p>
            </Link>
          ))}
        </div>
      </DropdownMenuContent>
    </DropdownMenu>
  );
} 