import { AstroChartWheel } from './AstroChartWheel';
import { ChartHeaderCards } from './ChartHeaderCards';
import { ChartAspectTable } from './ChartAspectTable';
import { ChartLegendPoints, ChartLegendAspectsSigns } from './ChartLegend';
import { ChartWhatsappCta } from './ChartWhatsappCta';
import { ZodiacGlyph } from './ZodiacGlyph';
import { SIGN_ICONS } from '../lib/zodiac-icons';
import { SIGN_DESCRIPTIONS, translateSign } from '../lib/astro-labels';
import type { AstralChart } from '../types/charts';

export function ChartResultView({ chart }: { chart: AstralChart }) {
  const sun = chart.chartData.planets.find((p) => p.name === 'Sun');
  const moon = chart.chartData.planets.find((p) => p.name === 'Moon');
  const asc = chart.chartData.cusps.find((c) => c.house === 1);

  return (
    <>
      {sun && moon && asc && (
        <div className="mb-6">
          <ChartHeaderCards
            sunSign={sun.signName}
            ascSign={asc.signName}
            moonSign={moon.signName}
          />
        </div>
      )}

      {sun && SIGN_DESCRIPTIONS[sun.signName] && (
        <div className="mb-8 flex items-start gap-4 rounded-2xl border border-line bg-white p-5 sm:p-6">
          <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-bronze/10 text-bronze">
            <ZodiacGlyph svg={SIGN_ICONS[sun.signName]} size={22} />
          </span>
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-bronze">
              Sobre o seu Signo Solar · {translateSign(sun.signName)}
            </p>
            <p className="mt-1.5 text-sm leading-relaxed text-ink-soft">
              {SIGN_DESCRIPTIONS[sun.signName]}
            </p>
          </div>
        </div>
      )}

      <div className="mb-8 grid min-w-0 gap-6 lg:grid-cols-[260px_1fr]">
        <div className="order-2 min-w-0 lg:order-1 lg:row-span-2">
          <ChartLegendPoints />
        </div>
        <div className="order-1 min-w-0 lg:order-2">
          <div className="rounded-2xl border border-line bg-white p-4 sm:p-8">
            <AstroChartWheel chartData={chart.chartData} />
          </div>
        </div>
        <div className="order-3 min-w-0 lg:order-3">
          <ChartLegendAspectsSigns />
        </div>
      </div>

      <div className="min-w-0">
        <ChartAspectTable chartData={chart.chartData} />
      </div>

      <ChartWhatsappCta chart={chart} />
    </>
  );
}
