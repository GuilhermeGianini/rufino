import Image from 'next/image'
import { waLink } from '@/lib/site'
import { Reveal } from './reveal'
import { Split } from './split'

const benefits = [
  { t: 'Sem poeira', d: 'Removemos o pó acumulado no tecido e no enchimento.' },
  { t: 'Sem odores', d: 'O cheiro do uso diário vai embora.' },
  { t: 'Toque macio', d: 'A almofada volta fofa e agradável ao toque.' },
]

export function Pillows() {
  return (
    <section id="almofadas" className="relative overflow-hidden bg-linen py-24 md:py-36">
      <div className="wrap">
        <div className="grid gap-14 lg:grid-cols-[1fr_1.1fr] lg:gap-20">
          <Reveal>
            <p className="kicker">Almofadas</p>
            <h2 className="display mt-6 text-[clamp(2.4rem,5vw,4.4rem)]">
              <Split>O sofá inteiro <em>respira melhor.</em></Split>
            </h2>
            <p className="mt-6 max-w-md leading-relaxed text-ink-soft">
              Higienizamos almofadas decorativas de todos os tamanhos, preservando estampas, cores e acabamentos.
            </p>

            <ul className="mt-12 space-y-0">
              {benefits.map((b, i) => (
                <li key={b.t} className="group grid grid-cols-[3rem_1fr] items-baseline gap-4 border-t border-navy/12 py-5">
                  <span className="font-serif text-2xl italic text-clay">{String(i + 1).padStart(2, '0')}</span>
                  <div>
                    <p className="font-serif text-2xl transition-transform duration-500 group-hover:translate-x-1">{b.t}</p>
                    <p className="mt-1 text-sm text-ink-soft">{b.d}</p>
                  </div>
                </li>
              ))}
            </ul>

            <a
              href={waLink('Olá! Gostaria de um orçamento para higienização de almofadas.')}
              target="_blank"
              rel="noopener"
              className="mt-10 inline-flex rounded-full bg-navy px-7 py-4 text-[0.72rem] font-medium uppercase tracking-[0.18em] text-cream transition-colors hover:bg-navy-2"
            >
              Orçar higienização de almofadas
            </a>
          </Reveal>

          <Reveal delay={150} className="relative">
            <figure data-ripple className="wipe relative aspect-square overflow-hidden rounded-sm">
              <div data-parallax="0.07" className="absolute inset-x-0 -inset-y-[8%]">
                <Image
                  src="/images/almofada-main.webp"
                  alt="Sofá claro com almofadas estampadas em tons terracota e cinza"
                  fill
                  sizes="(min-width: 1024px) 50vw, 100vw"
                  className="object-cover"
                />
              </div>
            </figure>
            <div className="absolute -bottom-8 left-6 flex gap-3 md:left-10">
              {['/images/almofada-thumb-1.webp', '/images/almofada-thumb-2.webp'].map((src, i) => (
                <div
                  key={src}
                  className={`relative size-28 overflow-hidden border-4 border-linen shadow-xl md:size-36 ${i === 0 ? '-rotate-3' : 'rotate-2 translate-y-4'}`}
                >
                  <Image src={src || '/placeholder.svg'} alt="Almofada decorativa higienizada" fill sizes="144px" className="object-cover" />
                </div>
              ))}
            </div>
            <span
              className="absolute -top-10 -right-2 font-serif text-[9rem] leading-none font-light italic text-clay/20 select-none md:text-[12rem]"
              aria-hidden="true"
            >
              03
            </span>
          </Reveal>
        </div>
      </div>
    </section>
  )
}
