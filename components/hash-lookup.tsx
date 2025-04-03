"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Loader2 } from "lucide-react";

export function HashLookup() {
  const [hash, setHash] = useState("");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);

  const lookupHash = async () => {
    if (!hash.trim()) {
      setError("Please enter a file hash");
      return;
    }

    setLoading(true);
    setError(null);
    setResult(null);

    try {
      const response = await fetch(
        `https://www.virustotal.com/api/v3/files/${hash}`,
        {
          method: "GET",
          headers: {
            accept: "application/json",
            "x-apikey": "4cb0347cc5554fd22e3d43d3391a3ebd0ca5b4d4b4596ac11432eda294e95e6a",
          },
        }
      );

      if (!response.ok) {
        const errorText = await response.text();
        console.error("Hash Lookup Error Response:", errorText);
        throw new Error(response.status === 404 ? "File hash not found" : "Failed to lookup file hash");
      }

      const data = await response.json();
      setResult(data.data.attributes);
    } catch (err) {
      console.error("Hash Lookup Error:", err);
      setError(err instanceof Error ? err.message : "An error occurred during the lookup");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full max-w-2xl space-y-6">
      <div className="space-y-4">
        <div className="flex gap-4">
          <Input
            type="text"
            placeholder="Enter SHA-256, SHA-1 or MD5 hash"
            value={hash}
            onChange={(e) => setHash(e.target.value)}
            className="flex-1"
          />
          <Button onClick={lookupHash} disabled={loading}>
            {loading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Looking up...
              </>
            ) : (
              "Lookup Hash"
            )}
          </Button>
        </div>

        {error && (
          <div className="p-4 text-sm text-destructive bg-destructive/10 rounded-md">
            {error}
          </div>
        )}

        {result && (
          <div className="space-y-4 border rounded-lg p-6">
            <h3 className="text-lg font-semibold">File Information</h3>
            <div className="grid gap-4">
              <div className="grid grid-cols-2 gap-2">
                <span className="text-sm text-muted-foreground">File Type:</span>
                <span>{result.type_description || result.type_tag}</span>
              </div>
              <div className="grid grid-cols-2 gap-2">
                <span className="text-sm text-muted-foreground">Size:</span>
                <span>{result.size ? `${(result.size / 1024 / 1024).toFixed(2)} MB` : "Unknown"}</span>
              </div>
              <div className="grid grid-cols-2 gap-2">
                <span className="text-sm text-muted-foreground">First Seen:</span>
                <span>{new Date(result.first_submission_date * 1000).toLocaleString()}</span>
              </div>
              <div className="grid grid-cols-2 gap-2">
                <span className="text-sm text-muted-foreground">Last Seen:</span>
                <span>{new Date(result.last_submission_date * 1000).toLocaleString()}</span>
              </div>
              {result.signature_info && (
                <div className="grid grid-cols-2 gap-2">
                  <span className="text-sm text-muted-foreground">Signature:</span>
                  <span>{result.signature_info.product || "Unsigned"}</span>
                </div>
              )}
              <div className="grid grid-cols-2 gap-2">
                <span className="text-sm text-muted-foreground">Detection Ratio:</span>
                <span className="font-medium">
                  {result.last_analysis_stats?.malicious || 0} / {" "}
                  {Object.values(result.last_analysis_stats || {}).reduce((a, b) => Number(a) + Number(b), 0)}
                </span>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
} 