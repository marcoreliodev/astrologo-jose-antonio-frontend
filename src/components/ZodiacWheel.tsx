import { ZodiacGlyph } from "./ZodiacGlyph";
import { SIGN_ICONS } from "../lib/zodiac-icons";

const SIGN_ORDER = [
  "Aries",
  "Taurus",
  "Gemini",
  "Cancer",
  "Leo",
  "Virgo",
  "Libra",
  "Scorpio",
  "Sagittarius",
  "Capricorn",
  "Aquarius",
  "Pisces",
];

/**
 * Roda do zodíaco — elemento de assinatura visual do site: um anel girando
 * lentamente com os 12 glifos reais dos signos, círculos concêntricos como
 * uma carta astral, e um núcleo pulsante representando o Sol.
 */
export function ZodiacWheel({
  className = "",
  glyphSize = 16,
}: {
  className?: string;
  glyphSize?: number;
}) {
  const radius = 46; // % do container
  return (
    <div className={`relative ${className}`} aria-hidden>
      {/* anéis concêntricos, como uma carta astral */}
      <svg viewBox="0 0 100 100" className="absolute inset-0 h-full w-full">
        <circle cx="50" cy="50" r="48" fill="none" stroke="#F8E2A8" strokeOpacity="0.25" strokeWidth="0.4" />
        <circle cx="50" cy="50" r="36" fill="none" stroke="#F8E2A8" strokeOpacity="0.3" strokeWidth="0.4" />
        <circle cx="50" cy="50" r="24" fill="none" stroke="#F8E2A8" strokeOpacity="0.22" strokeWidth="0.3" />
        {SIGN_ORDER.map((_, i) => {
          const angle = (i * 30 * Math.PI) / 180;
          const x1 = 50 + 24 * Math.cos(angle);
          const y1 = 50 + 24 * Math.sin(angle);
          const x2 = 50 + 48 * Math.cos(angle);
          const y2 = 50 + 48 * Math.sin(angle);
          return (
            <line
              key={i}
              x1={x1}
              y1={y1}
              x2={x2}
              y2={y2}
              stroke="#F8E2A8"
              strokeOpacity="0.15"
              strokeWidth="0.3"
            />
          );
        })}
      </svg>

      {/* anel externo girando com os 12 signos */}
      <div
        className="absolute inset-0"
        style={{ animation: "wheel-spin-slow 140s linear infinite" }}
      >
        {SIGN_ORDER.map((sign, i) => {
          const angle = (i * 30 * Math.PI) / 180 - Math.PI / 2;
          const x = 50 + radius * Math.cos(angle);
          const y = 50 + radius * Math.sin(angle);
          return (
            <div
              key={sign}
              className="absolute"
              style={{
                left: `${x}%`,
                top: `${y}%`,
                width: "11%",
                height: "11%",
                transform: "translate(-50%, -50%)",
              }}
            >
              <div
                className="flex h-full w-full items-center justify-center rounded-full border border-bronze-light/30 bg-noturno/60 text-bronze-light backdrop-blur-sm"
                style={{
                  animation: "wheel-spin-slow 140s linear infinite reverse",
                }}
              >
                <ZodiacGlyph svg={SIGN_ICONS[sign]} size={glyphSize} className="opacity-90" />
              </div>
            </div>
          );
        })}
      </div>

      {/* núcleo pulsante */}
      <div
        className="absolute left-1/2 top-1/2 h-[18%] w-[18%] -translate-x-1/2 -translate-y-1/2 rounded-full"
        style={{
          background: "radial-gradient(circle, #F8E2A8 0%, #C70039 70%, transparent 100%)",
          animation: "pulse-glow 4s ease-in-out infinite",
          filter: "blur(1px)",
        }}
      />
    </div>
  );
}
