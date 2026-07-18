import { ArrowLeft, BookOpen, ShoppingCart } from "lucide-react";
import { Link } from "react-router-dom";
import { LandingHeader } from "../components/LandingHeader";
import { LandingFooter } from "../components/LandingFooter";
import { FloatingGlyphs } from "../components/FloatingGlyphs";
import { Reveal } from "../components/Reveal";
import { EXTERNAL_LINKS } from "../lib/external-links";

interface Book {
  slug: string;
  title: string;
  subtitle: string;
  cover: string;
  description: string;
  amazonUrl: string;
  hotmartUrl: string;
}

const BOOKS: Book[] = [
  {
    slug: "2026-o-ano-da-conquista",
    title: "2026: O Ano da Conquista",
    subtitle: "Guia Astrológico Definitivo para a Regência de Marte e o Grande Reset Cósmico",
    cover: "/images/capa-livro-2026.png",
    description:
      "Depois de conhecer seu mapa astral, aprofunde-se na regência de Marte em 2026 com o guia escrito por José Antonio. O livro traduz os principais trânsitos do ano — e o que eles significam para cada signo — em uma leitura direta, prática e sem enrolação.",
    amazonUrl: EXTERNAL_LINKS.bookAmazon,
    hotmartUrl: EXTERNAL_LINKS.bookHotmart,
  },
];

export default function BooksPage() {
  return (
    <div className="min-h-screen bg-offwhite">
      <LandingHeader />

      <section className="relative overflow-hidden bg-noturno py-16 sm:py-20">
        <FloatingGlyphs />
        <div className="relative mx-auto max-w-6xl px-6">
          <Link
            to="/"
            className="inline-flex items-center gap-1.5 text-sm font-medium text-offwhite/70 transition-colors hover:text-offwhite"
          >
            <ArrowLeft size={15} />
            Voltar para o início
          </Link>

          <span className="mt-8 block text-xs font-semibold uppercase tracking-[0.25em] text-bronze-light">
            Para se aprofundar
          </span>
          <h1 className="mt-3 font-display text-3xl font-semibold text-offwhite sm:text-4xl">
            Livros do Astrólogo José Antonio
          </h1>
          <p className="mt-4 max-w-xl text-base leading-relaxed text-offwhite/70">
            Depois de gerar o seu mapa astral gratuito, continue a jornada com os
            livros escritos por José Antonio — disponíveis para compra na Amazon.
          </p>
        </div>
      </section>

      <section className="py-16 sm:py-20">
        <div className="mx-auto max-w-6xl px-6">
          <div className="flex flex-col gap-8">
            {BOOKS.map((book) => (
              <Reveal key={book.slug}>
                <div className="flex flex-col gap-8 rounded-3xl border border-line bg-white p-6 sm:flex-row sm:items-center sm:gap-10 sm:p-10">
                  <img
                    src={book.cover}
                    alt={`Capa do livro ${book.title}`}
                    className="mx-auto w-40 shrink-0 rounded-lg object-cover shadow-xl sm:mx-0 sm:w-52"
                  />
                  <div className="flex-1">
                    <span className="inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-[0.2em] text-bronze">
                      <BookOpen size={14} />
                      Livro físico
                    </span>
                    <h2 className="mt-3 font-display text-2xl font-semibold text-noturno sm:text-3xl">
                      {book.title}
                    </h2>
                    <p className="mt-1 text-sm font-medium text-ink-soft">{book.subtitle}</p>
                    <p className="mt-4 max-w-xl text-sm leading-relaxed text-ink-soft">
                      {book.description}
                    </p>

                    <div className="mt-6 flex flex-col gap-3 sm:flex-row">
                      <a
                        href={book.amazonUrl}
                        target="_blank"
                        rel="noreferrer noopener"
                        className="inline-flex items-center justify-center gap-2 rounded-xl bg-marte px-6 py-3.5 text-[15px] font-semibold text-offwhite transition-all hover:bg-marte-dark hover:shadow-lg hover:shadow-marte/30 active:scale-[0.99]"
                      >
                        <ShoppingCart size={18} />
                        Comprar livro físico na Amazon
                      </a>
                      <a
                        href={book.hotmartUrl}
                        target="_blank"
                        rel="noreferrer noopener"
                        className="inline-flex items-center justify-center gap-2 rounded-xl border border-noturno/15 px-6 py-3.5 text-[15px] font-semibold text-noturno transition-all hover:bg-noturno/5"
                      >
                        <BookOpen size={18} />
                        Versão digital
                      </a>
                    </div>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <LandingFooter />
    </div>
  );
}
