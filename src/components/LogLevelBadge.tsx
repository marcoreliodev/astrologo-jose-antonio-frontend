import { Info, AlertTriangle, OctagonAlert, Circle } from "lucide-react";
import type { PinoLevel } from "../types/logs";
import { PINO_LEVEL_LABEL, getLevelTone } from "../lib/log-utils";

export function LogLevelBadge({ level }: { level: PinoLevel }) {
  const tone = getLevelTone(level);

  const toneStyles: Record<string, string> = {
    info: "bg-noturno/8 text-noturno",
    warn: "bg-bronze/15 text-bronze",
    error: "bg-marte/10 text-marte",
    neutral: "bg-line text-ink-soft",
  };

  const icons: Record<string, React.ReactNode> = {
    info: <Info size={12} />,
    warn: <AlertTriangle size={12} />,
    error: <OctagonAlert size={12} />,
    neutral: <Circle size={12} />,
  };

  return (
    <span
      className={[
        "inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-semibold",
        toneStyles[tone],
      ].join(" ")}
    >
      {icons[tone]}
      {PINO_LEVEL_LABEL[level] ?? level}
    </span>
  );
}
