import { supportedFileSchema } from "./file.zod";
import { asyncRetryQueue } from "./utils";
import { presignedUrlSchema } from "./file.zod";
type uploaderType = {
  file: File;
  fileId: string;
  courseId: string;
  //default retry =3
  retry?: number;
  //default concurrency=4
  concurrency?: number;
  //default chunkSizeInMb=20
  chunkSizeInMb?: number;
};
type uploadInfo = {
  fileId: string;
  fileKey: string;
};
type uploaderProgressType = {
  send: number;
  total: number;
};
type progressFnType = (progress: uploaderProgressType) => void;
type errorFnType = (err: Error) => void;
type uploadPartType = {
  PartNumber: number;
  ETag: string;
};

export class UploaderError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "UploadError";
    this.message = message;
  }
}

export class Uploader {
  private concurrency!: number;
  private chunkSizeInByte!: number;
  private file: File;
  private signedUrls: string[] = [];
  private progressInByte = 0;
  private errorFn: errorFnType = () => {};
  private progressFn: progressFnType = () => {};
  private uploadParts: uploadPartType[] = [];
  private uploadInfo: uploadInfo | undefined;
  private connections: (XMLHttpRequest | null)[] = [];
  private retry: number = 0;
  private key!: string;
  constructor({
    file,
    fileId,
    courseId,
    concurrency,
    retry,
    chunkSizeInMb,
  }: uploaderType) {
    if (chunkSizeInMb) {
      if (chunkSizeInMb < 5) {
        throw new UploaderError("chunk size should be greater then 5Mb.");
      }
    }
    this.concurrency = concurrency ?? 4;

    this.chunkSizeInByte = (chunkSizeInMb ?? 20) * 1024 * 1024;
    this.retry = retry ?? 3;
    this.file = file;
    this.signedUrls = [];
    this.progressFn = () => {};
    this.errorFn = () => {};
    this.progressInByte = 0;
    this.uploadParts = [];
    this.connections = [];
    this.key = fileId + "/" + courseId;
  }
  public async start() {
    try {
      const fileType = supportedFileSchema.safeParse(this.file.type);
      if (!fileType.success) {
        throw new UploaderError("File type is not supported");
      }

      if (this.file.size > 1024 * 1024 * 1024) {
        throw new UploaderError("File size is greater then 1GB");
      }
      const chunkSizes: number[] = [];
      let leftFileSize = this.file.size;
      while (true) {
        this.connections.push(null);
        if (this.chunkSizeInByte <= leftFileSize) {
          chunkSizes.push(this.chunkSizeInByte);
        } else {
          chunkSizes.push(leftFileSize);
          break;
        }
        leftFileSize -= this.chunkSizeInByte;
      }
      const response = await fetch(
        `http://localhost:3000/presignedUrlList/${this.key}`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            chunkSizes: chunkSizes,
            mimeType: this.file.type,
          }),
        }
      ).then((data) => data.json());
      const data = presignedUrlSchema.parse(response);
      this.uploadInfo = {
        fileId: data.fileId,
        fileKey: data.fileKey,
      };
      this.signedUrls = data.signedUrls;
      this.startSendingChunks();
    } catch (err) {
      const error = err as Error;
      this.complete(error);
    }
  }
  private async startSendingChunks() {
    if (!this.signedUrls.length) {
      this.complete(new UploaderError("No signed urls"));
    }
    type taskFnType = () => Promise<void>;
    const tasks: taskFnType[] = [];
    for (let i = 0; i < this.signedUrls.length; i++) {
      const task = async () => {
        const signedUrl = this.signedUrls[i];
        if (!signedUrl) throw new UploaderError("Signed url is not present.");
        await this.upload(i + 1, signedUrl);
      };
      tasks.push(task);
    }

    try {
      await asyncRetryQueue(tasks, this.concurrency, this.retry);
      this.complete();
    } catch (err) {
      const error = err as Error;
      this.abort();
      this.complete(error);
    }
  }
  private async handleProgress(bytes: number, operation: "add" | "remove") {
    if (operation === "add") {
      this.progressInByte += bytes;
    } else {
      this.progressInByte -= bytes;
    }
    this.progressFn({ send: this.progressInByte, total: this.file.size });
  }
  private async upload(partNumber: number, signedUrl: string) {
    const sentSize = (partNumber - 1) * this.chunkSizeInByte;
    const chunk = this.file.slice(sentSize, sentSize + this.chunkSizeInByte);

    let previouslyUploaded = 0;
    return new Promise((resolve, reject) => {
      const throwXHRError = (error: Error, abortFx: () => void) => {
        reject(error);
        window.removeEventListener("offline", abortFx);
      };

      if (!window.navigator.onLine) {
        reject(new UploaderError("System is offline"));
      }
      const xhr = new XMLHttpRequest();
      this.connections[partNumber - 1] = xhr;
      // default value of timeout
      xhr.timeout = 0;
      xhr.open("PUT", signedUrl);
      const abortXHR = () => xhr.abort();
      xhr.addEventListener("error", () => {
        this.handleProgress(previouslyUploaded, "remove");
        throwXHRError(new UploaderError("Some Upload error"), abortXHR);
      });

      xhr.addEventListener("timeout", () => {
        this.handleProgress(previouslyUploaded, "remove");
        throwXHRError(new UploaderError("Timeout Error"), abortXHR);
      });
      xhr.addEventListener("abort", (e) => {
        throwXHRError(new UploaderError("Request Aborted"), abortXHR);
      });

      xhr.upload.addEventListener("progress", (e) => {
        const currentByteUploaded = e.loaded - previouslyUploaded;
        this.handleProgress(currentByteUploaded, "add");
        previouslyUploaded = e.loaded;
      });
      xhr.addEventListener("readystatechange", (e) => {
        if (xhr.readyState == 4 && xhr.status === 200) {
          const ETag = xhr.getResponseHeader("ETag");
          if (ETag) {
            this.connections[partNumber - 1] = null;
            const uploadPart = {
              PartNumber: partNumber,
              ETag: ETag,
            };
            this.uploadParts.push(uploadPart);
          }
          resolve(xhr.status);
          window.removeEventListener("offline", abortXHR);
        }
      });

      window.addEventListener("offline", abortXHR);
      xhr.send(chunk);
    });
  }
  private async complete(error?: Error) {
    if (error) {
      this.errorFn(error);
      return;
    }
    if (!this.uploadInfo) {
      this.errorFn(new UploaderError("Upload info is not present."));
      return;
    }

    try {
      await fetch(
        `http://localhost:3000/presignedUrlList/${this.key}/completed-multipart-upload`,
        {
          headers: { "Content-Type": "application/json" },
          method: "POST",
          body: JSON.stringify({ ...this.uploadInfo, parts: this.uploadParts }),
        }
      ).then((res) => {
        if (!res.ok) {
          throw new UploaderError("Cannot upload the file.");
        }
      });
    } catch (err) {
      this.errorFn(new UploaderError("Cannot aggregate part of upload."));
    }
  }
  public onProgress(onProgress: progressFnType) {
    this.progressFn = onProgress;
    return this;
  }
  public onError(onError: errorFnType) {
    this.errorFn = onError;
    return this;
  }

  public reUpload() {
    this.progressInByte = 0;
    this.abort();
    this.connections = [];
    this.signedUrls = [];
    this.uploadInfo = undefined;
    this.uploadParts = [];
    this.start();
  }

  abort() {
    this.connections.forEach((connection) => {
      if (connection) {
        connection.abort();
      }
    });
  }
}
