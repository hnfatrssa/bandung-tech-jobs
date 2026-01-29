import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import { 
  Building2, 
  Briefcase, 
  LogOut, 
  Plus, 
  ArrowLeft,
  Loader2,
  Trash2,
  Pencil
} from "lucide-react";
import { Link } from "react-router-dom";
import { CompanyForm } from "@/components/admin/CompanyForm";
import { RoleForm } from "@/components/admin/RoleForm";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";

interface Company {
  id: string;
  slug: string;
  name: string;
  location: string;
  description: string | null;
  type: string;
  created_at: string;
}

interface Role {
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
  company?: Company;
}

export default function Admin() {
  const { user, isLoading: authLoading, isAdmin, signOut } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();
  
  const [companies, setCompanies] = useState<Company[]>([]);
  const [roles, setRoles] = useState<Role[]>([]);
  const [isLoadingData, setIsLoadingData] = useState(true);
  
  const [showCompanyForm, setShowCompanyForm] = useState(false);
  const [showRoleForm, setShowRoleForm] = useState(false);
  const [editingCompany, setEditingCompany] = useState<Company | null>(null);
  const [editingRole, setEditingRole] = useState<Role | null>(null);
  
  const [deleteConfirm, setDeleteConfirm] = useState<{ type: "company" | "role"; id: string; name: string } | null>(null);

  useEffect(() => {
    if (!authLoading && !user) {
      navigate("/admin/login");
    } else if (!authLoading && user && !isAdmin) {
      toast({
        title: "Access Denied",
        description: "You don't have admin privileges.",
        variant: "destructive",
      });
      navigate("/");
    }
  }, [user, authLoading, isAdmin, navigate, toast]);

  useEffect(() => {
    if (user && isAdmin) {
      fetchData();
    }
  }, [user, isAdmin]);

  const fetchData = async () => {
    setIsLoadingData(true);
    
    const [companiesRes, rolesRes] = await Promise.all([
      supabase.from("companies").select("*").order("name"),
      supabase.from("roles").select("*, company:companies(*)").order("title"),
    ]);
    
    if (companiesRes.data) setCompanies(companiesRes.data);
    if (rolesRes.data) setRoles(rolesRes.data as Role[]);
    
    setIsLoadingData(false);
  };

  const handleDeleteCompany = async (id: string) => {
    const { error } = await supabase.from("companies").delete().eq("id", id);
    
    if (error) {
      toast({ title: "Error", description: error.message, variant: "destructive" });
    } else {
      toast({ title: "Success", description: "Company deleted" });
      fetchData();
    }
    setDeleteConfirm(null);
  };

  const handleDeleteRole = async (id: string) => {
    const { error } = await supabase.from("roles").delete().eq("id", id);
    
    if (error) {
      toast({ title: "Error", description: error.message, variant: "destructive" });
    } else {
      toast({ title: "Success", description: "Role deleted" });
      fetchData();
    }
    setDeleteConfirm(null);
  };

  const handleSignOut = async () => {
    await signOut();
    navigate("/");
  };

  if (authLoading || !user || !isAdmin) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-muted/30">
      {/* Header */}
      <header className="sticky top-0 z-50 border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-14 items-center justify-between">
          <div className="flex items-center gap-4">
            <Link to="/" className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground">
              <ArrowLeft className="h-4 w-4" />
              Back to site
            </Link>
            <span className="text-sm font-semibold">Admin Console</span>
          </div>
          <div className="flex items-center gap-4">
            <span className="text-sm text-muted-foreground">{user.email}</span>
            <Button variant="ghost" size="sm" onClick={handleSignOut}>
              <LogOut className="h-4 w-4 mr-2" />
              Sign out
            </Button>
          </div>
        </div>
      </header>

      <main className="container py-8">
        {/* Stats */}
        <div className="mb-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">Companies</CardTitle>
              <Building2 className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{companies.length}</div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">Open Roles</CardTitle>
              <Briefcase className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{roles.length}</div>
            </CardContent>
          </Card>
        </div>

        {/* Tabs */}
        <Tabs defaultValue="companies" className="space-y-4">
          <TabsList>
            <TabsTrigger value="companies">Companies</TabsTrigger>
            <TabsTrigger value="roles">Roles</TabsTrigger>
          </TabsList>

          <TabsContent value="companies" className="space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-semibold">Manage Companies</h2>
              <Button onClick={() => { setEditingCompany(null); setShowCompanyForm(true); }}>
                <Plus className="h-4 w-4 mr-2" />
                Add Company
              </Button>
            </div>
            
            {isLoadingData ? (
              <div className="flex justify-center py-8">
                <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
              </div>
            ) : companies.length === 0 ? (
              <Card>
                <CardContent className="py-8 text-center text-muted-foreground">
                  No companies yet. Add your first company to get started.
                </CardContent>
              </Card>
            ) : (
              <div className="grid gap-4">
                {companies.map((company) => (
                  <Card key={company.id}>
                    <CardHeader className="flex flex-row items-start justify-between pb-2">
                      <div>
                        <CardTitle className="text-base">{company.name}</CardTitle>
                        <CardDescription>{company.location}</CardDescription>
                      </div>
                      <div className="flex items-center gap-2">
                        <Badge variant="secondary">{company.type}</Badge>
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => { setEditingCompany(company); setShowCompanyForm(true); }}
                        >
                          <Pencil className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => setDeleteConfirm({ type: "company", id: company.id, name: company.name })}
                        >
                          <Trash2 className="h-4 w-4 text-destructive" />
                        </Button>
                      </div>
                    </CardHeader>
                    {company.description && (
                      <CardContent className="pt-0">
                        <p className="text-sm text-muted-foreground">{company.description}</p>
                      </CardContent>
                    )}
                  </Card>
                ))}
              </div>
            )}
          </TabsContent>

          <TabsContent value="roles" className="space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-semibold">Manage Roles</h2>
              <Button 
                onClick={() => { setEditingRole(null); setShowRoleForm(true); }}
                disabled={companies.length === 0}
              >
                <Plus className="h-4 w-4 mr-2" />
                Add Role
              </Button>
            </div>
            
            {companies.length === 0 ? (
              <Card>
                <CardContent className="py-8 text-center text-muted-foreground">
                  Add a company first before creating roles.
                </CardContent>
              </Card>
            ) : isLoadingData ? (
              <div className="flex justify-center py-8">
                <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
              </div>
            ) : roles.length === 0 ? (
              <Card>
                <CardContent className="py-8 text-center text-muted-foreground">
                  No roles yet. Add your first role to get started.
                </CardContent>
              </Card>
            ) : (
              <div className="grid gap-4">
                {roles.map((role) => (
                  <Card key={role.id}>
                    <CardHeader className="flex flex-row items-start justify-between pb-2">
                      <div>
                        <CardTitle className="text-base">{role.title}</CardTitle>
                        <CardDescription>
                          {role.company?.name} • {role.work_mode}
                          {role.salary && ` • ${role.salary}`}
                        </CardDescription>
                      </div>
                      <div className="flex items-center gap-2">
                        <Badge variant="secondary">{role.category}</Badge>
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => { setEditingRole(role); setShowRoleForm(true); }}
                        >
                          <Pencil className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => setDeleteConfirm({ type: "role", id: role.id, name: role.title })}
                        >
                          <Trash2 className="h-4 w-4 text-destructive" />
                        </Button>
                      </div>
                    </CardHeader>
                    <CardContent className="pt-0">
                      <div className="flex flex-wrap gap-1">
                        {role.skills.map((skill) => (
                          <Badge key={skill} variant="outline" className="text-xs">
                            {skill}
                          </Badge>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </TabsContent>
        </Tabs>
      </main>

      {/* Company Form Dialog */}
      {showCompanyForm && (
        <CompanyForm
          company={editingCompany}
          onClose={() => { setShowCompanyForm(false); setEditingCompany(null); }}
          onSuccess={() => { setShowCompanyForm(false); setEditingCompany(null); fetchData(); }}
        />
      )}

      {/* Role Form Dialog */}
      {showRoleForm && (
        <RoleForm
          role={editingRole}
          companies={companies}
          onClose={() => { setShowRoleForm(false); setEditingRole(null); }}
          onSuccess={() => { setShowRoleForm(false); setEditingRole(null); fetchData(); }}
        />
      )}

      {/* Delete Confirmation */}
      <AlertDialog open={!!deleteConfirm} onOpenChange={() => setDeleteConfirm(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This will permanently delete "{deleteConfirm?.name}". 
              {deleteConfirm?.type === "company" && " All associated roles will also be deleted."}
              This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
              onClick={() => {
                if (deleteConfirm?.type === "company") {
                  handleDeleteCompany(deleteConfirm.id);
                } else if (deleteConfirm?.type === "role") {
                  handleDeleteRole(deleteConfirm.id);
                }
              }}
            >
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
