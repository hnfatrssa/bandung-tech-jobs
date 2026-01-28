import { useParams, Link } from "react-router-dom";
import { ArrowLeft, MapPin, Building2, ExternalLink } from "lucide-react";
import { companies } from "@/lib/data";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { RoleTag } from "@/components/RoleTag";
import { WorkModeBadge } from "@/components/WorkModeBadge";
import { SalaryBadge } from "@/components/SalaryBadge";
import { SkillTag } from "@/components/SkillTag";

const RoleDetail = () => {
  const { companyId, roleId } = useParams();

  const company = companies.find((c) => c.id === companyId);
  const role = company?.roles.find((r) => r.id === roleId);

  if (!company || !role) {
    return (
      <div className="flex min-h-screen flex-col">
        <Header />
        <main className="container flex flex-1 flex-col items-center justify-center py-16">
          <h1 className="mb-4 text-2xl font-semibold">Role not found</h1>
          <p className="mb-6 text-muted-foreground">
            The role you're looking for doesn't exist or has been removed.
          </p>
          <Button asChild>
            <Link to="/">Back to all companies</Link>
          </Button>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="flex min-h-screen flex-col">
      <Header />

      {/* Page content with calm enter animation */}
      <main className="flex-1 animate-page-enter">
        {/* Breadcrumb */}
        <div className="border-b bg-muted/30">
          <div className="container py-4">
            <Link
              to="/"
              className="inline-flex items-center gap-2 text-sm text-muted-foreground transition-colors duration-micro ease-calm hover:text-foreground"
            >
              <ArrowLeft className="h-4 w-4" />
              Back to all companies
            </Link>
          </div>
        </div>

        {/* Role Header */}
        <section className="border-b">
          <div className="container py-8 md:py-12">
            <div className="flex flex-col gap-6 lg:flex-row lg:items-start lg:justify-between">
              <div className="space-y-4">
                <div className="flex flex-wrap items-center gap-2">
                  <RoleTag category={role.category} />
                  <WorkModeBadge mode={role.workMode} />
                  {role.salary && <SalaryBadge salary={role.salary} />}
                </div>

                {role.skills.length > 0 && (
                  <div className="flex flex-wrap gap-1.5">
                    {role.skills.map((skill) => (
                      <SkillTag key={skill} skill={skill} />
                    ))}
                  </div>
                )}

                <h1 className="text-2xl font-bold tracking-tight md:text-3xl">
                  {role.title}
                </h1>

                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 text-primary">
                    <Building2 className="h-5 w-5" />
                  </div>
                  <div>
                    <p className="font-medium">{company.name}</p>
                    <p className="flex items-center gap-1 text-sm text-muted-foreground">
                      <MapPin className="h-3.5 w-3.5" />
                      {company.location}
                    </p>
                  </div>
                </div>
              </div>

              <Button asChild size="lg" className="shrink-0 transition-all duration-micro ease-calm">
                <a
                  href={role.applyUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="gap-2"
                >
                  Apply for this role
                  <ExternalLink className="h-4 w-4" />
                </a>
              </Button>
            </div>
          </div>
        </section>

        {/* Role Content */}
        <section className="container py-8 md:py-12">
          <div className="mx-auto max-w-3xl space-y-8">
            {/* Summary */}
            <div className="space-y-3">
              <h2 className="text-lg font-semibold">About this role</h2>
              <p className="text-muted-foreground leading-relaxed">{role.summary}</p>
            </div>

            {/* Responsibilities */}
            <div className="space-y-3">
              <h2 className="text-lg font-semibold">Responsibilities</h2>
              <ul className="space-y-2">
                {role.responsibilities.map((item, index) => (
                  <li key={index} className="flex items-start gap-3 text-muted-foreground">
                    <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-primary" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Requirements */}
            <div className="space-y-3">
              <h2 className="text-lg font-semibold">Requirements</h2>
              <ul className="space-y-2">
                {role.requirements.map((item, index) => (
                  <li key={index} className="flex items-start gap-3 text-muted-foreground">
                    <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-secondary" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* CTA */}
            <div className="rounded-xl border bg-muted/30 p-6 text-center">
              <h3 className="mb-2 font-semibold">Interested in this role?</h3>
              <p className="mb-4 text-sm text-muted-foreground">
                You'll be redirected to {company.name}'s careers page to apply.
              </p>
              <Button asChild className="transition-all duration-micro ease-calm">
                <a
                  href={role.applyUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="gap-2"
                >
                  Apply externally
                  <ExternalLink className="h-4 w-4" />
                </a>
              </Button>
            </div>

            {/* Other roles from this company */}
            {company.roles.length > 1 && (
              <div className="space-y-4">
                <h2 className="text-lg font-semibold">
                  More roles at {company.name}
                </h2>
                <div className="space-y-2">
                  {company.roles
                    .filter((r) => r.id !== role.id)
                    .map((otherRole) => (
                      <Link
                        key={otherRole.id}
                        to={`/company/${company.id}/role/${otherRole.id}`}
                        className="flex items-center justify-between rounded-lg border bg-card p-4 transition-all duration-micro ease-calm hover:bg-muted hover:shadow-[0_1px_4px_-1px_hsl(var(--foreground)/0.06)]"
                      >
                        <div className="flex items-center gap-3">
                          <span className="font-medium">{otherRole.title}</span>
                          <RoleTag category={otherRole.category} />
                        </div>
                        <WorkModeBadge mode={otherRole.workMode} />
                      </Link>
                    ))}
                </div>
              </div>
            )}
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default RoleDetail;
