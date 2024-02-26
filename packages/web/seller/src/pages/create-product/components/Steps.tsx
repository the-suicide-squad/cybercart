import { Step } from "../../../hooks/useMultiForm"
import { cn } from "../../../lib/utils"

type Props = {
  step: Step
  moveToStep: (step: number) => void
}

const steps = [
  { text: "Basic Info" },
  { text: "About & Pricing" },
  { text: "Complete" },
]

export function Steps(props: Props) {
  const { step, moveToStep } = props
  return (
    <div className="min-w-[200px] border-r border-border p-4 flex flex-col gap-6">
      {steps.map((item, i) => {
        const currentStep = step.steps.find((_, idx) => i === idx)
        return (
          <button disabled={!currentStep?.unlocked} key={item.text} onClick={() => {
            // TODO: validate current step
            moveToStep(i)
          }} className="flex gap-2 items-center disabled:text-dim disabled:cursor-not-allowed">
            <span className={cn("border border-border rounded-full w-7 h-7 text-sm flex items-center justify-center", {
              "bg-brand text-white border-brand": step.current === i
            })}>{i+1}</span>
            <span>{item.text}</span>
          </button>
        )
      })}
    </div>
  )
}

