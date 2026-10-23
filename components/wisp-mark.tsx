import { cn } from "@/lib/utils";

export function WispMark({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 40 40" fill="none" aria-hidden="true" className={cn("size-9", className)}>
      <path d="M7 14c5-8 9 8 15 0s11-4 9 0M6 21c6-8 10 8 16 0s11-4 9 0M9 28c5-7 9 6 14 0s8-4 8-2" stroke="currentColor" strokeWidth="2.8" strokeLinecap="round" />
    </svg>
  );
}
