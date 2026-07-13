export function ZodiacGlyph({
  svg,
  size = 18,
  className = "",
}: {
  svg: string;
  size?: number;
  className?: string;
}) {
  return (
    <span
      className={`inline-flex shrink-0 items-center justify-center ${className}`}
      style={{ width: size, height: size }}
      // Ícones estáticos do pacote zodiacfonts, sem entrada de usuário.
      dangerouslySetInnerHTML={{ __html: svg }}
    />
  );
}
