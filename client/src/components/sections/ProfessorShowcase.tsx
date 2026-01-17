import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { Star, BookOpen, Clock } from "lucide-react";

// Mock Data
const professors = [
  {
    name: "Ana Oliveira",
    subject: "Matemática",
    credentials: "Msc. Matemática - USP",
    rating: 4.9,
    classes: 145,
    image: "https://images.unsplash.com/photo-1544717305-2782549b5136?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=334&q=80",
  },
  {
    name: "Carlos Mendes",
    subject: "Física",
    credentials: "Licenciado em Física - UFMG",
    rating: 5.0,
    classes: 98,
    image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=334&q=80",
  },
  {
    name: "Juliana Costa",
    subject: "Inglês",
    credentials: "Certificada Cambridge - 8 Anos Exp.",
    rating: 4.8,
    classes: 210,
    image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=334&q=80",
  },
];

export default function ProfessorShowcase() {
  return (
    <section id="professors" className="py-24 bg-white">
      <div className="container mx-auto px-4 md:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-bold font-heading text-foreground mb-4">
            Conheça nossos professores
          </h2>
          <p className="text-xl text-muted-foreground">
            Especialistas qualificados prontos para ajudar seu filho
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {professors.map((prof, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="group bg-white rounded-2xl overflow-hidden border border-border hover:shadow-xl hover:shadow-primary/10 transition-all duration-300"
            >
              <div className="bg-primary/5 py-2 text-center">
                <span className="text-primary font-bold text-sm tracking-wide uppercase">{prof.subject}</span>
              </div>
              
              <div className="pt-8 pb-6 px-6 flex flex-col items-center">
                <div className="relative mb-6">
                  <div className="w-32 h-32 rounded-full overflow-hidden border-4 border-white shadow-lg">
                    <img src={prof.image} alt={prof.name} className="w-full h-full object-cover" />
                  </div>
                  <div className="absolute -bottom-2 -right-2 bg-white px-2 py-1 rounded-full shadow-sm flex items-center gap-1 border border-border">
                    <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
                    <span className="font-bold text-sm">{prof.rating}</span>
                  </div>
                </div>

                <h3 className="text-2xl font-bold text-foreground mb-1">{prof.name}</h3>
                <p className="text-muted-foreground text-sm font-medium mb-6">{prof.credentials}</p>

                <div className="flex items-center justify-between w-full px-4 py-4 bg-muted/30 rounded-xl mb-6">
                  <div className="flex flex-col items-center">
                    <span className="text-lg font-bold text-primary">{prof.classes}+</span>
                    <span className="text-xs text-muted-foreground uppercase tracking-wider">Aulas</span>
                  </div>
                  <div className="w-px h-8 bg-border"></div>
                  <div className="flex flex-col items-center">
                    <span className="text-lg font-bold text-primary">100%</span>
                    <span className="text-xs text-muted-foreground uppercase tracking-wider">Verificado</span>
                  </div>
                </div>

                <Button variant="link" className="text-accent hover:text-accent/80 font-bold text-base p-0 h-auto">
                  Ver perfil completo
                </Button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
