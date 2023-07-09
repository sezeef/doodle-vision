"use client";

import * as React from "react";
import * as SliderPrimitive from "@radix-ui/react-slider";

import { cn } from "@/lib/utils";

const VerticalSlider = React.forwardRef<
  React.ElementRef<typeof SliderPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof SliderPrimitive.Root>
>(({ className, ...props }, ref) => (
  <SliderPrimitive.Root
    ref={ref}
    orientation="vertical"
    className={cn(
      "relative flex h-full w-full touch-none select-none flex-col items-center",
      className
    )}
    {...props}
  >
    <SliderPrimitive.Track className="relative h-full w-2 grow overflow-hidden rounded-full bg-sky-100 dark:bg-sky-800">
      <SliderPrimitive.Range className="absolute w-full bg-sky-900 dark:bg-sky-50" />
    </SliderPrimitive.Track>
    <SliderPrimitive.Thumb className="block h-5 w-5 rounded-full border-2 border-sky-900 bg-white ring-offset-white transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-400 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 dark:border-sky-50 dark:bg-sky-950 dark:ring-offset-sky-950 dark:focus-visible:ring-sky-800" />
  </SliderPrimitive.Root>
));
VerticalSlider.displayName = SliderPrimitive.Root.displayName;

export { VerticalSlider };
