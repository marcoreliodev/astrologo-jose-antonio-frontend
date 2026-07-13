import { CalendarDays, MapPin, Trash2 } from "lucide-react";
import { Link } from "react-router-dom";
import type { AstralChart } from "../types/charts";

export function ChartCard({
  chart,
  to,
  onDelete,
}: {
  chart: AstralChart;
  to: string;
  onDelete?: () => void;
}) {
  const birthDate = new Date(chart.birthYear, chart.birthMonth - 1, chart.birthDay);
  const formattedDate = birthDate.toLocaleDateString("pt-BR", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  });
  const formattedTime = `${String(chart.birthHour).padStart(2, "0")}:${String(
    chart.birthMin,
  ).padStart(2, "0")}`;

  return (
    <div className="group relative flex flex-col gap-3 rounded-2xl border border-line bg-white p-6 transition-shadow hover:shadow-md">
      <Link to={to} className="flex flex-col gap-3">
        <h3 className="font-display text-lg font-semibold text-noturno">{chart.name}</h3>
        <div className="flex flex-col gap-1.5 text-sm text-ink-soft">
          <span className="flex items-center gap-1.5">
            <CalendarDays size={14} />
            {formattedDate} às {formattedTime}
          </span>
          <span className="flex items-center gap-1.5">
            <MapPin size={14} />
            {chart.city}
          </span>
        </div>
        <span className="mt-1 inline-flex w-fit items-center gap-1.5 rounded-lg bg-bronze-light/30 px-3 py-1.5 text-xs font-semibold text-bronze">
          Ver mapa astral
        </span>
      </Link>

      {onDelete && (
        <button
          type="button"
          onClick={onDelete}
          aria-label="Excluir mapa"
          className="absolute right-4 top-4 rounded-lg p-1.5 text-ink-soft/50 opacity-0 transition-all hover:bg-marte/10 hover:text-marte group-hover:opacity-100"
        >
          <Trash2 size={16} />
        </button>
      )}
    </div>
  );
}
