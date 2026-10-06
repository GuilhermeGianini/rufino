'use client'

import Image from 'next/image'
import { useCallback, useEffect, useMemo, useState } from 'react'
import { ChevronLeft, ChevronRight, X } from 'lucide-react'
import { gallery, type GalleryCategory } from '@/lib/site'
import { cn } from '@/lib/utils'
import { Reveal } from './reveal'
import { Split } from './split'

const filters: { id: 'all' | GalleryCategory; label: string }[] = [
  { id: 'all', label: 'Todos' },
  { id: 'cortina', label: 'Cortinas' },
  { id: 'persiana', label: 'Persianas' },
  { id: 'almofada', label: 'Almofadas' },
]

export function Gallery() {
  const [filter, setFilter] = useState<'all' | GalleryCategory>('all')
  const [open, setOpen] = useState<number | null>(null)
  const items = useMemo(() => (filter === 'all' ? gallery : gallery.filter((g) => g.cat === filter)), [filter])

  const step = useCallback(
    (dir: number) => setOpen((i) => (i === null ? i : (i + dir + items.length) % items.length)),
    [items.length],
  )

  useEffect(() => {
    if (open === null) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setOpen(null)
      if (e.key === 'ArrowRight') step(1)
      if (e.key === 'ArrowLeft') step(-1)
    }
    document.body.style.overflow = 'hidden'
    window.addEventListener('keydown', onKey)
    return () => {
      document.body.style.overflow = ''
      window.removeEventListener('keydown', onKey)
    }
  }, [open, step])

  const current = open !== null ? items[open] : null

  return (
    <section id="projetos" className="relative bg-paper py-24 md:py-36">
      <div className="wrap">
        <Reveal className="flex flex-col gap-10 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="kicker">Trabalhos</p>
            <h2 className="display mt-6 text-[clamp(2.6rem,5.4vw,4.8rem)]">
              <Split>Casas que <em>passaram por aqui.</em></Split>
            </h2>
          </div>
          <div role="group" aria-label="Filtrar trabalhos" className="flex flex-wrap gap-2">
            {filters.map((f) => (
              <button
                key={f.id}
                type="button"
                aria-pressed={filter === f.id}
                onClick={() => setFilter(f.id)}
                className={cn(
                  'rounded-full border px-5 py-2.5 text-[0.7rem] font-medium uppercase tracking-[0.18em] transition-colors',
                  filter === f.id ? 'border-navy bg-navy text-cream' : 'border-navy/20 hover:border-navy',
                )}
              >
                {f.label}
              </button>
            ))}
          </div>
        </Reveal>

        <ul className="mt-14 columns-2 gap-3 md:columns-3 md:gap-5 lg:columns-4">
          {items.map((g, i) => (
            <li key={g.src} className="mb-3 break-inside-avoid md:mb-5">
              <button
                type="button"
                data-ripple
                onClick={() => setOpen(i)}
                className="group relative block w-full overflow-hidden bg-linen text-left"
              >
                <Image
                  src={g.src || '/placeholder.svg'}
                  alt={g.alt}
                  width={g.w}
                  height={g.h}
                  sizes="(min-width: 1024px) 25vw, (min-width: 768px) 33vw, 50vw"
                  className="h-auto w-full transition-transform duration-[1.2s] ease-silk group-hover:scale-105"
                />
                <span className="absolute inset-0 flex flex-col justify-end bg-gradient-to-t from-navy/80 via-navy/0 to-transparent p-4 text-cream opacity-0 transition-opacity duration-500 group-hover:opacity-100 group-focus-visible:opacity-100">
                  <span className="font-serif text-xl italic">{g.title}</span>
                  <span className="text-[0.62rem] uppercase tracking-[0.2em] text-cream/75">{g.place}</span>
                </span>
              </button>
            </li>
          ))}
        </ul>
      </div>

      {current && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label={current.title}
          className="fixed inset-0 z-80 flex items-center justify-center bg-navy/95 p-4 backdrop-blur-sm"
          onClick={() => setOpen(null)}
        >
          <figure className="relative flex max-h-full flex-col items-center" onClick={(e) => e.stopPropagation()}>
            <Image
              src={current.src || '/placeholder.svg'}
              alt={current.alt}
              width={current.w}
              height={current.h}
              sizes="90vw"
              className="h-auto max-h-[80svh] w-auto max-w-[90vw] object-contain"
            />
            <figcaption className="mt-4 text-center text-cream">
              <span className="font-serif text-2xl italic">{current.title}</span>
              <span className="ml-3 text-xs uppercase tracking-[0.2em] text-cream/60">
                {current.place} · {open! + 1}/{items.length}
              </span>
            </figcaption>
          </figure>
          <button type="button" aria-label="Fechar" onClick={() => setOpen(null)} className="absolute top-5 right-5 grid size-12 place-items-center rounded-full border border-cream/25 text-cream hover:bg-cream hover:text-navy">
            <X className="size-5" aria-hidden="true" />
          </button>
          <button type="button" aria-label="Foto anterior" onClick={(e) => { e.stopPropagation(); step(-1) }} className="absolute left-3 grid size-12 place-items-center rounded-full border border-cream/25 text-cream hover:bg-cream hover:text-navy md:left-8">
            <ChevronLeft className="size-5" aria-hidden="true" />
          </button>
          <button type="button" aria-label="Próxima foto" onClick={(e) => { e.stopPropagation(); step(1) }} className="absolute right-3 grid size-12 place-items-center rounded-full border border-cream/25 text-cream hover:bg-cream hover:text-navy md:right-8">
            <ChevronRight className="size-5" aria-hidden="true" />
          </button>
        </div>
      )}
    </section>
  )
}
