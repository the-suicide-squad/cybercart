import { serve } from "@hono/node-server";
import { Hono } from "hono";
import { env } from "../../core/lib/utils";
import { initDB } from "../../core/db";

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
