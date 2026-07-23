import { useEffect, useId, useLayoutEffect, useRef, useState } from 'react';
import { Chart } from '@astrodraw/astrochart';
import { AlertTriangle } from 'lucide-react';
import type { ChartData } from '../types/charts';

/**
 * Desenha a roda do mapa astral (radix) usando a biblioteca AstroChart
 * (https://github.com/AstroDraw/AstroChart), a partir dos dados retornados
 * pela API (planetas e cúspides das casas).
 *
 * Cores dos signos seguem o esquema por ELEMENTO usado na imagem de referência:
 *   Fogo  (Áries, Leão, Sagitário)     -> laranja
 *   Terra (Touro, Virgem, Capricórnio) -> marrom
 *   Ar    (Gêmeos, Libra, Aquário)     -> azul claro
 *   Água  (Câncer, Escorpião, Peixes)  -> verde
 *
 * A ordem do array COLORS_SIGNS segue a ordem dos signos no zodíaco,
 * começando em Áries (índice 0) até Peixes (índice 11).
 */

const ELEMENT_COLORS = {
  fire: '#FF4500', // laranja
  earth: '#8B4512', // marrom
  air: '#87CEEB', // azul claro
  water: '#26AD60', // verde
};

// Áries, Touro, Gêmeos, Câncer, Leão, Virgem, Libra, Escorpião, Sagitário, Capricórnio, Aquário, Peixes
const COLORS_SIGNS = [
  ELEMENT_COLORS.fire, // Áries
  ELEMENT_COLORS.earth, // Touro
  ELEMENT_COLORS.air, // Gêmeos
  ELEMENT_COLORS.water, // Câncer
  ELEMENT_COLORS.fire, // Leão
  ELEMENT_COLORS.earth, // Virgem
  ELEMENT_COLORS.air, // Libra
  ELEMENT_COLORS.water, // Escorpião
  ELEMENT_COLORS.fire, // Sagitário
  ELEMENT_COLORS.earth, // Capricórnio
  ELEMENT_COLORS.air, // Aquário
  ELEMENT_COLORS.water, // Peixes
];

/**
 * Divide uma longitude absoluta (0-360) em grau/minuto DENTRO do signo (0-29° / 0-59'),
 * no mesmo formato que radix.addPointsOfInterest() espera no campo degree/minute.
 */
function toDegreeMinute(longitude: number): { degree: number; minute: number } {
  const normalized = ((longitude % 360) + 360) % 360;
  const degInSign = normalized % 30;
  const degree = Math.floor(degInSign);
  const minute = Math.round((degInSign - degree) * 60);
  return { degree, minute };
}

export function AstroChartWheel({
  chartData,
  size = 560,
}: {
  chartData: ChartData;
  size?: number;
}) {
  const rawId = useId();
  const containerId = `astro-chart-${rawId.replace(/[^a-zA-Z0-9]/g, '')}`;
  const wrapperRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [drawError, setDrawError] = useState<string | null>(null);
  const [drawSize, setDrawSize] = useState(size);

  useLayoutEffect(() => {
    const wrapper = wrapperRef.current;
    if (!wrapper) return;

    const updateSize = (width: number) => {
      const next = Math.max(260, Math.min(size, Math.floor(width)));
      setDrawSize((current) => (current === next ? current : next));
    };

    updateSize(wrapper.getBoundingClientRect().width);

    const observer = new ResizeObserver((entries) => {
      const width = entries[0]?.contentRect.width;
      if (width) updateSize(width);
    });
    observer.observe(wrapper);
    return () => observer.disconnect();
  }, [size]);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    setDrawError(null);
    container.innerHTML = '';

    try {
      const symbolScale = drawSize / size;

      const planets: Record<string, number[]> = {};
      chartData.planets.forEach((planet) => {
        const speed =
          typeof planet.speed === 'number'
            ? planet.speed
            : planet.retrograde
            ? -1
            : 1;
        planets[planet.name] = [planet.longitude, speed];
      });

      const cusps = chartData.cusps
        .slice()
        .sort((a, b) => a.house - b.house)
        .map((cusp) => cusp.longitude);

      if (cusps.length !== 12) {
        throw new Error('Dados de casas incompletos para desenhar o mapa.');
      }

      const chart = new Chart(containerId, drawSize, drawSize, {
        COLOR_BACKGROUND: 'transparent',
        POINTS_COLOR: '#1A2238',
        SIGNS_COLOR: '#081E48',
        LINE_COLOR: '#3A3A3A',
        CIRCLE_COLOR: '#3A3A3A',
        CUSPS_FONT_COLOR: '#1A2238',
        CUSPS_LINES_TO_OUTER_CIRCLE: true,
        SYMBOL_SCALE: symbolScale,

        // graus/minutos + ℞ perto de cada planeta
        SHOW_DEGREES_MINUTES: true,
        DEGREES_MINUTES_TEXT_SIZE: 10,
        DEGREES_MINUTES_GAP: 8,

        // espessuras independentes
        HOUSES_STROKE: 1,
        ASPECTS_STROKE: 1,
        SYMBOL_AXIS_FONT_COLOR: '#1A2238',
        COLORS_SIGNS,
        // Faixa de fundo dos signos (o "anel colorido" visto na imagem)
        COLOR_ARIES: COLORS_SIGNS[0],
        COLOR_TAURUS: COLORS_SIGNS[1],
        COLOR_GEMINI: COLORS_SIGNS[2],
        COLOR_CANCER: COLORS_SIGNS[3],
        COLOR_LEO: COLORS_SIGNS[4],
        COLOR_VIRGO: COLORS_SIGNS[5],
        COLOR_LIBRA: COLORS_SIGNS[6],
        COLOR_SCORPIO: COLORS_SIGNS[7],
        COLOR_SAGITTARIUS: COLORS_SIGNS[8],
        COLOR_CAPRICORN: COLORS_SIGNS[9],
        COLOR_AQUARIUS: COLORS_SIGNS[10],
        COLOR_PISCES: COLORS_SIGNS[11],
        SYMBOL_NNODE: 'NorthNode',
        SHOW_DIGNITIES_TEXT: false,
        ASPECTS: {
          conjunction: { degree: 0, orbit: 8, color: '#B9AFC9' },
          semisextile: { degree: 30, orbit: 2, color: '#B9AFC9' },
          sextile: { degree: 60, orbit: 6, color: '#3F8A5C' },
          square: { degree: 90, orbit: 8, color: '#C70039' },
          trine: { degree: 120, orbit: 8, color: '#3F8A5C' },
          sesquisquare: { degree: 135, orbit: 2, color: '#C70039' },
          quincunx: { degree: 150, orbit: 3, color: '#B9AFC9' },
          opposition: { degree: 180, orbit: 8, color: '#C70039' },
        },
      });

      const radix = chart.radix({ planets, cusps });

      radix.addPointsOfInterest({
        As: { longitude: cusps[0], ...toDegreeMinute(cusps[0]) },
        Ic: { longitude: cusps[3], ...toDegreeMinute(cusps[3]) },
        Ds: { longitude: cusps[6], ...toDegreeMinute(cusps[6]) },
        Mc: { longitude: cusps[9], ...toDegreeMinute(cusps[9]) },
      });

      const ASPECT_STYLE: Record<
        string,
        { degree: number; color: string; orbit: number }
      > = {
        conjunction: { degree: 0, color: '#B9AFC9', orbit: 8 },
        semisextile: { degree: 30, color: '#B9AFC9', orbit: 2 },
        semisquare: { degree: 45, color: '#C70039', orbit: 2 },
        sextile: { degree: 60, color: '#3F8A5C', orbit: 6 },
        square: { degree: 90, color: '#C70039', orbit: 8 },
        trine: { degree: 120, color: '#3F8A5C', orbit: 8 },
        sesquisquare: { degree: 135, color: '#C70039', orbit: 2 },
        quincunx: { degree: 150, color: '#B9AFC9', orbit: 3 },
        opposition: { degree: 180, color: '#C70039', orbit: 8 },
      };

      const positionByName: Record<string, number> = {};
      chartData.planets.forEach((p) => {
        positionByName[p.name] = p.longitude;
      });

      const customAspects = chartData.aspects
        .filter((a) => ASPECT_STYLE[a.aspect])
        .map((a) => ({
          point: { name: a.planet1, position: positionByName[a.planet1] },
          toPoint: { name: a.planet2, position: positionByName[a.planet2] },
          aspect: { name: a.aspect, ...ASPECT_STYLE[a.aspect] },
          precision: a.orb.toFixed(4),
        }));
      radix.aspects(customAspects);
    } catch (err) {
      console.error('Erro ao desenhar o mapa astral:', err);
      const message =
        err instanceof Error
          ? err.message
          : 'Não foi possível desenhar o mapa astral.';
      queueMicrotask(() => setDrawError(message));
    }
  }, [chartData, containerId, drawSize, size]);

  return (
    <div className="flex flex-col items-center gap-3 py-2">
      <div ref={wrapperRef} className="flex w-full items-center justify-center">
        <div
          id={containerId}
          ref={containerRef}
          style={{ width: drawSize, height: drawSize }}
        />
      </div>
      {drawError && (
        <p className="flex items-center gap-1.5 text-xs font-medium text-red-600">
          <AlertTriangle size={14} />
          {drawError}
        </p>
      )}
    </div>
  );
}
