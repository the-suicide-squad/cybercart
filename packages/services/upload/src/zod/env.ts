import z from "zod";

export const envSchema = z.object({
  BUCKET_NAME: z.string(),
  ACCESS_ID: z.string(),
  SECRET_KEY: z.string(),
  REGION: z.string(),
  PORT: z
    .string()
    .transform((val) => parseInt(val, 10))
    .pipe(z.number()),
});
export type EnvSchema = z.infer<typeof envSchema>;
