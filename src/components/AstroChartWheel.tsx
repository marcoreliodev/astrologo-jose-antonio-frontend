import { useEffect, useId, useRef, useState } from 'react';
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

export function AstroChartWheel({
  chartData,
  size = 460,
}: {
  chartData: ChartData;
  size?: number;
}) {
  const rawId = useId();
  const containerId = `astro-chart-${rawId.replace(/[^a-zA-Z0-9]/g, '')}`;
  const containerRef = useRef<HTMLDivElement>(null);
  const [drawError, setDrawError] = useState<string | null>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    setDrawError(null);
    container.innerHTML = '';

    try {
      // A AstroChart espera um dicionário { nomeDoPlaneta: [longitude, velocidade] }.
      // O sinal da velocidade é o que faz a lib desenhar o símbolo de retrógrado (R),
      // então usamos speed quando disponível e, como fallback, um valor negativo
      // sintético se o back-end só mandou o boolean `retrograde`.
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

      const chart = new Chart(containerId, size, size, {
        COLOR_BACKGROUND: 'transparent',
        POINTS_COLOR: '#1A2238',
        SIGNS_COLOR: '#081E48',
        LINE_COLOR: '#3A3A3A',
        CIRCLE_COLOR: '#3A3A3A',
        CUSPS_FONT_COLOR: '#1A2238',
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
        As: [cusps[0]],
        Ic: [cusps[3]],
        Ds: [cusps[6]],
        Mc: [cusps[9]],
      });
      radix.aspects();
    } catch (err) {
      console.error('Erro ao desenhar o mapa astral:', err);
      const message =
        err instanceof Error
          ? err.message
          : 'Não foi possível desenhar o mapa astral.';
      queueMicrotask(() => setDrawError(message));
    }
  }, [chartData, containerId, size]);

  return (
    <div className="flex flex-col items-center gap-3 py-2">
      <div className="flex w-full items-center justify-center overflow-x-auto">
        <div
          id={containerId}
          ref={containerRef}
          style={{ width: size, height: size, minWidth: size }}
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
