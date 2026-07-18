import { useState } from "react";
import { ChevronDown } from "lucide-react";

interface FaqItem {
  question: string;
  answer: string;
}

const FAQ_ITEMS: FaqItem[] = [
  {
    question: "O que é o mapa astral?",
    answer:
      "É o retrato do céu no exato momento em que você nasceu. A partir da sua data, horário e cidade de nascimento, calculamos a posição dos planetas, as casas e os aspectos entre eles — e traduzimos tudo isso em uma leitura sobre suas tendências, talentos e desafios.",
  },
  {
    question: "Do que eu preciso para gerar o meu mapa?",
    answer:
      "Só três informações: data de nascimento, horário exato e a cidade onde você nasceu. Com isso o sistema já calcula seu mapa completo em segundos.",
  },
  {
    question: "Não sei o horário exato do meu nascimento. Ainda dá para gerar o mapa?",
    answer:
      "Sem o horário exato não é possível calcular com precisão o ascendente e as casas astrológicas. Recomendamos consultar a certidão de nascimento ou o hospital onde você nasceu antes de gerar o mapa.",
  },
  {
    question: "O mapa astral gratuito é completo?",
    answer:
      "Sim — o mapa gratuito traz todos os planetas, casas e aspectos calculados com precisão astronômica. Para uma leitura aprofundada e personalizada, você também pode marcar uma consulta com José Antonio.",
  },
  {
    question: "Posso gerar o mapa de outras pessoas, como filhos ou familiares?",
    answer:
      "Pode sim. Sua conta permite salvar quantos mapas você quiser — o seu, de familiares ou amigos — e consultá-los sempre que precisar.",
  },
];

export function FaqAccordion() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <div className="mx-auto flex max-w-3xl flex-col gap-3">
      {FAQ_ITEMS.map((item, index) => {
        const isOpen = openIndex === index;
        return (
          <div
            key={item.question}
            className="overflow-hidden rounded-2xl border border-line bg-white transition-colors"
          >
            <button
              type="button"
              onClick={() => setOpenIndex(isOpen ? null : index)}
              aria-expanded={isOpen}
              className="flex w-full items-center justify-between gap-4 px-6 py-5 text-left"
            >
              <span className="font-display text-base font-semibold text-noturno">
                {item.question}
              </span>
              <ChevronDown
                size={20}
                className="shrink-0 text-bronze transition-transform duration-300"
                style={{ transform: isOpen ? "rotate(180deg)" : "rotate(0deg)" }}
              />
            </button>
            {isOpen && (
              <p
                className="px-6 pb-5 text-sm leading-relaxed text-ink-soft"
                style={{ animation: "accordion-open 0.25s ease-out" }}
              >
                {item.answer}
              </p>
            )}
          </div>
        );
      })}
    </div>
  );
}
