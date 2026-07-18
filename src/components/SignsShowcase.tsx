import { useState } from "react";
import { ZodiacGlyph } from "./ZodiacGlyph";
import { SIGN_ICONS } from "../lib/zodiac-icons";
import { SIGN_LABELS } from "../lib/astro-labels";

const SIGNS: { key: string; dates: string; element: string; ruler: string }[] = [
  { key: "Aries", dates: "21/03 – 19/04", element: "Fogo", ruler: "Marte" },
  { key: "Taurus", dates: "20/04 – 20/05", element: "Terra", ruler: "Vênus" },
  { key: "Gemini", dates: "21/05 – 20/06", element: "Ar", ruler: "Mercúrio" },
  { key: "Cancer", dates: "21/06 – 22/07", element: "Água", ruler: "Lua" },
  { key: "Leo", dates: "23/07 – 22/08", element: "Fogo", ruler: "Sol" },
  { key: "Virgo", dates: "23/08 – 22/09", element: "Terra", ruler: "Mercúrio" },
  { key: "Libra", dates: "23/09 – 22/10", element: "Ar", ruler: "Vênus" },
  { key: "Scorpio", dates: "23/10 – 21/11", element: "Água", ruler: "Plutão" },
  { key: "Sagittarius", dates: "22/11 – 21/12", element: "Fogo", ruler: "Júpiter" },
  { key: "Capricorn", dates: "22/12 – 19/01", element: "Terra", ruler: "Saturno" },
  { key: "Aquarius", dates: "20/01 – 18/02", element: "Ar", ruler: "Urano" },
  { key: "Pisces", dates: "19/02 – 20/03", element: "Água", ruler: "Netuno" },
];

/**
 * Vitrine dos 12 signos: grade de cartas com o glifo real de cada signo,
 * datas, elemento e regente. Ao passar o mouse (ou tocar), o cartão vira
 * revelando as informações — um pequeno teatro astrológico.
 */
export function SignsShowcase() {
  const [active, setActive] = useState<string | null>(null);

  return (
    <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-6">
      {SIGNS.map((sign) => {
        const isActive = active === sign.key;
        return (
          <button
            key={sign.key}
            type="button"
            onClick={() => setActive(isActive ? null : sign.key)}
            onMouseEnter={() => setActive(sign.key)}
            onMouseLeave={() => setActive((current) => (current === sign.key ? null : current))}
            className="group relative aspect-[4/5] overflow-hidden rounded-2xl border border-line bg-white text-left shadow-sm transition-all hover:-translate-y-1 hover:shadow-lg hover:shadow-noturno/10"
          >
            <div
              className="absolute inset-0 flex flex-col items-center justify-center gap-3 p-4 transition-opacity duration-300"
              style={{ opacity: isActive ? 0 : 1 }}
            >
              <span className="flex h-12 w-12 items-center justify-center rounded-full bg-bronze-light/30 text-bronze">
                <ZodiacGlyph svg={SIGN_ICONS[sign.key]} size={26} />
              </span>
              <span className="font-display text-sm font-semibold text-noturno">
                {SIGN_LABELS[sign.key]}
              </span>
            </div>

            <div
              className="absolute inset-0 flex flex-col items-center justify-center gap-1.5 bg-noturno p-4 text-center transition-opacity duration-300"
              style={{ opacity: isActive ? 1 : 0 }}
            >
              <ZodiacGlyph svg={SIGN_ICONS[sign.key]} size={22} className="text-bronze-light" />
              <span className="font-display text-sm font-semibold text-offwhite">
                {SIGN_LABELS[sign.key]}
              </span>
              <span className="text-[11px] text-offwhite/60">{sign.dates}</span>
              <span className="mt-1 text-[11px] font-medium uppercase tracking-wide text-bronze-light">
                {sign.element} · {sign.ruler}
              </span>
            </div>
          </button>
        );
      })}
    </div>
  );
}
