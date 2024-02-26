import { PropsWithChildren } from "react"
import { cn } from "../lib/utils"

export interface FormFieldProps extends PropsWithChildren {
  label: string
  error?: string
  name: string
  fieldWrapperClass?: string
}

export function FormField(props: FormFieldProps) {
  const { label, error, name, children, fieldWrapperClass = "" } = props
  return (
    <div className={cn("flex flex-col gap-2", fieldWrapperClass)}>
      <label htmlFor={name}>{label}</label>
      {children}
      {error && <p className="text-sm text-red-500">{error}</p>}
    </div>
  )
}
