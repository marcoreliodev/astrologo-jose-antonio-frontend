import { ZodiacGlyph } from './ZodiacGlyph';
import {
  ASPECT_ICONS,
  POINT_ICONS,
  RETROGRADE_ICON,
  SIGN_ICONS,
} from '../lib/zodiac-icons';
import { PLANET_LABELS, SIGN_LABELS, SIGN_ORDER } from '../lib/astro-labels';

const LEGEND_POINTS: { key: string; label: string }[] = [
  { key: 'Sun', label: PLANET_LABELS.Sun },
  { key: 'Moon', label: PLANET_LABELS.Moon },
  { key: 'Mercury', label: PLANET_LABELS.Mercury },
  { key: 'Venus', label: PLANET_LABELS.Venus },
  { key: 'Mars', label: PLANET_LABELS.Mars },
  { key: 'Jupiter', label: PLANET_LABELS.Jupiter },
  { key: 'Saturn', label: PLANET_LABELS.Saturn },
  { key: 'Uranus', label: PLANET_LABELS.Uranus },
  { key: 'Neptune', label: PLANET_LABELS.Neptune },
  { key: 'Pluto', label: PLANET_LABELS.Pluto },
  { key: 'NorthNode', label: PLANET_LABELS.NorthNode },
  { key: 'AC', label: 'Ascendente' },
  { key: 'DS', label: 'Descendente' },
  { key: 'MC', label: 'Meio do Céu' },
  { key: 'IC', label: 'Fundo do Céu' },
];

const LEGEND_ASPECTS: { key: string; label: string; colorClass: string }[] = [
  { key: 'conjunction', label: 'Conjunção', colorClass: 'text-ink-soft' },
  { key: 'sextile', label: 'Sextil', colorClass: 'text-[#3F8A5C]' },
  { key: 'square', label: 'Quadratura', colorClass: 'text-marte' },
  { key: 'trine', label: 'Trígono', colorClass: 'text-[#3F8A5C]' },
  { key: 'opposition', label: 'Oposição', colorClass: 'text-marte' },
];

function LegendRow({
  svg,
  label,
  iconClassName = 'bg-bronze/10 text-bronze',
}: {
  svg: string;
  label: string;
  iconClassName?: string;
}) {
  return (
    <li className="flex items-center gap-2.5 py-1">
      <span
        className={`flex h-6 w-6 shrink-0 items-center justify-center rounded-full ${iconClassName}`}
      >
        <ZodiacGlyph svg={svg} size={14} />
      </span>
      <span className="text-sm text-ink-soft">{label}</span>
    </li>
  );
}

export function ChartLegendPoints() {
  return (
    <div className="overflow-hidden rounded-2xl border border-line bg-white">
      <div className="border-b border-line px-5 py-4">
        <h3 className="font-display text-lg font-semibold text-noturno">
          Legenda
        </h3>
      </div>

      <div className="px-5 py-4">
        <p className="mb-1.5 text-xs font-semibold uppercase tracking-wide text-ink-soft">
          Planetas e pontos
        </p>
        <ul>
          {LEGEND_POINTS.map((point) => (
            <LegendRow
              key={point.key}
              svg={POINT_ICONS[point.key]}
              label={point.label}
            />
          ))}
          <LegendRow
            svg={RETROGRADE_ICON}
            label="Retrógrado"
            iconClassName="bg-marte/10 text-marte"
          />
        </ul>
      </div>
    </div>
  );
}

export function ChartLegendAspectsSigns() {
  return (
    <div className="overflow-hidden rounded-2xl border border-line bg-white">
      <div className="grid gap-0 sm:grid-cols-2">
        <div className="px-5 py-4">
          <p className="mb-1.5 text-xs font-semibold uppercase tracking-wide text-ink-soft">
            Aspectos
          </p>
          <ul>
            {LEGEND_ASPECTS.map((aspect) => (
              <LegendRow
                key={aspect.key}
                svg={ASPECT_ICONS[aspect.key]}
                label={aspect.label}
                iconClassName={`bg-ink-soft/10 ${aspect.colorClass}`}
              />
            ))}
          </ul>
        </div>

        <div className="border-t border-line px-5 py-4 sm:border-t-0 sm:border-l">
          <p className="mb-1.5 text-xs font-semibold uppercase tracking-wide text-ink-soft">
            Signos
          </p>
          <ul className="sm:columns-2 sm:gap-4">
            {SIGN_ORDER.map((sign) => (
              <LegendRow
                key={sign}
                svg={SIGN_ICONS[sign]}
                label={SIGN_LABELS[sign]}
              />
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
