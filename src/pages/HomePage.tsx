import { useState } from 'react';
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
  GraduationCap,
  Layers3,
  Brain,
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { LandingHeader } from '../components/LandingHeader';
import { LandingFooter } from '../components/LandingFooter';
import { SocialCard } from '../components/SocialCard';
import {
  InstagramGlyph,
  TikTokGlyph,
  FacebookGlyph,
  YoutubeGlyph,
} from '../components/SocialGlyphs';
import { InstagramEmbed } from '../components/InstagramEmbed';
import { Reveal } from '../components/Reveal';
import { AnimatedCosmicBackdrop } from '../components/AnimatedCosmicBackdrop';
import { ZodiacWheel } from '../components/ZodiacWheel';
import { SpiralOrbit } from '../components/SpiralOrbit';
import { ZodiacGlyph } from '../components/ZodiacGlyph';
import { SIGN_ICONS } from '../lib/zodiac-icons';
import { SignsShowcase } from '../components/SignsShowcase';
import { FaqAccordion } from '../components/FaqAccordion';
import { FloatingGlyphs } from '../components/FloatingGlyphs';
import { HeroGenerateFlow } from '../components/HeroGenerateFlow';
import { ChartResultView } from '../components/ChartResultView';
import { useGenerateFlow } from '../context/GenerateFlowContext';
import { EXTERNAL_LINKS, FEATURED_REELS } from '../lib/external-links';
import type { AstralChart } from '../types/charts';

export default function HomePage() {
  return (
    <div className="min-h-screen bg-offwhite">
      <LandingHeader />
      <HeroSection />
      <SignsSection />
      <HowItWorksSection />
      <FeaturesSection />
      <AboutSection />
      <BookSection />
      <FaqSection />
      <ReelsSection />
      <SocialSection />
      <FinalCtaSection />
      <WhatsappSection />
      <LandingFooter />
    </div>
  );
}

function HeroSection() {
  const { isOpen, openFlow, closeFlow } = useGenerateFlow();
  const [generatedChart, setGeneratedChart] = useState<AstralChart | null>(null);

  const resetFlow = () => {
    setGeneratedChart(null);
    closeFlow();
  };

  return (
    <section className="relative overflow-hidden bg-noturno">
      <div
        className="absolute inset-0"
        style={{
          background: 'linear-gradient(180deg, #081E48 0%, #0E2A5E 100%)',
        }}
      />
      <AnimatedCosmicBackdrop variant="hero" />

      {generatedChart ? (
        <div id="gerar-mapa" className="relative mx-auto max-w-6xl scroll-mt-20 px-6 py-16 lg:py-20">
          <div className="mb-8 flex flex-col gap-4 rounded-2xl bg-offwhite/10 p-5 backdrop-blur-sm sm:flex-row sm:items-center sm:justify-between">
            <div>
              <span className="text-xs font-semibold uppercase tracking-[0.25em] text-bronze-light">
                Mapa gerado com sucesso
              </span>
              <h2 className="mt-1 font-display text-2xl font-semibold text-offwhite">
                {generatedChart.name}
              </h2>
              <p className="mt-1 text-sm text-offwhite/60">
                {new Date(
                  generatedChart.birthYear,
                  generatedChart.birthMonth - 1,
                  generatedChart.birthDay,
                ).toLocaleDateString('pt-BR', { day: '2-digit', month: 'long', year: 'numeric' })}{' '}
                às {String(generatedChart.birthHour).padStart(2, '0')}:
                {String(generatedChart.birthMin).padStart(2, '0')} · {generatedChart.city}
              </p>
            </div>
            <div className="flex shrink-0 gap-3">
              <Link
                to="/meus-mapas"
                className="inline-flex items-center gap-1.5 rounded-xl border border-offwhite/20 bg-offwhite/5 px-4 py-2.5 text-sm font-semibold text-offwhite transition-all hover:bg-offwhite/10"
              >
                Meus mapas
              </Link>
              <button
                type="button"
                onClick={resetFlow}
                className="inline-flex items-center gap-1.5 rounded-xl bg-marte px-4 py-2.5 text-sm font-semibold text-offwhite transition-all hover:bg-marte-dark"
              >
                <Sparkles size={16} />
                Gerar outro mapa
              </button>
            </div>
          </div>

          <div className="rounded-3xl bg-offwhite p-4 sm:p-6" style={{ animation: 'rise-fade 0.4s ease-out' }}>
            <ChartResultView chart={generatedChart} />
          </div>
        </div>
      ) : (
        <div className="relative mx-auto max-w-6xl px-6 py-16 lg:py-24">
          {/* layout: texto/formulário + roda do mapa astral */}
          <div className="grid gap-10 lg:grid-cols-[1fr_auto] lg:items-center lg:gap-16">
            {/* coluna esquerda — texto ou fluxo de geração do mapa */}
            <div id="gerar-mapa" className="scroll-mt-20" style={{ animation: 'rise-fade 0.5s ease-out' }}>
              {isOpen ? (
                <HeroGenerateFlow onGenerated={setGeneratedChart} />
              ) : (
                <>
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
                    <button
                      type="button"
                      onClick={openFlow}
                      className="inline-flex items-center justify-center gap-2 rounded-xl bg-marte px-6 py-3.5 text-[15px] font-semibold text-offwhite transition-all hover:bg-marte-dark hover:shadow-lg hover:shadow-marte/30 active:scale-[0.99]"
                      style={{ animation: 'btn-pulse 2.2s ease-in-out infinite' }}
                    >
                      <Sparkles size={18} />
                      Gere seu mapa astral gratuito
                    </button>
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

                  <div className="mt-8 flex items-center gap-3 text-sm text-offwhite/55">
                    <span className="flex -space-x-2">
                      <ZodiacGlyph svg={SIGN_ICONS.Aries} size={16} className="text-bronze-light" />
                      <ZodiacGlyph svg={SIGN_ICONS.Leo} size={16} className="text-bronze-light" />
                      <ZodiacGlyph svg={SIGN_ICONS.Scorpio} size={16} className="text-bronze-light" />
                    </span>
                    Interpretação assinada por José Antonio, astrólogo há mais de 40 anos.
                  </div>
                </>
              )}
            </div>

            {/* coluna direita — foto do astrólogo, espiral orbital e uma breve apresentação */}
            <div
              className="flex flex-col items-center gap-6"
              style={{ animation: 'rise-fade 0.65s ease-out' }}
            >
              <div className="relative flex shrink-0 items-center justify-center">
                <SpiralOrbit
                  className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
                  size="clamp(260px, 34vw, 380px)"
                  duration={85}
                  opacity={0.5}
                />
                <div
                  className="absolute h-full w-full rounded-[2rem] opacity-50 blur-xl"
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
                  className="relative w-52 rounded-[1.75rem] object-cover shadow-2xl sm:w-60 lg:w-64"
                  style={{
                    aspectRatio: '3/4',
                    objectPosition: 'center top',
                  }}
                />
              </div>

              <div className="max-w-xs text-center">
                <p className="font-display text-4xl font-semibold text-offwhite">
                  José Antonio Coutinho Vinhas
                </p>
                <p className="mt-2 text-sm leading-relaxed text-offwhite/65">
                  Astrólogo, tarólogo e psicólogo — mais de 40 anos traduzindo a
                  linguagem dos astros para decisões da vida real.
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}

function SignsSection() {
  return (
    <section id="signos" className="relative overflow-hidden bg-offwhite py-20 sm:py-28">
      <FloatingGlyphs />
      <div className="relative mx-auto max-w-6xl px-6">
        <Reveal className="mb-12 text-center">
          <span className="text-xs font-semibold uppercase tracking-[0.25em] text-bronze">
            O zodíaco
          </span>
          <h2 className="mt-3 font-display text-3xl font-semibold text-noturno sm:text-4xl">
            Os 12 signos e o que eles revelam
          </h2>
          <p className="mx-auto mt-4 max-w-lg text-base text-ink-soft">
            Passe o mouse ou toque em cada signo para ver as datas, o elemento
            e o planeta regente.
          </p>
        </Reveal>

        <Reveal delay={100}>
          <SignsShowcase />
        </Reveal>
      </div>
    </section>
  );
}

function HowItWorksSection() {
  const { openFlow } = useGenerateFlow();
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
    <section id="como-funciona" className="relative overflow-hidden bg-offwhite py-20 sm:py-28">
      <FloatingGlyphs />
      <div className="relative mx-auto max-w-6xl px-6">
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
          <button
            type="button"
            onClick={openFlow}
            className="inline-flex items-center justify-center gap-2 rounded-xl bg-marte px-6 py-3.5 text-[15px] font-semibold text-offwhite transition-all hover:bg-marte-dark hover:shadow-lg hover:shadow-marte/25 active:scale-[0.99]"
            style={{ animation: 'btn-pulse 2.2s ease-in-out infinite' }}
          >
            <Sparkles size={18} />
            Gere seu mapa astral gratuito
          </button>
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
  const credentials = [
    { icon: <GraduationCap size={15} />, label: '+40 anos de estudo' },
    { icon: <Layers3 size={15} />, label: 'Tarólogo' },
    { icon: <Brain size={15} />, label: 'Psicólogo' },
  ];

  return (
    <section className="relative overflow-hidden bg-noturno py-20 sm:py-28">
      <div
        className="absolute inset-0"
        style={{ background: 'linear-gradient(180deg, #0E2A5E 0%, #081E48 100%)' }}
      />
      <AnimatedCosmicBackdrop variant="about" />

      <div className="relative mx-auto max-w-5xl px-6">
        <div className="grid gap-12 sm:grid-cols-[auto_1fr] sm:items-center sm:gap-14">
          <Reveal direction="left" className="flex justify-center">
            <div className="relative flex shrink-0 items-center justify-center">
              <SpiralOrbit
                className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
                size="clamp(230px, 32vw, 320px)"
                duration={80}
                opacity={0.55}
              />
              <div
                className="absolute h-52 w-52 rounded-full opacity-60 blur-xl sm:h-64 sm:w-64"
                style={{
                  background: 'conic-gradient(from 180deg, #C70039, #B8860B, #081E48, #C70039)',
                  animation: 'orbit-spin 12s linear infinite',
                }}
                aria-hidden
              />
              <img
                src="/images/jose-antonio-perfil.png"
                alt="Astrólogo José Antonio"
                className="relative h-52 w-52 rounded-full border-4 border-offwhite/90 object-cover shadow-2xl sm:h-64 sm:w-64"
              />
            </div>
          </Reveal>

          <Reveal direction="right" delay={100} className="text-center sm:text-left">
            <span className="text-xs font-semibold uppercase tracking-[0.25em] text-bronze-light">
              O astrólogo
            </span>
            <h2 className="mt-3 font-display text-3xl font-semibold text-offwhite sm:text-4xl">
              José Antonio Coutinho Vinhas
            </h2>
            <p className="mt-5 max-w-xl text-base leading-relaxed text-offwhite/70">
              Com mais de 40 anos de estudo e atendimento a inúmeros clientes,
              José Antonio traduz a linguagem dos astros para a realidade
              prática da vida. Também tarólogo e psicólogo, une técnica e
              sensibilidade humana para contribuir com o autoconhecimento de
              seus clientes e leitores.
            </p>

            <div className="mt-6 flex flex-wrap justify-center gap-2.5 sm:justify-start">
              {credentials.map((item) => (
                <span
                  key={item.label}
                  className="inline-flex items-center gap-1.5 rounded-full border border-offwhite/15 bg-offwhite/5 px-3.5 py-1.5 text-xs font-medium text-offwhite/80"
                >
                  {item.icon}
                  {item.label}
                </span>
              ))}
            </div>

            <div className="mx-auto mt-8 h-px w-20 bg-gradient-to-r from-bronze to-bronze-light sm:mx-0" />
          </Reveal>
        </div>
      </div>
    </section>
  );
}

function BookSection() {
  return (
    <section id="livro" className="bg-offwhite pb-20 pt-16 sm:pb-28 sm:pt-20">
      <div className="mx-auto max-w-6xl px-6">
        <Reveal className="flex flex-col items-center gap-6 rounded-2xl border border-line bg-white p-8 text-center sm:flex-row sm:gap-8 sm:p-10 sm:text-left">
          <img
            src="/images/capa-livro-2026.png"
            alt="Capa do livro 2026: O Ano da Conquista"
            className="w-28 shrink-0 rounded-md drop-shadow-lg sm:w-32"
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
              em 2026 com o guia escrito por José Antonio — disponível para compra
              na Amazon.
            </p>
          </div>
          <div className="flex shrink-0 flex-col gap-2 sm:flex-row">
            <Link
              to="/livros"
              className="inline-flex items-center justify-center gap-2 rounded-xl bg-marte px-5 py-2.5 text-sm font-semibold text-offwhite transition-all hover:bg-marte-dark"
              style={{ animation: 'btn-pulse 2.2s ease-in-out infinite' }}
            >
              <BookOpen size={16} />
              Comprar livro físico
            </Link>
            <a
              href={EXTERNAL_LINKS.bookHotmart}
              target="_blank"
              rel="noreferrer noopener"
              className="inline-flex items-center justify-center gap-2 rounded-xl border border-noturno/15 px-5 py-2.5 text-sm font-semibold text-noturno transition-all hover:bg-noturno/5"
            >
              Versão digital
            </a>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

function FaqSection() {
  return (
    <section id="faq" className="relative overflow-hidden bg-offwhite py-20 sm:py-28">
      <FloatingGlyphs />
      <div className="relative mx-auto max-w-6xl px-6">
        <Reveal className="mb-12 text-center">
          <span className="text-xs font-semibold uppercase tracking-[0.25em] text-bronze">
            Perguntas frequentes
          </span>
          <h2 className="mt-3 font-display text-3xl font-semibold text-noturno sm:text-4xl">
            Tire suas dúvidas sobre o mapa astral
          </h2>
        </Reveal>

        <Reveal delay={100}>
          <FaqAccordion />
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
    <section id="redes" className="relative overflow-hidden bg-offwhite py-20 sm:py-28">
      <FloatingGlyphs />
      <div className="relative mx-auto max-w-6xl px-6">
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

function FinalCtaSection() {
  const { openFlow } = useGenerateFlow();

  return (
    <section className="relative overflow-hidden bg-noturno py-20 sm:py-28">
      <AnimatedCosmicBackdrop variant="hero" />
      <div className="relative mx-auto flex max-w-4xl flex-col items-center gap-8 px-6 text-center">
        <ZodiacWheel className="aspect-square w-40 sm:w-48" />

        <div>
          <span className="text-xs font-semibold uppercase tracking-[0.25em] text-bronze">
            É gratuito e leva menos de um minuto
          </span>
          <h2 className="mt-4 font-display text-3xl font-semibold text-offwhite sm:text-4xl">
            Seu mapa astral está esperando pelos astros certos.
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-base leading-relaxed text-offwhite/70">
            Informe seu e-mail e uma senha, e descubra agora os planetas,
            casas e aspectos calculados no exato momento do seu nascimento.
          </p>
        </div>

        <button
          type="button"
          onClick={openFlow}
          className="inline-flex items-center justify-center gap-2 rounded-xl bg-marte px-8 py-4 text-base font-semibold text-offwhite transition-all hover:bg-marte-dark hover:shadow-lg hover:shadow-marte/30 active:scale-[0.99]"
          style={{ animation: 'btn-pulse 2.2s ease-in-out infinite' }}
        >
          <Sparkles size={20} />
          Gere seu mapa astral gratuito
        </button>
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
          style={{ animation: 'btn-pulse-light 2.2s ease-in-out infinite' }}
        >
          <MessageCircle size={18} />
          Marcar consulta no WhatsApp
        </a>
      </Reveal>
    </section>
  );
}


