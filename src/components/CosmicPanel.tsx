import { AnimatedCosmicBackdrop } from "./AnimatedCosmicBackdrop";
import { SpiralOrbit } from "./SpiralOrbit";

/**
 * Painel decorativo lateral usado nas telas de login/cadastro — usa o mesmo
 * fundo animado (céu com constelações, glifos e blobs de luz) das demais
 * seções escuras do site, para manter a identidade visual consistente.
 */
export function CosmicPanel({
  eyebrow,
  title,
  description,
}: {
  eyebrow: string;
  title: string;
  description: string;
}) {
  return (
    <div className="relative hidden h-full overflow-hidden bg-noturno lg:block">
      <div
        className="absolute inset-0"
        style={{ background: "linear-gradient(180deg, #081E48 0%, #0E2A5E 100%)" }}
      />
      <AnimatedCosmicBackdrop variant="subtle" />

      {/* halos orbitais */}
      <SpiralOrbit
        className="absolute -right-24 top-1/4"
        size={420}
        duration={110}
        opacity={0.16}
      />
      <SpiralOrbit
        className="absolute -left-32 -bottom-16"
        size={340}
        duration={130}
        reverse
        opacity={0.12}
      />

      {/* conteúdo */}
      <div className="relative flex h-full flex-col justify-center p-12">
        <div className="max-w-md">
          <span className="text-xs font-semibold uppercase tracking-[0.3em] text-bronze">
            {eyebrow}
          </span>
          <h1 className="mt-4 font-display text-4xl font-semibold leading-tight text-offwhite">
            {title}
          </h1>
          <p className="mt-4 text-base leading-relaxed text-offwhite/70">
            {description}
          </p>
          <div className="mt-8 h-px w-24 bg-gradient-to-r from-bronze to-bronze-light" />
        </div>
      </div>
    </div>
  );
}

export function MarsGlyph({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden
    >
      <circle cx="10" cy="14" r="6.25" stroke="currentColor" strokeWidth="1.8" />
      <path
        d="M14.5 9.5L20.5 3.5M20.5 3.5H15M20.5 3.5V9"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
