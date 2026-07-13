import {
  MessageCircle,
  Sparkles,
  Orbit,
  Compass,
  Link2,
  UserRoundPen,
  Wand2,
  ScrollText,
  BookOpen,
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
import { useAuth } from '../context/AuthContext';
import { EXTERNAL_LINKS, FEATURED_REELS } from '../lib/external-links';

export default function HomePage() {
  return (
    <div className="min-h-screen bg-offwhite">
      <LandingHeader />
      <HeroSection />
      <HowItWorksSection />
      <FeaturesSection />
      <AboutSection />
      <BookSection />
      <ReelsSection />
      <SocialSection />
      <WhatsappSection />
      <LandingFooter />
    </div>
  );
}

function HeroSection() {
  const { isAuthenticated } = useAuth();
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
        {/* layout: texto + roda do mapa astral */}
        <div className="grid gap-10 lg:grid-cols-[1fr_auto] lg:items-center lg:gap-16">
          {/* coluna esquerda — texto */}
          <div style={{ animation: 'rise-fade 0.5s ease-out' }}>
            <div className="inline-flex items-center gap-2 rounded-full bg-bronze/15 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.2em] text-bronze-light">
              <Sparkles className="h-3.5 w-3.5" />
              Mapa astral gratuito
            </div>

            <h1 className="mt-6 font-display text-4xl font-bold leading-[1.1] text-offwhite sm:text-5xl">
              Descubra o que os astros
              <br />
              <span className="bronze-gradient-text">diziam no seu nascimento.</span>
            </h1>

            <p className="mt-6 max-w-lg text-lg leading-relaxed text-offwhite/70">
              Informe sua data, horário e cidade de nascimento e gere seu mapa astral
              completo em segundos: planetas, casas e aspectos calculados com precisão
              e traduzidos para uma leitura clara, com a curadoria do astrólogo José
              Antonio.
            </p>

            <div className="mt-9 flex flex-col gap-3 sm:flex-row">
              <Link
                to={isAuthenticated ? '/mapa-astral' : '/cadastro'}
                className="inline-flex items-center justify-center gap-2 rounded-xl bg-marte px-6 py-3.5 text-[15px] font-semibold text-offwhite transition-all hover:bg-marte-dark hover:shadow-lg hover:shadow-marte/30 active:scale-[0.99]"
              >
                <Sparkles size={18} />
                Gere Seu Mapa
              </Link>
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

          {/* coluna direita — roda astral decorativa + foto do astrólogo */}
          <div
            className="flex items-end justify-center gap-6 lg:gap-8"
            style={{ animation: 'rise-fade 0.65s ease-out' }}
          >
            <div className="relative shrink-0">
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
              <div
                className="absolute -bottom-4 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-full bg-noturno/90 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.18em] text-bronze backdrop-blur-sm border border-bronze/20"
                style={{ animation: 'float-soft 5s ease-in-out infinite' }}
              >
                José Antonio • Astrólogo
              </div>
            </div>

            <ChartWheelDecoration className="hidden w-44 drop-shadow-2xl sm:block lg:w-56" />
          </div>
        </div>
      </div>
    </section>
  );
}

function ChartWheelDecoration({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 240 240"
      className={className}
      style={{ animation: 'float-soft 6s ease-in-out 1s infinite' }}
      aria-hidden
    >
      <circle cx="120" cy="120" r="112" fill="none" stroke="#F8E2A8" strokeOpacity="0.5" strokeWidth="1.5" />
      <circle cx="120" cy="120" r="82" fill="none" stroke="#F8E2A8" strokeOpacity="0.4" strokeWidth="1" />
      <circle cx="120" cy="120" r="52" fill="none" stroke="#F8E2A8" strokeOpacity="0.35" strokeWidth="1" />
      {Array.from({ length: 12 }, (_, i) => {
        const angle = (i * 30 * Math.PI) / 180;
        const x1 = 120 + 52 * Math.cos(angle);
        const y1 = 120 + 52 * Math.sin(angle);
        const x2 = 120 + 112 * Math.cos(angle);
        const y2 = 120 + 112 * Math.sin(angle);
        return (
          <line
            key={i}
            x1={x1}
            y1={y1}
            x2={x2}
            y2={y2}
            stroke="#F8E2A8"
            strokeOpacity="0.3"
            strokeWidth="1"
          />
        );
      })}
      {Array.from({ length: 8 }, (_, i) => {
        const angle = (i * 47 * Math.PI) / 180 + 0.3;
        const r = 65 + ((i * 13) % 40);
        return (
          <circle
            key={i}
            cx={120 + r * Math.cos(angle)}
            cy={120 + r * Math.sin(angle)}
            r={i % 3 === 0 ? 4 : 2.5}
            fill={i % 2 === 0 ? '#C70039' : '#F8E2A8'}
          />
        );
      })}
    </svg>
  );
}

function HowItWorksSection() {
  const steps = [
    {
      icon: <UserRoundPen size={20} />,
      title: 'Informe seus dados',
      text: 'Nome, data, horário e cidade de nascimento — a matéria-prima do seu mapa.',
    },
    {
      icon: <Wand2 size={20} />,
      title: 'Calculamos seu mapa',
      text: 'Planetas, casas e aspectos são calculados com precisão astronômica.',
    },
    {
      icon: <Orbit size={20} />,
      title: 'Veja sua roda astral',
      text: 'Visualize seu mapa em uma roda interativa, com todos os detalhes explicados.',
    },
  ];

  return (
    <section id="como-funciona" className="bg-offwhite py-20 sm:py-28">
      <div className="mx-auto max-w-6xl px-6">
        <Reveal className="mb-14 text-center">
          <span className="text-xs font-semibold uppercase tracking-[0.25em] text-bronze">
            Como funciona
          </span>
          <h2 className="mt-3 font-display text-3xl font-semibold text-noturno sm:text-4xl">
            Seu mapa astral em 3 passos
          </h2>
          <p className="mx-auto mt-4 max-w-lg text-base text-ink-soft">
            Simples, rápido e gratuito. Leva menos de um minuto para gerar o mapa
            completo.
          </p>
        </Reveal>

        <div className="grid gap-6 sm:grid-cols-3">
          {steps.map((step, index) => (
            <Reveal key={step.title} delay={index * 100}>
              <div className="relative flex flex-col items-center gap-4 rounded-2xl border border-line bg-white p-8 text-center">
                <span className="absolute -top-4 flex h-8 w-8 items-center justify-center rounded-full bg-marte text-sm font-bold text-offwhite">
                  {index + 1}
                </span>
                <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-bronze-light/40 text-bronze">
                  {step.icon}
                </span>
                <h3 className="font-display text-lg font-semibold text-noturno">
                  {step.title}
                </h3>
                <p className="text-sm leading-relaxed text-ink-soft">{step.text}</p>
              </div>
            </Reveal>
          ))}
        </div>

        <Reveal className="mt-10 text-center" delay={200}>
          <Link
            to="/cadastro"
            className="inline-flex items-center justify-center gap-2 rounded-xl bg-marte px-6 py-3.5 text-[15px] font-semibold text-offwhite transition-all hover:bg-marte-dark hover:shadow-lg hover:shadow-marte/25 active:scale-[0.99]"
          >
            <Sparkles size={18} />
            Gere Seu Mapa Agora
          </Link>
        </Reveal>
      </div>
    </section>
  );
}

function FeaturesSection() {
  const features = [
    {
      icon: <Orbit size={18} />,
      title: 'Planetas e signos',
      text: 'Posição exata de Sol, Lua e todos os planetas no momento do seu nascimento.',
    },
    {
      icon: <Compass size={18} />,
      title: 'As 12 casas',
      text: 'Entenda como cada área da sua vida é influenciada pelos astros.',
    },
    {
      icon: <Sparkles size={18} />,
      title: 'Aspectos planetários',
      text: 'As conexões entre os planetas que revelam seus talentos e desafios.',
    },
    {
      icon: <ScrollText size={18} />,
      title: 'Mapas salvos',
      text: 'Guarde quantos mapas quiser na sua conta — seu, de familiares ou amigos.',
    },
  ];

  return (
    <section className="relative overflow-hidden bg-noturno py-20 sm:py-24">
      <AnimatedCosmicBackdrop variant="about" />
      <div className="relative mx-auto max-w-6xl px-6">
        <Reveal className="mb-12 text-center">
          <span className="text-xs font-semibold uppercase tracking-[0.25em] text-bronze">
            O que você recebe
          </span>
          <h2 className="mt-3 font-display text-3xl font-semibold text-offwhite sm:text-4xl">
            Um mapa astral completo
          </h2>
        </Reveal>

        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {features.map((feature, index) => (
            <Reveal key={feature.title} delay={index * 80}>
              <div className="flex h-full flex-col gap-3 rounded-2xl border border-offwhite/10 bg-offwhite/5 p-6">
                <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-bronze-light/20 text-bronze-light">
                  {feature.icon}
                </span>
                <h3 className="font-display text-base font-semibold text-offwhite">
                  {feature.title}
                </h3>
                <p className="text-sm leading-relaxed text-offwhite/65">{feature.text}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

function AboutSection() {
  return (
    <section className="bg-offwhite py-20 sm:py-24">
      <div className="mx-auto max-w-5xl px-6">
        <div className="grid gap-10 sm:grid-cols-[auto_1fr] sm:items-center sm:gap-12">
          <Reveal direction="left" className="flex justify-center">
            <div className="relative">
              <div
                className="absolute -inset-2 rounded-[1.5rem] opacity-40 blur-xl"
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
                className="relative h-48 w-48 rounded-full border-4 border-offwhite object-cover shadow-2xl sm:h-56 sm:w-56"
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
            <h2 className="mt-3 font-display text-3xl font-semibold text-noturno sm:text-4xl">
              José Antonio Coutinho Vinhas
            </h2>
            <p className="mt-5 max-w-xl text-base leading-relaxed text-ink-soft">
              José Antonio é astrólogo com mais de 40 anos de estudo e
              atendimento a inúmeros clientes, além de ser tarólogo e psicólogo.
              Com uma visão técnica e humanizada, contribui para o
              autoconhecimento dos clientes e leitores, traduzindo a linguagem
              dos astros para a realidade prática da vida.
            </p>
            <div className="mx-auto mt-8 h-px w-20 bg-gradient-to-r from-bronze to-bronze-light sm:mx-0" />
          </Reveal>
        </div>
      </div>
    </section>
  );
}

function BookSection() {
  return (
    <section id="livro" className="bg-offwhite pb-20 sm:pb-28">
      <div className="mx-auto max-w-6xl px-6">
        <Reveal className="flex flex-col items-center gap-6 rounded-2xl border border-line bg-white p-8 text-center sm:flex-row sm:gap-8 sm:p-10 sm:text-left">
          <img
            src="/images/livro-capa.png"
            alt="Capa do livro Guia Astrológico 2026: O Ano da Conquista"
            className="w-28 shrink-0 drop-shadow-lg sm:w-32"
          />
          <div className="flex-1">
            <span className="text-xs font-semibold uppercase tracking-[0.25em] text-bronze">
              Para se aprofundar
            </span>
            <h2 className="mt-2 font-display text-xl font-semibold text-noturno sm:text-2xl">
              2026: O Ano da Conquista
            </h2>
            <p className="mt-2 text-sm leading-relaxed text-ink-soft">
              Depois de conhecer seu mapa astral, aprofunde-se na regência de Marte
              em 2026 com o guia escrito por José Antonio — disponível em formato
              físico e digital.
            </p>
          </div>
          <div className="flex shrink-0 flex-col gap-2 sm:flex-row">
            <a
              href={EXTERNAL_LINKS.bookHotmart}
              target="_blank"
              rel="noreferrer noopener"
              className="inline-flex items-center justify-center gap-2 rounded-xl border border-noturno/15 px-5 py-2.5 text-sm font-semibold text-noturno transition-all hover:bg-noturno/5"
            >
              <BookOpen size={16} />
              Conhecer o livro
            </a>
          </div>
        </Reveal>
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
            Previsões, bastidores e reflexões astrológicas nas redes sociais do
            astrólogo José Antonio.
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
          Quer uma leitura personalizada do seu mapa?
        </h2>
        <p className="max-w-xl text-offwhite/85">
          Marque sua consulta diretamente pelo WhatsApp e aprofunde a
          interpretação do seu mapa astral com José Antonio.
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
            Mapa astral gratuito
          </p>
        </div>
      </div>
    </footer>
  );
}
