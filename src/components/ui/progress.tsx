import * as React from "react"
import * as ProgressPrimitive from "@radix-ui/react-progress"

import { cn } from "@/lib/utils"

const Progress = React.forwardRef<
  React.ElementRef<typeof ProgressPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof ProgressPrimitive.Root>
>(({ className, value, ...props }, ref) => (
  <ProgressPrimitive.Root
    ref={ref}
    className={cn(
      "tailwind.config.jsrelative tailwind.config.jsh-4 tailwind.config.jsw-full tailwind.config.jsoverflow-hidden tailwind.config.jsrounded-full tailwind.config.jsbg-secondary",
      className
    )}
    {...props}
  >
    <ProgressPrimitive.Indicator
      className="tailwind.config.jsh-full tailwind.config.jsw-full tailwind.config.jsflex-1 tailwind.config.jsbg-primary tailwind.config.jstransition-all"
      style={{ transform: `translateX(-${100 - (value || 0)}%)` }}
    />
  </ProgressPrimitive.Root>
))
Progress.displayName = ProgressPrimitive.Root.displayName

export { Progress }
