/**
 * Os três elementos gráficos da identidade visual do Guia 2026 (do PDF),
 * recreados como SVG em baixo relevo. Usados como decoração de fundo
 * nas seções escuras — sempre com opacidade baixa e stroke dourado.
 */

type GlyphProps = {
  className?: string;
  style?: React.CSSProperties;
};

/** Padrão triangular com curvas (deltóide / rosa de 3 pétalas) */
export function TriangleCurveGlyph({ className, style }: GlyphProps) {
  return (
    <svg
      viewBox="0 0 200 200"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      style={style}
      aria-hidden
    >
      {/* Série de curvas que formam o padrão triangular com pétalas */}
      {[0, 15, 30, 45, 60, 75, 90, 105, 120].map((rot, i) => (
        <g key={i} transform={`rotate(${rot} 100 100)`}>
          <path
            d="M100 20 C160 60, 160 140, 100 180 C40 140, 40 60, 100 20 Z"
            stroke="currentColor"
            strokeWidth="0.8"
            fill="none"
          />
        </g>
      ))}
      {/* triângulo central */}
      <path
        d="M100 30 L168 148 L32 148 Z"
        stroke="currentColor"
        strokeWidth="0.9"
        fill="none"
      />
    </svg>
  );
}

/** Linhas paralelas angulares diagonais */
export function DiagonalLinesGlyph({ className, style }: GlyphProps) {
  return (
    <svg
      viewBox="0 0 200 120"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      style={style}
      aria-hidden
    >
      {[0, 12, 24, 36, 50].map((offset, i) => (
        <line
          key={i}
          x1={offset}
          y1="0"
          x2={200}
          y2={120 - offset * 2.2}
          stroke="currentColor"
          strokeWidth={i === 0 ? 1.1 : 0.7}
        />
      ))}
    </svg>
  );
}
