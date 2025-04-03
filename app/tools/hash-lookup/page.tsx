import { HashLookup } from "@/components/hash-lookup";

export default function HashLookupPage() {
  return (
    <div className="flex flex-col gap-8 items-center min-h-[calc(70vh-4rem)]">
      <div className="flex flex-col gap-4 items-center">
        <h1 className="text-3xl font-bold">File Hash Lookup</h1>
        <p className="text-muted-foreground text-center max-w-2xl">
          Enter a file hash (SHA-256, SHA-1, or MD5) to retrieve detailed information about the file from VirusTotal's database.
        </p>
      </div>
      <HashLookup />
    </div>
  );
} 