import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { X, Mail, Lock, User, Clock, CalendarDays, Sparkles, ArrowLeft } from "lucide-react";
import { TextField } from "./TextField";
import { PhoneField } from "./PhoneField";
import { TermsCheckbox } from "./TermsCheckbox";
import { CityAutocomplete } from "./CityAutocomplete";
import { Button } from "./Button";
import { AlertBanner } from "./AlertBanner";
import { accountStepSchema, type AccountStepValues } from "../schemas/generate-flow";
import { chartFormSchema, type ChartFormValues } from "../schemas/charts";
import { register as registerRequest } from "../api/auth";
import { createChart } from "../api/charts";
import { getApiErrorMessage } from "../lib/api-client";
import { useAuth } from "../context/AuthContext";
import { useGenerateFlow } from "../context/GenerateFlowContext";
import type { CityOption, AstralChart } from "../types/charts";

/**
 * Formulário de duas etapas (conta -> dados de nascimento) que substitui o
 * texto de marketing do hero quando o usuário clica em "Gere seu mapa
 * astral gratuito". Nunca navega para outra rota até o mapa ser gerado.
 *
 * A conta é criada já ao final do Passo 1 (não no envio final), para que o
 * usuário já esteja autenticado ao chegar no Passo 2 — a busca de cidade
 * usa um endpoint autenticado, então precisamos do token antes de exibi-la.
 */
export function HeroGenerateFlow({ onGenerated }: { onGenerated: (chart: AstralChart) => void }) {
  const { closeFlow } = useGenerateFlow();
  const { isAuthenticated, user, signIn } = useAuth();

  const [step, setStep] = useState<"account" | "birth">(isAuthenticated ? "birth" : "account");
  const [apiError, setApiError] = useState<string | null>(null);

  const accountForm = useForm<AccountStepValues>({
    resolver: zodResolver(accountStepSchema),
    defaultValues: { name: "", email: "", phone: "", password: "", acceptedTerms: false },
  });

  const birthForm = useForm<ChartFormValues>({
    resolver: zodResolver(chartFormSchema),
    defaultValues: {
      name: user?.name ?? "",
      birthDate: "",
      birthTime: "",
      city: "",
      state: "",
      country: "",
    },
  });

  const registerMutation = useMutation({
    mutationFn: (values: AccountStepValues) =>
    registerRequest({ ...values, phone: values.phone ?? "", acceptedTermsAt: new Date().toISOString() }),
    onSuccess: (authResponse, values) => {
      signIn(authResponse);
      birthForm.setValue("name", values.name);
      setStep("birth");
    },
    onError: (error) => setApiError(getApiErrorMessage(error)),
  });

  const chartMutation = useMutation({
    mutationFn: createChart,
    onSuccess: (chart) => onGenerated(chart),
    onError: (error) => setApiError(getApiErrorMessage(error)),
  });

  const cityValue = birthForm.watch("city");

  const onAccountSubmit = (values: AccountStepValues) => {
    setApiError(null);
    registerMutation.mutate(values);
  };

  const onBirthSubmit = (values: ChartFormValues) => {
    setApiError(null);
    chartMutation.mutate(buildChartPayload(values));
  };

  const onCitySelect = (city: CityOption) => {
    birthForm.setValue("city", city.city, { shouldValidate: true });
    birthForm.setValue("state", city.state, { shouldValidate: true });
    birthForm.setValue("country", city.country, { shouldValidate: true });
    birthForm.setValue("lat", city.lat, { shouldValidate: true });
    birthForm.setValue("lon", city.lon, { shouldValidate: true });
  };

  const onCityClear = () => {
    birthForm.setValue("city", "", { shouldValidate: false });
    birthForm.setValue("state", "", { shouldValidate: false });
    birthForm.setValue("country", "", { shouldValidate: false });
    birthForm.resetField("lat");
    birthForm.resetField("lon");
  };

  const isBusy = birthForm.formState.isSubmitting || chartMutation.isPending;

  return (
    <div
      className="relative w-full max-w-md overflow-hidden rounded-3xl bg-white shadow-2xl"
      style={{ animation: "rise-fade 0.35s ease-out" }}
    >
      <div className="flex items-center justify-between gap-3 border-b border-line px-6 py-4">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-bronze">
            Passo {step === "account" ? "1" : "2"} de 2
          </p>
          <h2 className="font-display text-lg font-semibold text-noturno">
            {step === "account" ? "Crie sua conta gratuita" : "Dados para o seu mapa"}
          </h2>
        </div>
        <button
          type="button"
          onClick={closeFlow}
          aria-label="Fechar"
          className="rounded-full p-2 text-ink-soft transition-colors hover:bg-noturno/5 hover:text-noturno"
        >
          <X size={18} />
        </button>
      </div>

      <div className="flex gap-1.5 px-6 pt-4">
        <span className="h-1 flex-1 rounded-full bg-bronze" />
        <span className={`h-1 flex-1 rounded-full ${step === "birth" ? "bg-bronze" : "bg-line"}`} />
      </div>

      <div className="max-h-[70vh] overflow-y-auto px-6 py-6">
        {apiError && (
          <div className="mb-4">
            <AlertBanner message={apiError} />
          </div>
        )}

        {step === "account" ? (
          <form
            onSubmit={accountForm.handleSubmit(onAccountSubmit)}
            className="flex flex-col gap-5"
            noValidate
          >
            <p className="text-sm text-ink-soft">
              Informe nome, e-mail e crie uma senha. O telefone é opcional.
            </p>

            <TextField
              label="Nome completo"
              autoComplete="name"
              placeholder="Maria da Silva"
              icon={<User size={18} />}
              error={accountForm.formState.errors.name?.message}
              {...accountForm.register("name")}
            />

            <TextField
              label="E-mail"
              type="email"
              autoComplete="email"
              placeholder="seu@email.com"
              icon={<Mail size={18} />}
              error={accountForm.formState.errors.email?.message}
              {...accountForm.register("email")}
            />

            <TextField
              label="Senha"
              type="password"
              autoComplete="new-password"
              placeholder="Mínimo 6 caracteres"
              icon={<Lock size={18} />}
              error={accountForm.formState.errors.password?.message}
              {...accountForm.register("password")}
            />

            <PhoneField
              control={accountForm.control}
              name="phone"
              label="Telefone (opcional)"
              error={accountForm.formState.errors.phone?.message}
            />

            <TermsCheckbox
              control={accountForm.control}
              name="acceptedTerms"
              error={accountForm.formState.errors.acceptedTerms?.message}
            />

            <Button type="submit" isLoading={registerMutation.isPending} className="mt-1 w-full">
              Continuar
              <Sparkles size={18} />
            </Button>
          </form>
        ) : (
          <form onSubmit={birthForm.handleSubmit(onBirthSubmit)} className="flex flex-col gap-5" noValidate>
            <p className="text-sm text-ink-soft">
              Esses dados calculam as posições exatas dos planetas no instante do
              nascimento.
            </p>

            <TextField
              label="Nome completo"
              placeholder="Nome de quem vai receber o mapa"
              icon={<User size={18} />}
              error={birthForm.formState.errors.name?.message}
              {...birthForm.register("name")}
            />

            <div className="grid gap-5 sm:grid-cols-2">
              <TextField
                label="Data de nascimento"
                type="date"
                icon={<CalendarDays size={18} />}
                error={birthForm.formState.errors.birthDate?.message}
                {...birthForm.register("birthDate")}
              />

              <TextField
                label="Horário de nascimento"
                type="time"
                icon={<Clock size={18} />}
                error={birthForm.formState.errors.birthTime?.message}
                {...birthForm.register("birthTime")}
              />
            </div>

            <CityAutocomplete
              value={cityValue}
              onSelect={onCitySelect}
              onClear={onCityClear}
              error={birthForm.formState.errors.city?.message}
            />

            <div className="mt-1 flex items-center gap-3">
              {!isAuthenticated && (
                <button
                  type="button"
                  onClick={() => setStep("account")}
                  className="inline-flex items-center gap-1.5 rounded-xl border border-line px-4 py-3.5 text-sm font-semibold text-ink-soft transition-colors hover:bg-noturno/5"
                >
                  <ArrowLeft size={16} />
                  Voltar
                </button>
              )}
              <Button type="submit" isLoading={isBusy} className="w-full flex-1">
                <Sparkles size={18} />
                Gerar meu mapa astral
              </Button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}

function buildChartPayload(values: ChartFormValues) {
  const [year, month, day] = values.birthDate.split("-").map(Number);
  const [hour, min] = values.birthTime.split(":").map(Number);

  return {
    name: values.name,
    birthDay: day,
    birthMonth: month,
    birthYear: year,
    birthHour: hour,
    birthMin: min,
    lat: values.lat,
    lon: values.lon,
    city: values.city,
    state: values.state,
    country: values.country,
  };
}
