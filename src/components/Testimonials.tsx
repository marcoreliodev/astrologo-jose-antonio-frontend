import { Quote } from "lucide-react";

interface Testimonial {
  name: string;
  city: string;
  text: string;
}

const TESTIMONIALS: Testimonial[] = [
  {
    name: "Marina C.",
    city: "Campina Grande/PB",
    text:
      "Fiz o mapa em menos de cinco minutos e me impressionei com o quanto as casas e os aspectos batiam com fases da minha vida que eu nem sabia explicar direito. Virou minha leitura de cabeceira.",
  },
  {
    name: "Rodrigo A.",
    city: "Recife/PE",
    text:
      "Sempre tive curiosidade sobre astrologia mas achava tudo muito genérico. Aqui os textos são bem específicos para o meu mapa, não parece um horóscopo de revista.",
  },
  {
    name: "Fernanda L.",
    city: "João Pessoa/PB",
    text:
      "Gerei o mapa da minha filha e entendi muita coisa do jeito dela ser. Já salvei o mapa de mais três pessoas da família na mesma conta.",
  },
];

export function Testimonials() {
  return (
    <div className="grid gap-6 sm:grid-cols-3">
      {TESTIMONIALS.map((testimonial) => (
        <figure
          key={testimonial.name}
          className="flex h-full flex-col gap-4 rounded-2xl border border-line bg-white p-7"
        >
          <Quote className="h-6 w-6 text-bronze" />
          <blockquote className="flex-1 text-sm leading-relaxed text-ink-soft">
            “{testimonial.text}”
          </blockquote>
          <figcaption>
            <p className="font-display text-sm font-semibold text-noturno">{testimonial.name}</p>
            <p className="text-xs text-ink-soft/70">{testimonial.city}</p>
          </figcaption>
        </figure>
      ))}
    </div>
  );
}
