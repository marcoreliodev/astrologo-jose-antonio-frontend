import type { ReactNode } from "react";
import { ArrowUpRight } from "lucide-react";

export function SocialCard({
  href,
  icon,
  label,
  handle,
  accent = "noturno",
}: {
  href: string;
  icon: ReactNode;
  label: string;
  handle: string;
  accent?: "noturno" | "marte" | "bronze";
}) {
  const accentStyles: Record<string, string> = {
    noturno: "bg-noturno text-offwhite",
    marte: "bg-marte text-offwhite",
    bronze: "bg-gradient-to-br from-bronze to-bronze-light text-noturno",
  };

  return (
    <a
      href={href}
      target="_blank"
      rel="noreferrer noopener"
      className="group flex items-center gap-4 rounded-2xl border border-line bg-white p-5 transition-all duration-300 hover:-translate-y-1 hover:border-bronze/30 hover:shadow-xl"
    >
      <span
        className={[
          "flex h-12 w-12 shrink-0 items-center justify-center rounded-xl transition-transform duration-300 group-hover:scale-110 group-hover:rotate-3",
          accentStyles[accent],
        ].join(" ")}
      >
        {icon}
      </span>
      <div className="flex-1">
        <p className="font-display text-base font-semibold text-noturno">{label}</p>
        <p className="text-sm text-ink-soft">{handle}</p>
      </div>
      <ArrowUpRight
        size={18}
        className="text-ink-soft/40 transition-all duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-marte"
      />
    </a>
  );
}
