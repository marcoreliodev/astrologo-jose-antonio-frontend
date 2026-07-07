import type { ReactNode } from "react";
import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { LandingHeader } from "./LandingHeader";
import { MarsGlyph } from "./CosmicPanel";

export function LegalPageLayout({
  eyebrow,
  title,
  children,
}: {
  eyebrow: string;
  title: string;
  children: ReactNode;
}) {
  return (
    <div className="min-h-screen bg-offwhite">
      <LandingHeader />

      <main className="mx-auto max-w-3xl px-6 py-14 sm:py-20">
        <Link
          to="/"
          className="inline-flex items-center gap-1.5 text-sm font-medium text-ink-soft transition-colors hover:text-noturno"
        >
          <ArrowLeft size={15} />
          Voltar para o início
        </Link>

        <span className="mt-8 block text-xs font-semibold uppercase tracking-[0.25em] text-bronze">
          {eyebrow}
        </span>
        <h1 className="mt-3 font-display text-3xl font-semibold text-noturno sm:text-4xl">
          {title}
        </h1>
        <div className="mt-6 h-px w-16 bg-gradient-to-r from-bronze to-bronze-light" />

        <div className="legal-content mt-10">{children}</div>
      </main>

      <footer className="border-t border-line bg-offwhite py-8">
        <div className="mx-auto flex max-w-3xl items-center gap-2.5 px-6">
          <MarsGlyph className="h-5 w-5 text-marte" />
          <span className="font-display text-sm font-semibold text-noturno">
            Astrólogo José Antonio
          </span>
        </div>
      </footer>
    </div>
  );
}
