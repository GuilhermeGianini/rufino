import { Plus } from 'lucide-react'
import { faqs, testimonials, waLink } from '@/lib/site'
import { Reveal } from './reveal'
import { Split } from './split'

export function Testimonials() {
  if (testimonials.length === 0) return null
  return (
    <section className="bg-linen py-24 md:py-32">
      <div className="wrap">
        <Reveal>
          <p className="kicker">Quem já confiou</p>
          <h2 className="display mt-6 text-[clamp(2.4rem,5vw,4.4rem)]">
              <Split>Palavras de <em>clientes.</em></Split>
            </h2>
        </Reveal>
        <ul className="mt-14 grid gap-6 md:grid-cols-3">
          {testimonials.map((t, i) => (
            <Reveal as="li" key={t.name} delay={i * 100} className="bg-paper p-8 stitch-box">
              <blockquote className="font-serif text-2xl leading-snug">“{t.quote}”</blockquote>
              <p className="mt-6 text-sm font-medium">{t.name}</p>
              <p className="text-xs uppercase tracking-[0.18em] text-ink-soft">{t.place}</p>
            </Reveal>
          ))}
        </ul>
      </div>
    </section>
  )
}

export function Faq() {
  return (
    <section id="duvidas" className="bg-linen py-24 md:py-36">
      <div className="wrap grid gap-14 lg:grid-cols-[0.8fr_1.2fr] lg:gap-24">
        <Reveal className="lg:sticky lg:top-32 lg:self-start">
          <p className="kicker">Dúvidas</p>
          <h2 className="display mt-6 text-[clamp(2.6rem,5.4vw,4.8rem)]">
              <Split>Perguntas <em>frequentes.</em></Split>
            </h2>
          <p className="mt-6 max-w-sm leading-relaxed text-ink-soft">Não encontrou o que procurava? Fale direto com a gente.</p>
          <a
            href={waLink('Olá! Tenho uma dúvida sobre os serviços da Domus.')}
            target="_blank"
            rel="noopener"
            className="mt-8 inline-flex border-b border-navy pb-1 text-[0.72rem] font-medium uppercase tracking-[0.2em] transition-colors hover:text-brass"
          >
            Perguntar no WhatsApp
          </a>
        </Reveal>

        <Reveal delay={120} as="div" className="border-t border-navy/15">
          {faqs.map((f) => (
            <details key={f.q} className="group border-b border-navy/15">
              <summary className="flex cursor-pointer items-center justify-between gap-6 py-6 font-serif text-2xl transition-colors hover:text-brass md:text-[1.7rem]">
                {f.q}
                <span className="grid size-10 shrink-0 place-items-center rounded-full border border-navy/20 transition-all duration-500 group-open:rotate-45 group-open:bg-navy group-open:text-cream">
                  <Plus className="size-4" aria-hidden="true" />
                </span>
              </summary>
              <p className="max-w-2xl pb-7 leading-relaxed text-ink-soft">{f.a}</p>
            </details>
          ))}
        </Reveal>
      </div>
    </section>
  )
}
