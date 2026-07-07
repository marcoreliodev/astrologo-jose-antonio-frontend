import { useEffect, useRef, useState } from "react";
import { MoreVertical, Pencil, KeyRound, ShieldCheck, Shield, Trash2 } from "lucide-react";

export function UserRowActions({
  isAdmin,
  onEdit,
  onResetPassword,
  onToggleRole,
  onDelete,
}: {
  isAdmin: boolean;
  onEdit: () => void;
  onResetPassword: () => void;
  onToggleRole: () => void;
  onDelete: () => void;
}) {
  const [open, setOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    const handleClick = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, [open]);

  const runAndClose = (action: () => void) => () => {
    setOpen(false);
    action();
  };

  return (
    <div ref={containerRef} className="relative inline-block text-left">
      <button
        type="button"
        onClick={() => setOpen((prev) => !prev)}
        aria-label="Ações do usuário"
        aria-expanded={open}
        className="rounded-lg p-2 text-ink-soft transition-colors hover:bg-noturno/5 hover:text-noturno"
      >
        <MoreVertical size={18} />
      </button>

      {open && (
        <div
          role="menu"
          className="absolute right-0 z-20 mt-1 w-52 overflow-hidden rounded-xl border border-line bg-white py-1.5 shadow-lg"
          style={{ animation: "rise-fade 0.12s ease-out" }}
        >
          <MenuItem icon={<Pencil size={15} />} label="Editar dados" onClick={runAndClose(onEdit)} />
          <MenuItem
            icon={<KeyRound size={15} />}
            label="Redefinir senha"
            onClick={runAndClose(onResetPassword)}
          />
          <MenuItem
            icon={isAdmin ? <Shield size={15} /> : <ShieldCheck size={15} />}
            label={isAdmin ? "Remover admin" : "Tornar admin"}
            onClick={runAndClose(onToggleRole)}
          />
          <div className="my-1 h-px bg-line" />
          <MenuItem
            icon={<Trash2 size={15} />}
            label="Excluir usuário"
            tone="danger"
            onClick={runAndClose(onDelete)}
          />
        </div>
      )}
    </div>
  );
}

function MenuItem({
  icon,
  label,
  onClick,
  tone = "default",
}: {
  icon: React.ReactNode;
  label: string;
  onClick: () => void;
  tone?: "default" | "danger";
}) {
  return (
    <button
      type="button"
      role="menuitem"
      onClick={onClick}
      className={[
        "flex w-full items-center gap-2.5 px-4 py-2.5 text-left text-sm transition-colors",
        tone === "danger"
          ? "text-marte hover:bg-marte/[0.06]"
          : "text-ink hover:bg-noturno/5",
      ].join(" ")}
    >
      {icon}
      {label}
    </button>
  );
}
