import { AlertCircle, CheckCircle2 } from "lucide-react";

export function AlertBanner({
  message,
  variant = "error",
}: {
  message: string;
  variant?: "error" | "success";
}) {
  const isError = variant === "error";
  return (
    <div
      role={isError ? "alert" : "status"}
      className={[
        "flex items-start gap-2.5 rounded-xl border px-4 py-3 text-sm font-medium",
        isError
          ? "border-marte/20 bg-marte/[0.06] text-marte-dark"
          : "border-bronze/30 bg-bronze-light/30 text-noturno",
      ].join(" ")}
      style={{ animation: "rise-fade 0.25s ease-out" }}
    >
      {isError ? (
        <AlertCircle size={18} className="mt-0.5 shrink-0" />
      ) : (
        <CheckCircle2 size={18} className="mt-0.5 shrink-0 text-bronze" />
      )}
      <span>{message}</span>
    </div>
  );
}
