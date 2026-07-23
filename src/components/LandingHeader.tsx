import { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import { Sparkles, User, Menu, X, Orbit, LogOut, ShieldCheck } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useGenerateFlow } from '../context/GenerateFlowContext';

const NAV_ANCHORS = [
  { hash: '#signos', label: 'Signos' },
  { hash: '#efemerides', label: 'Céu de hoje' },
];

export function LandingHeader() {
  const { isAuthenticated, user, signOut } = useAuth();
  const { openFlow } = useGenerateFlow();
  const { pathname } = useLocation();
  const [mobileOpen, setMobileOpen] = useState(false);

  const closeMobile = () => setMobileOpen(false);
  // em qualquer página que não a inicial, o link precisa navegar até "/" antes de rolar
  const buildHref = (hash: string) => (pathname === '/' ? hash : `/${hash}`);

  // trava o scroll do fundo enquanto o menu mobile em tela cheia está aberto
  useEffect(() => {
    if (mobileOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [mobileOpen]);

  const headerElement = (
    <header className="sticky top-0 z-30 border-b border-line/60 bg-offwhite/90 backdrop-blur-md">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
        <Link to="/" className="flex items-center" onClick={closeMobile}>
          <span className="font-display text-lg font-semibold text-noturno">
            Astrólogo José Antonio
          </span>
        </Link>

        {/* navegação para telas grandes */}
        <nav className="hidden items-center gap-1 lg:flex">
          <Link
            to="/"
            className="rounded-lg px-3 py-2 text-sm font-medium text-ink-soft transition-colors hover:bg-noturno/5 hover:text-noturno"
          >
            Início
          </Link>
          {NAV_ANCHORS.map((link) => (
            <a
              key={link.hash}
              href={buildHref(link.hash)}
              className="rounded-lg px-3 py-2 text-sm font-medium text-ink-soft transition-colors hover:bg-noturno/5 hover:text-noturno"
            >
              {link.label}
            </a>
          ))}
          <Link
            to="/livros"
            className="rounded-lg px-3 py-2 text-sm font-medium text-ink-soft transition-colors hover:bg-noturno/5 hover:text-noturno"
          >
            Livros
          </Link>
          {isAuthenticated && (
            <Link
              to="/meus-mapas"
              className="inline-flex items-center gap-1.5 rounded-lg px-3 py-2 text-sm font-medium text-ink-soft transition-colors hover:bg-noturno/5 hover:text-noturno"
            >
              <Orbit size={15} />
              Meus mapas
            </Link>
          )}
          {user?.role === 'admin' && (
            <Link
              to="/admin/usuarios"
              className="inline-flex items-center gap-1.5 rounded-lg px-3 py-2 text-sm font-medium text-ink-soft transition-colors hover:bg-noturno/5 hover:text-noturno"
            >
              <ShieldCheck size={15} />
              Administração
            </Link>
          )}
          <Link
            to={isAuthenticated ? '/perfil' : '/login'}
            className="inline-flex items-center gap-1.5 rounded-lg px-3 py-2 text-sm font-semibold text-noturno transition-colors hover:bg-noturno/5"
          >
            <User size={16} />
            {isAuthenticated ? 'Meu Perfil' : 'Entrar'}
          </Link>
          {isAuthenticated && (
            <button
              type="button"
              onClick={signOut}
              aria-label="Sair"
              title="Sair"
              className="rounded-lg p-2 text-ink-soft transition-colors hover:bg-noturno/5 hover:text-noturno"
            >
              <LogOut size={16} />
            </button>
          )}
          <button
            type="button"
            onClick={openFlow}
            className="inline-flex items-center gap-1.5 rounded-lg bg-marte px-4 py-2 text-sm font-semibold text-offwhite transition-all hover:bg-marte-dark active:scale-[0.99]"
          >
            <Sparkles size={15} />
            Gere seu mapa astral gratuito
          </button>
        </nav>

        {/* ações compactas para mobile: CTA curto + hambúrguer */}
        <div className="flex items-center gap-2 lg:hidden">
          <button
            type="button"
            onClick={openFlow}
            className="inline-flex items-center gap-1.5 rounded-lg bg-marte px-3.5 py-2 text-[13px] font-semibold text-offwhite transition-all hover:bg-marte-dark active:scale-[0.99]"
          >
            <Sparkles size={15} />
            Mapa grátis
          </button>
          <button
            type="button"
            onClick={() => setMobileOpen(true)}
            aria-label="Abrir menu"
            aria-expanded={mobileOpen}
            className="rounded-lg p-2 text-noturno transition-colors hover:bg-noturno/5"
          >
            <Menu size={22} />
          </button>
        </div>
      </div>
    </header>
  );

  const mobileMenu = mobileOpen
    ? createPortal(
        <div
          className="fixed inset-0 z-[100] flex flex-col bg-offwhite lg:hidden"
          style={{ animation: 'rise-fade 0.2s ease-out' }}
        >
          <div className="flex items-center justify-between border-b border-line/60 px-6 py-4">
            <Link to="/" className="flex items-center" onClick={closeMobile}>
              <span className="font-display text-lg font-semibold text-noturno">
                Astrólogo José Antonio
              </span>
            </Link>
            <button
              type="button"
              onClick={closeMobile}
              aria-label="Fechar menu"
              className="rounded-lg p-2 text-noturno transition-colors hover:bg-noturno/5"
            >
              <X size={24} />
            </button>
          </div>

          <nav className="flex flex-1 flex-col gap-1 overflow-y-auto px-6 py-6">
            <Link
              to="/"
              onClick={closeMobile}
              className="rounded-lg px-3 py-3.5 text-[17px] font-medium text-ink-soft transition-colors hover:bg-noturno/5 hover:text-noturno"
            >
              Início
            </Link>
            {NAV_ANCHORS.map((link) => (
              <a
                key={link.hash}
                href={buildHref(link.hash)}
                onClick={closeMobile}
                className="rounded-lg px-3 py-3.5 text-[17px] font-medium text-ink-soft transition-colors hover:bg-noturno/5 hover:text-noturno"
              >
                {link.label}
              </a>
            ))}
            <Link
              to="/livros"
              onClick={closeMobile}
              className="rounded-lg px-3 py-3.5 text-[17px] font-medium text-ink-soft transition-colors hover:bg-noturno/5 hover:text-noturno"
            >
              Livros
            </Link>
            {isAuthenticated && (
              <Link
                to="/meus-mapas"
                onClick={closeMobile}
                className="flex items-center gap-2 rounded-lg px-3 py-3.5 text-[17px] font-medium text-ink-soft transition-colors hover:bg-noturno/5 hover:text-noturno"
              >
                <Orbit size={18} />
                Meus mapas
              </Link>
            )}
            {user?.role === 'admin' && (
              <Link
                to="/admin/usuarios"
                onClick={closeMobile}
                className="flex items-center gap-2 rounded-lg px-3 py-3.5 text-[17px] font-medium text-ink-soft transition-colors hover:bg-noturno/5 hover:text-noturno"
              >
                <ShieldCheck size={18} />
                Administração
              </Link>
            )}
            <Link
              to={isAuthenticated ? '/perfil' : '/login'}
              onClick={closeMobile}
              className="flex items-center gap-2 rounded-lg px-3 py-3.5 text-[17px] font-semibold text-noturno transition-colors hover:bg-noturno/5"
            >
              <User size={18} />
              {isAuthenticated ? 'Meu Perfil' : 'Entrar'}
            </Link>
            {isAuthenticated && (
              <button
                type="button"
                onClick={() => {
                  closeMobile();
                  signOut();
                }}
                className="flex items-center gap-2 rounded-lg px-3 py-3.5 text-left text-[17px] font-medium text-ink-soft transition-colors hover:bg-noturno/5 hover:text-noturno"
              >
                <LogOut size={18} />
                Sair
              </button>
            )}

            <button
              type="button"
              onClick={() => {
                closeMobile();
                openFlow();
              }}
              className="mt-4 inline-flex items-center justify-center gap-2 rounded-xl bg-marte px-5 py-3.5 text-[15px] font-semibold text-offwhite transition-all hover:bg-marte-dark active:scale-[0.99]"
            >
              <Sparkles size={17} />
              Gere seu mapa astral gratuito
            </button>
          </nav>
        </div>,
        document.body,
      )
    : null;

  return (
    <>
      {headerElement}
      {mobileMenu}
    </>
  );
}
