import { createContext, useCallback, useContext, useMemo, useState, type ReactNode } from "react";
import { useLocation, useNavigate } from "react-router-dom";

interface GenerateFlowContextValue {
  isOpen: boolean;
  openFlow: () => void;
  closeFlow: () => void;
}

const GenerateFlowContext = createContext<GenerateFlowContextValue | null>(null);

/**
 * Tenta rolar até o formulário no hero da tela inicial. Se o elemento ainda
 * não existe (porque acabamos de navegar para "/" e o React ainda não
 * terminou de montar a página), tenta de novo por até ~1s.
 */
function scrollToGenerateSection(attempt = 0) {
  const el = document.getElementById("gerar-mapa");
  if (el) {
    el.scrollIntoView({ behavior: "smooth", block: "start" });
    return;
  }
  if (attempt < 20) {
    setTimeout(() => scrollToGenerateSection(attempt + 1), 50);
  }
}

// Deve ser renderizado dentro do <BrowserRouter> para poder navegar até "/"
// quando o formulário é aberto a partir de outra página (ex.: /livros).
export function GenerateFlowProvider({ children }: { children: ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const openFlow = useCallback(() => {
    setIsOpen(true);
    if (location.pathname !== "/") {
      navigate("/");
    }
    scrollToGenerateSection();
  }, [navigate, location.pathname]);

  const closeFlow = useCallback(() => setIsOpen(false), []);

  const value = useMemo<GenerateFlowContextValue>(
    () => ({ isOpen, openFlow, closeFlow }),
    [isOpen, openFlow, closeFlow],
  );

  return <GenerateFlowContext.Provider value={value}>{children}</GenerateFlowContext.Provider>;
}

// eslint-disable-next-line react-refresh/only-export-components -- hook precisa viver junto do Provider/Context
export function useGenerateFlow() {
  const context = useContext(GenerateFlowContext);
  if (!context) {
    throw new Error("useGenerateFlow deve ser usado dentro de um GenerateFlowProvider");
  }
  return context;
}
