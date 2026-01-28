import { useParams, Link } from "react-router-dom";
import { ArrowLeft, MapPin, Building2, ExternalLink, Clock } from "lucide-react";
import { companies } from "@/lib/data";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { RoleTag } from "@/components/RoleTag";
import { WorkModeBadge } from "@/components/WorkModeBadge";
import { SalaryBadge } from "@/components/SalaryBadge";
import { SkillTag } from "@/components/SkillTag";
import { formatDistanceToNow, format } from "date-fns";

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
        <section className="relative overflow-hidden border-b bg-[hsl(221,75%,35%)]">
          {/* Dynamic fluid gradient background using Jabar colors */}
          <div className="absolute inset-0 bg-gradient-to-br from-[hsl(221,80%,40%)] via-[hsl(280,60%,45%)] to-[hsl(330,70%,50%)]" />
          
          {/* Animated floating blob shapes */}
          <div className="absolute -left-20 -top-20 h-80 w-80 rounded-full bg-[hsl(200,90%,55%)] blur-3xl opacity-70 animate-blob-float" />
          <div className="absolute left-1/4 top-1/2 h-96 w-96 rounded-full bg-[hsl(142,70%,45%)] blur-3xl opacity-60 animate-blob-float [animation-delay:2s]" />
          <div className="absolute right-0 top-0 h-72 w-72 rounded-full bg-[hsl(45,90%,55%)] blur-3xl opacity-50 animate-blob-float [animation-delay:4s]" />
          <div className="absolute -bottom-20 right-1/4 h-80 w-80 rounded-full bg-[hsl(221,85%,50%)] blur-3xl opacity-60 animate-blob-float [animation-delay:6s]" />
          <div className="absolute bottom-0 -left-10 h-64 w-64 rounded-full bg-[hsl(180,70%,45%)] blur-3xl opacity-50 animate-blob-float [animation-delay:8s]" />
          
          {/* Subtle overlay for depth */}
          <div className="absolute inset-0 bg-gradient-to-t from-[hsl(221,80%,25%,0.4)] to-transparent" />

          <div className="container relative py-8 md:py-12">
            <div className="flex flex-col gap-6 lg:flex-row lg:items-start lg:justify-between">
              <div className="space-y-4">
                <div className="flex flex-wrap items-center gap-2">
                  <RoleTag category={role.category} variant="hero" />
                  <WorkModeBadge mode={role.workMode} variant="hero" />
                  {role.salary && <SalaryBadge salary={role.salary} variant="hero" />}
                </div>

                <h1 className="text-2xl font-bold tracking-tight text-primary-foreground md:text-3xl">
                  {role.title}
                </h1>

                {role.skills.length > 0 && (
                  <div className="flex flex-wrap gap-1.5">
                    {role.skills.map((skill) => (
                      <SkillTag key={skill} skill={skill} variant="hero" />
                    ))}
                  </div>
                )}

                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary-foreground/20 text-primary-foreground">
                    <Building2 className="h-5 w-5" />
                  </div>
                  <div>
                    <p className="font-medium text-primary-foreground">{company.name}</p>
                    <p className="flex items-center gap-1 text-sm text-primary-foreground/80">
                      <MapPin className="h-3.5 w-3.5" />
                      {company.location}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-1.5 text-sm text-primary-foreground/70">
                  <Clock className="h-3.5 w-3.5" />
                  <span>Updated {formatDistanceToNow(new Date(role.lastUpdated), { addSuffix: true })}</span>
                  <span className="text-primary-foreground/50">•</span>
                  <span>{format(new Date(role.lastUpdated), "MMM d, yyyy")}</span>
                </div>
              </div>

              <Button asChild size="lg" className="shrink-0 bg-primary-foreground text-primary hover:bg-primary-foreground/90 transition-all duration-micro ease-calm">
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
