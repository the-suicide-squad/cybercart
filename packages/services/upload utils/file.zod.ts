import z from "zod";
export const supportedFileSchema = z.enum(["application/zip", "video/mp4"]);
export const presignedUrlSchema = z.object({
  signedUrls: z.array(z.string()),
  fileId: z.string(),
  fileKey: z.string(),
});
export type presignedUrlResponseType = z.infer<typeof presignedUrlSchema>;
