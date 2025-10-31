"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { orpcClient } from "@/lib/orpc/client";

export default function FileUploadPage() {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [result, setResult] = useState<string>("");
  const [resultType, setResultType] = useState<"success" | "error" | null>(
    null,
  );
  const [loading, setLoading] = useState(false);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setSelectedFile(file);
      setResult("");
      setResultType(null);
    }
  };

  const handleUpload = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedFile) return;

    setLoading(true);
    setResult("");
    setResultType(null);

    try {
      const response = await orpcClient.fileUpload({
        file: selectedFile,
      });
      setResult(
        `File uploaded successfully: ${response.fileName} (${(response.fileSize / 1024).toFixed(1)} KB, ${response.fileType})`,
      );
      setResultType("success");
    } catch (error: unknown) {
      console.error("File upload error:", error);

      if (error && typeof error === "object" && "data" in error) {
        setResult(
          `Upload Error: ${JSON.stringify((error as { data: unknown }).data, null, 2)}`,
        );
        setResultType("error");
      } else {
        setResult(
          `Error: ${error instanceof Error ? error.message : String(error)}`,
        );
        setResultType("error");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen justify-center lg:justify-start">
      <div className="max-w-5xl px-4 lg:px-16 py-32">
        <div className="flex flex-col gap-6 items-start text-left mb-10">
          <h1 className="max-w-xs text-3xl font-semibold leading-10 tracking-tight text-black dark:text-zinc-50">
            File Upload
          </h1>
          <p className="max-w-md text-lg leading-8 text-zinc-600 dark:text-zinc-400">
            Test file upload functionality with ORPC. Upload images (JPEG, PNG,
            GIF) or PDF files up to 5MB.
          </p>
        </div>

        <Card className="max-w-md">
          <CardHeader>
            <CardTitle>File Upload</CardTitle>
            <CardDescription>
              Select and upload a file. Supported formats: JPEG, PNG, GIF, PDF.
              Maximum size: 5MB.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleUpload} className="space-y-4">
              <div className="space-y-2">
                <Input
                  type="file"
                  accept=".jpg,.jpeg,.png,.gif,.pdf"
                  onChange={handleFileChange}
                />
                {selectedFile && (
                  <p className="text-sm text-muted-foreground">
                    Selected: {selectedFile.name} (
                    {(selectedFile.size / 1024).toFixed(1)} KB)
                  </p>
                )}
              </div>
              <Button type="submit" disabled={loading || !selectedFile}>
                {loading ? "Uploading..." : "Upload File"}
              </Button>
              {result && resultType && (
                <div className="text-sm">
                  {resultType === "success" ? (
                    <div className="text-green-600 dark:text-green-400">
                      <p className="mb-2 font-medium">Success</p>
                      <p>{result}</p>
                    </div>
                  ) : (
                    <div className="text-red-600 dark:text-red-400">
                      <p className="mb-2 font-medium">Upload Error</p>
                      <pre className="overflow-auto p-3 border border-red-200 dark:border-red-800 rounded bg-red-50 dark:bg-red-950/20 text-xs">
                        {result}
                      </pre>
                    </div>
                  )}
                </div>
              )}
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
