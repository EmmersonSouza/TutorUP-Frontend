import Navbar from "@/components/layout/Navbar";
import Hero from "@/components/sections/Hero";
import ValueProps from "@/components/sections/ValueProps";
import HowItWorks from "@/components/sections/HowItWorks";
import ProfessorShowcase from "@/components/sections/ProfessorShowcase";
import SocialProof from "@/components/sections/SocialProof";
import FinalCTA from "@/components/sections/FinalCTA";
import Footer from "@/components/sections/Footer";

export default function Home() {
  return (
    <div className="min-h-screen bg-background font-sans selection:bg-accent/20 selection:text-accent-foreground">
      <Navbar />
      <main>
        <Hero />
        <ValueProps />
        <HowItWorks />
        <ProfessorShowcase />
        <SocialProof />
        <FinalCTA />
      </main>
      <Footer />
    </div>
  );
}
