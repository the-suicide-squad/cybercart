import z from "zod";
export const envSchema = z.object({
  DATABASE_HOST: z.string().min(1),
  DATABASE_PORT: z
    .string()
    .transform((val) => parseInt(val, 10))
    .pipe(z.number()),
  DATABASE_USER: z.string().min(1),
  DATABASE_PASSWORD: z.string().min(1),
  DATABASE_NAME: z.string().min(1),
  PORT: z
    .string()
    .transform((val) => parseInt(val, 10))
    .pipe(z.number()),
});
export type EnvSchema = z.infer<typeof envSchema>;
