import { TriangleCurveGlyph, DiagonalLinesGlyph, OrbitSystemGlyph } from "./IdentityGlyphs";

type Variant = "hero" | "about" | "reels" | "subtle";

/**
 * Fundo animado com blobs de luz + elementos gráficos da identidade visual
 * (deltóide triangular, linhas diagonais, sistema solar com órbitas).
 * Usar dentro de um container com `position: relative; overflow: hidden`.
 */
export function AnimatedCosmicBackdrop({ variant = "subtle" }: { variant?: Variant }) {
  const blobOpacity = variant === "hero" ? { a: 0.42, b: 0.3 } : { a: 0.22, b: 0.16 };
  const glyphColor = "text-bronze-light";

  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden select-none" aria-hidden>
      {/* ── blobs de luz animados ── */}
      <div
        className="absolute rounded-full blur-[90px]"
        style={{
          background: "radial-gradient(circle, rgba(199,0,57,0.85), transparent 70%)",
          opacity: blobOpacity.a,
          animation: "drift-blob-1 16s ease-in-out infinite",
          ...(variant === "hero"
            ? { width: 700, height: 700, bottom: "-25%", left: "-20%" }
            : { width: 500, height: 500, bottom: "-30%", left: "-15%" }),
        }}
      />
      <div
        className="absolute rounded-full blur-[90px]"
        style={{
          background: "radial-gradient(circle, rgba(184,134,11,0.75), transparent 70%)",
          opacity: blobOpacity.b,
          animation: "drift-blob-2 20s ease-in-out infinite",
          ...(variant === "hero"
            ? { width: 600, height: 600, top: "-20%", right: "-20%" }
            : { width: 400, height: 400, top: "-25%", right: "-15%" }),
        }}
      />

      {/* ── elementos gráficos da identidade visual ── */}
      {(variant === "hero" || variant === "subtle") && (
        <>
          {/* Sistema solar — canto superior direito */}
          <OrbitSystemGlyph
            className={`absolute ${glyphColor}`}
            style={{
              width: variant === "hero" ? 340 : 260,
              height: "auto",
              top: "6%",
              right: "-4%",
              opacity: variant === "hero" ? 0.1 : 0.07,
              animation: "orbit-spin 90s linear infinite",
            }}
          />
          {/* Linhas diagonais — canto inferior esquerdo */}
          <DiagonalLinesGlyph
            className={`absolute ${glyphColor}`}
            style={{
              width: variant === "hero" ? 260 : 200,
              height: "auto",
              bottom: "8%",
              left: "2%",
              opacity: variant === "hero" ? 0.12 : 0.08,
            }}
          />
        </>
      )}

      {(variant === "about" || variant === "reels") && (
        <>
          {/* Deltóide triangular — centro-direita */}
          <TriangleCurveGlyph
            className={`absolute ${glyphColor}`}
            style={{
              width: 280,
              height: "auto",
              top: "10%",
              right: "2%",
              opacity: 0.07,
              animation: "orbit-spin-reverse 70s linear infinite",
            }}
          />
          {/* Sistema solar — inferior esquerdo */}
          <OrbitSystemGlyph
            className={`absolute ${glyphColor}`}
            style={{
              width: 220,
              height: "auto",
              bottom: "5%",
              left: "-2%",
              opacity: 0.07,
              animation: "orbit-spin 100s linear infinite",
            }}
          />
        </>
      )}
    </div>
  );
}
