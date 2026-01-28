import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
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
    <div className="overflow-hidden rounded-xl border bg-company-card shadow-sm">
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className="flex w-full items-start justify-between gap-4 p-5 text-left transition-colors hover:bg-muted/50"
      >
        <div className="flex-1 space-y-2">
          <div className="flex items-start gap-3">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary">
              <Building2 className="h-5 w-5" />
            </div>
            <div className="space-y-1">
              <h3 className="font-semibold leading-tight">{company.name}</h3>
              <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-sm text-muted-foreground">
                <span className="flex items-center gap-1">
                  <MapPin className="h-3.5 w-3.5" />
                  {company.location}
                </span>
                <span className="hidden sm:inline">•</span>
                <span>{company.type}</span>
              </div>
              {company.description && (
                <p className="text-sm text-muted-foreground line-clamp-2 pt-1">
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
              "h-5 w-5 text-muted-foreground transition-transform duration-200",
              isExpanded && "rotate-180"
            )}
          />
        </div>
      </button>

      <AnimatePresence initial={false}>
        {isExpanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2, ease: "easeInOut" }}
          >
            <div className="border-t bg-muted/30 p-4">
              <div className="space-y-2">
                {company.roles.map((role) => (
                  <RoleItem key={role.id} role={role} companyId={company.id} />
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
