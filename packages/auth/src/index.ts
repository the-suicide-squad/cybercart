import { serve } from "@hono/node-server";
import { Hono } from "hono";
import { env, initDB } from "@untitled/core";
import { HTTPException } from "hono/http-exception";
const app = new Hono();

async function main() {
  await initDB();
  app.get("/", (c) => {
    return c.text("hello world");
  });

  console.log(`Server is running on port ${env.PORT}`);
  app.onError((err, c) => {
    if (err instanceof HTTPException) {
      return c.json({ error: err.message }, err.status);
    }
    console.log(err.message);
    return c.json({ error: "internal server error" }, 500);
  });
  serve({
    fetch: app.fetch,
    port: env.PORT,
  });
}

main();
