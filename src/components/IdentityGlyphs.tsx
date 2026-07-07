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

/** Sistema solar com órbitas elípticas inclinadas */
export function OrbitSystemGlyph({ className, style }: GlyphProps) {
  return (
    <svg
      viewBox="0 0 220 200"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      style={style}
      aria-hidden
    >
      {/* órbitas elípticas inclinadas */}
      <ellipse cx="110" cy="100" rx="105" ry="38" stroke="currentColor" strokeWidth="0.8"
        transform="rotate(-18 110 100)" />
      <ellipse cx="110" cy="100" rx="78" ry="28" stroke="currentColor" strokeWidth="0.8"
        transform="rotate(-18 110 100)" />
      <ellipse cx="110" cy="100" rx="52" ry="18" stroke="currentColor" strokeWidth="0.8"
        transform="rotate(-18 110 100)" />
      <ellipse cx="110" cy="100" rx="28" ry="10" stroke="currentColor" strokeWidth="0.8"
        transform="rotate(-18 110 100)" />
      {/* centro / sol */}
      <circle cx="110" cy="100" r="5" stroke="currentColor" strokeWidth="0.9" />
      {/* planetas nos pontos das órbitas */}
      <circle cx="204" cy="87" r="3.5" stroke="currentColor" strokeWidth="0.8" />
      <circle cx="16" cy="113" r="2.5" stroke="currentColor" strokeWidth="0.8" />
      <circle cx="178" cy="73" r="2" stroke="currentColor" strokeWidth="0.8" />
      {/* linha de referência / eixo */}
      <line x1="55" y1="170" x2="95" y2="110" stroke="currentColor" strokeWidth="0.8" />
    </svg>
  );
}
