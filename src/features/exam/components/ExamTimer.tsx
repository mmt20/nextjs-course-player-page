"use client";

import { cn } from "@/lib/utils";
import { formatTime } from "../utils";

interface ExamTimerProps {
  timeRemaining: number;
  className?: string;
}

export function ExamTimer({ timeRemaining, className }: ExamTimerProps) {
  const isLowTime = timeRemaining < 300; // Less than 5 minutes
  const isVeryLowTime = timeRemaining < 60; // Less than 1 minute

  return (
    <div
      className={cn(
        "px-4 py-2 rounded-lg font-bold flex items-center gap-2 transition-all",
        isVeryLowTime
          ? "bg-red-400 text-white animate-pulse"
          : isLowTime
          ? "bg-yellow-400 text-black"
          : "bg-yellow-400 text-black",
        className
      )}
    >
      <span className="text-lg">⏱</span>
      <span className="tabular-nums">{formatTime(timeRemaining)}</span>
    </div>
  );
}
