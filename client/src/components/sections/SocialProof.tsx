import { motion } from "framer-motion";
import { Quote } from "lucide-react";

const stats = [
  { number: "500+", label: "Aulas realizadas" },
  { number: "200+", label: "Alunos ativos" },
  { number: "4.8/5", label: "Avaliação média" },
];

const testimonials = [
  {
    quote: "Minha filha melhorou as notas em matemática em apenas 2 meses. Os professores são atenciosos e o acompanhamento é excelente!",
    author: "Maria Silva",
    subtitle: "Mãe de aluna do 7º ano"
  },
  {
    quote: "A plataforma é super fácil de usar e os relatórios ajudam a entender exatamente onde meu filho precisa melhorar.",
    author: "João Santos",
    subtitle: "Pai de aluno do 9º ano"
  }
];

export default function SocialProof() {
  return (
    <section id="testimonials" className="py-24 bg-background">
      <div className="container mx-auto px-4 md:px-8 max-w-5xl">
        
        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-24 border-b border-primary/10 pb-16">
          {stats.map((stat, index) => (
            <div key={index} className="text-center">
              <div className="text-5xl md:text-6xl font-bold text-primary mb-2 font-heading">{stat.number}</div>
              <div className="text-muted-foreground uppercase tracking-widest text-sm font-semibold">{stat.label}</div>
            </div>
          ))}
        </div>

        {/* Testimonials */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {testimonials.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="bg-white p-8 md:p-10 rounded-2xl shadow-sm border-l-4 border-accent relative"
            >
              <Quote className="w-10 h-10 text-accent/20 absolute top-6 right-6" />
              <p className="text-lg md:text-xl italic text-foreground/80 leading-relaxed mb-8 font-serif">
                "{item.quote}"
              </p>
              <div>
                <div className="font-bold text-foreground text-lg">{item.author}</div>
                <div className="text-muted-foreground text-sm">{item.subtitle}</div>
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}
