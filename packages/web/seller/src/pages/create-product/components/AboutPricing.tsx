export function AboutPricing() {
  return (
    <form className="p-4 flex-1 flex flex-col justify-between">
      <div className="flex flex-col gap-2 flex-1 mb-5">
        <label htmlFor="about">About</label>
        <textarea id="about" className="bg-bg border border-border py-1.5 px-2 rounded-lg h-full" placeholder="Markdown supported" />
      </div>
      <div className="flex flex-col gap-2">
        <label htmlFor="price">Price</label>
        <input type="number" id="price" autoComplete="off" className="bg-bg border border-border py-1.5 px-2 rounded-lg" placeholder="Enter product price" />
      </div>
    </form>
  )
}
