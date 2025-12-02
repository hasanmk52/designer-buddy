export function SiteFooter() {
  return (
    <footer className="border-t bg-muted/30 backdrop-blur">
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col items-center space-y-4 text-center">
          <p className="text-sm font-medium text-foreground">
            © {new Date().getFullYear()} Designer Buddy. All rights reserved.
          </p>
          <p className="text-sm text-muted-foreground max-w-md">
            Transform your space with AI-powered interior design.
          </p>
        </div>
      </div>
    </footer>
  );
}
