import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Link, useLocation } from "wouter";
import { motion } from "framer-motion";
import { Eye, EyeOff, Lock, Shield, CheckCircle2 } from "lucide-react";
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
import loginIllustration from "@assets/generated_images/login_illustration_for_tutorup_dashboard_access.png";

const loginSchema = z.object({
  email: z.string().email("Por favor, insira um email válido"),
  password: z.string().min(1, "A senha é obrigatória"),
  rememberMe: z.boolean().default(false),
});

export default function Login() {
  const [showPassword, setShowPassword] = useState(false);
  const [, setLocation] = useLocation();
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm<z.infer<typeof loginSchema>>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
      rememberMe: false,
    },
  });

  async function onSubmit(values: z.infer<typeof loginSchema>) {
    setIsLoading(true);
    // Simulating login
    setTimeout(() => {
      setIsLoading(false);
      setLocation("/");
    }, 1500);
  }

  return (
    <div className="min-h-screen flex flex-col lg:flex-row bg-background">
      {/* Left Panel - Illustration & Brand */}
      <div className="hidden lg:flex lg:w-1/2 bg-[#FFF7ED] flex-col justify-center items-center p-16 relative overflow-hidden">
        {/* Subtle geometric pattern placeholder */}
        <div className="absolute inset-0 opacity-5 pointer-events-none">
          <svg width="100%" height="100%">
            <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
              <path d="M 40 0 L 0 0 0 40" fill="none" stroke="currentColor" strokeWidth="1"/>
            </pattern>
            <rect width="100%" height="100%" fill="url(#grid)" />
          </svg>
        </div>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="z-10 text-center mb-12"
        >
          <Link href="/">
            <a className="text-4xl font-bold font-heading text-primary flex items-center justify-center gap-1 mb-8">
              TutorUP<span className="text-accent text-5xl leading-none">.</span>
            </a>
          </Link>
          <h1 className="text-5xl font-bold text-[#1e1b4b] mb-4 font-heading tracking-tight">
            Bem-vindo de volta!
          </h1>
          <p className="text-xl text-muted-foreground max-w-md mx-auto">
            Acesse sua conta e continue aprendendo com os melhores professores.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2 }}
          className="relative w-full max-w-[500px] aspect-square z-10"
        >
          <img 
            src={loginIllustration} 
            alt="Login Illustration" 
            className="w-full h-full object-contain drop-shadow-2xl"
          />
        </motion.div>

        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="flex gap-8 mt-12 z-10"
        >
          <div className="flex items-center gap-2 text-sm text-muted-foreground font-medium">
            <Lock className="w-4 h-4 text-primary" />
            <span>Conexão Segura</span>
          </div>
          <div className="flex items-center gap-2 text-sm text-muted-foreground font-medium">
            <Shield className="w-4 h-4 text-primary" />
            <span>Dados Protegidos</span>
          </div>
          <div className="flex items-center gap-2 text-sm text-muted-foreground font-medium">
            <CheckCircle2 className="w-4 h-4 text-primary" />
            <span>99% Uptime</span>
          </div>
        </motion.div>
      </div>

      {/* Right Panel - Form */}
      <div className="flex-1 flex flex-col justify-center items-center p-6 sm:p-12 lg:p-24 bg-white">
        <div className="w-full max-w-[440px]">
          {/* Mobile Header */}
          <div className="lg:hidden text-center mb-10">
            <Link href="/">
              <a className="text-3xl font-bold font-heading text-primary flex items-center justify-center gap-1 mb-6">
                TutorUP<span className="text-accent text-4xl leading-none">.</span>
              </a>
            </Link>
            <h1 className="text-3xl font-bold text-[#1e1b4b] mb-2 font-heading">Bem-vindo!</h1>
            <p className="text-muted-foreground">Acesse sua conta para continuar</p>
          </div>

          <div className="mb-10">
            <h2 className="text-3xl font-bold text-[#1e1b4b] mb-2 font-heading">Entrar na sua conta</h2>
            <p className="text-muted-foreground">Use seu email e senha para acessar</p>
          </div>

          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-sm font-semibold text-gray-700">Email</     FormLabel>
                    <FormControl>
                      <Input 
                        placeholder="seu@email.com" 
                        {...field} 
                        className="h-12 border-2 border-gray-100 rounded-xl focus:border-primary focus:ring-4 focus:ring-primary/5 transition-all"
                      />
                    </FormControl>
                    <FormMessage className="text-accent text-xs" />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-sm font-semibold text-gray-700">Senha</FormLabel>
                    <FormControl>
                      <div className="relative">
                        <Input 
                          type={showPassword ? "text" : "password"} 
                          placeholder="••••••••" 
                          {...field} 
                          className="h-12 border-2 border-gray-100 rounded-xl focus:border-primary focus:ring-4 focus:ring-primary/5 transition-all"
                        />
                        <button
                          type="button"
                          onClick={() => setShowPassword(!showPassword)}
                          className="absolute right-3 top-1/2 -translate-y-1/2 p-2 text-gray-400 hover:text-gray-600 transition-colors"
                        >
                          {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                        </button>
                      </div>
                    </FormControl>
                    <FormMessage className="text-accent text-xs" />
                  </FormItem>
                )}
              />

              <div className="flex items-center justify-between">
                <FormField
                  control={form.control}
                  name="rememberMe"
                  render={({ field }) => (
                    <div className="flex items-center space-x-2">
                      <Checkbox 
                        id="rememberMe" 
                        checked={field.value}
                        onCheckedChange={field.onChange}
                        className="w-5 h-5 rounded-md border-2 border-gray-200 data-[state=checked]:bg-primary data-[state=checked]:border-primary transition-colors"
                      />
                      <label htmlFor="rememberMe" className="text-sm font-medium text-gray-600 cursor-pointer">
                        Lembrar de mim
                      </label>
                    </div>
                  )}
                />
                <button type="button" className="text-sm font-bold text-accent hover:underline transition-all">
                  Esqueceu a senha?
                </button>
              </div>

              <Button 
                type="submit" 
                disabled={isLoading}
                className="w-full h-12 bg-primary hover:bg-primary/90 text-white font-bold rounded-xl shadow-lg shadow-primary/20 hover:-translate-y-0.5 active:translate-y-0 transition-all duration-200"
              >
                {isLoading ? (
                  <span className="flex items-center gap-2">
                    <svg className="animate-spin h-5 w-5 text-white" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                    </svg>
                    Entrando...
                  </span>
                ) : "Entrar"}
              </Button>
            </form>
          </Form>

          <div className="mt-8 relative flex items-center justify-center">
            <div className="absolute inset-0 flex items-center">
              <span className="w-full border-t border-gray-100"></span>
            </div>
            <span className="relative px-4 bg-white text-sm text-gray-400 font-medium">ou</span>
          </div>

            <p className="text-gray-600">
              Não tem conta?{" "}
              <Link href="/register">
                <a className="text-primary font-bold hover:underline">Criar conta gratuita</a>
              </Link>
            </p>

          {/* Dev Mode Credentials */}
          {process.env.NODE_ENV === 'development' && (
            <div className="mt-10 p-4 bg-primary/5 rounded-xl border border-primary/10">
              <h4 className="text-xs font-bold text-primary uppercase tracking-widest mb-3">Contas de teste</h4>
              <ul className="space-y-1 text-[11px] text-gray-500 font-medium">
                <li><span className="text-primary/70">Usuário:</span> maria@email.com</li>
                <li><span className="text-primary/70">Professor:</span> joao@email.com</li>
                <li><span className="text-primary/70">Admin:</span> admin@tutorup.com</li>
                <li><span className="text-primary/70">Senha:</span> qualquer valor</li>
              </ul>
              <p className="mt-3 text-[10px] italic text-gray-400">Apenas visível em modo de desenvolvimento</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
