import { Link, createLazyFileRoute } from '@tanstack/react-router';
import { Product as TProduct } from '../types'
import { Product } from '../pages/home/components/Product';

export const Route = createLazyFileRoute('/')({
  component: HomePage,
})

const products: Array<TProduct> = [
  { id: 1, name: "HTMX & Go", status: "published", stats: { sales: 69, revenue: 420 } },
  { id: 2, name: "Developer Productivity", status: "published", stats: { sales: 69, revenue: 420 } },
  { id: 3, name: "The Last Algorithm You'll ever need", status: "unpublished", stats: { sales: 69, revenue: 420 } },
  { id: 4, name: "Vim: The Holy Grail", status: "unpublished", stats: { sales: 69, revenue: 420 } },
  { id: 5, name: "Rust and Haskell: A tale of danger", status: "published", stats: { sales: 69, revenue: 420 } },
]

function HomePage() {
  return (
    <div>
      <div className="flex">
        <Link to="/create" className="bg-brand text-white px-3 py-1 mt-4 ml-auto mr-8 rounded-lg">
          + Create Product
        </Link>
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
