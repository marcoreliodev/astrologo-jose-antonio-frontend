import { SIGN_LABELS } from "../lib/astro-labels";
import { SIGN_ICONS } from "../lib/zodiac-icons";
import { ZodiacGlyph } from "./ZodiacGlyph";

function SummaryCard({ label, signName }: { label: string; signName: string }) {
  return (
    <div className="flex flex-1 items-center justify-between gap-3 rounded-2xl border border-line bg-white px-5 py-3.5">
      <div className="flex items-center gap-2.5">
        <span className="text-sm font-medium text-ink-soft">{label}</span>
        <span className="font-display text-base font-semibold text-noturno">
          {SIGN_LABELS[signName] ?? signName}
        </span>
      </div>
      <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-noturno/5 text-noturno">
        <ZodiacGlyph svg={SIGN_ICONS[signName]} size={18} />
      </span>
    </div>
  );
}

export function ChartHeaderCards({
  sunSign,
  ascSign,
  moonSign,
}: {
  sunSign: string;
  ascSign: string;
  moonSign: string;
}) {
  return (
    <div className="grid gap-3 sm:grid-cols-3">
      <SummaryCard label="Signo Solar" signName={sunSign} />
      <SummaryCard label="Ascendente" signName={ascSign} />
      <SummaryCard label="Lua" signName={moonSign} />
    </div>
  );
}
