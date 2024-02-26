import { PartyPopper } from 'lucide-react'
import { Button } from '../../../components/Button'
import { CreateProduct } from '../../../types'

type Props = {
  product: CreateProduct
}

export function Complete(props: Props) {
  const { product } = props

  function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    console.log("product:", product)
  }

  return (
    <form onSubmit={onSubmit} className="p-4 flex-1 flex items-center justify-center">
      <Button>
        <PartyPopper strokeWidth={1} />
        <span className="relative top-[2px]">Complete</span>
      </Button>
    </form>
  )
}
