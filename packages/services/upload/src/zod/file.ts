import z from "zod";
export const supportedFileSchema = z.enum(["application/zip", "video/mp4"]);
export const presignedListBodySchema = z.object({
  chunkSizes: z.array(z.number()),
  mimeType: supportedFileSchema,
});
export const multipartUploadBodySchema = z.object({
  fileId: z.string(),
  fileKey: z.string(),
  parts: z.array(z.object({ ETag: z.string(), PartNumber: z.number() })),
});
