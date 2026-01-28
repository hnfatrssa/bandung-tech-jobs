import { cn } from "@/lib/utils";

type Category = "Engineering" | "Design" | "Product" | "Data" | "QA" | "Platform";

interface RoleTagProps {
  category: Category;
  className?: string;
}

const categoryStyles: Record<Category, string> = {
  Engineering: "bg-primary/10 text-primary",
  Design: "bg-secondary/15 text-secondary",
  Product: "bg-muted text-muted-foreground",
  Data: "bg-primary/10 text-primary",
  QA: "bg-muted text-muted-foreground",
  Platform: "bg-secondary/15 text-secondary",
};

export function RoleTag({ category, className }: RoleTagProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-md px-2 py-0.5 text-xs font-medium",
        categoryStyles[category],
        className
      )}
    >
      {category}
    </span>
  );
}
