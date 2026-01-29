import { Link } from "react-router-dom";

export function Footer() {
  return (
    <footer className="border-t bg-muted/30">
      <div className="container py-8">
        <div className="flex items-center justify-between">
          <div className="text-sm text-muted-foreground">
            © {new Date().getFullYear()} bandungtechjobs.com
          </div>
          <Link 
            to="/admin" 
            className="text-xs text-muted-foreground/50 hover:text-muted-foreground transition-colors"
          >
            Admin
          </Link>
        </div>
      </div>
    </footer>
  );
}
