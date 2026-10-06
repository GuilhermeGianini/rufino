'use client'

import Image from 'next/image'
import { useEffect, useRef, useState, type CSSProperties } from 'react'
import { waLink } from '@/lib/site'
import { cn } from '@/lib/utils'
import { Reveal, useInView } from './reveal'
import { Split } from './split'

const SLATS = 14
const OPEN = 78

const models = [
  { name: 'Rolô', img: '/images/persiana-tela.webp', big: '/images/svc-persianas.webp', alt: 'Persiana rolô em tela solar' },
  { name: 'Romana', img: '/images/persiana-romana.webp', big: '/images/persiana-romana.webp', alt: 'Persiana romana em tecido' },
  { name: 'Horizontal', img: '/images/persiana-horizontal.webp', big: '/images/persiana-horizontal.webp', alt: 'Persiana horizontal de lâminas' },
  { name: 'Blackout', img: '/images/persiana-blackout.webp', big: '/images/persiana-blackout.webp', alt: 'Persiana blackout em quarto' },
]

export function Blinds() {
  const { ref, inView } = useInView<HTMLDivElement>(0.35)
  const [angle, setAngle] = useState(0)
  const [manual, setManual] = useState(false)
  const [idx, setIdx] = useState(0)
  const timer = useRef<number | undefined>(undefined)

  useEffect(() => {
    if (inView) timer.current = window.setTimeout(() => setAngle(OPEN), 350)
    return () => window.clearTimeout(timer.current)
  }, [inView])

  const choose = (i: number) => {
    if (i === idx) return
    setManual(false)
    setAngle(0)
    window.clearTimeout(timer.current)
    timer.current = window.setTimeout(() => {
      setIdx(i)
      timer.current = window.setTimeout(() => setAngle(OPEN), 120)
    }, 750)
  }

  const current = models[idx]

  return (
    <section id="persianas" className="grain relative overflow-hidden bg-navy py-24 text-cream md:py-36">
      <div className="wrap grid items-center gap-16 lg:grid-cols-[0.95fr_1.05fr] lg:gap-24">
        <div className="order-2 lg:order-1">
          <Reveal>
            <p className="kicker text-cream/60">Persianas</p>
            <h2 className="display mt-6 text-[clamp(2.4rem,5vw,4.4rem)]">
              <Split>
                Lâmina por lâmina, <em className="text-brass-soft">sem pressa.</em>
              </Split>
            </h2>
            <p className="mt-6 max-w-lg leading-relaxed text-cream/75">
              Limpamos persianas de tecido, tela solar e lâminas. Poeira e gordura saem, e o mecanismo continua
              funcionando como deve.
            </p>
          </Reveal>

          <Reveal delay={120} as="ul" className="mt-12 grid grid-cols-2 gap-4 sm:grid-cols-4">
            {models.map((m, i) => (
              <li key={m.name}>
                <button
                  type="button"
                  aria-pressed={idx === i}
                  onClick={() => choose(i)}
                  className="group block w-full text-center"
                >
                  <span
                    className={cn(
                      'relative block aspect-[3/4] overflow-hidden rounded-t-full border transition-colors duration-500',
                      idx === i ? 'border-brass-soft' : 'border-cream/15 group-hover:border-cream/40',
                    )}
                  >
                    <Image
                      src={m.img || '/placeholder.svg'}
                      alt={m.alt}
                      fill
                      sizes="(min-width: 640px) 12vw, 45vw"
                      className={cn(
                        'object-cover transition-all duration-700 group-hover:scale-105',
                        idx === i ? 'grayscale-0' : 'grayscale-[40%] group-hover:grayscale-0',
                      )}
                    />
                  </span>
                  <span className={cn('mt-3 block font-serif text-xl italic transition-colors', idx === i && 'text-brass-soft')}>
                    {m.name}
                  </span>
                </button>
              </li>
            ))}
          </Reveal>

          <Reveal delay={200} className="mt-12">
            <a
              href={waLink('Olá! Gostaria de um orçamento para limpeza de persianas.')}
              target="_blank"
              rel="noopener"
              className="inline-flex rounded-full bg-cream px-7 py-4 text-[0.72rem] font-medium uppercase tracking-[0.18em] text-navy transition-colors hover:bg-white"
            >
              Orçar limpeza de persianas
            </a>
          </Reveal>
        </div>

        <div className="relative order-1 mx-auto w-full max-w-[520px] lg:order-2">
          <div ref={ref} className="relative aspect-[4/5] w-full overflow-hidden bg-navy-2">
            <Image
              key={current.big}
              src={current.big}
              alt={current.alt}
              fill
              sizes="(min-width: 1024px) 520px, 90vw"
              className="object-cover"
            />
            <div className={cn('bslats', manual && 'is-manual')} aria-hidden="true">
              {Array.from({ length: SLATS }).map((_, i) => (
                <span key={i} className="bslat" style={{ '--i': i, '--a': `${angle}deg` } as CSSProperties} />
              ))}
            </div>
            <div className="absolute top-0 right-6 z-3 h-[62%] w-px bg-cream/70" aria-hidden="true">
              <span className="absolute -bottom-2 left-1/2 size-3 -translate-x-1/2 rounded-full bg-cream" />
            </div>
          </div>
          <div className="absolute -top-3 inset-x-[-10px] z-4 h-3 rounded-sm bg-cream/90 shadow-md" aria-hidden="true" />

          <label className="mt-6 flex items-center gap-4 text-[0.66rem] uppercase tracking-[0.2em] text-cream/60">
            <span>Fechada</span>
            <input
              type="range"
              min={0}
              max={82}
              value={angle}
              onChange={(e) => {
                setManual(true)
                setAngle(Number(e.target.value))
              }}
              aria-label="Abertura da persiana"
              className="brange flex-1"
            />
            <span>Aberta</span>
          </label>

          <span
            className="pointer-events-none absolute -right-2 -bottom-16 font-serif text-[9rem] leading-none font-light italic text-cream/10 select-none md:text-[12rem]"
            aria-hidden="true"
          >
            02
          </span>
        </div>
      </div>
    </section>
  )
}
