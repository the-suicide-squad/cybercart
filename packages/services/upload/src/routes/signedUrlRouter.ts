import { Hono } from "hono";
import {
  multipartUploadBodySchema,
  presignedListBodySchema,
} from "../zod/file";
import { zValidator } from "@hono/zod-validator";
import {
  CompleteMultipartUploadCommand,
  CreateMultipartUploadCommand,
  UploadPartCommand,
} from "@aws-sdk/client-s3";
import { env } from "../lib/utils";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import { s3 } from "../lib/clients";
import { HTTPException } from "hono/http-exception";
export const presignedUrlRouter = new Hono();
const mimeTypeToExtension = {
  "video/mp4": "mp4",
  "application/zip": "zip",
};
presignedUrlRouter.post(
  "/:course-id/:file-id",
  zValidator("json", presignedListBodySchema),
  async (c) => {
    const body = c.req.valid("json");
    const extension = mimeTypeToExtension[body.mimeType];
    const { "course-id": courseId, "file-id": fileId } = c.req.param();
    const name = courseId + "/" + fileId + "." + extension;

    const command = new CreateMultipartUploadCommand({
      Bucket: env.BUCKET_NAME,
      Key: name,
      ContentType: body.mimeType,
    });
    const multipartUpload = await s3.send(command);
    const sizes = body.chunkSizes;
    const promises: Promise<string>[] = [];
    const total = sizes.reduce((sum, value) => {
      return sum + value;
    }, 0);
    if (total > 1024 * 1024 * 1024) {
      throw new HTTPException(500, {
        message: "Content size is greater then 1GB.",
      });
    }
    for (let i = 0; i < sizes.length; i++) {
      const command = new UploadPartCommand({
        Bucket: env.BUCKET_NAME,
        Key: multipartUpload.Key,
        UploadId: multipartUpload.UploadId,
        PartNumber: i + 1,
        ContentLength: sizes[i],
      });
      promises.push(getSignedUrl(s3, command, { expiresIn: 60 * 60 * 3 }));
    }
    const presignedUrls = await Promise.all(promises);
    return c.json({
      signedUrls: presignedUrls,
      fileId: multipartUpload.UploadId,
      fileKey: multipartUpload.Key,
    });
  }
);
presignedUrlRouter.post(
  "/:course-id/:file-id/completed-multipart-upload",
  zValidator("json", multipartUploadBodySchema),
  async (c) => {
    const body = c.req.valid("json");
    const { "course-id": courseId, "file-id": fileId } = c.req.param();
    body.parts.sort((a, b) => a.PartNumber - b.PartNumber);
    const command = new CompleteMultipartUploadCommand({
      Bucket: env.BUCKET_NAME,
      Key: body.fileKey,
      UploadId: body.fileId,
      MultipartUpload: {
        Parts: body.parts,
      },
    });
    await s3.send(command);
    //TODO: Save information into your db that file is uploaded
    return c.text("OK");
  }
);
