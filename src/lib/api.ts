import { supabase } from "@/integrations/supabase/client";

export interface Role {
  id: string;
  title: string;
  workMode: "Onsite" | "Hybrid" | "Remote";
  salary?: string;
  category: "Engineering" | "Design" | "Product" | "Data" | "QA" | "Platform";
  skills: string[];
  summary: string;
  responsibilities: string[];
  requirements: string[];
  applyUrl: string;
  lastUpdated: string;
}

export interface Company {
  id: string;
  name: string;
  location: string;
  description?: string;
  type: "Startup" | "Agency" | "Software House" | "Enterprise";
  roles: Role[];
}

interface DbCompany {
  id: string;
  slug: string;
  name: string;
  location: string;
  description: string | null;
  type: string;
}

interface DbRole {
  id: string;
  company_id: string;
  slug: string;
  title: string;
  work_mode: string;
  salary: string | null;
  category: string;
  skills: string[];
  summary: string;
  responsibilities: string[];
  requirements: string[];
  apply_url: string;
  last_updated: string;
}

function transformRole(dbRole: DbRole): Role {
  return {
    id: dbRole.slug,
    title: dbRole.title,
    workMode: dbRole.work_mode as Role["workMode"],
    salary: dbRole.salary || undefined,
    category: dbRole.category as Role["category"],
    skills: dbRole.skills,
    summary: dbRole.summary,
    responsibilities: dbRole.responsibilities,
    requirements: dbRole.requirements,
    applyUrl: dbRole.apply_url,
    lastUpdated: dbRole.last_updated,
  };
}

function transformCompany(dbCompany: DbCompany, roles: DbRole[]): Company {
  return {
    id: dbCompany.slug,
    name: dbCompany.name,
    location: dbCompany.location,
    description: dbCompany.description || undefined,
    type: dbCompany.type as Company["type"],
    roles: roles.map(transformRole),
  };
}

export async function fetchCompanies(): Promise<Company[]> {
  try {
    const [companiesRes, rolesRes] = await Promise.all([
      supabase.from("companies").select("*").order("name"),
      supabase.from("roles").select("*").order("last_updated", { ascending: false }),
    ]);

    const { data: companiesData, error: companiesError } = companiesRes;
    const { data: rolesData, error: rolesError } = rolesRes;

    if (companiesError) throw companiesError;
    if (rolesError) throw rolesError;

    // Group roles by company
    const rolesByCompany = (rolesData as DbRole[]).reduce((acc, role) => {
      if (!acc[role.company_id]) {
        acc[role.company_id] = [];
      }
      acc[role.company_id].push(role);
      return acc;
    }, {} as Record<string, DbRole[]>);

    // Transform and filter companies that have roles
    return (companiesData as DbCompany[])
      .map((company) => transformCompany(company, rolesByCompany[company.id] || []))
      .filter((company) => company.roles.length > 0);
  } catch (err) {
    console.error("Error fetching companies/roles:", err);
    throw err;
  }
}

export async function fetchCompanyBySlug(slug: string): Promise<Company | null> {
  try {
    const { data: companyData, error: companyError } = await supabase
      .from("companies")
      .select("*")
      .eq("slug", slug)
      .maybeSingle();

    if (companyError || !companyData) {
      console.error("Error fetching company:", companyError);
      return null;
    }

    const { data: rolesData, error: rolesError } = await supabase
      .from("roles")
      .select("*")
      .eq("company_id", companyData.id)
      .order("last_updated", { ascending: false });

    if (rolesError) {
      console.error("Error fetching roles:", rolesError);
      return null;
    }

    return transformCompany(companyData as DbCompany, rolesData as DbRole[]);
  } catch (err) {
    console.error("Error fetching company by slug:", err);
    return null;
  }
}

export async function fetchRoleBySlug(companySlug: string, roleSlug: string): Promise<{ company: Company; role: Role } | null> {
  try {
    const { data: companyData, error: companyError } = await supabase
      .from("companies")
      .select("*")
      .eq("slug", companySlug)
      .maybeSingle();

    if (companyError || !companyData) {
      console.error("Error fetching company:", companyError);
      return null;
    }

    const { data: roleData, error: roleError } = await supabase
      .from("roles")
      .select("*")
      .eq("company_id", companyData.id)
      .eq("slug", roleSlug)
      .maybeSingle();

    if (roleError || !roleData) {
      console.error("Error fetching role:", roleError);
      return null;
    }

    return {
      company: transformCompany(companyData as DbCompany, [roleData as DbRole]),
      role: transformRole(roleData as DbRole),
    };
  } catch (err) {
    console.error("Error fetching role by slug:", err);
    return null;
  }
}

// Extract all unique skills from roles
export async function fetchAllSkills(): Promise<string[]> {
  try {
    const { data, error } = await supabase.from("roles").select("skills");

    if (error) {
      console.error("Error fetching skills:", error);
      throw error;
    }

    const allSkills = new Set<string>();
    (data as { skills: string[] }[]).forEach((role) => {
      role.skills.forEach((skill) => allSkills.add(skill));
    });

    return Array.from(allSkills).sort();
  } catch (err) {
    console.error("Error fetching skills:", err);
    throw err;
  }
}

export const categories = ["Engineering", "Design", "Product", "Data", "QA", "Platform"] as const;
export const workModes = ["Onsite", "Hybrid", "Remote"] as const;
export const companyTypes = ["Startup", "Agency", "Software House", "Enterprise"] as const;
