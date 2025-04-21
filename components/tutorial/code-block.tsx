"use client";

import { CopyButton } from "../ui/copy-button";

export function CodeBlock({ code }: { code: string }) {
  return (
    <pre className="bg-muted rounded-md p-6 my-6 relative">
      <CopyButton 
        value={code} 
        className="absolute right-2 top-2"
        variant="outline"
      />
      <code className="text-xs p-3">{code}</code>
    </pre>
  );
}
