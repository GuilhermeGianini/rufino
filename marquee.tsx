import { clients } from '@/lib/site'

const words = [
  'Voil',
  'Linho',
  'Blackout',
  'Prega wave',
  'Prega americana',
  'Ilhós',
  'Romana',
  'Rolô tela solar',
  'Double vision',
  'Almofadas',
]

function Row({ items, hidden = false, alt = false }: { items: string[]; hidden?: boolean; alt?: boolean }) {
  return (
    <ul className="flex shrink-0 items-center" aria-hidden={hidden || undefined}>
      {items.map((w, i) => (
        <li key={w} className="flex items-center">
          <span
            className={
              (i + (alt ? 1 : 0)) % 2 === 0
                ? 'px-8 font-serif text-3xl font-light italic md:text-5xl'
                : 'px-8 text-xs font-medium uppercase tracking-[0.3em] md:text-sm'
            }
          >
            {w}
          </span>
          <svg viewBox="0 0 24 24" className="size-5 text-brass" aria-hidden="true">
            <path d="M12 2v20M2 12h20M5 5l14 14M19 5L5 19" stroke="currentColor" strokeWidth="1" />
          </svg>
        </li>
      ))}
    </ul>
  )
}

/** Faixa de tecidos e serviços: duas linhas em sentidos opostos. */
export function Marquee() {
  const reversed = [...words].reverse()
  return (
    <div className="marquee relative overflow-hidden border-y border-navy/10 bg-linen py-6 text-navy md:py-8">
      <div className="stitch absolute inset-x-0 top-2 text-navy/25" aria-hidden="true" />
      <div className="marquee-track flex w-max">
        <Row items={words} />
        <Row items={words} hidden />
      </div>
      <div className="marquee-track marquee-rev mt-4 flex w-max opacity-60 md:mt-6" aria-hidden="true">
        <Row items={reversed} alt hidden />
        <Row items={reversed} alt hidden />
      </div>
      <div className="stitch absolute inset-x-0 bottom-2 text-navy/25" aria-hidden="true" />
    </div>
  )
}

/** Empresas atendidas, em loop. Fica oculta enquanto a lista em lib/site.ts estiver vazia. */
export function Clients() {
  if (clients.length === 0) return null
  return (
    <section aria-label="Empresas atendidas" className="bg-paper pb-20 md:pb-28">
      <div className="wrap mb-8">
        <p className="kicker">Quem confia na Domus</p>
      </div>
      <div className="marquee marquee-fade relative overflow-hidden border-y border-dashed border-navy/20 py-7 text-ink-soft">
        <div className="marquee-track flex w-max" style={{ animationDuration: '46s' }}>
          {[0, 1].map((n) => (
            <ul key={n} className="flex shrink-0 items-center" aria-hidden={n === 1 || undefined}>
              {clients.map((c) => (
                <li key={c.name} className="flex items-center gap-4 px-10 transition-colors hover:text-navy">
                  <span className="font-serif text-3xl md:text-4xl">{c.name}</span>
                  {c.type && <span className="text-[0.62rem] uppercase tracking-[0.22em]">{c.type}</span>}
                  <span className="ml-6 text-brass" aria-hidden="true">✳</span>
                </li>
              ))}
            </ul>
          ))}
        </div>
      </div>
    </section>
  )
}
