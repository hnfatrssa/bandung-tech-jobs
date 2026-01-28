import { Button } from "@/components/ui/button";
import { categories, workModes, companyTypes } from "@/lib/data";
import { cn } from "@/lib/utils";

interface FilterBarProps {
  selectedCategory: string | null;
  selectedWorkMode: string | null;
  selectedCompanyType: string | null;
  onCategoryChange: (category: string | null) => void;
  onWorkModeChange: (mode: string | null) => void;
  onCompanyTypeChange: (type: string | null) => void;
}

export function FilterBar({
  selectedCategory,
  selectedWorkMode,
  selectedCompanyType,
  onCategoryChange,
  onWorkModeChange,
  onCompanyTypeChange,
}: FilterBarProps) {
  const hasActiveFilters = selectedCategory || selectedWorkMode || selectedCompanyType;

  return (
    <div className="space-y-4">
      {/* Role Categories */}
      <div className="space-y-2">
        <span className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
          Role
        </span>
        <div className="flex flex-wrap gap-2">
          {categories.map((category) => (
            <Button
              key={category}
              variant="outline"
              size="sm"
              onClick={() =>
                onCategoryChange(selectedCategory === category ? null : category)
              }
              className={cn(
                "h-8 rounded-full text-xs transition-all duration-micro ease-calm",
                selectedCategory === category &&
                  "border-secondary bg-secondary text-secondary-foreground hover:bg-secondary/90 hover:text-secondary-foreground"
              )}
            >
              {category}
            </Button>
          ))}
        </div>
      </div>

      {/* Work Mode */}
      <div className="space-y-2">
        <span className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
          Work Mode
        </span>
        <div className="flex flex-wrap gap-2">
          {workModes.map((mode) => (
            <Button
              key={mode}
              variant="outline"
              size="sm"
              onClick={() =>
                onWorkModeChange(selectedWorkMode === mode ? null : mode)
              }
              className={cn(
                "h-8 rounded-full text-xs transition-all duration-micro ease-calm",
                selectedWorkMode === mode &&
                  "border-secondary bg-secondary text-secondary-foreground hover:bg-secondary/90 hover:text-secondary-foreground"
              )}
            >
              {mode}
            </Button>
          ))}
        </div>
      </div>

      {/* Company Type */}
      <div className="space-y-2">
        <span className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
          Company
        </span>
        <div className="flex flex-wrap gap-2">
          {companyTypes.map((type) => (
            <Button
              key={type}
              variant="outline"
              size="sm"
              onClick={() =>
                onCompanyTypeChange(selectedCompanyType === type ? null : type)
              }
              className={cn(
                "h-8 rounded-full text-xs transition-all duration-micro ease-calm",
                selectedCompanyType === type &&
                  "border-secondary bg-secondary text-secondary-foreground hover:bg-secondary/90 hover:text-secondary-foreground"
              )}
            >
              {type}
            </Button>
          ))}
        </div>
      </div>

      {/* Clear filters */}
      {hasActiveFilters && (
        <Button
          variant="ghost"
          size="sm"
          onClick={() => {
            onCategoryChange(null);
            onWorkModeChange(null);
            onCompanyTypeChange(null);
          }}
          className="text-xs text-muted-foreground transition-colors duration-micro ease-calm hover:text-foreground"
        >
          Clear all filters
        </Button>
      )}
    </div>
  );
}
