'use client'

import { useEffect, useRef, type CSSProperties } from 'react'
import { Reveal } from './reveal'
import { Split } from './split'

const steps = [
  { t: 'Orçamento', d: 'Envie fotos ou a quantidade de peças pelo WhatsApp ou pelo formulário.' },
  { t: 'Retirada', d: 'Combinamos o melhor dia e buscamos as peças na sua casa.' },
  { t: 'Limpeza', d: 'Cada peça é limpa de acordo com o tecido e o modelo.' },
  { t: 'Entrega', d: 'Devolvemos tudo limpo e pronto para usar.' },
]

export function Process() {
  const track = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const el = track.current
    if (!el) return
    const items = Array.from(el.querySelectorAll<HTMLElement>('[data-step]'))
    let ticking = false
    const frame = () => {
      const r = el.getBoundingClientRect()
      const p = Math.min(1, Math.max(0, (window.innerHeight * 0.8 - r.top) / (r.height + window.innerHeight * 0.3)))
      el.style.setProperty('--p', p.toFixed(3))
      items.forEach((s, k) => s.classList.toggle('is-on', p >= k / items.length + 0.02))
      ticking = false
    }
    const onScroll = () => {
      if (!ticking) {
        ticking = true
        requestAnimationFrame(frame)
      }
    }
    frame()
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll)
    return () => {
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
    }
  }, [])

  return (
    <section id="processo" className="grain relative overflow-hidden bg-navy py-24 text-cream md:py-36">
      <div className="wrap">
        <Reveal className="max-w-3xl">
          <p className="kicker text-cream/60">Como funciona</p>
          <h2 className="display mt-6 text-[clamp(2.6rem,5.4vw,4.8rem)]">
            <Split>
              Da sua janela <em className="text-brass-soft">à nossa e de volta.</em>
            </Split>
          </h2>
        </Reveal>

        <div ref={track} className="ptrack relative mt-20">
          <div className="ptrack-line" aria-hidden="true">
            <div className="stitch text-cream/25" />
            <div className="ptrack-fill" />
          </div>

          <ol className="grid gap-12 md:grid-cols-4 md:gap-8">
            {steps.map((s, i) => (
              <li key={s.t} data-step className="pstep relative" style={{ '--delay': `${i * 120}ms` } as CSSProperties}>
                <div className="pstep-dot relative grid size-[60px] place-items-center rounded-full border bg-navy font-serif text-2xl italic">
                  {i + 1}
                </div>
                <h3 className="pstep-title mt-6 font-serif text-3xl">{s.t}</h3>
                <p className="mt-3 max-w-[30ch] text-sm leading-relaxed text-cream/70">{s.d}</p>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  )
}
