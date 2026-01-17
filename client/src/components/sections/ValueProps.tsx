import { motion } from "framer-motion";
import iconVerified from "@assets/generated_images/feature_icon_for_verified_professors.png";
import iconScheduling from "@assets/generated_images/feature_icon_for_smart_scheduling.png";
import iconPayment from "@assets/generated_images/feature_icon_for_secure_payment.png";
import iconReports from "@assets/generated_images/feature_icon_for_detailed_reports.png";

const features = [
  {
    title: "Professores Verificados",
    description: "Todos os professores passam por verificação rigorosa de diplomas, experiência e background.",
    icon: iconVerified,
  },
  {
    title: "Agendamento Inteligente",
    description: "Escolha horário, matéria e professor. Receba lembretes automáticos e confirmações.",
    icon: iconScheduling,
  },
  {
    title: "Pagamento Protegido",
    description: "PIX, cartão de crédito ou débito com criptografia bancária. Pague apenas após a confirmação.",
    icon: iconPayment,
  },
  {
    title: "Relatórios Detalhados",
    description: "Acompanhe o progresso com feedback após cada aula: pontos fortes, áreas de melhoria e próximos passos.",
    icon: iconReports,
  },
];

export default function ValueProps() {
  return (
    <section className="py-24 bg-white relative">
      <div className="container mx-auto px-4 md:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-bold font-heading text-foreground mb-4">
            Por que escolher o TutorUP?
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="group p-8 rounded-2xl border-2 border-muted hover:border-primary/20 bg-white hover:shadow-xl hover:shadow-primary/5 transition-all duration-300"
            >
              <div className="mb-6 relative">
                <div className="w-24 h-24 bg-secondary/20 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                  <img src={feature.icon} alt={feature.title} className="w-16 h-16 object-contain" />
                </div>
              </div>
              <h3 className="text-xl font-bold mb-3 text-foreground">{feature.title}</h3>
              <p className="text-muted-foreground leading-relaxed">
                {feature.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
