import { cn } from "@/lib/utils";

interface SalaryBadgeProps {
  salary: string;
  className?: string;
}

export function SalaryBadge({ salary, className }: SalaryBadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-md bg-highlight/15 px-2 py-0.5 text-xs font-medium text-highlight-foreground",
        className
      )}
    >
      {salary}
    </span>
  );
}
