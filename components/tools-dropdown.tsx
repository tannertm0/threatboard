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
    name: "Virus Scanner",
    description: "Scan for potential security threats",
    href: "/tools/virus-scanner",
    icon: "🔍",
  },
  {
    name: "Password Generator/Checker",
    description: "Generate secure passwords",
    href: "/tools/password-generator",
    icon: "🔑",
  },
  {
    name: "Hash Lookup",
    description: "Look up file information by hash",
    href: "/tools/hash-lookup",
    icon: "🔎",
  },
  {
    name: "Network Monitor",
    description: "Monitor network activity",
    href: "/tools/network-monitor",
    icon: "🌐",
  },
  {
    name: "Log Analyzer",
    description: "Analyze system logs",
    href: "/tools/log-analyzer",
    icon: "📊",
  },
  {
    name: "Port Scanner",
    description: "Scan open ports",
    href: "/tools/port-scanner",
    icon: "🔌",
  },
  {
    name: "Security Reports",
    description: "Generate security reports",
    href: "/tools/security-reports",
    icon: "📄",
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
      <DropdownMenuContent className="w-[500px] p-4">
        <div className="grid grid-cols-2 gap-4">
          {tools.map((tool) => (
            <Link
              key={tool.name}
              href={tool.href}
              className="flex flex-col gap-2 rounded-lg border p-3 hover:bg-accent hover:text-accent-foreground transition-colors h-[100px]"
            >
              <div className="flex items-center gap-2 min-h-[24px]">
                <span className="text-2xl shrink-0">{tool.icon}</span>
                <span className="font-medium truncate">{tool.name}</span>
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