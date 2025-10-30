import { oc } from "@orpc/contract";
import { z } from "zod";

// File upload contract

export const fileUpload = oc
  .route({ method: "POST", path: "/file-upload" })
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
        ),
    }),
  )
  .output(
    z.object({
      message: z.string(),
      success: z.boolean(),
      fileName: z.string(),
      fileSize: z.number(),
      fileType: z.string(),
    }),
  );

export const contracts = { fileUpload };
