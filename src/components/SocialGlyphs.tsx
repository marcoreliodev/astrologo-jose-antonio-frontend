type GlyphProps = { className?: string };

export function InstagramGlyph({ className }: GlyphProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
      <rect x="3" y="3" width="18" height="18" rx="5" stroke="currentColor" strokeWidth="1.8" />
      <circle cx="12" cy="12" r="4" stroke="currentColor" strokeWidth="1.8" />
      <circle cx="17.2" cy="6.8" r="1.1" fill="currentColor" />
    </svg>
  );
}

export function TikTokGlyph({ className }: GlyphProps) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg" className={className}>
      <path d="M16.5 3c.3 1.7 1.5 3 3.4 3.3v3.1c-1.3 0-2.6-.4-3.6-1.1v6.3c0 3-2.4 5.4-5.4 5.4S5.5 17.6 5.5 14.6c0-2.8 2.1-5.1 4.8-5.4v3.2a2.2 2.2 0 1 0 1.6 2.1V3h4.6z" />
    </svg>
  );
}

export function FacebookGlyph({ className }: GlyphProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
      <path
        d="M14 9h2.5V6H14c-1.93 0-3.5 1.57-3.5 3.5V11H8.5v3H10.5v6h3v-6h2.3l.7-3H13.5V9.6c0-.33.27-.6.6-.6H14z"
        fill="currentColor"
      />
    </svg>
  );
}

export function YoutubeGlyph({ className }: GlyphProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
      <rect x="2.5" y="5.5" width="19" height="13" rx="3.5" stroke="currentColor" strokeWidth="1.8" />
      <path d="M10.5 9.2l4.5 2.8-4.5 2.8V9.2z" fill="currentColor" />
    </svg>
  );
}
