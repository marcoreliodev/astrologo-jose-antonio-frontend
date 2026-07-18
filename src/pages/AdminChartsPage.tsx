import { useState } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Link } from "react-router-dom";
import { Search, ShieldAlert, Sparkles, Trash2 } from "lucide-react";
import { LandingHeader } from "../components/LandingHeader";
import { AdminSubNav } from "../components/AdminSubNav";
import { AlertBanner } from "../components/AlertBanner";
import { ConfirmDialog } from "../components/ConfirmDialog";
import { MarsGlyph } from "../components/CosmicPanel";
import { deleteChartAdmin, listAllCharts, listChartsByUser } from "../api/charts";
import { getApiErrorMessage } from "../lib/api-client";
import type { AstralChart } from "../types/charts";

export default function AdminChartsPage() {
  const queryClient = useQueryClient();
  const [userIdFilter, setUserIdFilter] = useState("");
  const [appliedUserId, setAppliedUserId] = useState("");
  const [deleteTarget, setDeleteTarget] = useState<AstralChart | null>(null);
  const [actionError, setActionError] = useState<string | null>(null);

  const { data, isLoading, isError, error, isFetching } = useQuery({
    queryKey: ["admin", "charts", appliedUserId],
    queryFn: () => (appliedUserId ? listChartsByUser(appliedUserId) : listAllCharts()),
  });

  const deleteMutation = useMutation({
    mutationFn: (id: string) => deleteChartAdmin(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin", "charts"] });
      setDeleteTarget(null);
      setActionError(null);
    },
    onError: (err) => setActionError(getApiErrorMessage(err)),
  });

  return (
    <div className="min-h-screen bg-offwhite">
      <LandingHeader />
      <AdminSubNav />

      <main className="mx-auto max-w-6xl px-6 py-10">
        <div className="mb-8">
          <span className="text-xs font-semibold uppercase tracking-[0.25em] text-bronze">
            Área administrativa
          </span>
          <h1 className="mt-2 font-display text-3xl font-semibold text-noturno">
            Mapas astrais
          </h1>
          <p className="mt-1 text-sm text-ink-soft">
            Todos os mapas astrais gerados pelos usuários da plataforma.
          </p>
        </div>

        {actionError && (
          <div className="mb-5">
            <AlertBanner message={actionError} />
          </div>
        )}

        <div className="rounded-2xl border border-line bg-white">
          <div className="flex flex-col gap-3 border-b border-line p-5 sm:flex-row sm:items-center">
            <div className="relative flex-1">
              <Search
                size={17}
                className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-ink-soft/50"
              />
              <input
                type="text"
                value={userIdFilter}
                onChange={(event) => setUserIdFilter(event.target.value)}
                onKeyDown={(event) => {
                  if (event.key === "Enter") setAppliedUserId(userIdFilter.trim());
                }}
                placeholder="Filtrar por ID de usuário…"
                className="w-full rounded-xl border border-line bg-white py-2.5 pl-10 pr-4 text-[15px] text-ink placeholder:text-ink-soft/40 focus:border-bronze focus:outline-none focus:ring-2 focus:ring-bronze/40"
              />
            </div>
            <button
              type="button"
              onClick={() => setAppliedUserId(userIdFilter.trim())}
              className="rounded-lg border border-noturno/15 px-4 py-2.5 text-sm font-semibold text-noturno transition-colors hover:bg-noturno/5"
            >
              Filtrar
            </button>
            {appliedUserId && (
              <button
                type="button"
                onClick={() => {
                  setUserIdFilter("");
                  setAppliedUserId("");
                }}
                className="text-sm font-medium text-ink-soft hover:text-noturno"
              >
                Limpar
              </button>
            )}
          </div>

          {isLoading ? (
            <div className="flex flex-col items-center justify-center gap-3 py-20 text-ink-soft">
              <MarsGlyph className="h-7 w-7 animate-spin text-bronze" />
              <p className="text-sm">Carregando mapas…</p>
            </div>
          ) : isError ? (
            <div className="flex flex-col items-center justify-center gap-3 py-20 text-center">
              <ShieldAlert className="h-8 w-8 text-marte" />
              <p className="text-sm font-medium text-ink">{getApiErrorMessage(error)}</p>
            </div>
          ) : !data || data.length === 0 ? (
            <div className="flex flex-col items-center justify-center gap-3 py-20 text-center text-ink-soft">
              <Sparkles className="h-8 w-8" />
              <p className="text-sm">Nenhum mapa astral encontrado.</p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead>
                  <tr className="border-b border-line text-xs font-semibold uppercase tracking-wide text-ink-soft">
                    <th className="px-6 py-3.5">Nome</th>
                    <th className="px-6 py-3.5">Cidade</th>
                    <th className="px-6 py-3.5">Nascimento</th>
                    <th className="px-6 py-3.5">ID do usuário</th>
                    <th className="px-6 py-3.5">Criado em</th>
                    <th className="px-6 py-3.5" />
                  </tr>
                </thead>
                <tbody>
                  {data.map((chart) => (
                    <tr
                      key={chart.id}
                      className="border-b border-line last:border-0 hover:bg-noturno/[0.02]"
                    >
                      <td className="px-6 py-4 font-medium text-ink">
                        <Link to={`/mapa-astral/${chart.id}`} className="hover:text-marte">
                          {chart.name}
                        </Link>
                      </td>
                      <td className="px-6 py-4 text-ink-soft">{chart.city}</td>
                      <td className="px-6 py-4 text-ink-soft">
                        {String(chart.birthDay).padStart(2, "0")}/
                        {String(chart.birthMonth).padStart(2, "0")}/{chart.birthYear}
                      </td>
                      <td className="px-6 py-4 text-ink-soft">
                        <button
                          type="button"
                          onClick={() => {
                            setUserIdFilter(chart.userId);
                            setAppliedUserId(chart.userId);
                          }}
                          className="font-mono text-xs hover:text-marte"
                          title="Filtrar por este usuário"
                        >
                          {chart.userId.slice(0, 8)}…
                        </button>
                      </td>
                      <td className="px-6 py-4 text-ink-soft">
                        {new Date(chart.createdAt).toLocaleDateString("pt-BR")}
                      </td>
                      <td className="px-6 py-4 text-right">
                        <button
                          type="button"
                          onClick={() => setDeleteTarget(chart)}
                          aria-label="Excluir mapa"
                          className="rounded-lg p-1.5 text-ink-soft transition-colors hover:bg-marte/10 hover:text-marte"
                        >
                          <Trash2 size={16} />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
          {isFetching && !isLoading && (
            <p className="px-6 pb-4 text-xs text-ink-soft">Atualizando…</p>
          )}
        </div>
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
