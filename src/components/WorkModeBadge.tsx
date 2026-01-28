import { cn } from "@/lib/utils";

type WorkMode = "Onsite" | "Hybrid" | "Remote";

interface WorkModeBadgeProps {
  mode: WorkMode;
  className?: string;
  variant?: "default" | "hero";
}

const modeStyles: Record<WorkMode, string> = {
  Onsite: "bg-muted text-muted-foreground",
  Hybrid: "bg-secondary/15 text-secondary",
  Remote: "bg-primary/10 text-primary",
};

export function WorkModeBadge({ mode, className, variant = "default" }: WorkModeBadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-md px-2 py-0.5 text-xs font-medium",
        variant === "hero" 
          ? "bg-white/20 text-white backdrop-blur-sm border border-white/30" 
          : modeStyles[mode],
        className
      )}
    >
      {mode}
    </span>
  );
}
