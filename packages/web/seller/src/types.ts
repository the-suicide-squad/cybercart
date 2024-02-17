export type User = {
  username: string
  avatar: string
}

export type Product = {
  name: string
  id: number
  status: "unpublished" | "published"
  stats: {
    sales: number,
    revenue: number
  }
}

