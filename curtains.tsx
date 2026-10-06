import Image from 'next/image'
import type { CSSProperties } from 'react'
import { CurtainPlay } from './curtain-play'
import { waLink } from '@/lib/site'
import { Reveal } from './reveal'
import { Split } from './split'

const pleats = ['Prega wave', 'Prega americana', 'Prega fêmea', 'Prega franzida', 'Ilhós', 'Varão ou trilho']
const fabrics = [
  { name: 'Voil', note: 'leve e translúcido' },
  { name: 'Linho', note: 'textura natural' },
  { name: 'Blackout', note: 'bloqueio de luz' },
  { name: 'Mistos', note: 'composições' },
]

export function Curtains() {
  return (
    <section id="cortinas" className="relative overflow-hidden bg-paper py-24 md:py-36">
      <div className="wrap grid gap-16 lg:grid-cols-2 lg:gap-24">
        <Reveal className="relative grid grid-cols-[1.2fr_1fr] gap-4 self-start">
          <figure className="wipe relative row-span-2 aspect-[9/16] overflow-hidden">
            <div data-parallax="0.08" className="absolute inset-x-0 -inset-y-[8%]">
              <Image
                src="/images/cortina-1.webp"
                alt="Cortina de prega wave em sala ampla"
                fill
                sizes="(min-width: 1024px) 28vw, 55vw"
                className="object-cover"
              />
            </div>
          </figure>
          <figure className="wipe relative aspect-square overflow-hidden" style={{ '--delay': '150ms' } as CSSProperties}>
            <Image
              src="/images/cortina-2.webp"
              alt="Detalhe de prega americana em tecido areia"
              fill
              sizes="(min-width: 1024px) 22vw, 45vw"
              className="object-cover"
            />
          </figure>
          <figure className="wipe relative aspect-[4/5] overflow-hidden" style={{ '--delay': '300ms' } as CSSProperties}>
            <Image
              src="/images/cortina-3.webp"
              alt="Cortina clara em quarto"
              fill
              sizes="(min-width: 1024px) 22vw, 45vw"
              className="object-cover"
            />
          </figure>
          <span
            className="absolute -top-8 -left-3 font-serif text-[9rem] leading-none font-light italic text-brass/25 select-none md:text-[12rem]"
            aria-hidden="true"
          >
            01
          </span>
        </Reveal>

        <div className="lg:pt-10">
          <Reveal>
            <p className="kicker">Cortinas</p>
            <h2 className="display mt-6 text-[clamp(2.4rem,5vw,4.4rem)]">
              <Split>Toda prega, <em>todo tecido.</em></Split>
            </h2>
            <p className="mt-6 max-w-lg leading-relaxed text-ink-soft">
              Lavamos cortinas de voil, linho, blackout e tecidos mistos, em todos os tipos de prega. Cada uma
              volta com a cor e o caimento de quando foi instalada.
            </p>
          </Reveal>

          <Reveal delay={100} className="mt-10">
            <h3 className="text-[0.68rem] font-medium uppercase tracking-[0.24em] text-ink-soft">Tecidos</h3>
            <ul className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-4">
              {fabrics.map((f, i) => (
                <li
                  key={f.name}
                  className="group relative overflow-hidden border border-navy/12 p-4 transition-colors duration-500 hover:border-navy"
                >
                  <span
                    className="absolute inset-x-0 top-0 h-1.5 pleats"
                    style={{ filter: `brightness(${1 - i * 0.07})` }}
                    aria-hidden="true"
                  />
                  <p className="mt-2 font-serif text-2xl">{f.name}</p>
                  <p className="text-xs text-ink-soft">{f.note}</p>
                </li>
              ))}
            </ul>
          </Reveal>

          <Reveal delay={180} className="mt-10">
            <h3 className="text-[0.68rem] font-medium uppercase tracking-[0.24em] text-ink-soft">Pregas e modelos</h3>
            <ul className="mt-4 flex flex-wrap gap-2">
              {pleats.map((p) => (
                <li
                  key={p}
                  className="rounded-full border border-navy/15 px-4 py-2 text-sm transition-colors hover:bg-navy hover:text-cream"
                >
                  {p}
                </li>
              ))}
            </ul>
          </Reveal>

          <Reveal delay={240} className="mt-12 flex flex-wrap items-center gap-6 border-t border-navy/12 pt-8">
            <a
              href={waLink('Olá! Gostaria de um orçamento para lavagem de cortinas.')}
              target="_blank"
              rel="noopener"
              className="rounded-full bg-navy px-7 py-4 text-[0.72rem] font-medium uppercase tracking-[0.18em] text-cream transition-colors hover:bg-navy-2"
            >
              Orçar lavagem de cortinas
            </a>
            <p className="text-sm text-ink-soft">Retiramos, lavamos e devolvemos prontas para instalar.</p>
          </Reveal>
        </div>
      </div>

      <div className="wrap mt-24 md:mt-32">
        <Reveal className="mb-8 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <h3 className="display text-[clamp(2rem,3.6vw,3.2rem)]">
            <Split>
              Abra a cortina <em>e veja a luz entrar.</em>
            </Split>
          </h3>
          <p className="max-w-sm text-sm leading-relaxed text-ink-soft">
            Arraste para os lados, com o mouse ou com o dedo. Tecido limpo deixa a luz passar como deve.
          </p>
        </Reveal>
        <Reveal delay={120}>
          <CurtainPlay src="/images/g06.webp" alt="Sala com cortina branca translúcida" />
        </Reveal>
      </div>
    </section>
  )
}
