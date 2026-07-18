import { useMemo, useState } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { RefreshCw, ScrollText, ShieldAlert, Trash2 } from "lucide-react";
import { LandingHeader } from "../components/LandingHeader";
import { AdminSubNav } from "../components/AdminSubNav";
import { Button } from "../components/Button";
import { ConfirmDialog } from "../components/ConfirmDialog";
import { LogRow } from "../components/LogRow";
import { MarsGlyph } from "../components/CosmicPanel";
import { listLogs, clearLogs } from "../api/logs";
import { getApiErrorMessage } from "../lib/api-client";
import { getLevelTone } from "../lib/log-utils";

const LIMIT_OPTIONS = [50, 100, 200, 500];

type LevelFilter = "all" | "info" | "warn" | "error";

export default function AdminLogsPage() {
  const queryClient = useQueryClient();
  const [limit, setLimit] = useState(100);
  const [levelFilter, setLevelFilter] = useState<LevelFilter>("all");
  const [search, setSearch] = useState("");
  const [confirmClear, setConfirmClear] = useState(false);

  const { data, isLoading, isError, error, isFetching, refetch } = useQuery({
    queryKey: ["admin", "logs", limit],
    queryFn: () => listLogs(limit),
  });

  const clearMutation = useMutation({
    mutationFn: clearLogs,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin", "logs"] });
      setConfirmClear(false);
    },
  });

  const filteredLogs = useMemo(() => {
    if (!data) return [];
    const term = search.trim().toLowerCase();

    return data.filter((entry) => {
      if (levelFilter !== "all" && getLevelTone(entry.level) !== levelFilter) {
        return false;
      }
      if (!term) return true;
      const haystack = [
        entry.msg,
        entry.context,
        entry.req?.url,
        entry.req?.method,
        String(entry.res?.statusCode ?? entry.status ?? ""),
      ]
        .filter(Boolean)
        .join(" ")
        .toLowerCase();
      return haystack.includes(term);
    });
  }, [data, search, levelFilter]);

  return (
    <div className="min-h-screen bg-offwhite">
      <LandingHeader />
      <AdminSubNav />

      <main className="mx-auto max-w-6xl px-6 py-10">
        <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <span className="text-xs font-semibold uppercase tracking-[0.25em] text-bronze">
              Área administrativa
            </span>
            <h1 className="mt-2 font-display text-3xl font-semibold text-noturno">
              Logs da aplicação
            </h1>
            <p className="mt-1 text-sm text-ink-soft">
              Acompanhe requisições, erros e eventos do sistema em tempo real.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <Button variant="outline" onClick={() => refetch()} disabled={isFetching}>
              <RefreshCw size={16} className={isFetching ? "animate-spin" : ""} />
              Atualizar
            </Button>
            <Button variant="outline" onClick={() => setConfirmClear(true)}>
              <Trash2 size={16} />
              Limpar logs
            </Button>
          </div>
        </div>

        <div className="rounded-2xl border border-line bg-white">
          <div className="flex flex-col gap-3 border-b border-line p-5 sm:flex-row sm:items-center sm:justify-between">
            <input
              type="search"
              value={search}
              onChange={(event) => setSearch(event.target.value)}
              placeholder="Buscar por rota, contexto ou mensagem…"
              className="w-full max-w-sm rounded-xl border border-line bg-white px-4 py-2.5 text-[15px] text-ink placeholder:text-ink-soft/40 focus:border-bronze focus:outline-none focus:ring-2 focus:ring-bronze/40"
            />

            <div className="flex items-center gap-2">
              <FilterPill active={levelFilter === "all"} onClick={() => setLevelFilter("all")}>
                Todos
              </FilterPill>
              <FilterPill active={levelFilter === "info"} onClick={() => setLevelFilter("info")}>
                Info
              </FilterPill>
              <FilterPill active={levelFilter === "warn"} onClick={() => setLevelFilter("warn")}>
                Aviso
              </FilterPill>
              <FilterPill active={levelFilter === "error"} onClick={() => setLevelFilter("error")}>
                Erro
              </FilterPill>

              <select
                value={limit}
                onChange={(event) => setLimit(Number(event.target.value))}
                className="rounded-xl border border-line bg-white px-3 py-2 text-sm text-ink focus:border-bronze focus:outline-none focus:ring-2 focus:ring-bronze/40"
              >
                {LIMIT_OPTIONS.map((option) => (
                  <option key={option} value={option}>
                    Últimos {option}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {isLoading ? (
            <div className="flex flex-col items-center justify-center gap-3 py-20 text-ink-soft">
              <MarsGlyph className="h-7 w-7 animate-spin text-bronze" />
              <p className="text-sm">Carregando logs…</p>
            </div>
          ) : isError ? (
            <div className="flex flex-col items-center justify-center gap-3 py-20 text-center">
              <ShieldAlert className="h-8 w-8 text-marte" />
              <p className="text-sm font-medium text-ink">{getApiErrorMessage(error)}</p>
            </div>
          ) : filteredLogs.length === 0 ? (
            <div className="flex flex-col items-center justify-center gap-3 py-20 text-center text-ink-soft">
              <ScrollText className="h-8 w-8" />
              <p className="text-sm">Nenhum log encontrado.</p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead>
                  <tr className="border-b border-line text-xs font-semibold uppercase tracking-wide text-ink-soft">
                    <th className="w-8 px-4 py-3.5" />
                    <th className="px-3 py-3.5">Horário</th>
                    <th className="px-3 py-3.5">Nível</th>
                    <th className="px-3 py-3.5">Evento</th>
                    <th className="px-3 py-3.5">Status</th>
                    <th className="px-3 py-3.5">Duração</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredLogs.map((entry, index) => (
                    <LogRow key={`${entry.time}-${index}`} entry={entry} />
                  ))}
                </tbody>
              </table>
            </div>
          )}

          <div className="flex items-center justify-between border-t border-line px-6 py-4">
            <p className="text-sm text-ink-soft">
              Mostrando <span className="font-medium text-ink">{filteredLogs.length}</span> de{" "}
              <span className="font-medium text-ink">{data?.length ?? 0}</span> registros carregados
            </p>
          </div>
        </div>
      </main>

      <ConfirmDialog
        open={confirmClear}
        onClose={() => setConfirmClear(false)}
        onConfirm={() => clearMutation.mutate()}
        isLoading={clearMutation.isPending}
        title="Limpar logs"
        description="Esta ação remove permanentemente todo o histórico de logs da aplicação. Tem certeza que deseja continuar?"
        confirmLabel="Limpar tudo"
      />
    </div>
  );
}

function FilterPill({
  active,
  onClick,
  children,
}: {
  active: boolean;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={[
        "rounded-full px-3 py-1.5 text-xs font-semibold transition-colors",
        active ? "bg-noturno text-offwhite" : "bg-noturno/5 text-ink-soft hover:bg-noturno/10",
      ].join(" ")}
    >
      {children}
    </button>
  );
}
