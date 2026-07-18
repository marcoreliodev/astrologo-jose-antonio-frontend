interface SpiralOrbitProps {
  className?: string;
  size?: number | string;
  duration?: number;
  reverse?: boolean;
  opacity?: number;
}

export function SpiralOrbit({
  className = '',
  size = 320,
  duration = 90,
  reverse = false,
  opacity = 0.5,
}: SpiralOrbitProps) {
  return (
    <img
      src="/images/spiral-bronze.png"
      alt=""
      aria-hidden
      className={`pointer-events-none select-none ${className}`}
      style={{
        width: size,
        height: size,
        opacity,
        animation: `wheel-spin-slow ${duration}s linear infinite ${
          reverse ? 'reverse' : ''
        }`,
      }}
    />
  );
}
