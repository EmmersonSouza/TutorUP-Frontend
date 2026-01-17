import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";

export default function FinalCTA() {
  return (
    <section className="py-24 bg-primary text-primary-foreground relative overflow-hidden">
      {/* Background Decor */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none opacity-10">
        <div className="absolute top-1/2 left-1/4 w-96 h-96 bg-white rounded-full blur-3xl -translate-y-1/2" />
        <div className="absolute bottom-0 right-1/4 w-64 h-64 bg-accent rounded-full blur-3xl" />
      </div>

      <div className="container mx-auto px-4 md:px-8 relative z-10 text-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="max-w-3xl mx-auto"
        >
          <h2 className="text-3xl md:text-5xl font-bold font-heading mb-6">
            Pronto para transformar o aprendizado do seu filho?
          </h2>
          <p className="text-xl text-primary-foreground/80 mb-10 leading-relaxed">
            Junte-se a milhares de pais que confiam no TutorUP para o reforço escolar. 
            A primeira aula tem garantia de satisfação ou seu dinheiro de volta.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="bg-white text-primary hover:bg-white/90 text-lg px-8 py-6 h-auto rounded-xl shadow-lg font-bold">
              Começar Gratuitamente
            </Button>
            <Button variant="outline" size="lg" className="border-2 border-white/20 text-white hover:bg-white/10 hover:text-white hover:border-white text-lg px-8 py-6 h-auto rounded-xl bg-transparent">
              Falar com um Consultor
            </Button>
          </div>
          
          <div className="mt-12 flex items-center justify-center gap-6 opacity-80 text-sm font-medium">
            <div className="flex items-center gap-2">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
              <span>Sem fidelidade</span>
            </div>
            <div className="flex items-center gap-2">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"></path></svg>
              <span>Pagamento Seguro</span>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
