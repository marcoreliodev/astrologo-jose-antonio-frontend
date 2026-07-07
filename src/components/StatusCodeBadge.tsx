export function StatusCodeBadge({ status }: { status?: number }) {
  if (!status) return <span className="text-ink-soft">—</span>;

  const tone =
    status >= 500
      ? "bg-marte/10 text-marte"
      : status >= 400
        ? "bg-bronze/15 text-bronze"
        : status >= 300
          ? "bg-noturno/8 text-noturno"
          : "bg-bronze-light/30 text-noturno";

  return (
    <span className={["inline-flex rounded-md px-2 py-0.5 text-xs font-bold tabular-nums", tone].join(" ")}>
      {status}
    </span>
  );
}
