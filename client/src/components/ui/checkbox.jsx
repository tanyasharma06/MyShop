import * as React from "react"
import * as CheckboxPrimitive from "@radix-ui/react-checkbox"
import { CheckIcon } from "lucide-react"

function Checkbox({ className = "", ...props }) {
  return (
    <CheckboxPrimitive.Root
      className={
        "h-4 w-4 shrink-0 rounded-sm border border-gray-400 bg-white dark:bg-gray-700 text-white data-[state=checked]:bg-blue-600 data-[state=checked]:text-white " +
        className
      }
      {...props}
    >
      <CheckboxPrimitive.Indicator className="flex items-center justify-center text-current">
        <CheckIcon className="w-3.5 h-3.5" />
      </CheckboxPrimitive.Indicator>
    </CheckboxPrimitive.Root>
  )
}

export { Checkbox }
