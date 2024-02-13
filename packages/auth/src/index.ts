import { serve } from "@hono/node-server";
import { Hono } from "hono";
import { env, initDB } from '@untitled/core'

const app = new Hono();

async function main() {
  await initDB();
  app.get("/", (c) => {
    return c.text("Hello Hono!");
  });

  console.log(`Server is running on port ${env.PORT}`);

  serve({
    fetch: app.fetch,
    port: env.PORT,
  });
}

main();
