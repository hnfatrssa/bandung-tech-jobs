import { useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { Loader2, X } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";

interface Company {
  id: string;
  name: string;
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
}

interface RoleFormProps {
  role: Role | null;
  companies: Company[];
  onClose: () => void;
  onSuccess: () => void;
}

const categories = ["Engineering", "Design", "Product", "Data", "QA", "Platform"];
const workModes = ["Onsite", "Hybrid", "Remote"];

function generateSlug(title: string): string {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
    .trim();
}

// Validate URL to only allow http/https schemes
function isValidApplyUrl(url: string): boolean {
  try {
    const parsed = new URL(url);
    return ["http:", "https:"].includes(parsed.protocol);
  } catch {
    return false;
  }
}

// Map database errors to user-friendly messages
function getErrorMessage(error: { message: string; code?: string }): string {
  const message = error.message.toLowerCase();
  
  if (message.includes("duplicate") && message.includes("slug")) {
    return "This role slug is already in use. Please choose a different one.";
  }
  if (message.includes("duplicate")) {
    return "A role with these details already exists.";
  }
  if (message.includes("violates row-level security")) {
    return "You don't have permission to perform this action.";
  }
  if (message.includes("foreign key")) {
    return "The selected company no longer exists.";
  }
  
  return "Unable to save the role. Please try again.";
}

export function RoleForm({ role, companies, onClose, onSuccess }: RoleFormProps) {
  const [companyId, setCompanyId] = useState(role?.company_id || companies[0]?.id || "");
  const [title, setTitle] = useState(role?.title || "");
  const [slug, setSlug] = useState(role?.slug || "");
  const [workMode, setWorkMode] = useState(role?.work_mode || "Hybrid");
  const [salary, setSalary] = useState(role?.salary || "");
  const [category, setCategory] = useState(role?.category || "Engineering");
  const [skills, setSkills] = useState<string[]>(role?.skills || []);
  const [skillInput, setSkillInput] = useState("");
  const [summary, setSummary] = useState(role?.summary || "");
  const [responsibilities, setResponsibilities] = useState(role?.responsibilities.join("\n") || "");
  const [requirements, setRequirements] = useState(role?.requirements.join("\n") || "");
  const [applyUrl, setApplyUrl] = useState(role?.apply_url || "");
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const handleTitleChange = (value: string) => {
    setTitle(value);
    if (!role) {
      setSlug(generateSlug(value));
    }
  };

  const addSkill = () => {
    const skill = skillInput.trim();
    if (skill && !skills.includes(skill)) {
      setSkills([...skills, skill]);
      setSkillInput("");
    }
  };

  const removeSkill = (skill: string) => {
    setSkills(skills.filter((s) => s !== skill));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate apply URL before submission
    const trimmedUrl = applyUrl.trim();
    if (!isValidApplyUrl(trimmedUrl)) {
      toast({
        title: "Invalid URL",
        description: "Please enter a valid URL starting with http:// or https://",
        variant: "destructive",
      });
      return;
    }
    
    setIsLoading(true);

    const data = {
      company_id: companyId,
      title: title.trim(),
      slug: slug.trim(),
      work_mode: workMode,
      salary: salary.trim() || null,
      category,
      skills,
      summary: summary.trim(),
      responsibilities: responsibilities.split("\n").map((r) => r.trim()).filter(Boolean),
      requirements: requirements.split("\n").map((r) => r.trim()).filter(Boolean),
      apply_url: trimmedUrl,
      last_updated: new Date().toISOString().split("T")[0],
    };

    let error;
    if (role) {
      const result = await supabase
        .from("roles")
        .update(data)
        .eq("id", role.id);
      error = result.error;
    } else {
      const result = await supabase.from("roles").insert(data);
      error = result.error;
    }

    if (error) {
      toast({
        title: "Error",
        description: getErrorMessage(error),
        variant: "destructive",
      });
      setIsLoading(false);
    } else {
      toast({
        title: "Success",
        description: `Role ${role ? "updated" : "created"} successfully`,
      });
      onSuccess();
    }
  };

  return (
    <Dialog open onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[90vh]">
        <DialogHeader>
          <DialogTitle>{role ? "Edit Role" : "Add Role"}</DialogTitle>
        </DialogHeader>
        <ScrollArea className="max-h-[calc(90vh-100px)] pr-4">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="company">Company *</Label>
                <Select value={companyId} onValueChange={setCompanyId}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select company" />
                  </SelectTrigger>
                  <SelectContent>
                    {companies.map((c) => (
                      <SelectItem key={c.id} value={c.id}>
                        {c.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="category">Category *</Label>
                <Select value={category} onValueChange={setCategory}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select category" />
                  </SelectTrigger>
                  <SelectContent>
                    {categories.map((c) => (
                      <SelectItem key={c} value={c}>
                        {c}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="title">Role Title *</Label>
              <Input
                id="title"
                value={title}
                onChange={(e) => handleTitleChange(e.target.value)}
                placeholder="e.g. Senior Frontend Engineer"
                required
              />
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="slug">Slug *</Label>
                <Input
                  id="slug"
                  value={slug}
                  onChange={(e) => setSlug(e.target.value)}
                  placeholder="role-slug"
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="workMode">Work Mode *</Label>
                <Select value={workMode} onValueChange={setWorkMode}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select work mode" />
                  </SelectTrigger>
                  <SelectContent>
                    {workModes.map((m) => (
                      <SelectItem key={m} value={m}>
                        {m}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="salary">Salary (optional)</Label>
                <Input
                  id="salary"
                  value={salary}
                  onChange={(e) => setSalary(e.target.value)}
                  placeholder="e.g. IDR 18-25M/month"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="applyUrl">Apply URL *</Label>
                <Input
                  id="applyUrl"
                  type="url"
                  value={applyUrl}
                  onChange={(e) => setApplyUrl(e.target.value)}
                  placeholder="https://..."
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label>Skills</Label>
              <div className="flex gap-2">
                <Input
                  value={skillInput}
                  onChange={(e) => setSkillInput(e.target.value)}
                  placeholder="Add a skill"
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      e.preventDefault();
                      addSkill();
                    }
                  }}
                />
                <Button type="button" variant="secondary" onClick={addSkill}>
                  Add
                </Button>
              </div>
              {skills.length > 0 && (
                <div className="flex flex-wrap gap-1 mt-2">
                  {skills.map((skill) => (
                    <Badge key={skill} variant="secondary" className="gap-1">
                      {skill}
                      <button
                        type="button"
                        onClick={() => removeSkill(skill)}
                        className="hover:text-destructive"
                      >
                        <X className="h-3 w-3" />
                      </button>
                    </Badge>
                  ))}
                </div>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="summary">Summary *</Label>
              <Textarea
                id="summary"
                value={summary}
                onChange={(e) => setSummary(e.target.value)}
                placeholder="Brief description of the role"
                rows={2}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="responsibilities">Responsibilities (one per line)</Label>
              <Textarea
                id="responsibilities"
                value={responsibilities}
                onChange={(e) => setResponsibilities(e.target.value)}
                placeholder="Enter each responsibility on a new line"
                rows={4}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="requirements">Requirements (one per line)</Label>
              <Textarea
                id="requirements"
                value={requirements}
                onChange={(e) => setRequirements(e.target.value)}
                placeholder="Enter each requirement on a new line"
                rows={4}
              />
            </div>

            <div className="flex justify-end gap-2 pt-4">
              <Button type="button" variant="outline" onClick={onClose}>
                Cancel
              </Button>
              <Button type="submit" disabled={isLoading}>
                {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                {role ? "Update" : "Create"}
              </Button>
            </div>
          </form>
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
}
