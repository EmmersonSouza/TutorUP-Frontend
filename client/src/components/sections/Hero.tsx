import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import heroImage from "@assets/generated_images/hero_illustration_of_tutor_and_student.png";

export default function Hero() {
  return (
    <section className="relative overflow-hidden pt-12 pb-24 lg:pt-20 lg:pb-32">
      <div className="container mx-auto px-4 md:px-8">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-2 lg:gap-8 items-center">
          
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="flex flex-col gap-6 max-w-2xl"
          >
            <span className="text-primary font-bold tracking-widest uppercase text-xs md:text-sm">
              Educação personalizada com TutorUP
            </span>
            
            <h1 className="text-4xl md:text-5xl lg:text-7xl font-bold font-heading text-foreground leading-[1.1] tracking-tight">
              Reforço escolar que <span className="text-primary">transforma</span> resultados
            </h1>
            
            <p className="text-lg md:text-xl text-muted-foreground leading-relaxed max-w-lg">
              Conecte seu filho aos melhores professores. Agende aulas com segurança, acompanhe o progresso em tempo real.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 mt-4">
              <Button size="lg" className="bg-primary hover:bg-primary/90 text-white text-lg px-8 py-6 h-auto rounded-xl shadow-lg shadow-primary/25 hover:-translate-y-1 transition-all duration-300">
                Começar gratuitamente
              </Button>
              <Button variant="outline" size="lg" className="text-lg px-8 py-6 h-auto rounded-xl border-2 border-primary/10 hover:bg-primary/5 hover:text-primary transition-all">
                Ver como funciona
              </Button>
            </div>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative flex justify-center lg:justify-end"
          >
            <div className="relative w-full max-w-[600px] aspect-square">
              <div className="absolute inset-0 bg-secondary/30 rounded-full blur-3xl scale-90 -z-10" />
              <img 
                src={heroImage} 
                alt="Professor and Student Learning" 
                className="w-full h-full object-contain drop-shadow-xl"
              />
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
