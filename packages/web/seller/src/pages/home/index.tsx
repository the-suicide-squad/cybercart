import { Product as TProduct } from '../../types'
import { Header } from "./components/Header"
import { Product } from "./components/Product"

const user = {
  username: "Heisen Burger",
  avatar: "https://avatars.githubusercontent.com/u/156156831?v=4"
}

const products: Array<TProduct> = [
  { id: 1, name: "HTMX & Go", status: "published", stats: { sales: 69, revenue: 420 } },
  { id: 2, name: "Developer Productivity", status: "published", stats: { sales: 69, revenue: 420 } },
  { id: 3, name: "The Last Algorithm You'll ever need", status: "unpublished", stats: { sales: 69, revenue: 420 } },
  { id: 4, name: "Vim: The Holy Grail", status: "unpublished", stats: { sales: 69, revenue: 420 } },
  { id: 5, name: "Rust and Haskell: A tale of danger", status: "published", stats: { sales: 69, revenue: 420 } },
]

export function HomePage() {
  return (
    <div>
      <Header user={user} />

      <div className="flex">
        <button className="bg-brand text-white px-3 py-1 mt-4 ml-auto mr-8 rounded-lg">
          + Create Product
        </button>
      </div>

      <div className="px-8">
        <h1 className="pb-4 font-semibold text-2xl">Your Products</h1>
        <div className="cards">
          {products.map(product => {
            return (
              <Product key={product.id} product={product} />
            )
          })}
        </div>
      </div>
    </div>
  )
}
