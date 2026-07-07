import {
  MessageCircle,
  BookOpen,
  ShoppingCart,
  Sparkles,
  Compass,
  Link2,
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { LandingHeader } from '../components/LandingHeader';
import { SocialCard } from '../components/SocialCard';
import { MarsGlyph } from '../components/CosmicPanel';
import {
  InstagramGlyph,
  TikTokGlyph,
  FacebookGlyph,
  YoutubeGlyph,
} from '../components/SocialGlyphs';
import { InstagramEmbed } from '../components/InstagramEmbed';
import { Reveal } from '../components/Reveal';
import { AnimatedCosmicBackdrop } from '../components/AnimatedCosmicBackdrop';
import { EXTERNAL_LINKS, FEATURED_REELS } from '../lib/external-links';

export default function HomePage() {
  return (
    <div className="min-h-screen bg-offwhite">
      <LandingHeader />
      <HeroSection />
      <BookSection />
      <AboutSection />
      <ReelsSection />
      <SocialSection />
      <WhatsappSection />
      <LandingFooter />
    </div>
  );
}

function HeroSection() {
  const stars = Array.from({ length: 36 }, (_, i) => ({
    id: i,
    top: (i * 31) % 100,
    left: (i * 47) % 100,
    size: i % 6 === 0 ? 2.5 : 1.3,
    delay: (i % 8) * 0.4,
  }));

  return (
    <section className="relative overflow-hidden bg-noturno">
      <div
        className="absolute inset-0"
        style={{
          background: 'linear-gradient(180deg, #081E48 0%, #0E2A5E 100%)',
        }}
      />
      <AnimatedCosmicBackdrop variant="hero" />

      {/* estrelas */}
      <div className="absolute inset-0 pointer-events-none">
        {stars.map((star) => (
          <span
            key={star.id}
            className="absolute rounded-full bg-bronze-light"
            style={{
              top: `${star.top}%`,
              left: `${star.left}%`,
              width: star.size,
              height: star.size,
              animation: `twinkle 3.5s ease-in-out ${star.delay}s infinite`,
            }}
          />
        ))}
      </div>

      <div className="relative mx-auto max-w-6xl px-6 py-16 lg:py-24">
        {/* layout: texto + [foto + capa] */}
        <div className="grid gap-10 lg:grid-cols-[1fr_auto] lg:items-center lg:gap-16">
          {/* coluna esquerda — texto */}
          <div style={{ animation: 'rise-fade 0.5s ease-out' }}>
            <div className="inline-flex items-center gap-2 rounded-full bg-bronze/15 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.2em] text-bronze-light">
              <MarsGlyph className="h-3.5 w-3.5" />
              Regência de Marte
            </div>

            <h1 className="mt-6 font-display text-4xl font-bold leading-[1.1] text-offwhite sm:text-5xl">
              2026 é o ano da conquista.
              <br />
              <span className="bronze-gradient-text">Comece a agir.</span>
            </h1>

            <p className="mt-6 max-w-lg text-lg leading-relaxed text-offwhite/70">
              Sob a regência de Marte, 2026 não premia quem espera — premia quem
              age. Descubra como navegar o arquétipo do guerreiro com coragem,
              estratégia e clareza astrológica no novo guia do astrólogo José
              Antonio.
            </p>

            <div className="mt-9 flex flex-col gap-3 sm:flex-row">
              <a
                href={EXTERNAL_LINKS.bookHotmart}
                target="_blank"
                rel="noreferrer noopener"
                className="inline-flex items-center justify-center gap-2 rounded-xl bg-marte px-6 py-3.5 text-[15px] font-semibold text-offwhite transition-all hover:bg-marte-dark hover:shadow-lg hover:shadow-marte/30 active:scale-[0.99]"
              >
                <BookOpen size={18} />
                Garantir meu guia
              </a>
              <a
                href={EXTERNAL_LINKS.whatsapp}
                target="_blank"
                rel="noreferrer noopener"
                className="inline-flex items-center justify-center gap-2 rounded-xl border border-offwhite/20 bg-offwhite/5 px-6 py-3.5 text-[15px] font-semibold text-offwhite transition-all hover:bg-offwhite/10"
              >
                <MessageCircle size={18} />
                Marcar consulta
              </a>
            </div>
          </div>

          {/* coluna direita — foto do astrólogo + capa do livro */}
          <div
            className="flex items-end justify-center gap-6 lg:gap-8"
            style={{ animation: 'rise-fade 0.65s ease-out' }}
          >
            {/* foto do José Antonio */}
            <div className="relative shrink-0">
              {/* halo dourado */}
              <div
                className="absolute -inset-1 rounded-[2rem] opacity-50 blur-xl"
                style={{
                  background:
                    'conic-gradient(from 200deg, #C70039, #B8860B, #081E48, #B8860B, #C70039)',
                  animation: 'orbit-spin 14s linear infinite',
                }}
                aria-hidden
              />
              <img
                src="/images/jose-antonio.jpg"
                alt="Astrólogo José Antonio Coutinho Vinhas"
                className="relative w-52 rounded-[1.75rem] object-cover shadow-2xl sm:w-64 lg:w-72"
                style={{
                  aspectRatio: '3/4',
                  objectPosition: 'center top',
                }}
              />
              {/* badge flutuante */}
              <div
                className="absolute -bottom-4 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-full bg-noturno/90 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.18em] text-bronze backdrop-blur-sm border border-bronze/20"
                style={{ animation: 'float-soft 5s ease-in-out infinite' }}
              >
                José Antonio • Astrólogo
              </div>
            </div>

            {/* capa do livro */}
            <img
              src="/images/livro-capa.png"
              alt="Capa do Guia Astrológico 2026"
              className="hidden w-44 drop-shadow-2xl sm:block lg:w-52"
              style={{
                filter: 'drop-shadow(0 20px 40px rgba(199,0,57,0.3))',
                animation: 'float-soft 6s ease-in-out 1s infinite',
              }}
            />
          </div>
        </div>
      </div>
    </section>
  );
}

function BookSection() {
  return (
    <section id="livro" className="bg-offwhite py-20 sm:py-28">
      <div className="mx-auto max-w-6xl px-6">
        <div className="grid gap-12 lg:grid-cols-2 lg:items-center lg:gap-16">
          <Reveal direction="left" className="order-2 lg:order-1">
            <span className="text-xs font-semibold uppercase tracking-[0.25em] text-bronze">
              O livro
            </span>
            <h2 className="mt-3 font-display text-3xl font-semibold text-noturno sm:text-4xl">
              2026: O Ano da Conquista
            </h2>
            <p className="mt-1 text-sm font-medium text-ink-soft">
              Guia Astrológico Definitivo para a Regência de Marte e o Grande
              Reset Cósmico
            </p>
            <p className="mt-5 text-base leading-relaxed text-ink-soft">
              2026 não será um ano para amadores. Regido por Marte, o arquétipo
              do guerreiro, este é o momento de agir com coragem e
              assertividade. Mas lembre-se: no mundo da astrologia, força sem
              direção é apenas ruído — e este guia existe para te dar a direção
              certa.
            </p>
            <p className="mt-4 text-base leading-relaxed text-ink-soft">
              Por José Antonio Coutinho Vinhas — um material prático para
              entender a regência de Marte, o "grande reset cósmico" do ano e
              como transformar a energia combativa do período em conquistas
              reais, na carreira, nas finanças e nos relacionamentos.
            </p>

            <ul className="mt-7 flex flex-col gap-3">
              <Feature
                icon={<Sparkles size={16} />}
                text="A regência de Marte explicada signo a signo"
              />
              <Feature
                icon={<Compass size={16} />}
                text="Estratégias práticas para agir com coragem direcionada"
              />
              <Feature
                icon={<BookOpen size={16} />}
                text="Disponível em formato físico e digital"
              />
            </ul>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <a
                href={EXTERNAL_LINKS.bookHotmart}
                target="_blank"
                rel="noreferrer noopener"
                className="inline-flex items-center justify-center gap-2 rounded-xl bg-marte px-6 py-3.5 text-[15px] font-semibold text-offwhite transition-all hover:bg-marte-dark hover:shadow-lg hover:shadow-marte/25 active:scale-[0.99]"
              >
                <ShoppingCart size={18} />
                Comprar na Hotmart
              </a>
              <a
                href={EXTERNAL_LINKS.bookAmazon}
                target="_blank"
                rel="noreferrer noopener"
                className="inline-flex items-center justify-center gap-2 rounded-xl border border-noturno/15 px-6 py-3.5 text-[15px] font-semibold text-noturno transition-all hover:bg-noturno/5"
              >
                <BookOpen size={18} />
                Ver na Amazon
              </a>
            </div>
          </Reveal>

          <Reveal
            direction="right"
            delay={100}
            className="order-1 flex justify-center lg:order-2"
          >
            <img
              src="/images/livro-capa.png"
              alt="Capa do livro Guia Astrológico 2026: O Ano da Conquista"
              className="w-full max-w-xs transition-transform duration-500 hover:scale-[1.03] lg:max-w-sm"
            />
          </Reveal>
        </div>
      </div>
    </section>
  );
}

function Feature({ icon, text }: { icon: React.ReactNode; text: string }) {
  return (
    <li className="flex items-center gap-3 text-sm text-ink">
      <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-bronze-light/40 text-bronze">
        {icon}
      </span>
      {text}
    </li>
  );
}

function AboutSection() {
  return (
    <section className="relative overflow-hidden bg-noturno py-20 sm:py-24">
      <AnimatedCosmicBackdrop variant="about" />
      <div className="relative mx-auto max-w-5xl px-6">
        <div className="grid gap-10 sm:grid-cols-[auto_1fr] sm:items-center sm:gap-12">
          <Reveal direction="left" className="flex justify-center">
            <div className="relative">
              <div
                className="absolute -inset-2 rounded-[1.5rem] opacity-50 blur-xl"
                style={{
                  background:
                    'conic-gradient(from 180deg, #C70039, #B8860B, #081E48, #C70039)',
                  animation: 'orbit-spin 12s linear infinite',
                }}
                aria-hidden
              />
              <img
                src="/images/jose-antonio-perfil.png"
                alt="Astrólogo José Antonio"
                className="relative h-48 w-48 rounded-full border-4 border-offwhite/10 object-cover shadow-2xl sm:h-56 sm:w-56"
              />
            </div>
          </Reveal>

          <Reveal
            direction="right"
            delay={100}
            className="text-center sm:text-left"
          >
            <span className="text-xs font-semibold uppercase tracking-[0.25em] text-bronze">
              O astrólogo
            </span>
            <h2 className="mt-3 font-display text-3xl font-semibold text-offwhite sm:text-4xl">
              José Antonio Coutinho Vinhas
            </h2>
            <p className="mt-5 max-w-xl text-base leading-relaxed text-offwhite/70">
              José Antonio é astrólogo com mais de 40 anos de estudo e
              atendimento a inúmeros clientes, além de ser tarólogo e psicólogo.
              Com uma visão técnica e humanizada, contribui para o
              autoconhecimento dos clientes e leitores, traduzindo a linguagem
              dos astros para a realidade prática da vida. <br/><br/>Prepare-se. A
              conquista exige estratégia.
            </p>
            <div className="mx-auto mt-8 h-px w-20 bg-gradient-to-r from-bronze to-bronze-light sm:mx-0" />
          </Reveal>
        </div>
      </div>
    </section>
  );
}

function ReelsSection() {
  return (
    <section className="relative overflow-hidden bg-noturno py-20 sm:py-28">
      <AnimatedCosmicBackdrop variant="reels" />
      <div className="relative mx-auto max-w-6xl px-6">
        <Reveal className="mb-12 text-center">
          <span className="text-xs font-semibold uppercase tracking-[0.25em] text-bronze">
            Direto do Instagram
          </span>
          <h2 className="mt-3 font-display text-3xl font-semibold text-offwhite sm:text-4xl">
            Veja os últimos reels
          </h2>
          <p className="mx-auto mt-4 max-w-lg text-base text-offwhite/70">
            Um pouco do conteúdo astrológico que José Antonio compartilha todos
            os dias no Instagram.
          </p>
        </Reveal>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {FEATURED_REELS.map((reel, index) => (
            <Reveal key={reel.shortcode || index} delay={index * 100}>
              <InstagramEmbed
                shortcode={reel.shortcode}
                caption={reel.caption}
              />
            </Reveal>
          ))}
        </div>

        <Reveal className="mt-10 text-center">
          <a
            href={EXTERNAL_LINKS.instagram}
            target="_blank"
            rel="noreferrer noopener"
            className="inline-flex items-center gap-2 rounded-xl border border-offwhite/20 bg-offwhite/5 px-6 py-3 text-sm font-semibold text-offwhite transition-all hover:bg-offwhite/10"
          >
            <InstagramGlyph className="h-4 w-4" />
            Ver mais no @astrologojoseantonio
          </a>
        </Reveal>
      </div>
    </section>
  );
}

function SocialSection() {
  const socials = [
    {
      href: EXTERNAL_LINKS.instagram,
      icon: <InstagramGlyph className="h-5 w-5" />,
      label: 'Instagram',
      handle: '@astrologojoseantonio',
      accent: 'marte' as const,
    },
    {
      href: EXTERNAL_LINKS.tiktok,
      icon: <TikTokGlyph className="h-5 w-5" />,
      label: 'TikTok',
      handle: '@astrologojoseantonio',
      accent: 'noturno' as const,
    },
    {
      href: EXTERNAL_LINKS.facebook,
      icon: <FacebookGlyph className="h-5 w-5" />,
      label: 'Facebook',
      handle: 'Astrólogo José Antonio',
      accent: 'noturno' as const,
    },
    {
      href: EXTERNAL_LINKS.youtube,
      icon: <YoutubeGlyph className="h-5 w-5" />,
      label: 'YouTube',
      handle: '@astrologojoseantonio',
      accent: 'marte' as const,
    },
    {
      href: EXTERNAL_LINKS.bioSite,
      icon: <Link2 size={20} />,
      label: 'Todos os links',
      handle: 'bio.site/astrologo.joseantonio',
      accent: 'bronze' as const,
    },
  ];

  return (
    <section id="redes" className="bg-offwhite py-20 sm:py-28">
      <div className="mx-auto max-w-6xl px-6">
        <Reveal className="mb-12 text-center">
          <span className="text-xs font-semibold uppercase tracking-[0.25em] text-bronze">
            Acompanhe
          </span>
          <h2 className="mt-3 font-display text-3xl font-semibold text-noturno sm:text-4xl">
            Conteúdo astrológico todos os dias
          </h2>
          <p className="mx-auto mt-4 max-w-lg text-base text-ink-soft">
            Previsões, bastidores do livro e reflexões sobre a regência de Marte
            nas redes sociais do astrólogo José Antonio.
          </p>
        </Reveal>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {socials.map((social, index) => (
            <Reveal key={social.label} delay={index * 60}>
              <SocialCard {...social} />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

function WhatsappSection() {
  return (
    <section className="bg-marte py-16 sm:py-20">
      <Reveal className="mx-auto flex max-w-4xl flex-col items-center gap-6 px-6 text-center">
        <span
          className="flex h-14 w-14 items-center justify-center rounded-full bg-offwhite/15"
          style={{ animation: 'float-soft 4s ease-in-out infinite' }}
        >
          <MessageCircle size={26} className="text-offwhite" />
        </span>
        <h2 className="font-display text-2xl font-semibold text-offwhite sm:text-3xl">
          Quer uma leitura personalizada para o seu momento?
        </h2>
        <p className="max-w-xl text-offwhite/85">
          Marque sua consulta diretamente pelo WhatsApp e descubra como a
          regência de Marte se manifesta no seu mapa.
        </p>
        <a
          href={EXTERNAL_LINKS.whatsapp}
          target="_blank"
          rel="noreferrer noopener"
          className="inline-flex items-center gap-2 rounded-xl bg-offwhite px-6 py-3.5 text-[15px] font-semibold text-marte transition-transform hover:scale-[1.02] active:scale-[0.99]"
        >
          <MessageCircle size={18} />
          Marcar consulta no WhatsApp
        </a>
      </Reveal>
    </section>
  );
}

function LandingFooter() {
  return (
    <footer className="bg-noturno py-10">
      <div className="mx-auto flex max-w-6xl flex-col items-center gap-6 px-6 text-center sm:flex-row sm:justify-between sm:text-left">
        <div className="flex items-center gap-2.5">
          <MarsGlyph className="h-5 w-5 text-bronze" />
          <span className="font-display text-base font-semibold text-offwhite">
            Astrólogo José Antonio
          </span>
        </div>

        <div className="flex flex-col items-center gap-3 sm:flex-row sm:gap-6">
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
          <p className="text-xs uppercase tracking-[0.2em] text-offwhite/40">
            2026 — O Ano da Conquista
          </p>
        </div>
      </div>
    </footer>
  );
}
