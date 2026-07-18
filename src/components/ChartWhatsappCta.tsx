import { MessageCircle } from "lucide-react";
import { EXTERNAL_LINKS } from "../lib/external-links";
import type { AstralChart } from "../types/charts";

/**
 * Chamada para ação exibida ao final do resultado do mapa astral,
 * convidando a pessoa a pedir uma interpretação com o astrólogo José
 * Antonio pelo WhatsApp. A mensagem já vai preenchida com o link do mapa.
 */
export function ChartWhatsappCta({ chart }: { chart: AstralChart }) {
  const chartUrl = `${window.location.origin}/mapa-astral/${chart.id}`;

  const message = [
    `Olá! Acabei de gerar o mapa astral de ${chart.name} e gostaria de uma interpretação.`,
    `Aqui está o link do mapa: ${chartUrl}`,
  ].join("\n\n");

  const whatsappHref = `${EXTERNAL_LINKS.whatsapp}?text=${encodeURIComponent(message)}`;

  return (
    <div className="mt-6 flex flex-col items-center justify-between gap-4 rounded-2xl border border-line bg-white p-5 sm:flex-row sm:p-6">
      <div>
        <p className="font-display text-base font-semibold text-noturno">
          Quer entender esse mapa a fundo?
        </p>
        <p className="mt-1 text-sm text-ink-soft">
          Envie seu mapa para o astrólogo José Antonio pelo WhatsApp e peça uma interpretação
          personalizada.
        </p>
      </div>
      <a
        href={whatsappHref}
        target="_blank"
        rel="noreferrer noopener"
        className="inline-flex shrink-0 items-center justify-center gap-2 rounded-xl bg-[#25D366] px-5 py-3.5 text-sm font-semibold text-white transition-all hover:brightness-95 active:scale-[0.99]"
      >
        <MessageCircle size={18} />
        Pedir interpretação no WhatsApp
      </a>
    </div>
  );
}
