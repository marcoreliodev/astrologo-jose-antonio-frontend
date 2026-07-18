import { useMemo } from "react";
import { TriangleCurveGlyph, DiagonalLinesGlyph } from "./IdentityGlyphs";
import { SpiralOrbit } from "./SpiralOrbit";
import { ZodiacGlyph } from "./ZodiacGlyph";
import { SIGN_ICONS, POINT_ICONS } from "../lib/zodiac-icons";

type Variant = "hero" | "about" | "reels" | "subtle";

const GLYPH_POOL = [
  SIGN_ICONS.Aries,
  SIGN_ICONS.Leo,
  SIGN_ICONS.Scorpio,
  SIGN_ICONS.Aquarius,
  SIGN_ICONS.Sagittarius,
  SIGN_ICONS.Gemini,
  SIGN_ICONS.Libra,
  SIGN_ICONS.Cancer,
  SIGN_ICONS.Capricorn,
  SIGN_ICONS.Pisces,
  SIGN_ICONS.Taurus,
  SIGN_ICONS.Virgo,
  POINT_ICONS.Sun,
  POINT_ICONS.Moon,
  POINT_ICONS.Saturn,
  POINT_ICONS.Venus,
  POINT_ICONS.Mercury,
  POINT_ICONS.Jupiter,
];

// Gerador pseudo-aleatório determinístico (mulberry32) — mesma seed sempre
// produz o mesmo céu, então o layout não "pula" a cada re-render.
function mulberry32(seed: number) {
  let a = seed;
  return () => {
    a |= 0;
    a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

function hashString(str: string) {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    hash = (hash << 5) - hash + str.charCodeAt(i);
    hash |= 0;
  }
  return hash;
}

interface Star {
  x: number;
  y: number;
  r: number;
  delay: number;
  duration: number;
}

function buildSky(seed: string, starCount: number, glyphCount: number) {
  const rand = mulberry32(hashString(seed));

  const stars: Star[] = Array.from({ length: starCount }, () => ({
    x: rand() * 1000,
    y: rand() * 600,
    r: rand() < 0.15 ? 2.4 : 1.1 + rand() * 0.8,
    delay: rand() * 5,
    duration: 2.5 + rand() * 3.5,
  }));

  // conecta estrelas próximas em pequenos grupos, como constelações reais
  const lines: [Star, Star][] = [];
  const used = new Set<number>();
  for (let i = 0; i < stars.length && lines.length < Math.floor(starCount / 5); i++) {
    if (used.has(i)) continue;
    let closest = -1;
    let closestDist = 190;
    for (let j = 0; j < stars.length; j++) {
      if (i === j || used.has(j)) continue;
      const dist = Math.hypot(stars[i].x - stars[j].x, stars[i].y - stars[j].y);
      if (dist < closestDist) {
        closestDist = dist;
        closest = j;
      }
    }
    if (closest !== -1) {
      lines.push([stars[i], stars[closest]]);
      used.add(i);
      used.add(closest);
    }
  }

  const glyphs = Array.from({ length: glyphCount }, (_, i) => ({
    svg: GLYPH_POOL[Math.floor(rand() * GLYPH_POOL.length)],
    top: `${(rand() * 90 + 4).toFixed(1)}%`,
    left: `${(rand() * 92 + 2).toFixed(1)}%`,
    size: 18 + Math.floor(rand() * 22),
    duration: 9 + rand() * 10,
    delay: rand() * 6,
    key: i,
  }));

  return { stars, lines, glyphs };
}

/**
 * Fundo animado com céu estrelado/constelações em movimento, glifos
 * astrológicos reais flutuando e os blobs de luz + elementos gráficos da
 * identidade visual (deltóide triangular, linhas diagonais, sistema solar).
 * Usar dentro de um container com `position: relative; overflow: hidden`.
 */
export function AnimatedCosmicBackdrop({ variant = "subtle" }: { variant?: Variant }) {
  const blobOpacity = variant === "hero" ? { a: 0.42, b: 0.3 } : { a: 0.22, b: 0.16 };
  const glyphColor = "text-bronze-light";

  const sky = useMemo(
    () => buildSky(variant, variant === "hero" ? 70 : 46, variant === "hero" ? 9 : 6),
    [variant],
  );

  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden select-none" aria-hidden>
      {/* ── céu: estrelas + constelações ── */}
      <svg
        viewBox="0 0 1000 600"
        preserveAspectRatio="xMidYMid slice"
        className="absolute inset-0 h-full w-full"
        style={{ animation: "wheel-spin-slow 240s linear infinite" }}
      >
        <g stroke="#F8E2A8" strokeOpacity="0.16" strokeWidth="1">
          {sky.lines.map(([a, b], i) => (
            <line key={i} x1={a.x} y1={a.y} x2={b.x} y2={b.y} />
          ))}
        </g>
        {sky.stars.map((star, i) => (
          <circle
            key={i}
            cx={star.x}
            cy={star.y}
            r={star.r}
            fill="#F8E2A8"
            style={{
              animation: `twinkle ${star.duration}s ease-in-out ${star.delay}s infinite`,
            }}
          />
        ))}
      </svg>

      {/* ── glifos astrológicos reais, flutuando ── */}
      {sky.glyphs.map((glyph) => (
        <span
          key={glyph.key}
          className="absolute text-bronze-light/[0.16]"
          style={{
            top: glyph.top,
            left: glyph.left,
            animation: `glyph-drift ${glyph.duration}s ease-in-out ${glyph.delay}s infinite`,
          }}
        >
          <ZodiacGlyph svg={glyph.svg} size={glyph.size} />
        </span>
      ))}

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
          <SpiralOrbit
            className="absolute top-[6%] -right-[4%]"
            size={variant === "hero" ? 340 : 260}
            duration={90}
            opacity={variant === "hero" ? 0.1 : 0.07}
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
          <SpiralOrbit
            className="absolute -left-[2%] bottom-[5%]"
            size={220}
            duration={100}
            opacity={0.07}
            reverse
          />
        </>
      )}
    </div>
  );
}
