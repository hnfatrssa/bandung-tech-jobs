import { cn } from "@/lib/utils";

interface SkillTagProps {
  skill: string;
  className?: string;
  variant?: "default" | "hero";
}

export function SkillTag({ skill, className, variant = "default" }: SkillTagProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-md px-2 py-0.5 text-xs font-medium transition-colors",
        variant === "hero" 
          ? "bg-white/15 text-white/90 backdrop-blur-sm border border-white/20" 
          : "border border-border/50 bg-muted/50 text-muted-foreground",
        className
      )}
    >
      {skill}
    </span>
  );
}
