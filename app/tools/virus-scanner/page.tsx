import { FileVirusScanner } from "@/components/file-virus-scanner";
import { Button } from "@/components/ui/button";
import { Search } from "lucide-react";
import Link from "next/link";

export default function VirusScannerPage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[calc(70vh-4rem)]">
      <div className="w-full max-w-2xl space-y-8">
        <div className="space-y-2 text-center">
          <h1 className="text-3xl font-bold">Virus Scanner</h1>
          <p className="text-muted-foreground">
            Upload a file to scan it for viruses using VirusTotal
          </p>
          <div className="flex justify-center pt-2">
            <Link href="/tools/hash-lookup">
              <Button variant="outline" className="flex items-center gap-2">
                <Search className="h-4 w-4" />
                Check Previously Scanned Files
              </Button>
            </Link>
          </div>
        </div>
        <FileVirusScanner />
      </div>
    </div>
  );
} 