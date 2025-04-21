import Hero from "@/components/hero";
import { Shield, Key, Search, Database, AlertCircle } from "lucide-react";
import Link from "next/link";
import { CyberBackground } from "@/components/cyber-background";

export default async function Home() {
  return (
    <>
      <CyberBackground />
      <Hero />
      <main className="flex-1 flex flex-col gap-12 px-4 max-w-6xl mx-auto w-full pb-16">
        <section className="space-y-6">
          <div className="text-center mb-8">
            <Link 
              href="/about"
              className="inline-block bg-primary text-primary-foreground hover:bg-primary/90 px-6 py-3 rounded-lg font-medium transition-colors"
            >
              About The Developer
            </Link>
          </div>
          <h2 className="text-2xl font-bold text-center">Free Security Tools</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* Vulnerability Board */}
            <Link 
              href="/board"
              className="group relative overflow-hidden rounded-lg border p-6 hover:border-foreground/50 transition-colors"
            >
              <div className="flex items-center gap-4">
                <div className="p-2 rounded-full bg-purple-100 dark:bg-purple-900/20">
                  <AlertCircle className="h-6 w-6 text-purple-600 dark:text-purple-400" />
                </div>
                <h3 className="font-semibold">Vulnerability Board</h3>
              </div>
              <p className="mt-3 text-muted-foreground">
                Track the latest CVEs and security vulnerabilities from the vulnerability.circl.lu database.
              </p>
            </Link>

            {/* Virus Scanner */}
            <Link 
              href="/tools/virus-scanner"
              className="group relative overflow-hidden rounded-lg border p-6 hover:border-foreground/50 transition-colors"
            >
              <div className="flex items-center gap-4">
                <div className="p-2 rounded-full bg-red-100 dark:bg-red-900/20">
                  <Shield className="h-6 w-6 text-red-600 dark:text-red-400" />
                </div>
                <h3 className="font-semibold">Virus Scanner</h3>
              </div>
              <p className="mt-3 text-muted-foreground">
                Scan files for malware and viruses using VirusTotal's powerful scanning engine.
              </p>
            </Link>

            {/* Password Generator */}
            <Link 
              href="/tools/password-generator"
              className="group relative overflow-hidden rounded-lg border p-6 hover:border-foreground/50 transition-colors"
            >
              <div className="flex items-center gap-4">
                <div className="p-2 rounded-full bg-blue-100 dark:bg-blue-900/20">
                  <Key className="h-6 w-6 text-blue-600 dark:text-blue-400" />
                </div>
                <h3 className="font-semibold">Password Generator</h3>
              </div>
              <p className="mt-3 text-muted-foreground">
                Create strong, secure passwords with our advanced generator.
              </p>
            </Link>

            {/* Hash Lookup */}
            <Link 
              href="/tools/hash-lookup"
              className="group relative overflow-hidden rounded-lg border p-6 hover:border-foreground/50 transition-colors"
            >
              <div className="flex items-center gap-4">
                <div className="p-2 rounded-full bg-green-100 dark:bg-green-900/20">
                  <Search className="h-6 w-6 text-green-600 dark:text-green-400" />
                </div>
                <h3 className="font-semibold">Hash Lookup</h3>
              </div>
              <p className="mt-3 text-muted-foreground">
                Check file reputation by hash. Access VirusTotal's database of known files.
              </p>
            </Link>
          </div>
        </section>

        <section className="space-y-6">
          <h2 className="text-2xl font-bold text-center">Coming Soon</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* More Features */}
            <div className="relative overflow-hidden rounded-lg border p-6 bg-muted/50">
              <div className="flex items-center gap-4">
                <div className="p-2 rounded-full bg-orange-100 dark:bg-orange-900/20">
                  <Shield className="h-6 w-6 text-orange-600 dark:text-orange-400" />
                </div>
                <h3 className="font-semibold">More Security Tools</h3>
              </div>
              <p className="mt-3 text-muted-foreground">
                We're working on additional security tools including network monitoring, log analysis, and port scanning capabilities.
              </p>
              <div className="absolute top-3 right-3">
                <span className="px-2 py-1 text-xs rounded-full bg-orange-100 dark:bg-orange-900/20 text-orange-600 dark:text-orange-400">
                  Coming Soon
                </span>
              </div>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
