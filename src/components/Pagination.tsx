import { ChevronLeft, ChevronRight } from "lucide-react";

export function Pagination({
  page,
  totalPages,
  total,
  limit,
  onPageChange,
}: {
  page: number;
  totalPages: number;
  total: number;
  limit: number;
  onPageChange: (page: number) => void;
}) {
  const start = total === 0 ? 0 : (page - 1) * limit + 1;
  const end = Math.min(page * limit, total);

  return (
    <div className="flex items-center justify-between border-t border-line px-6 py-4">
      <p className="text-sm text-ink-soft">
        {total === 0 ? (
          "Nenhum usuário encontrado"
        ) : (
          <>
            Mostrando <span className="font-medium text-ink">{start}–{end}</span> de{" "}
            <span className="font-medium text-ink">{total}</span>
          </>
        )}
      </p>

      <div className="flex items-center gap-2">
        <button
          type="button"
          onClick={() => onPageChange(page - 1)}
          disabled={page <= 1}
          aria-label="Página anterior"
          className="inline-flex items-center justify-center rounded-lg border border-line p-2 text-ink-soft transition-colors hover:bg-noturno/5 disabled:cursor-not-allowed disabled:opacity-40"
        >
          <ChevronLeft size={16} />
        </button>
        <span className="px-2 text-sm font-medium text-ink">
          {page} / {Math.max(totalPages, 1)}
        </span>
        <button
          type="button"
          onClick={() => onPageChange(page + 1)}
          disabled={page >= totalPages}
          aria-label="Próxima página"
          className="inline-flex items-center justify-center rounded-lg border border-line p-2 text-ink-soft transition-colors hover:bg-noturno/5 disabled:cursor-not-allowed disabled:opacity-40"
        >
          <ChevronRight size={16} />
        </button>
      </div>
    </div>
  );
}
