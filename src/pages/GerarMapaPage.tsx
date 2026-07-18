import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { User, Clock, CalendarDays, Sparkles } from "lucide-react";
import { LandingHeader } from "../components/LandingHeader";
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

export default function GerarMapaPage() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [apiError, setApiError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    setValue,
    resetField,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<ChartFormValues>({
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
    setValue("city", city.city, { shouldValidate: true });
    setValue("state", city.state, { shouldValidate: true });
    setValue("country", city.country, { shouldValidate: true });
    setValue("lat", city.lat, { shouldValidate: true });
    setValue("lon", city.lon, { shouldValidate: true });
  };

  const onCityClear = () => {
    setValue("city", "", { shouldValidate: false });
    setValue("state", "", { shouldValidate: false });
    setValue("country", "", { shouldValidate: false });
    resetField("lat");
    resetField("lon");
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
      city: values.city,
      state: values.state,
      country: values.country,
    });
  };

  return (
    <div className="min-h-screen bg-offwhite">
      <LandingHeader />

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

            <CityAutocomplete
              value={cityValue}
              onSelect={onCitySelect}
              onClear={onCityClear}
              error={errors.city?.message}
            />

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
