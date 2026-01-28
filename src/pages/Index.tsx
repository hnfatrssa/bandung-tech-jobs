import { useState, useMemo } from "react";
import { Briefcase, Building2, Users } from "lucide-react";
import { companies } from "@/lib/data";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { CompanyCard } from "@/components/CompanyCard";
import { FilterBar } from "@/components/FilterBar";
import { SearchBar } from "@/components/SearchBar";

const Index = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [selectedWorkMode, setSelectedWorkMode] = useState<string | null>(null);
  const [selectedCompanyType, setSelectedCompanyType] = useState<string | null>(null);

  const filteredCompanies = useMemo(() => {
    const query = searchQuery.toLowerCase().trim();

    return companies
      .map((company) => {
        // Filter company type first
        if (selectedCompanyType && company.type !== selectedCompanyType) {
          return null;
        }

        // Check if company name or description matches search
        const companyMatches = query === "" || 
          company.name.toLowerCase().includes(query) ||
          company.description?.toLowerCase().includes(query);

        // Filter roles within company
        const filteredRoles = company.roles.filter((role) => {
          if (selectedCategory && role.category !== selectedCategory) return false;
          if (selectedWorkMode && role.workMode !== selectedWorkMode) return false;
          
          // If search query exists, check if role matches
          if (query !== "") {
            const roleMatches = 
              role.title.toLowerCase().includes(query) ||
              role.category.toLowerCase().includes(query) ||
              role.summary.toLowerCase().includes(query);
            
            // Include role if company matches OR role matches
            return companyMatches || roleMatches;
          }
          
          return true;
        });

        // If no roles match and company doesn't match search, exclude company
        if (filteredRoles.length === 0) return null;

        return {
          ...company,
          roles: filteredRoles,
        };
      })
      .filter(Boolean);
  }, [searchQuery, selectedCategory, selectedWorkMode, selectedCompanyType]);

  const totalRoles = useMemo(() => {
    return companies.reduce((sum, company) => sum + company.roles.length, 0);
  }, []);

  const filteredRolesCount = useMemo(() => {
    return filteredCompanies.reduce((sum, company) => sum + (company?.roles.length || 0), 0);
  }, [filteredCompanies]);

  const hasActiveFilters = searchQuery.length > 0 || selectedCategory !== null || selectedWorkMode !== null || selectedCompanyType !== null;

  return (
    <div className="flex min-h-screen flex-col">
      <Header />

      <main className="flex-1">
      {/* Hero Section */}
        <section className="relative overflow-hidden border-b bg-gradient-to-br from-primary via-primary/90 to-secondary">
          {/* Decorative elements */}
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_hsl(var(--highlight)/0.3),_transparent_50%)]" />
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_left,_hsl(var(--secondary)/0.4),_transparent_50%)]" />
          <div className="absolute right-0 top-0 h-64 w-64 rounded-full bg-highlight/20 blur-3xl" />
          <div className="absolute bottom-0 left-1/4 h-48 w-48 rounded-full bg-secondary/30 blur-3xl" />
          
          <div className="container relative py-12 md:py-16">
            <div className="max-w-2xl space-y-4">
              <h1 className="text-3xl font-bold tracking-tight text-primary-foreground md:text-4xl">
                Find roles within local tech teams
              </h1>
              <p className="text-lg text-primary-foreground/80">
                Discover opportunities at Bandung-based tech companies.
              </p>
            </div>

            {/* Search Bar */}
            <div className="mt-8 max-w-xl">
              <SearchBar
                value={searchQuery}
                onChange={setSearchQuery}
                placeholder="Search companies, roles, or skills..."
              />
            </div>

            {/* Stats */}
            <div className="mt-6 flex flex-wrap gap-6">
              <div className="flex items-center gap-2">
                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary-foreground/20">
                  <Building2 className="h-4 w-4 text-primary-foreground" />
                </div>
                <div>
                  <p className="text-xl font-semibold text-primary-foreground">{companies.length}</p>
                  <p className="text-xs text-primary-foreground/70">Companies hiring</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary-foreground/20">
                  <Briefcase className="h-4 w-4 text-primary-foreground" />
                </div>
                <div>
                  <p className="text-xl font-semibold text-primary-foreground">{totalRoles}</p>
                  <p className="text-xs text-primary-foreground/70">Open roles</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary-foreground/20">
                  <Users className="h-4 w-4 text-primary-foreground" />
                </div>
                <div>
                  <p className="text-xl font-semibold text-primary-foreground">Bandung</p>
                  <p className="text-xs text-primary-foreground/70">West Java</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Filters & Listings */}
        <section className="container py-8">
          <div className="grid gap-8 lg:grid-cols-[280px_1fr]">
            {/* Sidebar Filters */}
            <aside className="lg:sticky lg:top-20 lg:self-start">
              <div className="rounded-xl border bg-card p-4">
                <h2 className="mb-4 text-sm font-semibold">Filter roles</h2>
                <FilterBar
                  selectedCategory={selectedCategory}
                  selectedWorkMode={selectedWorkMode}
                  selectedCompanyType={selectedCompanyType}
                  onCategoryChange={setSelectedCategory}
                  onWorkModeChange={setSelectedWorkMode}
                  onCompanyTypeChange={setSelectedCompanyType}
                />
              </div>
            </aside>

            {/* Company Listings */}
            <div className="space-y-4">
              {/* Results count */}
              <div className="flex items-center justify-between">
                <p className="text-sm text-muted-foreground">
                  {!hasActiveFilters ? (
                    <>Showing all {companies.length} companies</>
                  ) : (
                    <>
                      {filteredCompanies.length} {filteredCompanies.length === 1 ? "company" : "companies"} 
                      {" "}with {filteredRolesCount} {filteredRolesCount === 1 ? "role" : "roles"}
                      {searchQuery && <> matching "{searchQuery}"</>}
                    </>
                  )}
                </p>
              </div>

              {/* Company Cards - cross-fade on filter changes */}
              <div 
                key={`${searchQuery}-${selectedCategory}-${selectedWorkMode}-${selectedCompanyType}`}
                className="animate-cross-fade space-y-3"
              >
                {filteredCompanies.length > 0 ? (
                  filteredCompanies.map((company, index) =>
                    company ? (
                      <CompanyCard
                        key={company.id}
                        company={company}
                        defaultExpanded={true}
                      />
                    ) : null
                  )
                ) : (
                  <div className="rounded-xl border bg-card p-12 text-center">
                    <p className="text-muted-foreground">
                      No companies match your filters. Try adjusting your criteria.
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default Index;
