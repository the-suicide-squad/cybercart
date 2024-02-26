export type User = {
  username: string
  avatar: string
}

export type ProductCard = {
  name: string
  id: number
  status: "unpublished" | "published"
  stats: {
    sales: number,
    revenue: number
  }
}

export type CreateProduct = {
  name: string
  description: string
  image: string
  type: ProductType
  about: string
  price: number
}

export type ProductType = "files" | "videos"

export type SetState<T> = React.Dispatch<React.SetStateAction<T>>
