import { Link } from "react-router-dom";
import { ChevronRight } from "lucide-react";
import { Role } from "@/lib/data";
import { RoleTag } from "./RoleTag";
import { WorkModeBadge } from "./WorkModeBadge";
import { SalaryBadge } from "./SalaryBadge";

interface RoleItemProps {
  role: Role;
  companyId: string;
}

export function RoleItem({ role, companyId }: RoleItemProps) {
  return (
    <Link
      to={`/company/${companyId}/role/${role.id}`}
      className="group flex items-center justify-between gap-4 rounded-lg bg-role-item p-4 transition-colors hover:bg-muted"
    >
      <div className="flex flex-1 flex-col gap-2 sm:flex-row sm:items-center sm:gap-4">
        <div className="flex-1">
          <h4 className="font-medium group-hover:text-primary">{role.title}</h4>
        </div>
        <div className="flex flex-wrap items-center gap-2">
          <RoleTag category={role.category} />
          <WorkModeBadge mode={role.workMode} />
          {role.salary && <SalaryBadge salary={role.salary} />}
        </div>
      </div>
      <ChevronRight className="h-4 w-4 text-muted-foreground transition-transform group-hover:translate-x-1 group-hover:text-primary" />
    </Link>
  );
}
