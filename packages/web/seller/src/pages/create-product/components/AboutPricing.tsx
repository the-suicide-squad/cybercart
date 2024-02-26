import { Input } from "../../../components/Input";
import { Textarea } from "../../../components/Textarea";
import { z } from 'zod'
import { useZodFormReturn } from "../../../hooks/useZodForm";
import { SubmitHandler } from "react-hook-form";
import { Button } from "../../../components/Button";
import { ArrowRight } from "lucide-react";
import { CreateProduct } from "../../../types";
import { aboutPricingSchema } from "../../../hooks/useMultiForm";

type Props = {
  nextStep: (step: number) => void
  form: useZodFormReturn<typeof aboutPricingSchema>
  updateProduct: (product: Partial<CreateProduct>) => void
}

export function AboutPricing(props: Props) {
  const { nextStep: unlockStep, updateProduct, form } = props
  const { handleSubmit, formState, register } = form

  const onSubmit: SubmitHandler<z.infer<typeof aboutPricingSchema>> = (data) => {
    updateProduct(data)
    unlockStep(3)
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="p-4 flex-1 flex flex-col justify-between">
      <Textarea 
        error={formState.errors.about?.message}
        fieldWrapperClass="flex-1 mb-5"
        fieldClass="h-full"
        label="About"
        placeholder="Enter about your product (markdown supported)"
        {...register("about")}
      />
      <Input 
        error={formState.errors.price?.message}
        label="Price"
        type="number"
        placeholder="Enter product price"
        {...register("price")}
      />
      <Button className="inline-flex self-end mt-8">
        <span>Next</span>
        <ArrowRight strokeWidth={1.5} />
      </Button>
    </form>
  )
}
