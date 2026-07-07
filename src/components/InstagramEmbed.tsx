/**
 * Incorpora um reel do Instagram via iframe usando a URL de embed direto:
 * https://www.instagram.com/reel/SHORTCODE/embed/
 *
 * Funciona sem login do visitante e sem carregar scripts externos.
 *
 * Para obter o shortcode:
 *   1. Abra o reel no Instagram
 *   2. Clique nos três pontinhos → "Incorporar"
 *   3. No código que aparece, o shortcode está em:
 *      data-instgrm-permalink="https://www.instagram.com/reel/SHORTCODE/..."
 */
export function InstagramEmbed({
  shortcode,
  caption,
}: {
  shortcode: string;
  caption?: string;
}) {
  const hasContent = Boolean(shortcode?.trim());
  const embedUrl = hasContent
    ? `https://www.instagram.com/reel/${shortcode.trim()}/embed/`
    : "";

  if (!hasContent) {
    return (
      <div className="flex aspect-[9/16] w-full flex-col items-center justify-center gap-3 rounded-2xl border border-dashed border-bronze/40 bg-noturno/[0.03] p-6 text-center">
        <InstagramIcon className="h-8 w-8 text-bronze/60" />
        <p className="text-sm font-medium text-offwhite/70">{caption}</p>
        <p className="text-xs text-offwhite/40">
          Cole o shortcode em{" "}
          <code className="rounded bg-offwhite/10 px-1 font-mono text-bronze">
            external-links.ts
          </code>
        </p>
      </div>
    );
  }

  return (
    <div className="w-full overflow-hidden rounded-2xl">
      <iframe
        src={embedUrl}
        title={caption ?? "Reel do Instagram"}
        allowFullScreen
        allow="autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share"
        scrolling="no"
        frameBorder={0}
        className="block w-full"
        style={{ aspectRatio: "9 / 16", border: "none", minWidth: 0 }}
        loading="lazy"
      />
    </div>
  );
}

function InstagramIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <rect x="3" y="3" width="18" height="18" rx="5" stroke="currentColor" strokeWidth="1.6" />
      <circle cx="12" cy="12" r="4" stroke="currentColor" strokeWidth="1.6" />
      <circle cx="17.2" cy="6.8" r="1" fill="currentColor" />
    </svg>
  );
}
