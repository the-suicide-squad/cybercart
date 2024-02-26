import { forwardRef, ComponentProps, PropsWithChildren } from "react";
import { cn } from "../lib/utils";

interface Props extends ComponentProps<'button'>, PropsWithChildren {}

export const Button = forwardRef<HTMLButtonElement, Props>((props, ref) => {
  const { className = "" } = props
  return (
    <button {...props} ref={ref} className={cn("bg-brand text-white px-4 py-1.5 rounded-lg flex gap-2 items-center", className)}>
      {props.children}
    </button>
  )
})
