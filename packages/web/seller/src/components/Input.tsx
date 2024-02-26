import { ComponentProps, forwardRef } from "react"
import { FormField, FormFieldProps } from "./FormField"
import { cn } from "../lib/utils"

interface Props extends FormFieldProps, ComponentProps<'input'> {
  name: string
  fieldClass?: string
}

export const Input = forwardRef<HTMLInputElement, Props>((props, ref) => {
  const { name, fieldWrapperClass, fieldClass = "", ...restProps } = props
  return (
    <FormField {...props}>
      <input {...restProps} ref={ref} className={cn("bg-bg border border-border py-1.5 px-2 rounded-lg", fieldClass)} id={name} name={name} />
    </FormField>
  )
})
