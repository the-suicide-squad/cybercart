import { db } from ".."
import { products } from '../schema'

export const productRepo = {
  // TODO: how to share types
  async create(product: any) {
    const error = new Error("failed to create product")
    try {
      const res = await db.insert(products).values(product).returning({
        id: products.id,
      })
      if(res.length !== 1) {
        throw error
      }
      return res[0]
    } catch(err) {
      console.log("repo: product: create:", err)
      throw error
    }
  }
}
