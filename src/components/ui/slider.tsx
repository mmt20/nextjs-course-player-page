"use client";

import * as React from "react";
import * as SliderPrimitive from "@radix-ui/react-slider";
import { cn } from "@/lib/utils";

interface SliderProps extends React.ComponentPropsWithoutRef<typeof SliderPrimitive.Root> {
  variant?: "video" | "volume";
}

const Slider = React.forwardRef<React.ElementRef<typeof SliderPrimitive.Root>, SliderProps>(
  ({ className, variant = "video", ...props }, ref) => {
    const isVideo = variant === "video";

    return (
      <SliderPrimitive.Root
        ref={ref}
        className={cn(
          "relative flex w-full touch-none select-none items-center",
          isVideo ? "group/slider h-2 cursor-pointer" : "h-6",
          className
        )}
        {...props}
      >
        <SliderPrimitive.Track
          className={cn(
            "relative w-full grow overflow-hidden rounded-full bg-white/30",
            isVideo ? "h-1 group-hover/slider:h-1.5 transition-all" : "h-1"
          )}
        >
          <SliderPrimitive.Range className={cn("absolute h-full", isVideo ? "bg-red-600" : "bg-white")} />
        </SliderPrimitive.Track>
        <SliderPrimitive.Thumb
          className={cn(
            "block rounded-full shadow-lg transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-black disabled:pointer-events-none disabled:opacity-50",
            isVideo
              ? "h-0 w-0 group-hover/slider:h-3 group-hover/slider:w-3 bg-red-600 focus-visible:ring-red-500 focus-visible:h-3 focus-visible:w-3"
              : "h-3 w-3 bg-white hover:scale-110 focus-visible:ring-white"
          )}
        />
      </SliderPrimitive.Root>
    );
  }
);
Slider.displayName = SliderPrimitive.Root.displayName;

export { Slider };
