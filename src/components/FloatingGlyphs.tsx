import { ZodiacGlyph } from "./ZodiacGlyph";
import { POINT_ICONS, SIGN_ICONS } from "../lib/zodiac-icons";

const PLACEMENTS = [
  { icon: SIGN_ICONS.Leo, top: "8%", left: "4%", size: 26, delay: 0 },
  { icon: POINT_ICONS.Saturn, top: "18%", left: "92%", size: 22, delay: 1.2 },
  { icon: SIGN_ICONS.Scorpio, top: "72%", left: "6%", size: 24, delay: 0.6 },
  { icon: POINT_ICONS.Venus, top: "82%", left: "90%", size: 20, delay: 1.8 },
  { icon: SIGN_ICONS.Aquarius, top: "45%", left: "96%", size: 20, delay: 2.4 },
  { icon: POINT_ICONS.Moon, top: "38%", left: "2%", size: 22, delay: 0.9 },
];

/**
 * Glifos astrológicos flutuando suavemente sobre seções claras, em opacidade
 * bem baixa — textura ambiente, sem competir com o conteúdo.
 */
export function FloatingGlyphs({ className = "" }: { className?: string }) {
  return (
    <div className={`pointer-events-none absolute inset-0 overflow-hidden select-none ${className}`} aria-hidden>
      {PLACEMENTS.map((item, index) => (
        <span
          key={index}
          className="absolute text-noturno/[0.06]"
          style={{
            top: item.top,
            left: item.left,
            animation: `glyph-drift ${7 + index}s ease-in-out ${item.delay}s infinite`,
          }}
        >
          <ZodiacGlyph svg={item.icon} size={item.size} />
        </span>
      ))}
    </div>
  );
}
