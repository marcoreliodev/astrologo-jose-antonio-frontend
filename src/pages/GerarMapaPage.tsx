import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { User, Clock, CalendarDays, Sparkles } from "lucide-react";
import { AppHeader } from "../components/AppHeader";
import { ProfileCard } from "../components/ProfileCard";
import { TextField } from "../components/TextField";
import { CityAutocomplete } from "../components/CityAutocomplete";
import { Button } from "../components/Button";
import { AlertBanner } from "../components/AlertBanner";
import { chartFormSchema, type ChartFormValues } from "../schemas/charts";
import { createChart } from "../api/charts";
import { getApiErrorMessage } from "../lib/api-client";
import { useAuth } from "../context/AuthContext";
import type { CityOption } from "../types/charts";

const TIMEZONE_OPTIONS = [
  { value: -2, label: "UTC−2 · Fernando de Noronha" },
  { value: -3, label: "UTC−3 · Brasília, São Paulo, Rio de Janeiro…" },
  { value: -4, label: "UTC−4 · Amazonas, Mato Grosso, Rondônia, Roraima" },
  { value: -5, label: "UTC−5 · Acre" },
];

export default function GerarMapaPage() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [apiError, setApiError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<ChartFormValues>({
    resolver: zodResolver(chartFormSchema),
    defaultValues: {
      name: user?.name ?? "",
      birthDate: "",
      birthTime: "",
      city: "",
      tzone: -3,
    },
  });

  const cityValue = watch("city");

  const mutation = useMutation({
    mutationFn: createChart,
    onSuccess: (chart) => {
      navigate(`/mapa-astral/${chart.id}`);
    },
    onError: (error) => {
      setApiError(getApiErrorMessage(error));
    },
  });

  const onCitySelect = (city: CityOption) => {
    setValue("city", city.displayName.split(",")[0].trim(), { shouldValidate: true });
    setValue("lat", city.lat, { shouldValidate: true });
    setValue("lon", city.lon, { shouldValidate: true });
  };

  const onSubmit = (values: ChartFormValues) => {
    setApiError(null);
    const [year, month, day] = values.birthDate.split("-").map(Number);
    const [hour, min] = values.birthTime.split(":").map(Number);

    mutation.mutate({
      name: values.name,
      birthDay: day,
      birthMonth: month,
      birthYear: year,
      birthHour: hour,
      birthMin: min,
      lat: values.lat,
      lon: values.lon,
      tzone: values.tzone,
      city: values.city,
    });
  };

  return (
    <div className="min-h-screen bg-offwhite">
      <AppHeader />

      <main className="mx-auto max-w-3xl px-6 py-10">
        <div className="mb-8">
          <span className="text-xs font-semibold uppercase tracking-[0.25em] text-bronze">
            Mapa astral
          </span>
          <h1 className="mt-2 font-display text-3xl font-semibold text-noturno">
            Gere seu mapa astral
          </h1>
          <p className="mt-1 text-sm text-ink-soft">
            Informe os dados de nascimento com precisão — data, horário e cidade — para um
            cálculo astrológico correto.
          </p>
        </div>

        <ProfileCard
          title="Dados de nascimento"
          description="Usamos esses dados apenas para calcular as posições planetárias no instante do nascimento."
          icon={<Sparkles size={18} />}
        >
          <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-5" noValidate>
            {apiError && <AlertBanner message={apiError} />}

            <TextField
              label="Nome completo"
              placeholder="Nome de quem vai receber o mapa"
              icon={<User size={18} />}
              error={errors.name?.message}
              {...register("name")}
            />

            <div className="grid gap-5 sm:grid-cols-2">
              <TextField
                label="Data de nascimento"
                type="date"
                icon={<CalendarDays size={18} />}
                error={errors.birthDate?.message}
                {...register("birthDate")}
              />

              <TextField
                label="Horário de nascimento"
                type="time"
                icon={<Clock size={18} />}
                error={errors.birthTime?.message}
                {...register("birthTime")}
              />
            </div>

            <CityAutocomplete value={cityValue} onSelect={onCitySelect} error={errors.city?.message} />

            <div className="flex flex-col gap-1.5">
              <label htmlFor="tzone" className="text-sm font-medium text-ink">
                Fuso horário no momento do nascimento
              </label>
              <select
                id="tzone"
                className="w-full rounded-xl border border-line bg-white px-4 py-3 text-[15px] text-ink transition-colors duration-150 focus:border-bronze focus:outline-none focus:ring-2 focus:ring-bronze/40"
                {...register("tzone", { valueAsNumber: true })}
              >
                {TIMEZONE_OPTIONS.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
              {errors.tzone?.message && (
                <p role="alert" className="text-xs font-medium text-marte">
                  {errors.tzone.message}
                </p>
              )}
            </div>

            <Button
              type="submit"
              isLoading={isSubmitting || mutation.isPending}
              className="mt-1 w-full"
            >
              <Sparkles size={18} />
              Gerar mapa astral
            </Button>
          </form>
        </ProfileCard>
      </main>
    </div>
  );
}
