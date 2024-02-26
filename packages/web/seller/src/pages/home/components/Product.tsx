import { cn } from "../../../lib/utils"
import { ProductCard } from "../../../types"
import { MoreVertical } from 'lucide-react'

type Props = {
  product: ProductCard
}

export function Product(props: Props) {
  const { product } = props
  return (
    <div className="border border-border text-ellipsis rounded-lg">
      <div className="p-4">
        <div className="flex items-center justify-between gap-4">
          <p title={product.name} className="text-ellipsis">{product.name}</p>
          <MoreVertical strokeWidth={1} size={20} />
        </div>
        <p className={cn("mt-2 px-2 py-[2px] text-[12px] inline-block capitalize rounded", {
          "bg-brand/10 text-brand": product.status === "published",
          "bg-red-500/10 text-red-500": product.status === "unpublished",
        })}>{product.status}</p>
      </div>
      <div className="flex items-center justify-between p-4">
        <div className="flex flex-col justify-center items-center">
          <p className="font-semibold">{product.stats.sales}</p>
          <p className="text-dim">Sales</p>
        </div>
        <div className="flex flex-col justify-center items-center">
          <p className="font-semibold">{product.stats.revenue}</p>
          <p className="text-dim text-sm">Revenue</p>
        </div>
      </div>
    </div>
  )
}
