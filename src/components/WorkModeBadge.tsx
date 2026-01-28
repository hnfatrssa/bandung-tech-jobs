import { cn } from "@/lib/utils";

type WorkMode = "Onsite" | "Hybrid" | "Remote";

interface WorkModeBadgeProps {
  mode: WorkMode;
  className?: string;
}

const modeStyles: Record<WorkMode, string> = {
  Onsite: "bg-muted text-muted-foreground",
  Hybrid: "bg-secondary/15 text-secondary",
  Remote: "bg-primary/10 text-primary",
};

export function WorkModeBadge({ mode, className }: WorkModeBadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-md px-2 py-0.5 text-xs font-medium",
        modeStyles[mode],
        className
      )}
    >
      {mode}
    </span>
  );
}
