import { Link } from "react-router-dom";
import { InstagramGlyph, TikTokGlyph, FacebookGlyph, YoutubeGlyph } from "./SocialGlyphs";
import { EXTERNAL_LINKS } from "../lib/external-links";

const SOCIAL_LINKS = [
  { href: EXTERNAL_LINKS.instagram, label: "Instagram", Glyph: InstagramGlyph },
  { href: EXTERNAL_LINKS.tiktok, label: "TikTok", Glyph: TikTokGlyph },
  { href: EXTERNAL_LINKS.facebook, label: "Facebook", Glyph: FacebookGlyph },
  { href: EXTERNAL_LINKS.youtube, label: "YouTube", Glyph: YoutubeGlyph },
];

export function LandingFooter() {
  return (
    <footer className="bg-noturno py-10">
      <div className="mx-auto flex max-w-6xl flex-col items-center gap-6 px-6 text-center sm:flex-row sm:justify-between sm:text-left">
        <div className="flex items-center gap-2.5">
          <span className="font-display text-base font-semibold text-offwhite">
            Astrólogo José Antonio
          </span>
        </div>

        <div className="flex items-center gap-3">
          {SOCIAL_LINKS.map(({ href, label, Glyph }) => (
            <a
              key={label}
              href={href}
              target="_blank"
              rel="noreferrer noopener"
              aria-label={label}
              className="flex h-9 w-9 items-center justify-center rounded-full border border-offwhite/15 text-offwhite/70 transition-colors hover:border-bronze-light hover:text-bronze-light"
            >
              <Glyph className="h-4 w-4" />
            </a>
          ))}
        </div>

        <div className="flex flex-col items-center gap-3 sm:flex-row sm:gap-6">
          <Link
            to="/livros"
            className="text-xs font-medium text-offwhite/60 transition-colors hover:text-offwhite"
          >
            Livros
          </Link>
          <Link
            to="/termos-de-uso"
            className="text-xs font-medium text-offwhite/60 transition-colors hover:text-offwhite"
          >
            Termos de Uso
          </Link>
          <Link
            to="/politica-de-privacidade"
            className="text-xs font-medium text-offwhite/60 transition-colors hover:text-offwhite"
          >
            Política de Privacidade
          </Link>
        </div>
      </div>
    </footer>
  );
}
