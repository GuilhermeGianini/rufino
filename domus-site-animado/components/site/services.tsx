import Image from 'next/image'
import { ArrowUpRight } from 'lucide-react'
import { Reveal } from './reveal'
import { Tilt } from './tilt'
import { Split } from './split'

const services = [
  {
    href: '#cortinas',
    n: '01',
    title: 'Lavagem de cortinas',
    desc: 'Do voil ao blackout, em todos os tipos de prega.',
    img: '/images/svc-cortinas.webp',
    alt: 'Cortina branca em sala de estar',
    tag: 'Voil · Linho · Blackout',
  },
  {
    href: '#persianas',
    n: '02',
    title: 'Limpeza de persianas',
    desc: 'Rolô, romana, horizontal e outros modelos.',
    img: '/images/svc-persianas.webp',
    alt: 'Persianas rolô em varanda',
    tag: 'Tecido · Tela · Lâminas',
  },
  {
    href: '#almofadas',
    n: '03',
    title: 'Higienização de almofadas',
    desc: 'Sem poeira e sem odores do uso diário.',
    img: '/images/svc-almofadas.webp',
    alt: 'Almofadas decorativas em sofá',
    tag: 'Decorativas · Estampadas',
  },
]

export function Services() {
  return (
    <section id="servicos" className="relative bg-linen py-24 md:py-36">
      <div className="wrap">
        <Reveal className="mb-14 grid items-end gap-8 md:mb-20 md:grid-cols-[1.2fr_1fr]">
          <div>
            <p className="kicker">O que fazemos</p>
            <h2 className="display mt-6 text-[clamp(2.6rem,5.4vw,4.8rem)]">
              <Split>Três cuidados, <em>um só capricho.</em></Split>
            </h2>
          </div>
          <p className="max-w-md leading-relaxed text-ink-soft md:justify-self-end">
            Cada material pede uma limpeza diferente. Por isso cada peça é tratada de acordo com o tecido e o
            modelo.
          </p>
        </Reveal>

        <div className="grid gap-8 md:grid-cols-3 md:gap-6 lg:gap-10">
          {services.map((s, i) => (
            <Reveal key={s.n} delay={i * 120} className={i === 1 ? 'md:mt-16' : ''}>
              <Tilt>
              <a href={s.href} className="group block">
                <div className="relative aspect-[3/4] overflow-hidden bg-navy">
                  <Image
                    src={s.img || '/placeholder.svg'}
                    alt={s.alt}
                    fill
                    sizes="(min-width: 768px) 33vw, 100vw"
                    className="object-cover transition-transform duration-[1.4s] ease-silk group-hover:scale-[1.06]"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-navy/60 via-transparent to-transparent opacity-0 transition-opacity duration-700 group-hover:opacity-100" />
                  <span className="tilt-pop-sm absolute top-4 left-4 font-serif text-6xl font-light italic text-cream/90 drop-shadow">
                    {s.n}
                  </span>
                  <span className="absolute right-4 bottom-4 grid size-12 translate-y-3 place-items-center rounded-full bg-cream text-navy opacity-0 transition-all duration-500 group-hover:translate-y-0 group-hover:opacity-100">
                    <ArrowUpRight className="size-5" aria-hidden="true" />
                  </span>
                </div>

                <div className="tilt-pop relative -mt-8 mr-6 ml-4 bg-paper p-6 shadow-[0_20px_40px_-28px_rgba(15,34,45,0.5)] stitch-box">
                  <span className="absolute -top-2 left-6 size-3.5 rounded-full border border-navy/30 bg-linen" aria-hidden="true" />
                  <p className="text-[0.62rem] uppercase tracking-[0.22em] text-brass">{s.tag}</p>
                  <h3 className="mt-2 font-serif text-[1.85rem] leading-tight">{s.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-ink-soft">{s.desc}</p>
                </div>
              </a>
              </Tilt>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
