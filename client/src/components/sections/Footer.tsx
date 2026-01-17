export default function Footer() {
  return (
    <footer className="bg-white border-t border-border py-12 md:py-16">
      <div className="container mx-auto px-4 md:px-8">
        <div className="flex flex-col md:flex-row justify-between items-center gap-8">
          <div className="flex items-center gap-2">
            <span className="text-2xl font-bold font-heading text-primary flex items-center gap-1">
              TutorUP<span className="text-accent text-4xl leading-none">.</span>
            </span>
          </div>
          
          <p className="text-muted-foreground text-sm text-center md:text-right">
            © {new Date().getFullYear()} TutorUP. Educação que transforma.
          </p>
        </div>
      </div>
    </footer>
  );
}
