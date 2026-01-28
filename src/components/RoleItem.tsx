import { Link } from "react-router-dom";
import { ChevronRight, Clock } from "lucide-react";
import { Role } from "@/lib/data";
import { RoleTag } from "./RoleTag";
import { WorkModeBadge } from "./WorkModeBadge";
import { SalaryBadge } from "./SalaryBadge";
import { SkillTag } from "./SkillTag";
import { formatDistanceToNow } from "date-fns";

interface RoleItemProps {
  role: Role;
  companyId: string;
}

export function RoleItem({ role, companyId }: RoleItemProps) {
  const lastUpdatedText = formatDistanceToNow(new Date(role.lastUpdated), { addSuffix: true });

  return (
    <Link
      to={`/company/${companyId}/role/${role.id}`}
      className="group flex items-center justify-between gap-4 rounded-lg bg-role-item p-4 transition-all duration-micro ease-calm hover:bg-muted hover:shadow-[0_1px_4px_-1px_hsl(var(--foreground)/0.06)]"
    >
      <div className="flex flex-1 flex-col gap-2 sm:flex-row sm:items-center sm:gap-4">
        <div className="flex-1 space-y-1.5">
          <div className="flex items-center gap-2">
            <h4 className="font-medium transition-colors duration-micro ease-calm group-hover:text-primary">
              {role.title}
            </h4>
            <span className="hidden items-center gap-1 text-xs text-muted-foreground sm:flex">
              <Clock className="h-3 w-3" />
              {lastUpdatedText}
            </span>
          </div>
          {role.skills.length > 0 && (
            <div className="flex flex-wrap gap-1">
              {role.skills.slice(0, 3).map((skill) => (
                <SkillTag key={skill} skill={skill} />
              ))}
              {role.skills.length > 3 && (
                <span className="text-xs text-muted-foreground">+{role.skills.length - 3}</span>
              )}
            </div>
          )}
        </div>
        <div className="flex flex-wrap items-center gap-2">
          <RoleTag category={role.category} />
          <WorkModeBadge mode={role.workMode} />
          {role.salary && <SalaryBadge salary={role.salary} />}
        </div>
      </div>
      <ChevronRight className="h-4 w-4 text-muted-foreground transition-all duration-micro ease-calm group-hover:translate-x-0.5 group-hover:text-primary" />
    </Link>
  );
}
