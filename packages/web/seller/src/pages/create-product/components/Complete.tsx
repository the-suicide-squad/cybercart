import { PartyPopper } from 'lucide-react'

export function Complete() {
  function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    alert("make the product")
  }

  return (
    <form onSubmit={onSubmit} className="p-4 flex-1 flex items-center justify-center">
      <button className="bg-brand text-white px-4 py-1.5 rounded-lg flex gap-2 items-center">
        <PartyPopper strokeWidth={1} />
        <span className="relative top-[2px]">Complete</span>
      </button>
    </form>
  )
}
