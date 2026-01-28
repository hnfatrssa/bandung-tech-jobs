import { cn } from "@/lib/utils";

interface SalaryBadgeProps {
  salary: string;
  className?: string;
  variant?: "default" | "hero";
}

export function SalaryBadge({ salary, className, variant = "default" }: SalaryBadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-md px-2 py-0.5 text-xs font-medium",
        variant === "hero" 
          ? "bg-white/20 text-white backdrop-blur-sm border border-white/30" 
          : "bg-highlight/15 text-highlight-foreground dark:text-highlight",
        className
      )}
    >
      {salary}
    </span>
  );
}
