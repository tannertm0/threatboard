import { PasswordGenerator } from "@/components/password-generator";

export default function PasswordGeneratorPage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[calc(70vh-4rem)]">
      <div className="w-full max-w-2xl space-y-8">
        <div className="space-y-2 text-center">
          <h1 className="text-3xl font-bold">Password Generator</h1>
          <p className="text-muted-foreground">
            Generate secure passwords with customizable options
          </p>
        </div>
        <PasswordGenerator />
      </div>
    </div>
  );
} 