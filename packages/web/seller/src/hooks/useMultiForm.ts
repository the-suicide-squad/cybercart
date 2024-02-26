import { useState } from 'react'
import { z } from 'zod'
import { useZodForm } from './useZodForm'

export type Step = {
  steps: {
    unlocked: boolean
    form: ReturnType<typeof useZodForm> | null
  }[]
  current: number
}

export function useMultiForm() {
  const [state, setState] = useState<Step>({
    current: 0,
    steps: [
      { unlocked: true, form: useZodForm({ schema: basicInfoSchema }) },
      { unlocked: false, form: useZodForm({ schema: aboutPricingSchema }) },
      { unlocked: false, form: null },
    ]
  })

  function moveToStep(step: number) {
    const isValid = validateStep(state.current)
    if (isValid) {
      setState(prev => ({ ...prev, current: step }))
    }
  }

  function validateStep(step: number) {
    const stepToValidate = state.steps.find((_, i) => i === step)
    if (stepToValidate?.form) {
      stepToValidate.form.trigger()
      console.log("step:", step, stepToValidate.form.formState)
      return stepToValidate.form.formState.isValid
    }
    return true // NOTE: third step is placeholder for now
  }

  function nextStep() {
    setState(prev => ({
      ...prev,
      current: prev.current + 1,
      steps: prev.steps.map((step, i) => i === prev.current + 1 ? { ...step, unlocked: true } : step)
    }))
  }

  return {
    moveToStep,
    nextStep,
    state,
  }
}


export const basicInfoSchema = z.object({
  name: z.string().min(1, {
    message: "Required"
  }),
  description: z.string().min(1, {
    message: "Required"
  }),
  image: z.string().optional(),
  type: z.union([z.literal("files"), z.literal("videos")])
})


export const aboutPricingSchema = z.object({
  about: z.string(),
  price: z.coerce.number().min(1, {
    message: "Enter a valid price"
  })
})
