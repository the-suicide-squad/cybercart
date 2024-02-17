import { cn } from "../../../lib/utils"
import { SetState  } from "../../../types"

type Props = {
  step: number
  setStep: SetState<number>
}
const steps = [
  { text: "Basic Info" },
  { text: "About & Pricing" },
  { text: "Complete" },
]

export function Steps(props: Props) {
  const { step, setStep } = props
  return (
    <div className="min-w-[200px] border-r border-border p-4 flex flex-col gap-6">
      {steps.map((item, i) => {
        return (
          <button key={item.text} onClick={() => setStep(i+1)} className="flex gap-2 items-center">
            <span className={cn("border border-border rounded-full w-7 h-7 text-sm flex items-center justify-center", {
              "bg-brand text-white border-brand": step === i + 1
            })}>{i+1}</span>
            <span>{item.text}</span>
          </button>
        )
      })}
    </div>
  )
}

