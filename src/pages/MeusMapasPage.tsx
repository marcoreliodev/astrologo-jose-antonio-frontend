import { useState } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Link } from "react-router-dom";
import { Plus, ShieldAlert, Sparkles } from "lucide-react";
import { AppHeader } from "../components/AppHeader";
import { ChartCard } from "../components/ChartCard";
import { ConfirmDialog } from "../components/ConfirmDialog";
import { AlertBanner } from "../components/AlertBanner";
import { Button } from "../components/Button";
import { MarsGlyph } from "../components/CosmicPanel";
import { deleteChart, listCharts } from "../api/charts";
import { getApiErrorMessage } from "../lib/api-client";
import type { AstralChart } from "../types/charts";

export default function MeusMapasPage() {
  const queryClient = useQueryClient();
  const [deleteTarget, setDeleteTarget] = useState<AstralChart | null>(null);
  const [actionError, setActionError] = useState<string | null>(null);

  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["charts"],
    queryFn: listCharts,
  });

  const deleteMutation = useMutation({
    mutationFn: (id: string) => deleteChart(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["charts"] });
      setDeleteTarget(null);
      setActionError(null);
    },
    onError: (err) => setActionError(getApiErrorMessage(err)),
  });

  return (
    <div className="min-h-screen bg-offwhite">
      <AppHeader />

      <main className="mx-auto max-w-5xl px-6 py-10">
        <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <span className="text-xs font-semibold uppercase tracking-[0.25em] text-bronze">
              Meus mapas
            </span>
            <h1 className="mt-2 font-display text-3xl font-semibold text-noturno">
              Meus mapas astrais
            </h1>
            <p className="mt-1 text-sm text-ink-soft">
              Todos os mapas astrais que você já gerou, salvos na sua conta.
            </p>
          </div>

          <Link to="/mapa-astral">
            <Button>
              <Plus size={18} />
              Gerar novo mapa
            </Button>
          </Link>
        </div>

        {actionError && (
          <div className="mb-5">
            <AlertBanner message={actionError} />
          </div>
        )}

        {isLoading ? (
          <div className="flex flex-col items-center justify-center gap-3 py-24 text-ink-soft">
            <MarsGlyph className="h-8 w-8 animate-spin text-bronze" />
            <p className="text-sm">Carregando seus mapas…</p>
          </div>
        ) : isError ? (
          <div className="flex flex-col items-center justify-center gap-3 py-24 text-center">
            <ShieldAlert className="h-8 w-8 text-marte" />
            <p className="text-sm font-medium text-ink">{getApiErrorMessage(error)}</p>
          </div>
        ) : !data || data.length === 0 ? (
          <div className="flex flex-col items-center justify-center gap-4 rounded-2xl border border-dashed border-line bg-white py-24 text-center">
            <span className="flex h-14 w-14 items-center justify-center rounded-full bg-bronze-light/40 text-bronze">
              <Sparkles size={24} />
            </span>
            <div>
              <p className="font-display text-lg font-semibold text-noturno">
                Você ainda não gerou nenhum mapa
              </p>
              <p className="mt-1 text-sm text-ink-soft">
                Comece agora e descubra o seu ou o mapa astral de alguém especial.
              </p>
            </div>
            <Link to="/mapa-astral">
              <Button>
                <Plus size={18} />
                Gerar meu primeiro mapa
              </Button>
            </Link>
          </div>
        ) : (
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {data.map((chart) => (
              <ChartCard
                key={chart.id}
                chart={chart}
                to={`/mapa-astral/${chart.id}`}
                onDelete={() => setDeleteTarget(chart)}
              />
            ))}
          </div>
        )}
      </main>

      <ConfirmDialog
        open={Boolean(deleteTarget)}
        onClose={() => setDeleteTarget(null)}
        onConfirm={() => deleteTarget && deleteMutation.mutate(deleteTarget.id)}
        isLoading={deleteMutation.isPending}
        title="Excluir mapa astral"
        description={`Esta ação é permanente e não pode ser desfeita. Tem certeza que deseja excluir o mapa de ${deleteTarget?.name}?`}
        confirmLabel="Excluir"
      />
    </div>
  );
}
