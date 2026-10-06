import Image from 'next/image'
import { Reveal } from './reveal'
import { Split } from './split'

const pillars = [
  { n: '01', t: 'Cuidado com cada tecido', d: 'Cada peça é avaliada antes da limpeza.' },
  { n: '02', t: 'Atendimento personalizado', d: 'Você fala direto com quem cuida das peças.' },
  { n: '03', t: 'Empresa familiar', d: 'Conduzida por Jhonny, Evyllin e Elias.' },
]

export function About() {
  return (
    <section id="sobre" className="relative overflow-hidden bg-paper py-24 md:py-36">
      <div className="wrap grid items-center gap-16 lg:grid-cols-[1.1fr_0.9fr] lg:gap-24">
        <div>
          <Reveal>
            <p className="kicker">Sobre a Domus</p>
            <h2 className="display mt-6 text-[clamp(2.6rem,5.4vw,4.8rem)]">
              <Split>Mais do que <em>limpar tecidos.</em></Split>
            </h2>
          </Reveal>

          <Reveal delay={120} className="mt-10 grid gap-8 md:grid-cols-[auto_1fr]">
            <span className="font-serif text-[7rem] leading-[0.75] font-light text-brass md:text-[9rem]" aria-hidden="true">
              “
            </span>
            <div className="space-y-5 text-[1.02rem] leading-relaxed text-ink-soft">
              <p className="font-serif text-2xl leading-snug text-ink md:text-[1.75rem]">
                Cortinas, persianas e almofadas acumulam poeira, ácaros e odores sem que a gente perceba.
              </p>
              <p>
                Uma limpeza bem feita devolve a cor, o caimento e o ar leve ao ambiente. É isso que a Domus
                Trama Decor faz: uma empresa familiar que trata cada peça como se fosse da própria casa.
              </p>
              <p className="font-serif text-xl italic text-ink">Jhonny, Evyllin e Elias</p>
            </div>
          </Reveal>

          <Reveal delay={200} as="ol" className="mt-14 grid gap-px overflow-hidden rounded-sm bg-navy/12 sm:grid-cols-3">
            {pillars.map((p) => (
              <li key={p.n} className="bg-paper p-5 pt-6 transition-colors duration-500 hover:bg-linen">
                <span className="text-[0.7rem] tracking-[0.18em] text-brass">{p.n}</span>
                <p className="mt-2 text-[0.95rem] font-medium leading-snug">{p.t}</p>
                <p className="mt-2 text-sm leading-relaxed text-ink-soft">{p.d}</p>
              </li>
            ))}
          </Reveal>
        </div>

        <Reveal delay={150} className="relative mx-auto w-full max-w-[440px]">
          <div
            className="absolute inset-0 translate-x-5 translate-y-5 rounded-t-full border border-dashed border-brass/60"
            aria-hidden="true"
          />
          <figure className="wipe relative aspect-[4/5] overflow-hidden rounded-t-full">
            <div data-parallax="0.1" className="absolute inset-x-0 -inset-y-[8%]">
              <Image
                src="/images/about.webp"
                alt="Composição de cortinas em azul e cinza"
                fill
                sizes="(min-width: 1024px) 440px, 90vw"
                className="object-cover transition-[scale] duration-[1.6s] ease-silk hover:scale-105"
              />
            </div>
          </figure>
          <div className="absolute -bottom-6 -left-4 bg-navy px-5 py-4 text-cream shadow-2xl md:-left-10">
            <p className="text-[0.62rem] uppercase tracking-[0.24em] text-cream/60">Do voil ao blackout</p>
            <p className="font-serif text-2xl italic text-brass-soft">tecido por tecido</p>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
