import { Link } from 'react-router-dom';
import { MarsGlyph } from './CosmicPanel';
import { useAuth } from '../context/AuthContext';

export function LandingHeader() {
  const { isAuthenticated } = useAuth();

  return (
    <header className="sticky top-0 z-30 border-b border-line/60 bg-offwhite/90 backdrop-blur-md">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
        <Link to="/" className="flex items-center gap-2.5">
          <MarsGlyph className="h-6 w-6 text-marte" />
          <span className="font-display text-lg font-semibold text-noturno">
            Astrólogo José Antonio
          </span>
        </Link>

        <nav className="flex items-center gap-2">
          <a
            href="#livro"
            className="hidden rounded-lg px-3 py-2 text-sm font-medium text-ink-soft transition-colors hover:bg-noturno/5 hover:text-noturno sm:inline-block"
          >
            O livro
          </a>
          <a
            href="#redes"
            className="hidden rounded-lg px-3 py-2 text-sm font-medium text-ink-soft transition-colors hover:bg-noturno/5 hover:text-noturno sm:inline-block"
          >
            Redes sociais
          </a>
          <Link
            to={isAuthenticated ? '/perfil' : '/login'}
            className="rounded-lg px-3 py-2 text-sm font-semibold text-noturno transition-colors hover:bg-noturno/5"
          >
            {isAuthenticated ? 'Meu Perfil' : 'Entrar'}
          </Link>
        </nav>
      </div>
    </header>
  );
}
