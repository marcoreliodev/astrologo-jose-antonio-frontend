import { NavLink } from 'react-router-dom';
import { ShieldCheck, Orbit, ScrollText } from 'lucide-react';

const ADMIN_LINKS = [
  { to: '/admin/usuarios', icon: <ShieldCheck size={15} />, label: 'Usuários' },
  { to: '/admin/mapas', icon: <Orbit size={15} />, label: 'Mapas' },
  { to: '/admin/logs', icon: <ScrollText size={15} />, label: 'Logs' },
];

/**
 * Sub-navegação local da área administrativa. Fica abaixo do header global
 * (LandingHeader), e dá acesso rápido
 * às páginas de administração sem duplicar o header inteiro.
 */
export function AdminSubNav() {
  return (
    <div className="border-b border-line bg-white">
      <nav className="mx-auto flex max-w-6xl items-center gap-1 overflow-x-auto px-6 py-2.5">
        {ADMIN_LINKS.map((link) => (
          <NavLink
            key={link.to}
            to={link.to}
            className={({ isActive }) =>
              [
                'inline-flex shrink-0 items-center gap-1.5 rounded-lg px-3 py-2 text-sm font-medium transition-colors',
                isActive
                  ? 'bg-noturno text-offwhite'
                  : 'text-ink-soft hover:bg-noturno/5 hover:text-noturno',
              ].join(' ')
            }
          >
            {link.icon}
            {link.label}
          </NavLink>
        ))}
      </nav>
    </div>
  );
}
