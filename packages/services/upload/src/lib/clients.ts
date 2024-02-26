import { S3Client } from "@aws-sdk/client-s3";
import { env } from "./utils";
export const s3 = new S3Client({
  credentials: {
    accessKeyId: env.ACCESS_ID,
    secretAccessKey: env.SECRET_KEY,
  },
  region: env.REGION,
});
