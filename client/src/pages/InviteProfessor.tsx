import { useRoute, useLocation } from "wouter";
import { useQuery, useMutation } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { insertUserSchema, type Invitation } from "@shared/schema";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Slider } from "@/components/ui/slider";
import { 
  Loader2, 
  DollarSign, 
  Calendar, 
  Users, 
  Shield, 
  Mail, 
  CheckCircle2, 
  AlertCircle, 
  Clock,
  Pencil,
  Info,
  ChevronRight,
  Monitor,
  MapPin
} from "lucide-react";
import { useState, useEffect } from "react";
import { apiRequest } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";
import { motion, AnimatePresence } from "framer-motion";

// Import generated images
import heroIllustration from "@assets/generated_images/professor-teaching-students-flat-illustration_1768614123456.png";
import flexIllustration from "@assets/generated_images/flexible-earnings-and-schedule-illustration_1768614123457.png";
import successIllustration from "@assets/generated_images/success-celebration-professor-illustration_1768614123458.png";

const steps = [
  { id: "pessoal", label: "Pessoal" },
  { id: "profissional", label: "Profissional" },
  { id: "materias", label: "Matérias" },
  { id: "confirmacao", label: "Confirmação" }
];

const commonSubjects = [
  "Matemática", "Português", "Física", "Química", "Biologia", 
  "História", "Geografia", "Inglês", "Espanhol", "Redação"
];

export default function InviteProfessor() {
  const [, params] = useRoute("/invite/professor/:token");
  const [, setLocation] = useLocation();
  const { toast } = useToast();
  const [step, setStep] = useState(0);
  const [isAccepted, setIsAccepted] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const { data: invitation, isLoading, error } = useQuery<Invitation>({
    queryKey: [`/api/invite/${params?.token}`],
    enabled: !!params?.token,
  });

  const registerMutation = useMutation({
    mutationFn: async (data: any) => {
      const res = await apiRequest("POST", `/api/invite/${params?.token}/accept`, data);
      return res.json();
    },
    onSuccess: () => {
      setIsSuccess(true);
    },
    onError: (err: Error) => {
      toast({ variant: "destructive", title: "Erro no cadastro", description: err.message });
    },
  });

  const form = useForm({
    resolver: zodResolver(insertUserSchema),
    defaultValues: {
      fullName: "",
      phone: "",
      birthDate: "",
      cpf: "",
      education: "Ensino Superior Completo",
      educationArea: "",
      institution: "",
      experienceYears: "0",
      bio: "",
      subjects: [],
      hourlyRate: "60",
      password: "",
    },
  });

  const watchedSubjects = form.watch("subjects") || [];
  const watchedHourlyRate = form.watch("hourlyRate");

  useEffect(() => {
    if (invitation) {
      form.setValue("fullName", invitation.inviterName === "Equipe TutorUP" ? "" : invitation.inviterName);
    }
  }, [invitation, form]);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white">
        <div className="text-center">
          <Loader2 className="w-12 h-12 animate-spin text-[#5B21B6] mx-auto mb-4" />
          <p className="text-gray-600 font-medium">Validando convite...</p>
        </div>
      </div>
    );
  }

  if (error || !invitation) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white p-6">
        <div className="text-center max-w-md animate-in fade-in zoom-in duration-500">
          <AlertCircle className="w-20 h-20 text-[#EF4444] mx-auto mb-6" />
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Convite Inválido</h2>
          <p className="text-gray-600 text-lg mb-8">Este link de convite expirou ou é inválido. Entre em contato com quem lhe enviou.</p>
          <Button onClick={() => setLocation("/")} className="bg-[#5B21B6] hover:bg-[#4C1D95] h-12 px-8 rounded-xl transition-all">
            Voltar para Home
          </Button>
        </div>
      </div>
    );
  }

  if (isSuccess) {
    return (
      <div className="min-h-screen bg-white flex flex-col items-center justify-center p-6 text-center">
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="max-w-2xl w-full"
        >
          <img src={successIllustration} alt="Sucesso" className="w-64 h-64 mx-auto mb-8" />
          <CheckCircle2 className="w-16 h-16 text-[#10B981] mx-auto mb-4" />
          <h1 className="text-4xl font-bold text-[#5B21B6] mb-4">Cadastro Concluído!</h1>
          <p className="text-xl text-gray-700 mb-12">Bem-vindo à TutorUP, {form.getValues("fullName") || "Professor"}!</p>
          
          <Card className="bg-[#FFF7ED] border-none rounded-3xl p-8 mb-12 text-left">
            <h3 className="text-xl font-bold text-[#5B21B6] mb-6">O que acontece agora?</h3>
            <div className="space-y-6">
              {[
                { title: "Defina sua disponibilidade", status: "Pendente" },
                { title: "Cadastre seus dados bancários", status: "Pendente" },
                { title: "Aguarde aprovação", status: "24-48h" },
                { title: "Comece a dar aulas!", status: "" }
              ].map((s, i) => (
                <div key={i} className="flex items-start gap-4">
                  <div className="w-8 h-8 rounded-full bg-white flex items-center justify-center text-[#5B21B6] font-bold shadow-sm">
                    {i + 1}
                  </div>
                  <div className="flex-1">
                    <p className="font-bold text-gray-900">{s.title}</p>
                    {s.status && <span className="text-xs font-bold text-[#5B21B6] bg-purple-100 px-2 py-0.5 rounded-full">{s.status}</span>}
                  </div>
                </div>
              ))}
            </div>
          </Card>

          <div className="flex flex-col gap-4">
            <Button className="h-14 bg-[#5B21B6] hover:bg-[#4C1D95] rounded-2xl text-lg font-bold">
              Configurar Disponibilidade
            </Button>
            <Button variant="outline" className="h-14 border-2 border-[#5B21B6] text-[#5B21B6] hover:bg-purple-50 rounded-2xl text-lg font-bold">
              Ir para Dashboard
            </Button>
          </div>
          <button className="mt-8 text-[#5B21B6] font-bold hover:underline">
            Precisa de ajuda? Fale com nosso suporte
          </button>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen grid lg:grid-cols-[480px_1fr]">
      {/* Left Panel - Fixed */}
      <div className="hidden lg:flex flex-col justify-between bg-[#312E81] text-white p-12 fixed h-screen w-[480px] overflow-y-auto">
        <div>
          <div className="text-2xl font-black tracking-tighter mb-12">TutorUP</div>
          <motion.img 
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            src={heroIllustration} 
            alt="Hero" 
            className="w-full h-auto mb-12 rounded-3xl" 
          />
          <h1 className="text-4xl font-extrabold mb-4 leading-tight">Ensine. Inspire. Ganhe.</h1>
          <p className="text-purple-100 text-lg leading-relaxed mb-12">Junte-se à nossa comunidade de professores e transforme vidas através da educação.</p>
          
          <div className="grid gap-8 mb-12">
            {[
              { icon: DollarSign, title: "Ganhos Flexíveis", text: "Defina seu próprio valor-hora e receba pagamentos garantidos semanalmente." },
              { icon: Calendar, title: "Horários Flexíveis", text: "Você controla sua disponibilidade. Ensine quando e onde quiser." },
              { icon: Users, title: "Alunos Dedicados", text: "Conectamos você com alunos realmente interessados em aprender." },
              { icon: Shield, title: "Suporte Total", text: "Equipe disponível 24/7 para ajudar em qualquer situação." }
            ].map((b, i) => (
              <div key={i} className="flex gap-4">
                <div className="w-12 h-12 rounded-2xl bg-white/10 flex items-center justify-center flex-shrink-0">
                  <b.icon className="w-6 h-6 text-[#FFF7ED]" />
                </div>
                <div>
                  <h3 className="font-bold text-lg mb-1">{b.title}</h3>
                  <p className="text-sm text-purple-200 leading-relaxed">{b.text}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="space-y-8">
           <div className="flex justify-between items-end border-t border-white/10 pt-8">
             <div>
               <div className="text-3xl font-black text-[#FFF7ED]">500+</div>
               <div className="text-[10px] uppercase font-bold text-purple-300 tracking-[0.2em]">Professores</div>
             </div>
             <div>
               <div className="text-3xl font-black text-[#FFF7ED]">10k+</div>
               <div className="text-[10px] uppercase font-bold text-purple-300 tracking-[0.2em]">Aulas</div>
             </div>
             <div>
               <div className="text-3xl font-black text-[#FFF7ED]">4.9★</div>
               <div className="text-[10px] uppercase font-bold text-purple-300 tracking-[0.2em]">Avaliação</div>
             </div>
           </div>
           <Card className="bg-[#5B21B6] border-none p-6 rounded-2xl shadow-2xl">
             <p className="italic text-purple-100 text-sm leading-relaxed">
               "Ensinar na TutorUP me deu a flexibilidade que eu precisava. Excelente plataforma!"
             </p>
             <div className="mt-4 flex items-center gap-3">
               <div className="w-8 h-8 rounded-full bg-purple-400" />
               <div>
                 <div className="text-xs font-bold text-white">Profa. Ana Silva</div>
                 <div className="text-[10px] text-purple-300">Matemática</div>
               </div>
             </div>
           </Card>
        </div>
      </div>

      {/* Right Panel - Scrollable */}
      <div className="lg:ml-[480px] bg-white min-h-screen flex flex-col items-center">
        <div className="w-full max-w-2xl px-6 py-12 lg:px-24">
          <AnimatePresence mode="wait">
            {!isAccepted ? (
              <motion.div 
                key="welcome"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="py-12"
              >
                <span className="inline-flex items-center px-4 py-1.5 rounded-full text-xs font-bold bg-[#10B981] text-white mb-8">
                  <CheckCircle2 className="w-3.5 h-3.5 mr-1.5" /> CONVITE VÁLIDO
                </span>
                <h1 className="text-5xl font-black text-[#5B21B6] mb-6 leading-[1.1]">Você foi convidado!</h1>
                <p className="text-gray-500 text-xl mb-12 leading-relaxed">Complete seu cadastro para começar a ensinar na TutorUP.</p>
                
                <Card className="bg-[#FFF7ED] border-none rounded-[32px] p-8 mb-12 shadow-sm">
                  <CardContent className="p-0 space-y-8">
                    <div className="w-16 h-16 rounded-2xl bg-[#5B21B6] flex items-center justify-center shadow-xl shadow-purple-200">
                      <Mail className="w-8 h-8 text-white" />
                    </div>
                    <div className="grid gap-6">
                      <div>
                        <label className="text-[10px] uppercase font-black text-gray-400 tracking-[0.2em] mb-2 block">Convidado por</label>
                        <div className="text-2xl font-bold text-gray-900">{invitation.inviterName}</div>
                      </div>
                      <div>
                        <label className="text-[10px] uppercase font-black text-gray-400 tracking-[0.2em] mb-2 block">Email</label>
                        <div className="text-xl font-medium text-gray-700">{invitation.email}</div>
                      </div>
                      <div className="pt-4 border-t border-orange-200/50 flex items-center text-sm font-bold text-gray-500">
                        <Clock className="w-4 h-4 mr-2 text-orange-400" /> Expira em: {new Date(invitation.expiresAt).toLocaleDateString()}
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Button 
                  onClick={() => setIsAccepted(true)} 
                  className="w-full h-16 text-xl font-bold bg-[#5B21B6] hover:bg-[#4C1D95] rounded-3xl shadow-2xl shadow-purple-200 transition-all hover:scale-[1.02]"
                >
                  Aceitar Convite e Cadastrar
                </Button>
                <button 
                  onClick={() => setLocation("/")}
                  className="w-full mt-6 text-sm font-bold text-gray-400 hover:text-gray-600 transition-colors"
                >
                  Recusar convite
                </button>
              </motion.div>
            ) : (
              <motion.div 
                key="form"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                className="py-8"
              >
                {/* Progress bar */}
                <div className="flex items-center gap-2 mb-16">
                  {steps.map((s, i) => (
                    <div key={s.id} className="flex-1 flex flex-col gap-2">
                      <div className={`h-2 rounded-full transition-all duration-500 ${i <= step ? 'bg-[#5B21B6]' : 'bg-gray-100'}`} />
                      <span className={`text-[10px] uppercase font-black tracking-widest ${i === step ? 'text-[#5B21B6]' : 'text-gray-300'}`}>{s.label}</span>
                    </div>
                  ))}
                </div>

                <form onSubmit={form.handleSubmit((data) => registerMutation.mutate(data))} className="space-y-12">
                  {step === 0 && (
                    <div className="space-y-8 animate-in fade-in slide-in-from-right-8 duration-500">
                      <div>
                        <h2 className="text-3xl font-black text-[#5B21B6] mb-2">Informações Pessoais</h2>
                        <p className="text-gray-500 font-medium">Vamos começar com o básico.</p>
                      </div>
                      
                      <div className="grid gap-6">
                        <div className="space-y-2">
                          <label className="text-xs uppercase font-black text-gray-400 tracking-widest">Nome Completo</label>
                          <Input {...form.register("fullName")} className="h-14 rounded-2xl bg-gray-50 border-none focus-visible:ring-[#5B21B6]" placeholder="Seu nome" />
                        </div>
                        <div className="space-y-2">
                          <label className="text-xs uppercase font-black text-gray-400 tracking-widest">Email (Vinculado ao convite)</label>
                          <div className="relative">
                            <Input value={invitation.email} disabled className="h-14 rounded-2xl bg-gray-100 border-none opacity-60 pr-12" />
                            <CheckCircle2 className="w-5 h-5 text-[#10B981] absolute right-4 top-4" />
                          </div>
                        </div>
                        <div className="space-y-2">
                          <label className="text-xs uppercase font-black text-gray-400 tracking-widest">Telefone</label>
                          <Input {...form.register("phone")} className="h-14 rounded-2xl bg-gray-50 border-none" placeholder="(00) 00000-0000" />
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                          <div className="space-y-2">
                            <label className="text-xs uppercase font-black text-gray-400 tracking-widest">Nascimento</label>
                            <Input type="date" {...form.register("birthDate")} className="h-14 rounded-2xl bg-gray-50 border-none" />
                          </div>
                          <div className="space-y-2">
                            <label className="text-xs uppercase font-black text-gray-400 tracking-widest">CPF</label>
                            <Input {...form.register("cpf")} className="h-14 rounded-2xl bg-gray-50 border-none" placeholder="000.000.000-00" />
                          </div>
                        </div>
                      </div>

                      <div className="flex flex-col gap-4 pt-4">
                        <Button type="button" onClick={() => setStep(1)} className="h-14 rounded-2xl bg-[#5B21B6] text-lg font-bold">
                          Continuar <ChevronRight className="ml-2 w-5 h-5" />
                        </Button>
                        <button type="button" onClick={() => setIsAccepted(false)} className="text-sm font-bold text-gray-400">Voltar aos detalhes</button>
                      </div>
                    </div>
                  )}

                  {step === 1 && (
                    <div className="space-y-8 animate-in fade-in slide-in-from-right-8 duration-500">
                      <div>
                        <h2 className="text-3xl font-black text-[#5B21B6] mb-2">Sua Trajetória</h2>
                        <p className="text-gray-500 font-medium">Conte-nos sobre sua experiência acadêmica.</p>
                      </div>

                      <div className="grid gap-6">
                        <div className="space-y-2">
                          <label className="text-xs uppercase font-black text-gray-400 tracking-widest">Formação Acadêmica</label>
                          <select 
                            className="w-full h-14 px-4 rounded-2xl bg-gray-50 border-none text-sm font-medium focus:ring-2 focus:ring-[#5B21B6]"
                            {...form.register("education")}
                          >
                            <option>Ensino Superior Completo</option>
                            <option>Ensino Superior Cursando</option>
                            <option>Pós-Graduação</option>
                            <option>Mestrado</option>
                            <option>Doutorado</option>
                          </select>
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                          <div className="space-y-2">
                            <label className="text-xs uppercase font-black text-gray-400 tracking-widest">Área</label>
                            <Input {...form.register("educationArea")} className="h-14 rounded-2xl bg-gray-50 border-none" placeholder="Ex: Matemática" />
                          </div>
                          <div className="space-y-2">
                            <label className="text-xs uppercase font-black text-gray-400 tracking-widest">Instituição</label>
                            <Input {...form.register("institution")} className="h-14 rounded-2xl bg-gray-50 border-none" placeholder="Nome da Univ." />
                          </div>
                        </div>
                        <div className="space-y-2">
                          <label className="text-xs uppercase font-black text-gray-400 tracking-widest">Anos de Experiência</label>
                          <Input type="number" {...form.register("experienceYears")} className="h-14 rounded-2xl bg-gray-50 border-none" />
                        </div>
                        <div className="space-y-2">
                          <label className="text-xs uppercase font-black text-gray-400 tracking-widest">Biografia Profissional</label>
                          <textarea 
                            className="w-full min-h-[160px] p-4 rounded-3xl bg-gray-50 border-none text-sm font-medium focus:ring-2 focus:ring-[#5B21B6]"
                            {...form.register("bio")} 
                            placeholder="Descreva sua metodologia de ensino e principais conquistas..."
                          />
                        </div>
                      </div>

                      <div className="flex gap-4 pt-4">
                        <Button type="button" variant="outline" onClick={() => setStep(0)} className="h-14 flex-1 rounded-2xl border-2 border-gray-100 font-bold">Voltar</Button>
                        <Button type="button" onClick={() => setStep(2)} className="h-14 flex-1 rounded-2xl bg-[#5B21B6] font-bold">Continuar</Button>
                      </div>
                    </div>
                  )}

                  {step === 2 && (
                    <div className="space-y-8 animate-in fade-in slide-in-from-right-8 duration-500">
                      <div>
                        <h2 className="text-3xl font-black text-[#5B21B6] mb-2">Matérias e Valores</h2>
                        <p className="text-gray-500 font-medium">Como e o que você pretende ensinar?</p>
                      </div>

                      <div className="space-y-6">
                        <div className="space-y-4">
                          <label className="text-sm font-black text-gray-900 uppercase tracking-widest">O que você ensina?</label>
                          <div className="grid grid-cols-2 gap-3">
                            {commonSubjects.map((s) => (
                              <label key={s} className={`flex items-center gap-3 p-4 rounded-2xl border-2 transition-all cursor-pointer ${watchedSubjects.includes(s) ? 'border-[#5B21B6] bg-purple-50' : 'border-gray-50 bg-gray-50'}`}>
                                <Checkbox 
                                  checked={watchedSubjects.includes(s)}
                                  onCheckedChange={(checked) => {
                                    const current = watchedSubjects as string[];
                                    const next = checked ? [...current, s] : current.filter(x => x !== s);
                                    form.setValue("subjects", next as any);
                                  }}
                                />
                                <span className="text-sm font-bold">{s}</span>
                              </label>
                            ))}
                          </div>
                        </div>

                        <div className="space-y-6 py-6 border-y border-gray-50">
                          <div className="flex justify-between items-end">
                            <label className="text-sm font-black text-gray-900 uppercase tracking-widest">Valor-hora</label>
                            <div className="text-3xl font-black text-[#5B21B6]">R$ {watchedHourlyRate}</div>
                          </div>
                          <Slider 
                            value={[parseInt(watchedHourlyRate)]} 
                            min={30} 
                            max={200} 
                            step={5} 
                            onValueChange={(val) => form.setValue("hourlyRate", val[0].toString())} 
                          />
                          <div className="flex items-center gap-2 text-xs font-bold text-gray-400 bg-gray-50 p-3 rounded-xl">
                            <Info className="w-4 h-4 text-blue-500" /> Valor médio na TutorUP: R$ 65/hora
                          </div>
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                           <div className="flex items-center gap-3 p-4 rounded-2xl bg-gray-50">
                             <Monitor className="w-5 h-5 text-gray-400" />
                             <span className="text-sm font-bold">Aulas Online</span>
                             <Checkbox checked disabled className="ml-auto" />
                           </div>
                           <div className="flex items-center gap-3 p-4 rounded-2xl bg-gray-50">
                             <MapPin className="w-5 h-5 text-gray-400" />
                             <span className="text-sm font-bold">Presencial</span>
                             <Checkbox className="ml-auto" />
                           </div>
                        </div>
                      </div>

                      <div className="flex gap-4 pt-4">
                        <Button type="button" variant="outline" onClick={() => setStep(1)} className="h-14 flex-1 rounded-2xl border-2 border-gray-100 font-bold">Voltar</Button>
                        <Button type="button" onClick={() => setStep(3)} className="h-14 flex-1 rounded-2xl bg-[#5B21B6] font-bold">Continuar</Button>
                      </div>
                    </div>
                  )}

                  {step === 3 && (
                    <div className="space-y-8 animate-in fade-in slide-in-from-right-8 duration-500">
                      <div>
                        <h2 className="text-3xl font-black text-[#5B21B6] mb-2">Revise seus dados</h2>
                        <p className="text-gray-500 font-medium">Está tudo pronto para começar.</p>
                      </div>

                      <div className="space-y-4">
                        <Card className="bg-[#FFF7ED] border-none rounded-3xl p-6 relative">
                          <Button variant="ghost" size="icon" onClick={() => setStep(0)} className="absolute top-4 right-4 text-[#5B21B6]">
                            <Pencil className="w-4 h-4" />
                          </Button>
                          <div className="flex items-center gap-4 mb-4">
                             <div className="w-16 h-16 rounded-full bg-purple-200" />
                             <div>
                               <div className="text-lg font-bold">{form.getValues("fullName")}</div>
                               <div className="text-sm text-gray-500">{invitation.email}</div>
                             </div>
                          </div>
                          <div className="text-xs font-bold text-gray-400 uppercase tracking-widest">
                            {form.getValues("phone")} • {form.getValues("cpf")}
                          </div>
                        </Card>

                        <Card className="bg-gray-50 border-none rounded-3xl p-6 relative">
                          <Button variant="ghost" size="icon" onClick={() => setStep(1)} className="absolute top-4 right-4 text-[#5B21B6]">
                            <Pencil className="w-4 h-4" />
                          </Button>
                          <div className="font-bold mb-1">{form.getValues("education")}</div>
                          <div className="text-sm text-gray-600 mb-4">{form.getValues("educationArea")} • {form.getValues("institution")}</div>
                          <p className="text-sm text-gray-500 line-clamp-2 italic">"{form.getValues("bio")}"</p>
                        </Card>

                        <Card className="bg-gray-50 border-none rounded-3xl p-6 relative">
                          <Button variant="ghost" size="icon" onClick={() => setStep(2)} className="absolute top-4 right-4 text-[#5B21B6]">
                            <Pencil className="w-4 h-4" />
                          </Button>
                          <div className="flex flex-wrap gap-2 mb-4">
                            {watchedSubjects.map(s => (
                              <span key={s} className="px-3 py-1 bg-[#5B21B6] text-white text-[10px] font-bold rounded-full">{s}</span>
                            ))}
                          </div>
                          <div className="text-2xl font-black text-[#10B981]">R$ {watchedHourlyRate}/hora</div>
                        </Card>

                        <div className="space-y-4 pt-4">
                          <div className="flex items-center gap-3">
                            <Checkbox id="terms" required />
                            <label htmlFor="terms" className="text-sm font-medium text-gray-600">
                              Li e concordo com os <span className="text-[#5B21B6] font-bold">Termos de Uso</span>
                            </label>
                          </div>
                          <div className="space-y-2">
                             <label className="text-xs uppercase font-black text-gray-400 tracking-widest">Crie uma senha de acesso</label>
                             <Input type="password" {...form.register("password")} className="h-14 rounded-2xl bg-gray-50 border-none" />
                          </div>
                        </div>
                      </div>

                      <div className="flex gap-4 pt-4">
                        <Button type="button" variant="outline" onClick={() => setStep(2)} className="h-14 flex-1 rounded-2xl border-2 border-gray-100 font-bold">Voltar</Button>
                        <Button 
                          type="submit" 
                          disabled={registerMutation.isPending}
                          className="h-14 flex-1 rounded-2xl bg-[#5B21B6] font-bold text-lg shadow-2xl shadow-purple-200"
                        >
                          {registerMutation.isPending ? <Loader2 className="animate-spin" /> : "Finalizar Cadastro"}
                        </Button>
                      </div>
                    </div>
                  )}
                </form>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
