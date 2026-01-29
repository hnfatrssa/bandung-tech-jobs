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
import { Loader2 } from "lucide-react";

interface Company {
  id: string;
  slug: string;
  name: string;
  location: string;
  description: string | null;
  type: string;
}

interface CompanyFormProps {
  company: Company | null;
  onClose: () => void;
  onSuccess: () => void;
}

const companyTypes = ["Startup", "Agency", "Software House", "Enterprise"];

function generateSlug(name: string): string {
  return name
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
    .trim();
}

// Map database errors to user-friendly messages
function getErrorMessage(error: { message: string; code?: string }): string {
  const message = error.message.toLowerCase();
  
  if (message.includes("duplicate") && message.includes("slug")) {
    return "This company slug is already in use. Please choose a different one.";
  }
  if (message.includes("duplicate")) {
    return "A company with these details already exists.";
  }
  if (message.includes("violates row-level security")) {
    return "You don't have permission to perform this action.";
  }
  
  return "Unable to save the company. Please try again.";
}

export function CompanyForm({ company, onClose, onSuccess }: CompanyFormProps) {
  const [name, setName] = useState(company?.name || "");
  const [slug, setSlug] = useState(company?.slug || "");
  const [location, setLocation] = useState(company?.location || "Bandung, West Java");
  const [description, setDescription] = useState(company?.description || "");
  const [type, setType] = useState(company?.type || "Startup");
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const handleNameChange = (value: string) => {
    setName(value);
    if (!company) {
      setSlug(generateSlug(value));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    const data = {
      name: name.trim(),
      slug: slug.trim(),
      location: location.trim(),
      description: description.trim() || null,
      type,
    };

    let error;
    if (company) {
      const result = await supabase
        .from("companies")
        .update(data)
        .eq("id", company.id);
      error = result.error;
    } else {
      const result = await supabase.from("companies").insert(data);
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
        description: `Company ${company ? "updated" : "created"} successfully`,
      });
      onSuccess();
    }
  };

  return (
    <Dialog open onOpenChange={onClose}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>{company ? "Edit Company" : "Add Company"}</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="name">Company Name *</Label>
            <Input
              id="name"
              value={name}
              onChange={(e) => handleNameChange(e.target.value)}
              placeholder="Company name"
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="slug">Slug *</Label>
            <Input
              id="slug"
              value={slug}
              onChange={(e) => setSlug(e.target.value)}
              placeholder="company-slug"
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="location">Location *</Label>
            <Input
              id="location"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              placeholder="Bandung, West Java"
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="type">Company Type *</Label>
            <Select value={type} onValueChange={setType}>
              <SelectTrigger>
                <SelectValue placeholder="Select type" />
              </SelectTrigger>
              <SelectContent>
                {companyTypes.map((t) => (
                  <SelectItem key={t} value={t}>
                    {t}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Brief description of the company"
              rows={3}
            />
          </div>
          <div className="flex justify-end gap-2">
            <Button type="button" variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button type="submit" disabled={isLoading}>
              {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              {company ? "Update" : "Create"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
