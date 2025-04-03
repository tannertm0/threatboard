import Image from "next/image";

export default function Header() {
  return (
    <div className="flex flex-col gap-16 items-center">
      <div className="flex justify-center items-center">
        <Image
          src="/logo.png"
          alt="ThreatBoard Logo"
          width={500}
          height={100}
          priority
          className="dark:invert-0"
        />
      </div>
      <h1 className="sr-only">ThreatBoard - Security Tools Dashboard</h1>
      <p className="text-3xl lg:text-3xl text-bold !leading-tight mx-auto max-w-xl text-center">
        Your All-in-One Security Toolkit
      </p>
      <div className="w-full p-[1px] bg-gradient-to-r from-transparent via-foreground/10 to-transparent my-8" />
    </div>
  );
}
