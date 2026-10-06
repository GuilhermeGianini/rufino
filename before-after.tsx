'use client'

import Image from 'next/image'
import { useCallback, useRef, useState } from 'react'
import { ChevronLeft, ChevronRight, MoveHorizontal } from 'lucide-react'
import { beforeAfter } from '@/lib/site'
import { cn } from '@/lib/utils'
import { Reveal } from './reveal'
import { Split } from './split'

function Slider({ before, after, label }: { before?: string; after: string; label: string }) {
  const [pos, setPos] = useState(50)
  const box = useRef<HTMLDivElement>(null)
  const dragging = useRef(false)
  const simulated = !before

  const update = useCallback((clientX: number) => {
    const r = box.current?.getBoundingClientRect()
    if (!r) return
    setPos(Math.min(100, Math.max(0, ((clientX - r.left) / r.width) * 100)))
  }, [])

  return (
    <div
      ref={box}
      className="relative aspect-[4/5] w-full cursor-ew-resize touch-pan-y overflow-hidden select-none md:aspect-[16/11]"
      onPointerDown={(e) => {
        dragging.current = true
        e.currentTarget.setPointerCapture(e.pointerId)
        update(e.clientX)
      }}
      onPointerMove={(e) => dragging.current && update(e.clientX)}
      onPointerUp={() => (dragging.current = false)}
      onPointerCancel={() => (dragging.current = false)}
    >
      <Image src={after || '/placeholder.svg'} alt={`${label}, depois da limpeza`} fill sizes="(min-width: 1024px) 70vw, 100vw" className="object-cover" draggable={false} />

      <div className="absolute inset-0" style={{ clipPath: `inset(0 ${100 - pos}% 0 0)` }}>
        <Image
          src={before || after}
          alt={`${label}, antes da limpeza${simulated ? ' (simulação)' : ''}`}
          fill
          sizes="(min-width: 1024px) 70vw, 100vw"
          draggable={false}
          className={cn('object-cover', simulated && '[filter:sepia(0.55)_saturate(0.55)_brightness(0.78)_contrast(0.9)]')}
        />
        {simulated && (
          <>
            <div className="dust absolute inset-0 opacity-60" aria-hidden="true" />
            <div className="absolute inset-0 bg-[#6b5530]/20 mix-blend-multiply" aria-hidden="true" />
          </>
        )}
      </div>

      <span className="absolute top-4 left-4 bg-navy/85 px-3 py-1.5 text-[0.62rem] uppercase tracking-[0.24em] text-cream backdrop-blur">
        Antes
      </span>
      <span className="absolute top-4 right-4 bg-cream/90 px-3 py-1.5 text-[0.62rem] uppercase tracking-[0.24em] text-navy backdrop-blur">
        Depois
      </span>

      <div className="pointer-events-none absolute inset-y-0" style={{ left: `${pos}%` }} aria-hidden="true">
        <div className="absolute inset-y-0 -translate-x-1/2 border-l border-dashed border-cream" />
        <div className="absolute top-1/2 grid size-14 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full bg-cream text-navy shadow-2xl">
          <MoveHorizontal className="size-5" />
        </div>
      </div>

      <input
        type="range"
        min={0}
        max={100}
        value={Math.round(pos)}
        onChange={(e) => setPos(Number(e.target.value))}
        aria-label="Comparar antes e depois"
        className="sr-only"
      />
    </div>
  )
}

export function BeforeAfter() {
  const [idx, setIdx] = useState(0)
  const item = beforeAfter[idx]
  const simulated = beforeAfter.some((b) => !b.before)
  const go = (dir: number) => setIdx((i) => (i + dir + beforeAfter.length) % beforeAfter.length)

  return (
    <section id="antes-depois" className="relative overflow-hidden bg-paper py-24 md:py-36">
      <div className="wrap">
        <Reveal className="grid items-end gap-8 md:grid-cols-[1.2fr_1fr]">
          <div>
            <p className="kicker">Antes e depois</p>
            <h2 className="display mt-6 text-[clamp(2.6rem,5.4vw,4.8rem)]">
              <Split>A diferença <em>salta aos olhos.</em></Split>
            </h2>
          </div>
          <p className="max-w-md leading-relaxed text-ink-soft md:justify-self-end">
            Arraste a linha para comparar. Poeira, manchas e tons amarelados dão lugar ao tecido como ele deve ser.
          </p>
        </Reveal>

        <Reveal delay={120} className="mt-14">
          <div className="relative bg-navy p-2 md:p-3">
            <Slider key={idx} before={item.before} after={item.after} label={item.title} />
          </div>

          <div className="mt-6 flex flex-wrap items-center justify-between gap-6">
            <div className="flex items-baseline gap-4">
              <span className="font-serif text-4xl italic text-brass" aria-live="polite">
                {String(idx + 1).padStart(2, '0')}
                <span className="text-xl text-ink-soft">/{String(beforeAfter.length).padStart(2, '0')}</span>
              </span>
              <div>
                <p className="font-serif text-2xl leading-tight">{item.title}</p>
                <p className="text-xs uppercase tracking-[0.2em] text-ink-soft">{item.place}</p>
              </div>
            </div>
            <div className="flex gap-2">
              <button
                type="button"
                onClick={() => go(-1)}
                aria-label="Comparação anterior"
                className="grid size-12 place-items-center rounded-full border border-navy/20 transition-colors hover:bg-navy hover:text-cream"
              >
                <ChevronLeft className="size-5" aria-hidden="true" />
              </button>
              <button
                type="button"
                onClick={() => go(1)}
                aria-label="Próxima comparação"
                className="grid size-12 place-items-center rounded-full border border-navy/20 transition-colors hover:bg-navy hover:text-cream"
              >
                <ChevronRight className="size-5" aria-hidden="true" />
              </button>
            </div>
          </div>

          {simulated && (
            <p className="mt-6 inline-flex items-center gap-3 border border-dashed border-brass/60 px-4 py-2.5 text-xs text-ink-soft">
              <span className="size-1.5 rounded-full bg-brass" aria-hidden="true" />
              Imagens ilustrativas. Em breve, fotos reais de antes e depois dos nossos clientes.
            </p>
          )}
        </Reveal>
      </div>
    </section>
  )
}
