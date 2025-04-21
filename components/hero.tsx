import Image from "next/image";
import Link from "next/link";

export default function Header() {
  return (
    <div className="flex flex-col gap-16 items-center">
      <div className="w-full flex justify-between items-center px-4 max-w-7xl mx-auto">
        <div className="flex-1"></div>
        <div className="flex justify-center items-center flex-1">
          <Image
            src="/logo.png"
            alt="ThreatBoard Logo"
            width={400}
            height={100}
            priority
            className="dark:invert-0"
          />
        </div>
        <nav className="flex-1 flex justify-end">
          <Link 
            href="/about" 
            className="text-foreground/80 hover:text-foreground font-medium px-3 py-2 rounded-md transition-colors"
          >
            About
          </Link>
        </nav>
      </div>
      <h1 className="sr-only">ThreatBoard - Security Tools Dashboard</h1>
      <p className="text-3xl lg:text-3xl text-bold !leading-tight mx-auto max-w-xl text-center">
        Your All-in-One Security Toolkit
      </p>
      <div className="w-full p-[1px] bg-gradient-to-r from-transparent via-foreground/10 to-transparent my-8" />
    </div>
  );
}
