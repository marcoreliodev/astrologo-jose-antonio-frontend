import { useState } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Link, useNavigate, useParams } from "react-router-dom";
import { ArrowLeft, CalendarDays, MapPin, ShieldAlert, Trash2 } from "lucide-react";
import { LandingHeader } from "../components/LandingHeader";
import { ChartResultView } from "../components/ChartResultView";
import { ConfirmDialog } from "../components/ConfirmDialog";
import { AlertBanner } from "../components/AlertBanner";
import { MarsGlyph } from "../components/CosmicPanel";
import { deleteChart, getChart } from "../api/charts";
import { getApiErrorMessage } from "../lib/api-client";

export default function MapaDetalhePage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const [confirmOpen, setConfirmOpen] = useState(false);

  const {
    data: chart,
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["charts", id],
    queryFn: () => getChart(id!),
    enabled: Boolean(id),
  });

  const deleteMutation = useMutation({
    mutationFn: () => deleteChart(id!),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["charts"] });
      navigate("/meus-mapas", { replace: true });
    },
  });

  return (
    <div className="min-h-screen bg-offwhite">
      <LandingHeader />

      <main className="mx-auto max-w-6xl px-6 py-10">
        <Link
          to="/meus-mapas"
          className="mb-6 inline-flex items-center gap-1.5 text-sm font-medium text-ink-soft transition-colors hover:text-noturno"
        >
          <ArrowLeft size={16} />
          Meus mapas
        </Link>

        {isLoading ? (
          <div className="flex flex-col items-center justify-center gap-3 py-24 text-ink-soft">
            <MarsGlyph className="h-8 w-8 animate-spin text-bronze" />
            <p className="text-sm">Carregando mapa astral…</p>
          </div>
        ) : isError || !chart ? (
          <div className="flex flex-col items-center justify-center gap-3 py-24 text-center">
            <ShieldAlert className="h-8 w-8 text-marte" />
            <p className="text-sm font-medium text-ink">
              {error ? getApiErrorMessage(error) : "Mapa astral não encontrado."}
            </p>
          </div>
        ) : (
          <>
            <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
              <div>
                <span className="text-xs font-semibold uppercase tracking-[0.25em] text-bronze">
                  Mapa astral
                </span>
                <h1 className="mt-2 font-display text-3xl font-semibold text-noturno">
                  {chart.name}
                </h1>
                <div className="mt-2 flex flex-col gap-1 text-sm text-ink-soft sm:flex-row sm:gap-4">
                  <span className="flex items-center gap-1.5">
                    <CalendarDays size={14} />
                    {new Date(chart.birthYear, chart.birthMonth - 1, chart.birthDay).toLocaleDateString(
                      "pt-BR",
                      { day: "2-digit", month: "long", year: "numeric" },
                    )}{" "}
                    às {String(chart.birthHour).padStart(2, "0")}:
                    {String(chart.birthMin).padStart(2, "0")}
                  </span>
                  <span className="flex items-center gap-1.5">
                    <MapPin size={14} />
                    {chart.city}
                  </span>
                </div>
              </div>

              <button
                type="button"
                onClick={() => setConfirmOpen(true)}
                className="inline-flex w-fit items-center gap-1.5 rounded-lg border border-marte/20 px-3 py-2 text-sm font-medium text-marte transition-colors hover:bg-marte/5"
              >
                <Trash2 size={15} />
                Excluir mapa
              </button>
            </div>

            {deleteMutation.isError && (
              <div className="mb-6">
                <AlertBanner message={getApiErrorMessage(deleteMutation.error)} />
              </div>
            )}

            <div className="mb-6">
              <ChartResultView chart={chart} />
            </div>
          </>
        )}
      </main>

      <ConfirmDialog
        open={confirmOpen}
        onClose={() => setConfirmOpen(false)}
        onConfirm={() => deleteMutation.mutate()}
        isLoading={deleteMutation.isPending}
        title="Excluir mapa astral"
        description={`Esta ação é permanente. Tem certeza que deseja excluir o mapa de ${chart?.name ?? ""}?`}
        confirmLabel="Excluir"
      />
    </div>
  );
}
