import { oc } from "@orpc/contract";
import { z } from "zod";

// File upload contract

export const fileUpload = oc
  .route({ method: "POST", path: "/file-upload" })
  .meta({
    description:
      "Uploads a file to the server. Supports JPEG, PNG, GIF, and PDF files up to 5MB in size. Returns file metadata upon successful upload.",
    summary: "Upload a file",
  })
  .input(
    z.object({
      file: z
        .instanceof(File)
        .refine(
          (file) => file.size <= 5 * 1024 * 1024, // 5MB max
          "File size must be less than 5MB",
        )
        .refine(
          (file) =>
            [
              "image/jpeg",
              "image/png",
              "image/gif",
              "application/pdf",
            ].includes(file.type),
          "File must be JPEG, PNG, GIF, or PDF",
        )
        .describe("The file to upload (JPEG, PNG, GIF, or PDF, max 5MB)"),
    }),
  )
  .output(
    z.object({
      message: z.string().describe("Response message"),
      success: z.boolean().describe("Whether the upload was successful"),
      fileName: z.string().describe("Original filename"),
      fileSize: z.number().describe("File size in bytes"),
      fileType: z.string().describe("MIME type of the uploaded file"),
    }),
  );

export const contracts = { fileUpload };
