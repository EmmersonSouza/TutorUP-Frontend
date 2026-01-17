import { motion } from "framer-motion";
import imgSignup from "@assets/generated_images/timeline_illustration_for_signup_process.png";
import imgSchedule from "@assets/generated_images/timeline_illustration_for_scheduling.png";
import imgTrack from "@assets/generated_images/timeline_illustration_for_tracking_progress.png";

const steps = [
  {
    number: "1",
    title: "Cadastre-se Gratuitamente",
    description: "Crie sua conta em 2 minutos. Adicione informações da criança: série, matérias com dificuldade, e objetivos.",
    image: imgSignup,
  },
  {
    number: "2",
    title: "Escolha e Agende",
    description: "Navegue pelos professores, veja perfis completos, avaliações e disponibilidade. Agende a aula ideal.",
    image: imgSchedule,
  },
  {
    number: "3",
    title: "Acompanhe em Tempo Real",
    description: "Receba confirmação, lembretes e notificação de check-in. Feedback detalhado após cada sessão.",
    image: imgTrack,
  },
];

export default function HowItWorks() {
  return (
    <section id="how-it-works" className="py-24 bg-background">
      <div className="container mx-auto px-4 md:px-8">
        <div className="text-center mb-20">
          <h2 className="text-3xl md:text-5xl font-bold font-heading text-foreground mb-4">
            Como funciona em 3 passos simples
          </h2>
        </div>

        <div className="relative flex flex-col lg:flex-row gap-8 lg:gap-12 justify-center items-stretch">
          {/* Connector Line (Desktop) */}
          <div className="hidden lg:block absolute top-12 left-[16%] right-[16%] h-1 bg-gradient-to-r from-transparent via-accent/30 to-transparent -z-10" />

          {steps.map((step, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.2 }}
              className="flex-1 relative"
            >
              <div className="bg-white rounded-2xl p-8 shadow-sm border border-border h-full flex flex-col items-center text-center relative overflow-hidden group hover:shadow-md transition-shadow">
                
                {/* Step Number Badge */}
                <div className="absolute -top-6 bg-primary text-white w-12 h-12 rounded-full flex items-center justify-center font-bold text-xl shadow-lg border-4 border-background z-10">
                  {step.number}
                </div>

                <div className="mt-8 mb-6 h-48 w-full flex items-center justify-center">
                  <img 
                    src={step.image} 
                    alt={step.title} 
                    className="h-full w-auto object-contain group-hover:scale-105 transition-transform duration-500"
                  />
                </div>

                <h3 className="text-2xl font-bold mb-4 text-foreground">{step.title}</h3>
                <p className="text-muted-foreground leading-relaxed">
                  {step.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
