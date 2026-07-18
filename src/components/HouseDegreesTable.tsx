import type { ChartCusp } from "../types/charts";
import { formatDegreeDMS, translateSign } from "../lib/astro-labels";
import { SIGN_ICONS } from "../lib/zodiac-icons";
import { ZodiacGlyph } from "./ZodiacGlyph";

export function HouseDegreesTable({ cusps }: { cusps: ChartCusp[] }) {
  const ordered = cusps.slice().sort((a, b) => a.house - b.house);

  return (
    <div className="overflow-hidden rounded-2xl border border-line bg-white">
      <div className="border-b border-line px-5 py-4">
        <h3 className="font-display text-lg font-semibold text-noturno">Grau das casas</h3>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full min-w-[320px] text-left text-sm">
          <thead>
            <tr className="border-b border-line text-xs font-semibold uppercase tracking-wide text-ink-soft">
              <th className="px-4 py-2.5">Casa</th>
              <th className="px-4 py-2.5">Signo</th>
              <th className="px-4 py-2.5">Grau</th>
            </tr>
          </thead>
          <tbody>
            {ordered.map((cusp) => (
              <tr key={cusp.house} className="border-b border-line last:border-0">
                <td className="whitespace-nowrap px-4 py-2.5 font-medium text-ink">
                  Casa {cusp.house}
                </td>
                <td className="whitespace-nowrap px-4 py-2.5 text-ink-soft">
                  <span className="inline-flex items-center gap-2">
                    <ZodiacGlyph svg={SIGN_ICONS[cusp.signName]} size={15} className="text-bronze" />
                    {translateSign(cusp.signName)}
                  </span>
                </td>
                <td className="whitespace-nowrap px-4 py-2.5 font-medium text-noturno">
                  {formatDegreeDMS(cusp.degInSign)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
