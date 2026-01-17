import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Link, useLocation } from "wouter";
import { motion, AnimatePresence } from "framer-motion";
import { 
  CheckCircle2, 
  User, 
  FileText, 
  Users, 
  ShieldCheck, 
  ClipboardCheck, 
  PartyPopper,
  ArrowRight,
  ArrowLeft,
  Upload,
  Info
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { ScrollArea } from "@/components/ui/scroll-area";

// Illustrations
import imgTerms from "@assets/generated_images/terms_and_conditions_illustration.png";
import imgInfo from "@assets/generated_images/user_information_form_illustration.png";
import imgDocs from "@assets/generated_images/identity_verification_illustration.png";
import imgDecision from "@assets/generated_images/beneficiary_selection_illustration.png";
import imgBeneficiary from "@assets/generated_images/beneficiary_details_illustration.png";
import imgReview from "@assets/generated_images/review_and_confirm_illustration.png";
import imgSuccess from "@assets/generated_images/registration_success_celebration_illustration.png";

const steps = [
  { id: 0, title: "Termos", icon: FileText },
  { id: 1, title: "Suas Informações", icon: User },
  { id: 2, title: "Documentos", icon: ShieldCheck },
  { id: 3, title: "Beneficiários", icon: Users },
  { id: 4, title: "Detalhes", icon: ClipboardCheck },
  { id: 5, title: "Revisão", icon: ClipboardCheck },
];

const registerSchema = z.object({
  acceptTerms: z.boolean().refine(val => val === true, "Você deve aceitar os termos"),
  fullName: z.string().min(3, "Nome completo é obrigatório"),
  email: z.string().email("Email inválido"),
  phone: z.string().min(10, "Telefone inválido"),
  password: z.string().min(6, "Mínimo de 6 caracteres"),
  confirmPassword: z.string(),
  addBeneficiaryNow: z.enum(["now", "later"]),
  beneficiaryName: z.string().optional(),
}).refine(data => data.password === data.confirmPassword, {
  message: "As senhas não coincidem",
  path: ["confirmPassword"],
});

export default function RegisterUser() {
  const [currentStep, setCurrentStep] = useState(0);
  const [, setLocation] = useLocation();
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm<z.infer<typeof registerSchema>>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      acceptTerms: false,
      fullName: "",
      email: "",
      phone: "",
      password: "",
      confirmPassword: "",
      addBeneficiaryNow: "later",
    },
  });

  const nextStep = async () => {
    const fieldsToValidate = getFieldsForStep(currentStep);
    const isValid = await form.trigger(fieldsToValidate as any);
    if (isValid) setCurrentStep(prev => prev + 1);
  };

  const prevStep = () => setCurrentStep(prev => prev - 1);

  const getFieldsForStep = (step: number) => {
    switch (step) {
      case 0: return ["acceptTerms"];
      case 1: return ["fullName", "email", "phone", "password", "confirmPassword"];
      case 3: return ["addBeneficiaryNow"];
      default: return [];
    }
  };

  const onSubmit = async (values: z.infer<typeof registerSchema>) => {
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      setCurrentStep(6); // Success step
    }, 2000);
  };

  if (currentStep === 6) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center p-6">
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="max-w-md w-full text-center bg-white p-12 rounded-3xl shadow-xl shadow-primary/5"
        >
          <img src={imgSuccess} alt="Sucesso" className="w-48 h-48 mx-auto mb-8" />
          <h1 className="text-3xl font-bold font-heading text-primary mb-4">Parabéns!</h1>
          <p className="text-muted-foreground mb-8">
            Seu cadastro foi realizado com sucesso. Agora você pode acessar seu painel e começar a agendar aulas.
          </p>
          <Button onClick={() => setLocation("/")} className="w-full h-12 bg-primary rounded-xl font-bold">
            Ir para o Painel
          </Button>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background flex flex-col lg:flex-row">
      {/* Sidebar Stepper - Desktop */}
      <div className="hidden lg:flex w-80 bg-white border-r border-border p-12 flex-col gap-8">
        <Link href="/">
          <a className="text-2xl font-bold font-heading text-primary flex items-center gap-1 mb-8">
            TutorUP<span className="text-accent text-3xl leading-none">.</span>
          </a>
        </Link>
        <div className="space-y-6">
          {steps.map((step) => (
            <div key={step.id} className="flex items-center gap-4">
              <div className={`w-10 h-10 rounded-full flex items-center justify-center border-2 transition-colors ${
                currentStep === step.id ? "bg-primary border-primary text-white" :
                currentStep > step.id ? "bg-primary/10 border-primary text-primary" :
                "border-gray-200 text-gray-400"
              }`}>
                {currentStep > step.id ? <CheckCircle2 size={20} /> : <step.icon size={20} />}
              </div>
              <span className={`text-sm font-bold ${currentStep === step.id ? "text-primary" : "text-gray-400"}`}>
                {step.title}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col items-center justify-center p-6 sm:p-12 overflow-y-auto">
        <div className="w-full max-w-2xl bg-white rounded-3xl p-8 sm:p-12 shadow-sm border border-border">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentStep}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.3 }}
                >
                  {currentStep === 0 && (
                    <div className="space-y-6 text-center">
                      <img src={imgTerms} alt="Termos" className="w-48 h-48 mx-auto" />
                      <h2 className="text-3xl font-bold font-heading text-[#1e1b4b]">Bem-vindo ao TutorUP!</h2>
                      <p className="text-muted-foreground">Antes de começar, entenda como funciona:</p>
                      
                      <div className="bg-primary/5 p-6 rounded-2xl flex gap-6 text-left">
                        <div className="flex-1 text-center">
                          <div className="bg-white p-3 rounded-xl shadow-sm inline-block mb-2">
                            <User className="text-primary" />
                          </div>
                          <p className="text-xs font-bold uppercase tracking-wider text-primary mb-1">Você</p>
                          <p className="text-[11px] text-gray-600">Cadastra a conta como usuário</p>
                        </div>
                        <div className="w-px bg-primary/10" />
                        <div className="flex-1 text-center">
                          <div className="bg-white p-3 rounded-xl shadow-sm inline-block mb-2">
                            <Users className="text-accent" />
                          </div>
                          <p className="text-xs font-bold uppercase tracking-wider text-accent mb-1">Beneficiários</p>
                          <p className="text-[11px] text-gray-600">Pessoas que receberão as aulas</p>
                        </div>
                      </div>

                      <ScrollArea className="h-48 rounded-xl border border-gray-100 bg-gray-50 p-6 text-left text-sm text-gray-600 leading-relaxed">
                        <h4 className="font-bold text-primary mb-2">1. Coleta de Dados</h4>
                        <p className="mb-4">Coletamos informações básicas para garantir a segurança da plataforma e dos alunos.</p>
                        <h4 className="font-bold text-primary mb-2">2. Verificação</h4>
                        <p className="mb-4">Todos os usuários passam por um processo de verificação de identidade.</p>
                        <h4 className="font-bold text-primary mb-2">3. Privacidade</h4>
                        <p>Seus dados são protegidos por criptografia de ponta a ponta.</p>
                      </ScrollArea>

                      <FormField
                        control={form.control}
                        name="acceptTerms"
                        render={({ field }) => (
                          <FormItem className="flex flex-row items-start space-x-3 space-y-0 text-left">
                            <FormControl>
                              <Checkbox
                                checked={field.value}
                                onCheckedChange={field.onChange}
                                className="w-6 h-6 rounded-lg border-2 border-gray-200 data-[state=checked]:bg-primary data-[state=checked]:border-primary"
                              />
                            </FormControl>
                            <div className="space-y-1 leading-none">
                              <FormLabel className="text-sm font-medium text-gray-700">
                                Li e aceito os <span className="text-accent font-bold cursor-pointer">Termos de Uso</span> e <span className="text-accent font-bold cursor-pointer">Política de Privacidade</span>
                              </FormLabel>
                            </div>
                          </FormItem>
                        )}
                      />
                    </div>
                  )}

                  {currentStep === 1 && (
                    <div className="space-y-6">
                      <div className="text-center">
                        <img src={imgInfo} alt="Informações" className="w-40 h-40 mx-auto mb-4" />
                        <h2 className="text-2xl font-bold font-heading">Suas informações pessoais</h2>
                        <p className="text-muted-foreground">Precisamos de alguns dados para criar sua conta.</p>
                      </div>
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <FormField control={form.control} name="fullName" render={({ field }) => (
                          <FormItem className="col-span-2">
                            <FormLabel>Nome Completo</FormLabel>
                            <Input placeholder="Seu nome completo" {...field} className="h-12 rounded-xl" />
                            <FormMessage />
                          </FormItem>
                        )} />
                        <FormField control={form.control} name="email" render={({ field }) => (
                          <FormItem>
                            <FormLabel>Email</FormLabel>
                            <Input placeholder="seu@email.com" {...field} className="h-12 rounded-xl" />
                            <FormMessage />
                          </FormItem>
                        )} />
                        <FormField control={form.control} name="phone" render={({ field }) => (
                          <FormItem>
                            <FormLabel>Telefone</FormLabel>
                            <Input placeholder="(00) 00000-0000" {...field} className="h-12 rounded-xl" />
                            <FormMessage />
                          </FormItem>
                        )} />
                        <FormField control={form.control} name="password" render={({ field }) => (
                          <FormItem>
                            <FormLabel>Senha</FormLabel>
                            <Input type="password" placeholder="••••••" {...field} className="h-12 rounded-xl" />
                            <FormMessage />
                          </FormItem>
                        )} />
                        <FormField control={form.control} name="confirmPassword" render={({ field }) => (
                          <FormItem>
                            <FormLabel>Confirmar Senha</FormLabel>
                            <Input type="password" placeholder="••••••" {...field} className="h-12 rounded-xl" />
                            <FormMessage />
                          </FormItem>
                        )} />
                      </div>
                    </div>
                  )}

                  {currentStep === 2 && (
                    <div className="space-y-6">
                      <div className="text-center">
                        <img src={imgDocs} alt="Documentos" className="w-40 h-40 mx-auto mb-4" />
                        <h2 className="text-2xl font-bold font-heading text-[#1e1b4b]">Verificação de identidade</h2>
                        <p className="text-muted-foreground">Para sua segurança, precisamos verificar sua identidade.</p>
                      </div>

                      <div className="bg-primary/5 p-4 rounded-xl flex gap-3 mb-6">
                        <ShieldCheck className="text-primary w-5 h-5 shrink-0" />
                        <p className="text-xs text-gray-600">Suas informações são criptografadas e nunca compartilhadas com terceiros.</p>
                      </div>

                      <div className="space-y-4">
                        <div className="p-8 border-2 border-dashed border-primary/20 rounded-2xl text-center hover:bg-primary/5 transition-colors cursor-pointer group">
                          <Upload className="mx-auto w-8 h-8 text-accent mb-3 group-hover:scale-110 transition-transform" />
                          <p className="font-bold text-gray-700">Foto do seu CPF ou RG</p>
                          <p className="text-xs text-gray-400 mt-1">Clique para fazer upload ou arraste aqui</p>
                        </div>
                        <div className="p-8 border-2 border-dashed border-primary/20 rounded-2xl text-center hover:bg-primary/5 transition-colors cursor-pointer group">
                          <Upload className="mx-auto w-8 h-8 text-accent mb-3 group-hover:scale-110 transition-transform" />
                          <p className="font-bold text-gray-700">Selfie segurando o documento</p>
                          <p className="text-xs text-gray-400 mt-1">Clique para fazer upload ou arraste aqui</p>
                        </div>
                      </div>
                    </div>
                  )}

                  {currentStep === 3 && (
                    <div className="space-y-6">
                      <div className="text-center">
                        <img src={imgDecision} alt="Decisão" className="w-44 h-44 mx-auto mb-4" />
                        <h2 className="text-2xl font-bold font-heading text-[#1e1b4b]">Quem receberá as aulas?</h2>
                        <p className="text-muted-foreground">Você pode cadastrar beneficiários agora ou adicionar depois.</p>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <label className={`p-6 border-2 rounded-2xl cursor-pointer transition-all ${
                          form.watch("addBeneficiaryNow") === "now" ? "border-primary bg-primary/5 shadow-md shadow-primary/5" : "border-gray-100 bg-white"
                        }`}>
                          <input type="radio" {...form.register("addBeneficiaryNow")} value="now" className="hidden" />
                          <Users className="text-accent mb-3" size={32} />
                          <p className="font-bold text-gray-800">Cadastrar agora</p>
                          <p className="text-xs text-gray-500 mt-1">Adicione de 1 a 3 beneficiários agora.</p>
                        </label>
                        <label className={`p-6 border-2 rounded-2xl cursor-pointer transition-all ${
                          form.watch("addBeneficiaryNow") === "later" ? "border-primary bg-primary/5 shadow-md shadow-primary/5" : "border-gray-100 bg-white"
                        }`}>
                          <input type="radio" {...form.register("addBeneficiaryNow")} value="later" className="hidden" />
                          <ArrowRight className="text-primary mb-3" size={32} />
                          <p className="font-bold text-gray-800">Adicionar depois</p>
                          <p className="text-xs text-gray-500 mt-1">Pule esta etapa e adicione quando quiser.</p>
                        </label>
                      </div>

                      <div className="bg-[#FFF7ED] p-4 rounded-xl flex gap-3">
                        <Info className="text-primary w-5 h-5 shrink-0" />
                        <p className="text-xs text-gray-600">Você pode adicionar, editar ou remover beneficiários a qualquer momento no seu painel.</p>
                      </div>
                    </div>
                  )}

                  {currentStep === 4 && (
                    <div className="space-y-6">
                      <div className="text-center">
                        <img src={imgBeneficiary} alt="Detalhes" className="w-40 h-40 mx-auto mb-4" />
                        <h2 className="text-2xl font-bold font-heading text-[#1e1b4b]">Informações do beneficiário</h2>
                        <p className="text-muted-foreground">Preencha os dados de quem receberá as aulas.</p>
                      </div>

                      {form.watch("addBeneficiaryNow") === "now" ? (
                        <div className="space-y-4">
                          <FormField control={form.control} name="beneficiaryName" render={({ field }) => (
                            <FormItem>
                              <FormLabel>Nome do Beneficiário</FormLabel>
                              <Input placeholder="Nome completo da criança" {...field} className="h-12 rounded-xl" />
                              <FormMessage />
                            </FormItem>
                          )} />
                          {/* More fields could go here */}
                          <div className="p-4 bg-gray-50 rounded-xl border border-gray-100">
                            <p className="text-xs text-gray-500 italic">Dica: Adicione informações como série escolar e matérias de interesse para encontrarmos o professor ideal.</p>
                          </div>
                        </div>
                      ) : (
                        <div className="text-center py-12 bg-gray-50 rounded-2xl border-2 border-dashed border-gray-100">
                          <p className="text-gray-500 font-medium">Você escolheu adicionar depois.</p>
                          <p className="text-xs text-gray-400 mt-1">Clique em próximo para revisar seu cadastro.</p>
                        </div>
                      )}
                    </div>
                  )}

                  {currentStep === 5 && (
                    <div className="space-y-6">
                      <div className="text-center">
                        <img src={imgReview} alt="Revisão" className="w-40 h-40 mx-auto mb-4" />
                        <h2 className="text-2xl font-bold font-heading text-[#1e1b4b]">Quase lá!</h2>
                        <p className="text-muted-foreground">Revise suas informações antes de finalizar.</p>
                      </div>

                      <div className="space-y-4 bg-gray-50 p-6 rounded-2xl border border-gray-100">
                        <div className="flex justify-between border-b border-gray-200 pb-2">
                          <span className="text-sm text-gray-500">Nome:</span>
                          <span className="text-sm font-bold text-gray-800">{form.getValues("fullName")}</span>
                        </div>
                        <div className="flex justify-between border-b border-gray-200 pb-2">
                          <span className="text-sm text-gray-500">Email:</span>
                          <span className="text-sm font-bold text-gray-800">{form.getValues("email")}</span>
                        </div>
                        <div className="flex justify-between border-b border-gray-200 pb-2">
                          <span className="text-sm text-gray-500">Telefone:</span>
                          <span className="text-sm font-bold text-gray-800">{form.getValues("phone")}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-sm text-gray-500">Beneficiários:</span>
                          <span className="text-sm font-bold text-gray-800">
                            {form.getValues("addBeneficiaryNow") === "now" ? "Cadastrar agora" : "Depois"}
                          </span>
                        </div>
                      </div>

                      <div className="p-4 bg-accent/5 rounded-xl border border-accent/10">
                        <p className="text-[11px] text-accent font-medium leading-relaxed">
                          Ao clicar em finalizar, você confirma que todas as informações acima estão corretas e que você leu e concorda com nossos termos.
                        </p>
                      </div>
                    </div>
                  )}
                </motion.div>
              </AnimatePresence>

              <div className="flex gap-4 pt-4 border-t border-gray-100">
                {currentStep > 0 && (
                  <Button type="button" variant="outline" onClick={prevStep} className="flex-1 h-12 rounded-xl font-bold border-2 border-gray-100 text-gray-500 hover:bg-gray-50">
                    <ArrowLeft className="mr-2 h-4 w-4" /> Voltar
                  </Button>
                )}
                {currentStep < 5 ? (
                  <Button type="button" onClick={nextStep} className="flex-1 h-12 bg-primary rounded-xl font-bold shadow-lg shadow-primary/20">
                    Próximo <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                ) : (
                  <Button type="submit" disabled={isLoading} className="flex-1 h-12 bg-primary rounded-xl font-bold shadow-lg shadow-primary/20">
                    {isLoading ? "Finalizando..." : "Finalizar Cadastro"}
                  </Button>
                )}
              </div>
            </form>
          </Form>
        </div>
        
        <p className="mt-8 text-sm text-gray-400">
          Já tem uma conta? <Link href="/login" className="text-primary font-bold hover:underline">Entre aqui</Link>
        </p>
      </div>
    </div>
  );
}
