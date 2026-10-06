'use client'

import Image from 'next/image'
import { useEffect, useState } from 'react'
import { navLinks, site, waLink } from '@/lib/site'
import { cn } from '@/lib/utils'

export function Header() {
  const [solid, setSolid] = useState(false)
  const [open, setOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setSolid(window.scrollY > 40)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setOpen(false)
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [open])

  return (
    <>
      <header
        className={cn(
          'fixed inset-x-0 top-0 z-60 text-cream transition-[background-color,box-shadow] duration-500',
          solid && !open && 'bg-navy/92 shadow-[0_1px_0_rgba(239,234,224,0.12)] backdrop-blur-md',
        )}
      >
        <div
          className={cn(
            'wrap flex items-center gap-8 transition-[height] duration-500',
            solid ? 'h-[72px]' : 'h-[92px]',
          )}
        >
          <a href="#inicio" aria-label="Domus Trama Decor, início" className="relative z-70 shrink-0">
            <Image
              src="/images/logo.png"
              alt="Domus Trama Decor"
              width={680}
              height={206}
              priority
              className={cn('w-auto transition-[height] duration-500', solid ? 'h-10' : 'h-12 md:h-14')}
            />
          </a>

          <nav aria-label="Principal" className="ml-auto hidden items-center gap-9 lg:flex">
            {navLinks.map((l) => (
              <a
                key={l.href}
                href={l.href}
                className="group relative text-[0.7rem] font-medium uppercase tracking-[0.22em] text-cream/70 transition-colors hover:text-cream"
              >
                {l.label}
                <span className="absolute -bottom-1.5 left-0 h-px w-full origin-left scale-x-0 bg-brass-soft transition-transform duration-500 group-hover:scale-x-100" />
              </a>
            ))}
          </nav>

          <a
            href="#orcamento"
            data-magnetic
            className="hidden rounded-full bg-cream px-6 py-3 text-[0.7rem] font-medium uppercase tracking-[0.2em] text-navy transition-colors hover:bg-white lg:inline-flex"
          >
            Pedir orçamento
          </a>

          <button
            type="button"
            aria-controls="menu-mobile"
            aria-expanded={open}
            aria-label={open ? 'Fechar menu' : 'Abrir menu'}
            onClick={() => setOpen((v) => !v)}
            className="relative z-70 ml-auto grid size-12 place-items-center rounded-full border border-cream/20 lg:hidden"
          >
            <span className="flex w-5 flex-col gap-[5px]">
              <span
                className={cn(
                  'h-px w-full bg-current transition-transform duration-300',
                  open && 'translate-y-[3px] rotate-45',
                )}
              />
              <span
                className={cn(
                  'h-px w-full bg-current transition-transform duration-300',
                  open && '-translate-y-[3px] -rotate-45',
                )}
              />
            </span>
          </button>
        </div>
      </header>

      <div
        id="menu-mobile"
        aria-hidden={!open}
        inert={!open}
        className={cn(
          'pleats-navy fixed inset-0 z-55 text-cream transition-[clip-path] duration-700 ease-silk lg:hidden',
          open ? '[clip-path:inset(0)]' : '[clip-path:inset(0_0_100%_0)]',
        )}
      >
        <div className="absolute inset-0 bg-navy/85" />
        <nav aria-label="Menu" className="wrap relative flex min-h-full flex-col justify-center pt-24 pb-10">
          {[...navLinks, { href: '#orcamento', label: 'Orçamento' }].map((l, i) => (
            <a
              key={l.href}
              href={l.href}
              onClick={() => setOpen(false)}
              className="flex items-baseline gap-4 border-b border-cream/15 py-3 font-serif text-4xl font-light sm:text-5xl"
            >
              <small className="font-sans text-xs text-brass-soft">{String(i + 1).padStart(2, '0')}</small>
              {l.label}
            </a>
          ))}
          <div className="mt-10 flex flex-wrap items-center gap-5 text-sm text-cream/70">
            <a
              href={waLink('Olá! Vim pelo site da Domus e gostaria de um orçamento.')}
              target="_blank"
              rel="noopener"
              className="rounded-full bg-cream px-6 py-3 text-xs font-medium uppercase tracking-[0.18em] text-navy"
            >
              Falar no WhatsApp
            </a>
            <span>{site.phoneDisplay}</span>
          </div>
        </nav>
      </div>
    </>
  )
}
