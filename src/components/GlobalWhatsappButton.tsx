import { useLocation } from "react-router-dom";
import { WhatsappFloatButton } from "./WhatsappFloatButton";

/**
 * O botão flutuante aparece nas páginas voltadas ao público (landing,
 * login, cadastro, perfil do cliente) mas não na área administrativa,
 * onde seria apenas ruído visual para o admin em trabalho.
 */
export function GlobalWhatsappButton() {
  const location = useLocation();
  const isAdminArea = location.pathname.startsWith("/admin");

  if (isAdminArea) return null;

  return <WhatsappFloatButton />;
}
