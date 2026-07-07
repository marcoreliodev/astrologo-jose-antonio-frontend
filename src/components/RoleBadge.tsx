import { ShieldCheck, User } from "lucide-react";
import type { UserRole } from "../types/auth";

export function RoleBadge({ role }: { role: UserRole }) {
  const isAdmin = role === "admin";

  return (
    <span
      className={[
        "inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-semibold",
        isAdmin ? "bg-noturno text-offwhite" : "bg-bronze-light/40 text-noturno",
      ].join(" ")}
    >
      {isAdmin ? <ShieldCheck size={12} /> : <User size={12} />}
      {isAdmin ? "Administrador" : "Cliente"}
    </span>
  );
}
