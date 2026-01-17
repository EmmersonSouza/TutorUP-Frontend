import { Button } from "@/components/ui/button";
import { Link } from "wouter";

export default function Navbar() {
  return (
    <nav className="sticky top-0 z-50 w-full border-b border-border/50 bg-background/80 backdrop-blur-md">
      <div className="container mx-auto flex h-20 items-center justify-between px-4 md:px-8">
        <div className="flex items-center gap-2">
          <Link href="/" className="text-2xl font-bold font-heading text-primary flex items-center gap-1 cursor-pointer">
              TutorUP<span className="text-accent text-4xl leading-none">.</span>
          </Link>
        </div>

        <div className="hidden md:flex items-center gap-8">
          <a href="#how-it-works" className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors">
            Como funciona
          </a>
          <a href="#professors" className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors">
            Professores
          </a>
          <a href="#testimonials" className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors">
            Depoimentos
          </a>
        </div>

        <div className="flex items-center gap-4">
          <Link href="/login">
            <Button variant="ghost" className="hidden sm:flex text-muted-foreground hover:text-primary cursor-pointer">
              Entrar
            </Button>
          </Link>
          <Link href="/register">
            <Button className="bg-primary hover:bg-primary/90 text-white rounded-full px-6 font-medium shadow-md shadow-primary/20 cursor-pointer">
              Começar Agora
            </Button>
          </Link>
        </div>
      </div>
    </nav>
  );
}
