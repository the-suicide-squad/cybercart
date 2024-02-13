import { ZodError } from "zod";
import { EnvSchema, envSchema } from "../zod/env";
import dotenv from "dotenv";

function parseEnvVars(): EnvSchema {
  let data!: EnvSchema;
  dotenv.config();
  try {
    data = envSchema.parse(process.env);
  } catch (err) {
    if (err instanceof ZodError) {
      console.log("envs are not getting loaded");
      console.log(err.errors.flat());
      process.exit(1);
    }
  }
  return data;
}

export const env = parseEnvVars();
