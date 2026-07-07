import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { Link, useNavigate } from "react-router-dom";
import { User, Mail, Lock } from "lucide-react";
import { CosmicPanel, MarsGlyph } from "../components/CosmicPanel";
import { TextField } from "../components/TextField";
import { PhoneField } from "../components/PhoneField";
import { Button } from "../components/Button";
import { AlertBanner } from "../components/AlertBanner";
import { registerSchema, type RegisterFormValues } from "../schemas/auth";
import { register as registerRequest } from "../api/auth";
import { getApiErrorMessage } from "../lib/api-client";
import { useAuth } from "../context/AuthContext";

export default function RegisterPage() {
  const navigate = useNavigate();
  const { signIn } = useAuth();
  const [apiError, setApiError] = useState<string | null>(null);

  const {
    register,
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<RegisterFormValues>({
    resolver: zodResolver(registerSchema),
  });

  const mutation = useMutation({
    mutationFn: registerRequest,
    onSuccess: (data) => {
      signIn(data);
      navigate("/perfil", { replace: true });
    },
    onError: (error) => {
      setApiError(getApiErrorMessage(error));
    },
  });

  const onSubmit = (values: RegisterFormValues) => {
    setApiError(null);
    const { confirmPassword, ...payload } = values;
    void confirmPassword;
    mutation.mutate(payload);
  };

  return (
    <div className="grid min-h-screen lg:grid-cols-2">
      <CosmicPanel
        eyebrow="Nova jornada"
        title="2026 é o ano da conquista. Comece agora."
        description="Crie sua conta e desbloqueie seu guia astrológico completo, com mapas, previsões e orientações personalizadas."
      />

      <div className="flex items-center justify-center bg-offwhite px-6 py-12">
        <div className="w-full max-w-sm" style={{ animation: "rise-fade 0.4s ease-out" }}>
          <div className="mb-8 flex items-center gap-2.5 lg:hidden">
            <MarsGlyph className="h-6 w-6 text-marte" />
            <span className="text-xs font-semibold uppercase tracking-[0.2em] text-noturno">
              Astrólogo José Antonio
            </span>
          </div>

          <h2 className="font-display text-3xl font-semibold text-noturno">Criar conta</h2>
          <p className="mt-2 text-sm text-ink-soft">
            Leva menos de um minuto para começar.
          </p>

          <form onSubmit={handleSubmit(onSubmit)} className="mt-8 flex flex-col gap-5" noValidate>
            {apiError && <AlertBanner message={apiError} />}

            <TextField
              label="Nome completo"
              autoComplete="name"
              placeholder="Maria da Silva"
              icon={<User size={18} />}
              error={errors.name?.message}
              {...register("name")}
            />

            <TextField
              label="E-mail"
              type="email"
              autoComplete="email"
              placeholder="seu@email.com"
              icon={<Mail size={18} />}
              error={errors.email?.message}
              {...register("email")}
            />

            <PhoneField control={control} name="phone" error={errors.phone?.message} />

            <TextField
              label="Senha"
              type="password"
              autoComplete="new-password"
              placeholder="Mínimo 6 caracteres"
              icon={<Lock size={18} />}
              error={errors.password?.message}
              {...register("password")}
            />

            <TextField
              label="Confirmar senha"
              type="password"
              autoComplete="new-password"
              placeholder="Repita a senha"
              icon={<Lock size={18} />}
              error={errors.confirmPassword?.message}
              {...register("confirmPassword")}
            />

            <Button type="submit" isLoading={isSubmitting || mutation.isPending} className="mt-1 w-full">
              Criar conta
            </Button>
          </form>

          <p className="mt-8 text-center text-sm text-ink-soft">
            Já tem conta?{" "}
            <Link to="/login" className="font-semibold text-marte hover:text-marte-dark">
              Entrar
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
