import type { ReactNode } from "react";

export function ProfileCard({
  title,
  description,
  icon,
  children,
}: {
  title: string;
  description?: string;
  icon?: ReactNode;
  children: ReactNode;
}) {
  return (
    <section className="rounded-2xl border border-line bg-white p-7 shadow-[0_1px_2px_rgba(8,30,72,0.04)]">
      <div className="mb-6 flex items-start gap-3">
        {icon && (
          <span className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-bronze-light/40 text-bronze">
            {icon}
          </span>
        )}
        <div>
          <h2 className="font-display text-xl font-semibold text-noturno">{title}</h2>
          {description && <p className="mt-1 text-sm text-ink-soft">{description}</p>}
        </div>
      </div>
      {children}
    </section>
  );
}
