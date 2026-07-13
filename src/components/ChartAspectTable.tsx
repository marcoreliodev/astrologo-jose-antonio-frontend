import type { ChartData } from "../types/charts";
import {
  ASPECT_GLYPHS,
  findAspect,
  formatDegreeDMS,
  getHouseOfLongitude,
  translateAspect,
  translatePlanet,
  translateSign,
} from "../lib/astro-labels";
import { ASPECT_ICONS, POINT_ICONS, RETROGRADE_ICON, SIGN_ICONS } from "../lib/zodiac-icons";
import { ZodiacGlyph } from "./ZodiacGlyph";

interface GridPoint {
  key: string;
  label: string;
  longitude: number;
  signName: string;
  degInSign: number;
  house: number;
  retrograde?: boolean;
}

const POINT_ORDER = [
  "Sun",
  "Moon",
  "Mercury",
  "Venus",
  "Mars",
  "Jupiter",
  "Saturn",
  "Uranus",
  "Neptune",
  "Pluto",
  "AC",
  "MC",
  "NorthNode",
  "Chiron",
];

// verde para aspectos harmônicos, marte para tensos, cinza para menores/neutros —
// as mesmas cores usadas na roda do mapa astral.
const ASPECT_COLORS: Record<string, string> = {
  conjunction: "text-ink-soft",
  semisextile: "text-ink-soft",
  sextile: "text-[#3F8A5C]",
  square: "text-marte",
  trine: "text-[#3F8A5C]",
  sesquisquare: "text-marte",
  quincunx: "text-ink-soft",
  opposition: "text-marte",
};

function pairKey(a: string, b: string): string {
  return [a, b].sort().join("::");
}

function PointIcon({ pointKey, className }: { pointKey: string; className?: string }) {
  return <ZodiacGlyph svg={POINT_ICONS[pointKey]} size={16} className={className} />;
}

function AspectIcon({ aspect }: { aspect: string }) {
  const icon = ASPECT_ICONS[aspect];
  const colorClass = ASPECT_COLORS[aspect] ?? "text-ink-soft";
  if (icon) return <ZodiacGlyph svg={icon} size={14} className={colorClass} />;
  return <span className={`text-sm ${colorClass}`}>{ASPECT_GLYPHS[aspect] ?? ""}</span>;
}

export function ChartAspectTable({ chartData }: { chartData: ChartData }) {
  const cuspsByHouse = chartData.cusps.slice().sort((a, b) => a.house - b.house);
  const houseOne = cuspsByHouse[0];
  const houseTen = cuspsByHouse[9];

  const points: GridPoint[] = POINT_ORDER.map((key) => {
    if (key === "AC") {
      return {
        key,
        label: "Ascendente",
        longitude: chartData.angles.asc,
        signName: houseOne.signName,
        degInSign: houseOne.degInSign,
        house: 1,
      };
    }
    if (key === "MC") {
      return {
        key,
        label: "Meio do Céu",
        longitude: chartData.angles.mc,
        signName: houseTen.signName,
        degInSign: houseTen.degInSign,
        house: 10,
      };
    }
    const planet = chartData.planets.find((p) => p.name === key)!;
    return {
      key,
      label: translatePlanet(key),
      longitude: planet.longitude,
      signName: planet.signName,
      degInSign: planet.degInSign,
      house: getHouseOfLongitude(
        planet.longitude,
        cuspsByHouse.map((c) => c.longitude),
      ),
      retrograde: planet.retrograde,
    };
  });

  // aspecto entre cada par de pontos: usa os aspectos já calculados pela API quando
  // disponíveis (planeta-planeta) e calcula localmente para pares que envolvem AC/MC.
  const apiAspects = new Map<string, string>();
  chartData.aspects.forEach((aspect) => {
    apiAspects.set(pairKey(aspect.planet1, aspect.planet2), aspect.aspect);
  });

  function aspectBetween(a: GridPoint, b: GridPoint): string | null {
    const fromApi = apiAspects.get(pairKey(a.key, b.key));
    if (fromApi) return fromApi;
    return findAspect(a.longitude, b.longitude);
  }

  return (
    <div className="overflow-x-auto rounded-2xl border border-line bg-white">
      <table className="w-full border-collapse text-left text-sm">
        <thead>
          <tr className="border-b border-line text-xs font-semibold uppercase tracking-wide text-ink-soft">
            <th className="whitespace-nowrap border-r border-line px-4 py-3">Ponto</th>
            <th className="whitespace-nowrap border-r border-line px-4 py-3">Grau</th>
            <th className="whitespace-nowrap border-r border-line px-4 py-3">Signo</th>
            <th className="whitespace-nowrap border-r border-line px-4 py-3">Casa</th>
            {points.map((point, index) => (
              <th
                key={point.key}
                className={`w-9 px-1 py-3 text-center ${index < points.length - 1 ? "border-r border-line" : ""}`}
                title={point.label}
              >
                <span className="inline-flex justify-center text-ink-soft/70">
                  <PointIcon pointKey={point.key} />
                </span>
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {points.map((point, rowIndex) => (
            <tr key={point.key} className="border-b border-line last:border-0">
              <td className="whitespace-nowrap border-r border-line px-4 py-2.5 font-semibold text-noturno">
                <span className="mr-2 inline-flex w-4 justify-center text-bronze">
                  <PointIcon pointKey={point.key} />
                </span>
                {point.label}
              </td>
              <td className="whitespace-nowrap border-r border-line px-4 py-2.5 font-medium text-marte">
                {formatDegreeDMS(point.degInSign)}
                {point.retrograde && (
                  <span className="ml-1 inline-flex align-middle text-marte">
                    <ZodiacGlyph svg={RETROGRADE_ICON} size={12} />
                  </span>
                )}
              </td>
              <td className="whitespace-nowrap border-r border-line px-4 py-2.5 text-ink-soft">
                <span className="inline-flex items-center gap-2">
                  <ZodiacGlyph
                    svg={SIGN_ICONS[point.signName]}
                    size={15}
                    className="text-bronze"
                  />
                  {translateSign(point.signName)}
                </span>
              </td>
              <td className="whitespace-nowrap border-r border-line px-4 py-2.5 text-ink-soft">
                Casa {point.house}
              </td>
              {points.slice(0, rowIndex + 1).map((colPoint, colIndex) => {
                const isLast = colIndex === points.length - 1;
                if (colIndex === rowIndex) {
                  return (
                    <td
                      key={colPoint.key}
                      className={`w-9 px-1 py-2.5 text-center text-ink ${!isLast ? "border-r border-line" : ""}`}
                    >
                      <span className="inline-flex justify-center">
                        <PointIcon pointKey={point.key} />
                      </span>
                    </td>
                  );
                }
                const aspect = aspectBetween(point, colPoint);
                return (
                  <td
                    key={colPoint.key}
                    className={`w-9 px-1 py-2.5 text-center ${!isLast ? "border-r border-line" : ""}`}
                    title={aspect ? translateAspect(aspect) : undefined}
                  >
                    {aspect && (
                      <span className="inline-flex justify-center">
                        <AspectIcon aspect={aspect} />
                      </span>
                    )}
                  </td>
                );
              })}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
