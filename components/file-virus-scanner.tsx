"use client";

import { Button } from "@/components/ui/button";
import { useState } from "react";
import { Upload, Loader2 } from "lucide-react";

export function FileVirusScanner() {
  const [file, setFile] = useState<File | null>(null);
  const [scanning, setScanning] = useState(false);
  const [result, setResult] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile) {
      setFile(selectedFile);
      setError(null);
    }
  };

  const verifyApiKey = async () => {
    try {
      const response = await fetch(
        "https://www.virustotal.com/api/v3/users/current",
        {
          headers: {
            accept: "application/json",
            "x-apikey": "4cb0347cc5554fd22e3d43d3391a3ebd0ca5b4d4b4596ac11432eda294e95e6a",
          },
        }
      );

      if (!response.ok) {
        const errorText = await response.text();
        console.error("API Key Verification Response:", errorText);
        throw new Error("Invalid API key or API access issue");
      }

      return true;
    } catch (err) {
      console.error("API Key Verification Error:", err);
      return false;
    }
  };

  const scanFile = async () => {
    if (!file) return;

    setScanning(true);
    setError(null);

    try {
      // Verify API key first
      const isApiKeyValid = await verifyApiKey();
      if (!isApiKeyValid) {
        throw new Error("API key verification failed. Please check your API key.");
      }

      // First, get the upload URL for large files
      const uploadUrlResponse = await fetch(
        "https://www.virustotal.com/api/v3/files/upload_url",
        {
          method: "GET",
          headers: {
            accept: "application/json",
            "x-apikey": "4cb0347cc5554fd22e3d43d3391a3ebd0ca5b4d4b4596ac11432eda294e95e6a",
          },
        }
      );

      if (!uploadUrlResponse.ok) {
        const errorText = await uploadUrlResponse.text();
        console.error("Upload URL Response:", errorText);
        throw new Error(`Failed to get upload URL: ${uploadUrlResponse.status} ${uploadUrlResponse.statusText}`);
      }

      const uploadUrlData = await uploadUrlResponse.json();
      console.log("Raw Upload URL Response:", uploadUrlData);

      // Handle the response structure where data is a direct string URL
      const uploadUrl = uploadUrlData.data;
      
      if (!uploadUrl || typeof uploadUrl !== 'string') {
        console.error("Invalid upload URL response structure:", JSON.stringify(uploadUrlData, null, 2));
        throw new Error("Invalid upload URL response: No valid URL found in response");
      }

      console.log("Final upload URL:", uploadUrl);

      // Upload the file
      const formData = new FormData();
      formData.append("file", file);

      console.log("Uploading file to URL:", uploadUrl);
      const uploadResponse = await fetch(uploadUrl, {
        method: "POST",
        headers: {
          "x-apikey": "4cb0347cc5554fd22e3d43d3391a3ebd0ca5b4d4b4596ac11432eda294e95e6a",
        },
        body: formData,
      });

      if (!uploadResponse.ok) {
        const errorText = await uploadResponse.text();
        console.error("Upload Response:", errorText);
        throw new Error(`Failed to upload file: ${uploadResponse.status} ${uploadResponse.statusText}`);
      }

      const uploadResult = await uploadResponse.json();

      if (!uploadResult.data?.id) {
        throw new Error("Invalid upload result");
      }

      // Get the analysis ID
      const analysisId = uploadResult.data.id;

      // Poll for results
      let analysisResult;
      let attempts = 0;
      const maxAttempts = 30; // 30 seconds timeout

      while (attempts < maxAttempts) {
        const resultResponse = await fetch(
          `https://www.virustotal.com/api/v3/analyses/${analysisId}`,
          {
            headers: {
              accept: "application/json",
              "x-apikey": "4cb0347cc5554fd22e3d43d3391a3ebd0ca5b4d4b4596ac11432eda294e95e6a",
            },
          }
        );

        if (!resultResponse.ok) {
          const errorText = await resultResponse.text();
          console.error("Analysis Response:", errorText);
          throw new Error(`Failed to get analysis: ${resultResponse.status} ${resultResponse.statusText}`);
        }

        analysisResult = await resultResponse.json();

        if (analysisResult.data?.attributes?.status === "completed") {
          break;
        }

        await new Promise((resolve) => setTimeout(resolve, 1000));
        attempts++;
      }

      if (!analysisResult?.data?.attributes) {
        throw new Error("Invalid analysis result");
      }

      setResult(analysisResult);
    } catch (err) {
      console.error("Scan error:", err);
      setError(err instanceof Error ? err.message : "An error occurred while scanning the file");
    } finally {
      setScanning(false);
    }
  };

  return (
    <div className="w-full max-w-2xl space-y-6 p-6">
      <div className="space-y-4">
        <div className="flex items-center justify-center w-full">
          <label
            htmlFor="dropzone-file"
            className="flex flex-col items-center justify-center w-full h-64 border-2 border-dashed rounded-lg cursor-pointer bg-background hover:bg-accent/50"
          >
            <div className="flex flex-col items-center justify-center pt-5 pb-6">
              <Upload className="w-10 h-10 mb-2 text-muted-foreground" />
              <p className="mb-2 text-sm text-muted-foreground">
                <span className="font-semibold">Click to upload</span> or drag and drop
              </p>
              <p className="text-xs text-muted-foreground">
                Any file up to 650MB
              </p>
            </div>
            <input
              id="dropzone-file"
              type="file"
              className="hidden"
              onChange={handleFileChange}
              accept="*/*"
            />
          </label>
        </div>

        {file && (
          <div className="text-sm text-muted-foreground text-center">
            Selected file: {file.name}
          </div>
        )}

        <div className="flex justify-center">
          <Button
            onClick={scanFile}
            disabled={!file || scanning}
            className="w-48"
          >
            {scanning ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Scanning...
              </>
            ) : (
              "Scan File"
            )}
          </Button>
        </div>
      </div>

      {error && (
        <div className="p-4 text-sm text-destructive bg-destructive/10 rounded-md">
          {error}
        </div>
      )}

      {result && (
        <div className="space-y-4">
          <h3 className="text-lg font-semibold">Scan Results</h3>
          <div className="rounded-md border p-4 space-y-2">
            <div className="flex justify-between">
              <span className="text-sm text-muted-foreground">Status:</span>
              <span className="font-medium">
                {result.data.attributes.status}
              </span>
            </div>
            {result.data.attributes.stats && (
              <div className="grid grid-cols-2 gap-4 mt-4">
                <div className="text-center p-2 bg-muted rounded">
                  <div className="text-sm text-muted-foreground">Malicious</div>
                  <div className="text-lg font-bold text-destructive">
                    {result.data.attributes.stats.malicious}
                  </div>
                </div>
                <div className="text-center p-2 bg-muted rounded">
                  <div className="text-sm text-muted-foreground">Clean</div>
                  <div className="text-lg font-bold text-green-600">
                    {result.data.attributes.stats.undetected}
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
} 