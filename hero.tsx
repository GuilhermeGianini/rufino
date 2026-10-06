import Image from 'next/image'
import type { CSSProperties } from 'react'
import { ArrowDownRight } from 'lucide-react'
import { waLink } from '@/lib/site'

const d = (ms: number) => ({ '--delay': `${ms}ms` }) as CSSProperties

export function Hero() {
  return (
    <section id="inicio" className="grain relative overflow-hidden bg-navy text-cream">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -left-40 top-1/3 size-[520px] rounded-full bg-brass/10 blur-3xl"
      />

      <div className="wrap relative grid min-h-svh items-center gap-12 pt-32 pb-16 lg:grid-cols-[1.15fr_0.85fr] lg:gap-10 lg:pt-28">
        <div className="relative z-10 order-2 lg:order-1">
          <p className="kicker fade-up text-cream/60" style={d(200)}>
            Limpeza de cortinas, persianas e almofadas
          </p>

          <h1 className="display mt-7 text-[clamp(3.2rem,8.4vw,7.8rem)]">
            <span className="line-mask">
              <span style={d(250)}>Cortinas limpas,</span>
            </span>
            <span className="line-mask">
              <span style={d(420)}>
                <em className="text-brass-soft">casa renovada.</em>
              </span>
            </span>
          </h1>

          <div className="fade-up mt-10 flex flex-col gap-10 md:flex-row md:items-end md:justify-between" style={d(900)}>
            <p className="max-w-[38ch] text-[1.02rem] leading-relaxed font-light text-cream/80">
              Lavagem de cortinas, limpeza de persianas e higienização de almofadas, com o cuidado que cada
              tecido pede. Buscamos e entregamos na sua casa.
            </p>
          </div>

          <div className="fade-up mt-10 flex flex-wrap items-center gap-3" style={d(1050)}>
            <a
              href="#orcamento"
              data-magnetic
              className="group inline-flex items-center gap-3 rounded-full bg-cream py-4 pr-4 pl-7 text-[0.74rem] font-medium uppercase tracking-[0.18em] text-navy transition-colors hover:bg-white"
            >
              Pedir orçamento
              <span className="grid size-8 place-items-center rounded-full bg-navy text-cream transition-transform duration-500 group-hover:-rotate-45">
                <ArrowDownRight className="size-4" aria-hidden="true" />
              </span>
            </a>
            <a
              href={waLink('Olá! Vim pelo site da Domus e gostaria de um orçamento de limpeza.')}
              target="_blank"
              rel="noopener"
              className="inline-flex items-center rounded-full border border-cream/35 px-7 py-4 text-[0.74rem] font-medium uppercase tracking-[0.18em] transition-colors hover:border-cream hover:bg-cream hover:text-navy"
            >
              Falar no WhatsApp
            </a>
          </div>

          <dl className="fade-up mt-16 grid max-w-lg grid-cols-3 border-t border-cream/15 pt-6" style={d(1200)}>
            {[
              ['Cortinas', 'todos os tecidos'],
              ['Persianas', 'rolô a madeira'],
              ['Almofadas', 'sem odores'],
            ].map(([t, s]) => (
              <div key={t}>
                <dt className="font-serif text-2xl font-light italic text-brass-soft">{t}</dt>
                <dd className="mt-1 text-[0.7rem] uppercase tracking-[0.16em] text-cream/55">{s}</dd>
              </div>
            ))}
          </dl>
        </div>

        <div className="relative order-1 mx-auto w-full max-w-[460px] lg:order-2 lg:max-w-none">
          <div className="relative">
            <div className="absolute inset-x-[-14px] top-[-14px] bottom-[-14px] rounded-t-full border border-brass-soft/35" aria-hidden="true" />

            <div className="relative aspect-[3/4] overflow-hidden rounded-t-full bg-navy-2 shadow-[0_40px_80px_-40px_rgba(0,0,0,0.7)]">
              <Image
                src="/images/hero.webp"
                alt="Quarto com cortina de voil claro iluminada pela luz do dia"
                fill
                priority
                sizes="(min-width: 1024px) 40vw, 90vw"
                className="hero-photo object-cover"
              />
              <div className="curtain curtain-l pleats" aria-hidden="true" />
              <div className="curtain curtain-r pleats" aria-hidden="true" />
              <div className="absolute inset-x-0 top-0 z-3 h-3 bg-gradient-to-b from-black/30 to-transparent" aria-hidden="true" />
            </div>

            <div className="absolute -bottom-10 -left-6 z-10 sm:-left-12" aria-hidden="true">
              <div className="relative grid size-32 place-items-center rounded-full bg-cream text-navy sm:size-36">
                <svg viewBox="0 0 200 200" className="spin-slow absolute inset-0 size-full">
                  <defs>
                    <path id="circle" d="M100,100 m-76,0 a76,76 0 1,1 152,0 a76,76 0 1,1 -152,0" />
                  </defs>
                  <text className="fill-navy font-sans text-[12.5px] uppercase" letterSpacing="3.4">
                    <textPath href="#circle">Cuidado de ateliê · tecido por tecido ·</textPath>
                  </text>
                </svg>
                <span className="font-serif text-4xl italic text-brass">D</span>
              </div>
            </div>

            <div className="sway absolute top-[18%] -right-3 z-10 hidden sm:block lg:-right-8" aria-hidden="true">
              <div className="mx-auto h-10 w-px bg-cream/50" />
              <div className="relative w-40 rotate-2 bg-linen px-4 pt-6 pb-4 text-navy shadow-xl stitch-box">
                <span className="absolute top-2 left-1/2 size-2.5 -translate-x-1/2 rounded-full bg-navy/80" />
                <p className="text-[0.6rem] uppercase tracking-[0.22em] text-ink-soft">Amostra Nº 01</p>
                <p className="mt-1 font-serif text-xl leading-tight italic">Voil de linho</p>
                <div className="stitch mt-3 text-navy/40" />
                <p className="mt-2 text-[0.62rem] leading-snug text-ink-soft">Cor e caimento devolvidos com cuidado.</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <a
        href="#sobre"
        aria-label="Rolar para o conteúdo"
        className="absolute bottom-6 left-1/2 hidden h-14 w-px -translate-x-1/2 overflow-hidden bg-cream/20 md:block"
      >
        <span className="scroll-cue absolute inset-x-0 h-1/2 bg-cream" />
      </a>
    </section>
  )
}
