import { useState } from "react";
import { ChevronDown, MapPin, Building2 } from "lucide-react";
import { Company } from "@/lib/data";
import { RoleItem } from "./RoleItem";
import { cn } from "@/lib/utils";

interface CompanyCardProps {
  company: Company;
  defaultExpanded?: boolean;
}

export function CompanyCard({ company, defaultExpanded = false }: CompanyCardProps) {
  const [isExpanded, setIsExpanded] = useState(defaultExpanded);

  return (
    <div className="overflow-hidden rounded-xl border bg-company-card hover-elevate hover-border-accent press-effect">
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className="flex w-full items-start justify-between gap-4 p-5 text-left transition-colors duration-micro ease-calm hover:bg-muted/40"
      >
        <div className="flex-1 space-y-2">
          <div className="flex items-start gap-3">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary">
              <Building2 className="h-5 w-5" />
            </div>
            <div className="space-y-1">
              <h3 className="font-semibold leading-tight">{company.name}</h3>
              {company.description && (
                <p className="text-sm text-muted-foreground line-clamp-2">
                  {company.description}
                </p>
              )}
            </div>
          </div>
        </div>
        <div className="flex shrink-0 items-center gap-3 pt-1">
          <span className="hidden rounded-full bg-secondary/15 px-2.5 py-1 text-xs font-medium text-secondary sm:inline">
            {company.roles.length} {company.roles.length === 1 ? "role" : "roles"}
          </span>
          <span className="rounded-full bg-secondary/15 px-2.5 py-1 text-xs font-medium text-secondary sm:hidden">
            {company.roles.length}
          </span>
          <ChevronDown
            className={cn(
              "h-5 w-5 text-muted-foreground transition-transform duration-expand ease-calm",
              isExpanded && "rotate-180"
            )}
          />
        </div>
      </button>

      {/* Expand/collapse with calm animation - entire group as one unit */}
      <div
        className={cn(
          "grid transition-[grid-template-rows] duration-expand ease-calm",
          isExpanded ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
        )}
      >
        <div className="overflow-hidden">
          <div
            className={cn(
              "border-t bg-muted/30 p-4 transition-opacity duration-expand ease-calm",
              isExpanded ? "opacity-100" : "opacity-0"
            )}
          >
            <div className="space-y-2">
              {company.roles.map((role, index) => (
                <div
                  key={role.id}
                  className="animate-slide-in"
                  style={{ animationDelay: `${index * 40}ms` }}
                >
                  <RoleItem role={role} companyId={company.id} />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
