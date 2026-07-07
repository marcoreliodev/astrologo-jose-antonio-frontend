import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Mail, Lock } from "lucide-react";
import { CosmicPanel, MarsGlyph } from "../components/CosmicPanel";
import { TextField } from "../components/TextField";
import { Button } from "../components/Button";
import { AlertBanner } from "../components/AlertBanner";
import { loginSchema, type LoginFormValues } from "../schemas/auth";
import { login } from "../api/auth";
import { getApiErrorMessage } from "../lib/api-client";
import { useAuth } from "../context/AuthContext";

export default function LoginPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const { signIn } = useAuth();
  const [apiError, setApiError] = useState<string | null>(null);

  const from = (location.state as { from?: { pathname: string } } | null)?.from?.pathname ?? "/perfil";

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
  });

  const mutation = useMutation({
    mutationFn: login,
    onSuccess: (data) => {
      signIn(data);
      navigate(from, { replace: true });
    },
    onError: (error) => {
      setApiError(getApiErrorMessage(error));
    },
  });

  const onSubmit = (values: LoginFormValues) => {
    setApiError(null);
    mutation.mutate(values);
  };

  return (
    <div className="grid min-h-screen lg:grid-cols-2">
      <CosmicPanel
        eyebrow="Acesso reservado"
        title="O alinhamento começa com sua entrada."
        description="Continue de onde parou: previsões, mapas e o acompanhamento do seu Ano da Conquista."
      />

      <div className="flex items-center justify-center bg-offwhite px-6 py-12">
        <div className="w-full max-w-sm" style={{ animation: "rise-fade 0.4s ease-out" }}>
          <div className="mb-8 flex items-center gap-2.5 lg:hidden">
            <MarsGlyph className="h-6 w-6 text-marte" />
            <span className="text-xs font-semibold uppercase tracking-[0.2em] text-noturno">
              Astrólogo José Antonio
            </span>
          </div>

          <h2 className="font-display text-3xl font-semibold text-noturno">Entrar</h2>
          <p className="mt-2 text-sm text-ink-soft">
            Acesse sua conta para continuar sua jornada astral.
          </p>

          <form onSubmit={handleSubmit(onSubmit)} className="mt-8 flex flex-col gap-5" noValidate>
            {apiError && <AlertBanner message={apiError} />}

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
              autoComplete="current-password"
              placeholder="••••••••"
              icon={<Lock size={18} />}
              error={errors.password?.message}
              {...register("password")}
            />

            <Button type="submit" isLoading={isSubmitting || mutation.isPending} className="mt-1 w-full">
              Entrar
            </Button>
          </form>

          <p className="mt-8 text-center text-sm text-ink-soft">
            Ainda não tem conta?{" "}
            <Link to="/cadastro" className="font-semibold text-marte hover:text-marte-dark">
              Criar conta
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
