import { useMemo } from "react";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { categories, workModes, companyTypes, companies, type Role } from "@/lib/data";
import { cn } from "@/lib/utils";
import { ChevronDown, X } from "lucide-react";

interface FilterBarProps {
  selectedCategories: string[];
  selectedWorkModes: string[];
  selectedCompanyTypes: string[];
  salaryRange: [number, number];
  onCategoriesChange: (categories: string[]) => void;
  onWorkModesChange: (modes: string[]) => void;
  onCompanyTypesChange: (types: string[]) => void;
  onSalaryRangeChange: (range: [number, number]) => void;
}

// Parse salary string like "IDR 18-25 jt/bulan" to get min value in millions
function parseSalaryMin(salary: string | undefined): number | null {
  if (!salary) return null;
  const match = salary.match(/(\d+)-(\d+)/);
  if (match) return parseInt(match[1], 10);
  return null;
}

function parseSalaryMax(salary: string | undefined): number | null {
  if (!salary) return null;
  const match = salary.match(/(\d+)-(\d+)/);
  if (match) return parseInt(match[2], 10);
  return null;
}

// Get all roles for counting
function getAllRoles(): Role[] {
  return companies.flatMap(company => company.roles);
}

export function FilterBar({
  selectedCategories,
  selectedWorkModes,
  selectedCompanyTypes,
  salaryRange,
  onCategoriesChange,
  onWorkModesChange,
  onCompanyTypesChange,
  onSalaryRangeChange,
}: FilterBarProps) {
  const allRoles = useMemo(() => getAllRoles(), []);

  // Count roles per filter option (considering other active filters)
  const categoryCounts = useMemo(() => {
    const counts: Record<string, number> = {};
    categories.forEach(cat => {
      counts[cat] = allRoles.filter(role => {
        if (selectedWorkModes.length > 0 && !selectedWorkModes.includes(role.workMode)) return false;
        if (selectedCompanyTypes.length > 0) {
          const company = companies.find(c => c.roles.some(r => r.id === role.id));
          if (company && !selectedCompanyTypes.includes(company.type)) return false;
        }
        const salaryMin = parseSalaryMin(role.salary);
        if (salaryMin !== null && (salaryMin < salaryRange[0] || salaryMin > salaryRange[1])) return false;
        return role.category === cat;
      }).length;
    });
    return counts;
  }, [allRoles, selectedWorkModes, selectedCompanyTypes, salaryRange]);

  const workModeCounts = useMemo(() => {
    const counts: Record<string, number> = {};
    workModes.forEach(mode => {
      counts[mode] = allRoles.filter(role => {
        if (selectedCategories.length > 0 && !selectedCategories.includes(role.category)) return false;
        if (selectedCompanyTypes.length > 0) {
          const company = companies.find(c => c.roles.some(r => r.id === role.id));
          if (company && !selectedCompanyTypes.includes(company.type)) return false;
        }
        const salaryMin = parseSalaryMin(role.salary);
        if (salaryMin !== null && (salaryMin < salaryRange[0] || salaryMin > salaryRange[1])) return false;
        return role.workMode === mode;
      }).length;
    });
    return counts;
  }, [allRoles, selectedCategories, selectedCompanyTypes, salaryRange]);

  const companyTypeCounts = useMemo(() => {
    const counts: Record<string, number> = {};
    companyTypes.forEach(type => {
      const companyIds = companies.filter(c => c.type === type).map(c => c.id);
      counts[type] = allRoles.filter(role => {
        const company = companies.find(c => c.roles.some(r => r.id === role.id));
        if (!company || !companyIds.includes(company.id)) return false;
        if (selectedCategories.length > 0 && !selectedCategories.includes(role.category)) return false;
        if (selectedWorkModes.length > 0 && !selectedWorkModes.includes(role.workMode)) return false;
        const salaryMin = parseSalaryMin(role.salary);
        if (salaryMin !== null && (salaryMin < salaryRange[0] || salaryMin > salaryRange[1])) return false;
        return true;
      }).length;
    });
    return counts;
  }, [allRoles, selectedCategories, selectedWorkModes, salaryRange]);

  const toggleCategory = (category: string) => {
    if (selectedCategories.includes(category)) {
      onCategoriesChange(selectedCategories.filter(c => c !== category));
    } else {
      onCategoriesChange([...selectedCategories, category]);
    }
  };

  const toggleWorkMode = (mode: string) => {
    if (selectedWorkModes.includes(mode)) {
      onWorkModesChange(selectedWorkModes.filter(m => m !== mode));
    } else {
      onWorkModesChange([...selectedWorkModes, mode]);
    }
  };

  const toggleCompanyType = (type: string) => {
    if (selectedCompanyTypes.includes(type)) {
      onCompanyTypesChange(selectedCompanyTypes.filter(t => t !== type));
    } else {
      onCompanyTypesChange([...selectedCompanyTypes, type]);
    }
  };

  const hasActiveFilters = 
    selectedCategories.length > 0 || 
    selectedWorkModes.length > 0 || 
    selectedCompanyTypes.length > 0 ||
    salaryRange[0] > 5 || salaryRange[1] < 40;

  const activeFilterCount = 
    selectedCategories.length + 
    selectedWorkModes.length + 
    selectedCompanyTypes.length +
    (salaryRange[0] > 5 || salaryRange[1] < 40 ? 1 : 0);

  return (
    <div className="space-y-4">
      {/* Active filter chips */}
      {hasActiveFilters && (
        <div className="flex flex-wrap gap-1.5 pb-2 border-b">
          {selectedCategories.map(cat => (
            <button
              key={cat}
              onClick={() => toggleCategory(cat)}
              className="inline-flex items-center gap-1 rounded-full bg-primary/10 px-2.5 py-1 text-xs font-medium text-primary hover:bg-primary/20 transition-colors"
            >
              {cat}
              <X className="h-3 w-3" />
            </button>
          ))}
          {selectedWorkModes.map(mode => (
            <button
              key={mode}
              onClick={() => toggleWorkMode(mode)}
              className="inline-flex items-center gap-1 rounded-full bg-secondary/10 px-2.5 py-1 text-xs font-medium text-secondary hover:bg-secondary/20 transition-colors"
            >
              {mode}
              <X className="h-3 w-3" />
            </button>
          ))}
          {selectedCompanyTypes.map(type => (
            <button
              key={type}
              onClick={() => toggleCompanyType(type)}
              className="inline-flex items-center gap-1 rounded-full bg-muted px-2.5 py-1 text-xs font-medium text-muted-foreground hover:bg-muted/80 transition-colors"
            >
              {type}
              <X className="h-3 w-3" />
            </button>
          ))}
          {(salaryRange[0] > 5 || salaryRange[1] < 40) && (
            <button
              onClick={() => onSalaryRangeChange([5, 40])}
              className="inline-flex items-center gap-1 rounded-full bg-highlight/15 px-2.5 py-1 text-xs font-medium text-highlight-foreground hover:bg-highlight/25 transition-colors"
            >
              {salaryRange[0]}-{salaryRange[1]} jt
              <X className="h-3 w-3" />
            </button>
          )}
        </div>
      )}

      {/* Role Categories */}
      <Collapsible defaultOpen>
        <CollapsibleTrigger className="flex w-full items-center justify-between py-1 text-xs font-medium uppercase tracking-wide text-muted-foreground hover:text-foreground transition-colors">
          <span>Role {selectedCategories.length > 0 && `(${selectedCategories.length})`}</span>
          <ChevronDown className="h-3.5 w-3.5 transition-transform duration-200 [[data-state=open]>&]:rotate-180" />
        </CollapsibleTrigger>
        <CollapsibleContent className="pt-2">
          <div className="flex flex-wrap gap-2">
            {categories.map((category) => (
              <Button
                key={category}
                variant="outline"
                size="sm"
                onClick={() => toggleCategory(category)}
                className={cn(
                  "h-8 rounded-full text-xs transition-all duration-150",
                  selectedCategories.includes(category)
                    ? "border-primary bg-primary text-primary-foreground hover:bg-primary/90 hover:text-primary-foreground"
                    : "hover:border-primary/50",
                  categoryCounts[category] === 0 && "opacity-50"
                )}
              >
                {category}
                <span className={cn(
                  "ml-1.5 text-[10px]",
                  selectedCategories.includes(category) ? "text-primary-foreground/70" : "text-muted-foreground"
                )}>
                  {categoryCounts[category]}
                </span>
              </Button>
            ))}
          </div>
        </CollapsibleContent>
      </Collapsible>

      {/* Work Mode */}
      <Collapsible defaultOpen>
        <CollapsibleTrigger className="flex w-full items-center justify-between py-1 text-xs font-medium uppercase tracking-wide text-muted-foreground hover:text-foreground transition-colors">
          <span>Work Mode {selectedWorkModes.length > 0 && `(${selectedWorkModes.length})`}</span>
          <ChevronDown className="h-3.5 w-3.5 transition-transform duration-200 [[data-state=open]>&]:rotate-180" />
        </CollapsibleTrigger>
        <CollapsibleContent className="pt-2">
          <div className="flex flex-wrap gap-2">
            {workModes.map((mode) => (
              <Button
                key={mode}
                variant="outline"
                size="sm"
                onClick={() => toggleWorkMode(mode)}
                className={cn(
                  "h-8 rounded-full text-xs transition-all duration-150",
                  selectedWorkModes.includes(mode)
                    ? "border-secondary bg-secondary text-secondary-foreground hover:bg-secondary/90 hover:text-secondary-foreground"
                    : "hover:border-secondary/50",
                  workModeCounts[mode] === 0 && "opacity-50"
                )}
              >
                {mode}
                <span className={cn(
                  "ml-1.5 text-[10px]",
                  selectedWorkModes.includes(mode) ? "text-secondary-foreground/70" : "text-muted-foreground"
                )}>
                  {workModeCounts[mode]}
                </span>
              </Button>
            ))}
          </div>
        </CollapsibleContent>
      </Collapsible>

      {/* Company Type */}
      <Collapsible defaultOpen>
        <CollapsibleTrigger className="flex w-full items-center justify-between py-1 text-xs font-medium uppercase tracking-wide text-muted-foreground hover:text-foreground transition-colors">
          <span>Company {selectedCompanyTypes.length > 0 && `(${selectedCompanyTypes.length})`}</span>
          <ChevronDown className="h-3.5 w-3.5 transition-transform duration-200 [[data-state=open]>&]:rotate-180" />
        </CollapsibleTrigger>
        <CollapsibleContent className="pt-2">
          <div className="flex flex-wrap gap-2">
            {companyTypes.map((type) => (
              <Button
                key={type}
                variant="outline"
                size="sm"
                onClick={() => toggleCompanyType(type)}
                className={cn(
                  "h-8 rounded-full text-xs transition-all duration-150",
                  selectedCompanyTypes.includes(type)
                    ? "border-foreground bg-foreground text-background hover:bg-foreground/90 hover:text-background"
                    : "hover:border-foreground/30",
                  companyTypeCounts[type] === 0 && "opacity-50"
                )}
              >
                {type}
                <span className={cn(
                  "ml-1.5 text-[10px]",
                  selectedCompanyTypes.includes(type) ? "text-background/70" : "text-muted-foreground"
                )}>
                  {companyTypeCounts[type]}
                </span>
              </Button>
            ))}
          </div>
        </CollapsibleContent>
      </Collapsible>

      {/* Salary Range */}
      <Collapsible defaultOpen>
        <CollapsibleTrigger className="flex w-full items-center justify-between py-1 text-xs font-medium uppercase tracking-wide text-muted-foreground hover:text-foreground transition-colors">
          <span>Salary Range</span>
          <ChevronDown className="h-3.5 w-3.5 transition-transform duration-200 [[data-state=open]>&]:rotate-180" />
        </CollapsibleTrigger>
        <CollapsibleContent className="pt-3">
          <div className="space-y-3">
            <Slider
              value={salaryRange}
              min={5}
              max={40}
              step={1}
              onValueChange={(value) => onSalaryRangeChange(value as [number, number])}
              className="w-full"
            />
            <div className="flex items-center justify-between text-xs text-muted-foreground">
              <span>IDR {salaryRange[0]} jt</span>
              <span>IDR {salaryRange[1]} jt/bulan</span>
            </div>
          </div>
        </CollapsibleContent>
      </Collapsible>

      {/* Clear filters */}
      {hasActiveFilters && (
        <Button
          variant="ghost"
          size="sm"
          onClick={() => {
            onCategoriesChange([]);
            onWorkModesChange([]);
            onCompanyTypesChange([]);
            onSalaryRangeChange([5, 40]);
          }}
          className="w-full text-xs text-muted-foreground transition-colors duration-150 hover:text-foreground"
        >
          Clear all filters ({activeFilterCount})
        </Button>
      )}
    </div>
  );
}
