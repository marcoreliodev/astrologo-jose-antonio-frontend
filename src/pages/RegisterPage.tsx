import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { Link, useNavigate } from "react-router-dom";
import { User, Mail, Lock, Sparkles } from "lucide-react";
import { CosmicPanel } from "../components/CosmicPanel";
import { TextField } from "../components/TextField";
import { PhoneField } from "../components/PhoneField";
import { TermsCheckbox } from "../components/TermsCheckbox";
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
    defaultValues: { name: "", email: "", phone: "", password: "", acceptedTerms: false },
  });

  const mutation = useMutation({
    mutationFn: (values: RegisterFormValues) =>
    registerRequest({ ...values, phone: values.phone ?? "" }),
    onSuccess: (data) => {
      signIn(data);
      navigate("/mapa-astral", { replace: true });
    },
    onError: (error) => {
      setApiError(getApiErrorMessage(error));
    },
  });

  const onSubmit = (values: RegisterFormValues) => {
    setApiError(null);
    mutation.mutate(values);
  };

  return (
    <div className="grid min-h-screen lg:grid-cols-2">
      <CosmicPanel
        eyebrow="Mapa astral gratuito"
        title="Descubra o que os astros diziam no seu nascimento."
        description="Crie sua conta em menos de um minuto e gere agora o seu mapa astral completo, com planetas, casas e aspectos calculados com precisão."
      />

      <div className="flex items-center justify-center bg-offwhite px-6 py-12">
        <div className="w-full max-w-sm" style={{ animation: "rise-fade 0.4s ease-out" }}>
          <div className="mb-8 flex items-center gap-2.5 lg:hidden">
            <span className="text-xs font-semibold uppercase tracking-[0.2em] text-noturno">
              Astrólogo José Antonio
            </span>
          </div>

          <h2 className="font-display text-3xl font-semibold text-noturno">
            Gere seu mapa astral gratuito
          </h2>
          <p className="mt-2 text-sm text-ink-soft">
            Só precisamos do seu nome, e-mail e uma senha. Leva menos de um minuto.
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

            <TextField
              label="Senha"
              type="password"
              autoComplete="new-password"
              placeholder="Mínimo 6 caracteres"
              icon={<Lock size={18} />}
              error={errors.password?.message}
              {...register("password")}
            />

            <PhoneField
              control={control}
              name="phone"
              label="Telefone (opcional)"
              error={errors.phone?.message}
            />

            <TermsCheckbox control={control} name="acceptedTerms" error={errors.acceptedTerms?.message} />

            <Button type="submit" isLoading={isSubmitting || mutation.isPending} className="mt-1 w-full">
              <Sparkles size={18} />
              Gerar meu mapa astral
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
