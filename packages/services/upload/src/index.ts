import { serve } from "@hono/node-server";
import { Hono } from "hono";
import { env } from "./lib/utils";
import { HTTPException } from "hono/http-exception";
import { presignedUrlRouter } from "./routes/signedUrlRouter";
import { cors } from "hono/cors";

const app = new Hono();

async function main() {
  app.use(
    "*",
    cors({
      origin: "*",
      allowHeaders: ["Content-Type"],
      exposeHeaders: [
        "Access-Control-Allow-Origin",
        "Access-Control-Allow-Methods",
        "Access-Control-Allow-Headers",
      ],

      allowMethods: ["GET", "PUT", "POST", "OPTION"],
      maxAge: 24 * 60 * 60,
    })
  );
  app.get("/", (c) => {
    return c.text("hello world");
  });
  app.route("/presignedUrlList", presignedUrlRouter);

  console.log(`Server is running on port ${env.PORT}`);
  app.onError((err, c) => {
    console.log(err.message);
    if (err instanceof HTTPException) {
      return c.json({ error: err.message }, err.status);
    }
    return c.json({ error: "internal server error" }, 500);
  });
  serve({
    fetch: app.fetch,
    port: env.PORT,
  });
}

main();
