"use client"

import * as React from "react"
import * as ProgressPrimitive from "@radix-ui/react-progress"

import { cn } from "@/lib/utils"

type ProgressProps = React.ComponentPropsWithoutRef<typeof ProgressPrimitive.Root> & {
  glow?: boolean;
  value: number;
}

const Progress = React.forwardRef<
  React.ElementRef<typeof ProgressPrimitive.Root>,
  ProgressProps
>(({ className, value, glow = false, ...props }, ref) => (
  <ProgressPrimitive.Root
    ref={ref}
    className={cn(
      "relative h-4 w-full overflow-hidden rounded-full bg-gray-200 transition-shadow duration-500 ease-in-out",
      glow && "shadow-[0_0_20px_5px_rgba(34,197,94,0.5)]"
    )}
    {...props}
  >
    <ProgressPrimitive.Indicator
      className="h-full bg-gradient-to-r from-green-600 to-brand-accent transition-all duration-500 ease-in-out"
      style={{ transform: `translateX(-${100 - value}%)` }}
    />
  </ProgressPrimitive.Root>
))

Progress.displayName = ProgressPrimitive.Root.displayName

export { Progress }