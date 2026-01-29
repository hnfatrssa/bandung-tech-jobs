export function Footer() {
  return (
    <footer className="border-t bg-muted/30">
      <div className="container py-8">
        <div className="flex items-center justify-center">
          <div className="text-sm text-muted-foreground">
            © {new Date().getFullYear()} bandungtechjobs
          </div>
        </div>
      </div>
    </footer>
  );
}
