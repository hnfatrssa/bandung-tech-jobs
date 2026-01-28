import { cn } from "@/lib/utils";

interface SkillTagProps {
  skill: string;
  className?: string;
}

export function SkillTag({ skill, className }: SkillTagProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-md border border-border/50 bg-muted/50 px-2 py-0.5 text-xs font-medium text-muted-foreground transition-colors",
        className
      )}
    >
      {skill}
    </span>
  );
}
