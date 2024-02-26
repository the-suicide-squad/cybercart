import { ComponentProps, forwardRef } from "react"
import { FormField, FormFieldProps } from "./FormField"
import { cn } from "../lib/utils"

interface Props extends FormFieldProps, ComponentProps<'textarea'> {
  name: string
  fieldClass?: string
}

export const Textarea = forwardRef<HTMLTextAreaElement, Props>((props, ref) => {
  const { name, fieldWrapperClass, fieldClass = "", ...restProps } = props
  return (
    <FormField {...props}>
      <textarea {...restProps} ref={ref} className={cn("bg-bg border border-border py-1.5 px-2 rounded-lg", fieldClass)} id={name} name={name} />
    </FormField>
  )
})
