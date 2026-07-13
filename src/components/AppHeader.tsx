import { LogOut, ShieldCheck, UserCircle2, ScrollText, Sparkles, Orbit } from "lucide-react";
import { NavLink } from "react-router-dom";
import { MarsGlyph } from "./CosmicPanel";
import { useAuth } from "../context/AuthContext";

export function AppHeader({ wide = false }: { wide?: boolean }) {
  const { user, signOut } = useAuth();
  const isAdmin = user?.role === "admin";

  return (
    <header className="border-b border-line bg-offwhite/95 backdrop-blur">
      <div
        className={[
          "mx-auto flex items-center justify-between px-6 py-5",
          wide ? "max-w-6xl" : "max-w-3xl",
        ].join(" ")}
      >
        <div className="flex items-center gap-7">
          <div className="flex items-center gap-2.5">
            <MarsGlyph className="h-6 w-6 text-marte" />
            <span className="font-display text-lg font-semibold text-noturno">
              José Antonio
            </span>
          </div>

          <nav className="hidden items-center gap-1 sm:flex">
            <HeaderLink to="/mapa-astral" icon={<Sparkles size={15} />} label="Gerar mapa" />
            <HeaderLink to="/meus-mapas" icon={<Orbit size={15} />} label="Meus mapas" />
            {isAdmin && (
              <>
                <HeaderLink to="/perfil" icon={<UserCircle2 size={15} />} label="Meu perfil" />
                <HeaderLink to="/admin/usuarios" icon={<ShieldCheck size={15} />} label="Usuários" />
                <HeaderLink to="/admin/mapas" icon={<Orbit size={15} />} label="Mapas" />
                <HeaderLink to="/admin/logs" icon={<ScrollText size={15} />} label="Logs" />
              </>
            )}
          </nav>
        </div>

        <div className="flex items-center gap-4">
          {user && (
            <span className="hidden text-sm text-ink-soft sm:inline">
              Olá, {user.name.split(" ")[0]}
            </span>
          )}
          <button
            type="button"
            onClick={signOut}
            className="inline-flex items-center gap-1.5 rounded-lg px-3 py-2 text-sm font-medium text-ink-soft transition-colors hover:bg-noturno/5 hover:text-noturno"
          >
            <LogOut size={16} />
            Sair
          </button>
        </div>
      </div>

      <nav className="flex items-center gap-1 overflow-x-auto px-6 pb-3 sm:hidden">
        <HeaderLink to="/mapa-astral" icon={<Sparkles size={15} />} label="Gerar mapa" />
        <HeaderLink to="/meus-mapas" icon={<Orbit size={15} />} label="Meus mapas" />
        {isAdmin && (
          <>
            <HeaderLink to="/perfil" icon={<UserCircle2 size={15} />} label="Meu perfil" />
            <HeaderLink to="/admin/usuarios" icon={<ShieldCheck size={15} />} label="Usuários" />
            <HeaderLink to="/admin/mapas" icon={<Orbit size={15} />} label="Mapas" />
            <HeaderLink to="/admin/logs" icon={<ScrollText size={15} />} label="Logs" />
          </>
        )}
      </nav>
    </header>
  );
}

function HeaderLink({
  to,
  icon,
  label,
}: {
  to: string;
  icon: React.ReactNode;
  label: string;
}) {
  return (
    <NavLink
      to={to}
      className={({ isActive }) =>
        [
          "inline-flex items-center gap-1.5 rounded-lg px-3 py-2 text-sm font-medium transition-colors",
          isActive
            ? "bg-noturno text-offwhite"
            : "text-ink-soft hover:bg-noturno/5 hover:text-noturno",
        ].join(" ")
      }
    >
      {icon}
      {label}
    </NavLink>
  );
}
