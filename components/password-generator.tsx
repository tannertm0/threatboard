"use client";

import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Slider } from "@/components/ui/slider";
import { useState, useEffect } from "react";
import { CopyButton } from "@/components/ui/copy-button";

export function PasswordGenerator() {
  const [length, setLength] = useState(12);
  const [includeUppercase, setIncludeUppercase] = useState(true);
  const [includeLowercase, setIncludeLowercase] = useState(true);
  const [includeNumbers, setIncludeNumbers] = useState(true);
  const [includeSpecial, setIncludeSpecial] = useState(true);
  const [password, setPassword] = useState("");
  const [timeToCrack, setTimeToCrack] = useState("");

  const calculateTimeToCrack = () => {
    // Calculate character set size
    let charsetSize = 0;
    if (includeUppercase) charsetSize += 26;
    if (includeLowercase) charsetSize += 26;
    if (includeNumbers) charsetSize += 10;
    if (includeSpecial) charsetSize += 32;

    // If no character types are selected, use all
    if (!charsetSize) {
      charsetSize = 94; // 26 + 26 + 10 + 32
    }

    // Assuming 1 billion attempts per second (conservative estimate)
    const attemptsPerSecond = 1000000000;
    const totalCombinations = Math.pow(charsetSize, length);
    const secondsToCrack = totalCombinations / attemptsPerSecond;
    const yearsToCrack = secondsToCrack / (365 * 24 * 60 * 60);

    if (yearsToCrack >= 1000000000) {
      return "More than 1 billion years";
    } else if (yearsToCrack >= 1000000) {
      return `${Math.round(yearsToCrack / 1000000)} million years`;
    } else if (yearsToCrack >= 1000) {
      return `${Math.round(yearsToCrack / 1000)} thousand years`;
    } else {
      return `${Math.round(yearsToCrack)} years`;
    }
  };

  const generatePassword = () => {
    const uppercase = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    const lowercase = "abcdefghijklmnopqrstuvwxyz";
    const numbers = "0123456789";
    const special = "!@#$%^&*()_+-=[]{}|;:,.<>?";

    let chars = "";
    if (includeUppercase) chars += uppercase;
    if (includeLowercase) chars += lowercase;
    if (includeNumbers) chars += numbers;
    if (includeSpecial) chars += special;

    // If no character types are selected, use all
    if (!chars) {
      chars = uppercase + lowercase + numbers + special;
    }

    let generatedPassword = "";
    for (let i = 0; i < length; i++) {
      const randomIndex = Math.floor(Math.random() * chars.length);
      generatedPassword += chars[randomIndex];
    }

    setPassword(generatedPassword);
    setTimeToCrack(calculateTimeToCrack());
  };

  useEffect(() => {
    generatePassword();
  }, [length, includeUppercase, includeLowercase, includeNumbers, includeSpecial]);

  return (
    <div className="w-full max-w-md space-y-4 p-6">
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <label className="text-sm font-medium">Password Length: {length}</label>
          <CopyButton value={password} size="icon" className="h-8 w-8" />
        </div>
        <Slider
          value={[length]}
          onValueChange={(value: number[]) => setLength(value[0])}
          min={6}
          max={20}
          step={1}
          className="w-full"
        />
      </div>

      <div className="space-y-4">
        <div className="flex items-center space-x-2">
          <Checkbox
            id="uppercase"
            checked={includeUppercase}
            onCheckedChange={(checked) => setIncludeUppercase(checked as boolean)}
          />
          <label
            htmlFor="uppercase"
            className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
          >
            Include Uppercase Letters
          </label>
        </div>

        <div className="flex items-center space-x-2">
          <Checkbox
            id="lowercase"
            checked={includeLowercase}
            onCheckedChange={(checked) => setIncludeLowercase(checked as boolean)}
          />
          <label
            htmlFor="lowercase"
            className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
          >
            Include Lowercase Letters
          </label>
        </div>

        <div className="flex items-center space-x-2">
          <Checkbox
            id="numbers"
            checked={includeNumbers}
            onCheckedChange={(checked) => setIncludeNumbers(checked as boolean)}
          />
          <label
            htmlFor="numbers"
            className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
          >
            Include Numbers
          </label>
        </div>

        <div className="flex items-center space-x-2">
          <Checkbox
            id="special"
            checked={includeSpecial}
            onCheckedChange={(checked) => setIncludeSpecial(checked as boolean)}
          />
          <label
            htmlFor="special"
            className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
          >
            Include Special Characters
          </label>
        </div>
      </div>

      <div className="space-y-2">
        <div className="rounded-md border p-4">
          <div className="font-mono text-lg">{password}</div>
        </div>
        <div className="text-sm text-muted-foreground text-center">
          Estimated time to crack: <span className="font-medium">{timeToCrack}</span>
        </div>
      </div>
    </div>
  );
} 