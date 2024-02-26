import { serve } from "@hono/node-server";
import { Hono } from "hono";
import { env, initDB, productRepo } from "@cybercart/core";
const app = new Hono();
import { z } from 'zod'

const createProductSchema = z.object({
  name: z.string().min(1),
  description: z.string().min(1),
  image: z.string().optional(),
  type: z.union([z.literal("files"), z.literal("videos")]),
  about: z.string().optional(),
  price: z.number().min(1),
})

async function main() {
  await initDB();

  // TODO: authorize user and attach user id to req
  app.post('/api/v1/products', async (c) => {
    // validation
    const body = await c.req.json()
    console.log("body:", body)
    const parseResult = createProductSchema.safeParse(body)
    if(!parseResult.success) {
      console.log(parseResult.error)
      return c.json({
        message: "Invalid body"
      }, 422)
    }

    const newProduct = parseResult.data
    try {
      const result = await productRepo.create({
        ...newProduct,
        userId: 1,
      })
      return c.json(result)
    } catch(err) {
      console.log("create product:", err)
      return c.json({
        message: "Internal server error"
      }, 500)
    }
  })

  serve({
    fetch: app.fetch,
    port: env.PORT,
  });
}

main();
