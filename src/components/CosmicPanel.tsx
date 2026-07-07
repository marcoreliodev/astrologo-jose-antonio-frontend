/**
 * Painel decorativo lateral inspirado na capa do Guia 2026:
 * fundo Azul Noturno, halos orbitais em baixo relevo dourado,
 * estrelas cintilantes e o símbolo de Marte (♂) como assinatura.
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
  const stars = Array.from({ length: 28 }, (_, i) => ({
    id: i,
    top: (i * 37) % 100,
    left: (i * 53) % 100,
    delay: (i % 7) * 0.4,
    size: i % 5 === 0 ? 2.5 : 1.3,
  }));

  return (
    <div className="relative hidden h-full overflow-hidden bg-noturno lg:block">
      {/* gradiente cósmico de fundo: noturno -> marte sutil no canto, como na capa */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(circle at 20% 85%, rgba(199,0,57,0.35), transparent 55%), radial-gradient(circle at 80% 15%, rgba(184,134,11,0.18), transparent 50%), linear-gradient(180deg, #081E48 0%, #0E2A5E 100%)",
        }}
      />

      {/* estrelas */}
      <div className="absolute inset-0">
        {stars.map((star) => (
          <span
            key={star.id}
            className="absolute rounded-full bg-bronze-light"
            style={{
              top: `${star.top}%`,
              left: `${star.left}%`,
              width: star.size,
              height: star.size,
              animation: `twinkle 3.5s ease-in-out ${star.delay}s infinite`,
            }}
          />
        ))}
      </div>

      {/* halos orbitais em baixo relevo */}
      <div
        className="absolute -right-32 top-1/3 h-[420px] w-[420px] opacity-[0.18]"
        style={{ animation: "orbit-spin 60s linear infinite" }}
        aria-hidden
      >
        <OrbitRings />
      </div>
      <div
        className="absolute -left-40 -bottom-24 h-[360px] w-[360px] opacity-[0.12]"
        style={{ animation: "orbit-spin-reverse 80s linear infinite" }}
        aria-hidden
      >
        <OrbitRings />
      </div>

      {/* conteúdo */}
      <div className="relative flex h-full flex-col justify-between p-12">
        <div className="flex items-center gap-3 text-bronze-light/90">
          <MarsGlyph className="h-7 w-7" />
          <span className="text-sm font-semibold uppercase tracking-[0.2em]">
            Astrólogo José Antonio
          </span>
        </div>

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

        <p className="text-xs uppercase tracking-[0.25em] text-offwhite/40">
          Guia 2026 — O Ano da Conquista
        </p>
      </div>
    </div>
  );
}

function OrbitRings() {
  return (
    <svg viewBox="0 0 400 400" fill="none" xmlns="http://www.w3.org/2000/svg" className="h-full w-full">
      <ellipse cx="200" cy="200" rx="190" ry="70" stroke="#F8E2A8" strokeWidth="1" transform="rotate(-15 200 200)" />
      <ellipse cx="200" cy="200" rx="140" ry="50" stroke="#F8E2A8" strokeWidth="1" transform="rotate(10 200 200)" />
      <ellipse cx="200" cy="200" rx="90" ry="32" stroke="#F8E2A8" strokeWidth="1" transform="rotate(-5 200 200)" />
      <circle cx="200" cy="200" r="10" fill="#F8E2A8" />
      <circle cx="370" cy="175" r="3" fill="#F8E2A8" />
      <circle cx="80" cy="225" r="2.5" fill="#F8E2A8" />
    </svg>
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
