export function Footer() {
  return (
    <footer className="border-t bg-muted/30">
      <div className="container py-8">
        <div className="flex flex-col items-center justify-between gap-4 sm:flex-row">
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <span>Part of the West Java digital ecosystem</span>
          </div>
          <div className="text-sm text-muted-foreground">
            © {new Date().getFullYear()} bandungtechjobs.com
          </div>
        </div>
      </div>
    </footer>
  );
}
