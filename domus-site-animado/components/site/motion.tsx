'use client'

import { useEffect, useRef } from 'react'

/**
 * Efeitos globais:
 * - fio de progresso no topo
 * - parallax em elementos com data-parallax="0.08"
 * - botões magnéticos com data-magnetic
 * - foto que ondula como tecido em elementos com data-ripple
 * Tudo é desligado quando o aparelho pede movimento reduzido.
 */
export function MotionLayer() {
  const bar = useRef<HTMLDivElement>(null)
  const disp = useRef<SVGFEDisplacementMapElement>(null)
  const turb = useRef<SVGFETurbulenceElement>(null)

  useEffect(() => {
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const fine = window.matchMedia('(hover: hover) and (pointer: fine)').matches
    const parallax = Array.from(document.querySelectorAll<HTMLElement>('[data-parallax]'))
    const magnets = Array.from(document.querySelectorAll<HTMLElement>('[data-magnetic]'))

    /* Rolagem: fio de progresso + parallax */
    let ticking = false
    const frame = () => {
      const max = document.documentElement.scrollHeight - window.innerHeight
      if (bar.current) bar.current.style.transform = `scaleX(${max > 0 ? window.scrollY / max : 0})`
      if (!reduce) {
        for (const el of parallax) {
          const box = el.parentElement?.getBoundingClientRect()
          if (!box || box.bottom < -200 || box.top > window.innerHeight + 200) continue
          const center = (box.top + box.height / 2 - window.innerHeight / 2) / window.innerHeight
          const speed = Number(el.dataset.parallax) || 0.08
          el.style.transform = `translate3d(0, ${(-center * speed * 100).toFixed(2)}%, 0)`
        }
      }
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

    /* Botões magnéticos */
    const onMove = (e: PointerEvent) => {
      for (const b of magnets) {
        const r = b.getBoundingClientRect()
        const dx = e.clientX - (r.left + r.width / 2)
        const dy = e.clientY - (r.top + r.height / 2)
        const near = Math.abs(dx) < r.width / 2 + 60 && Math.abs(dy) < r.height / 2 + 50
        b.style.transform = near ? `translate(${dx * 0.22}px, ${dy * 0.3}px)` : ''
      }
    }
    if (!reduce && fine && magnets.length) window.addEventListener('pointermove', onMove, { passive: true })

    /* Foto ondulando como tecido */
    let raf = 0
    let active: HTMLElement | null = null
    const stop = () => {
      cancelAnimationFrame(raf)
      if (active) active.style.filter = ''
      active = null
      disp.current?.setAttribute('scale', '0')
    }
    const start = (img: HTMLElement) => {
      stop()
      active = img
      img.style.filter = 'url(#domus-fabric)'
      const t0 = performance.now()
      const loop = (t: number) => {
        const k = (t - t0) / 1000
        disp.current?.setAttribute('scale', Math.min(20, k * 36).toFixed(1))
        turb.current?.setAttribute(
          'baseFrequency',
          `${(0.008 + Math.sin(k * 1.6) * 0.002).toFixed(4)} ${(0.03 + Math.cos(k * 1.2) * 0.006).toFixed(4)}`,
        )
        raf = requestAnimationFrame(loop)
      }
      raf = requestAnimationFrame(loop)
    }
    const onOver = (e: PointerEvent) => {
      const host = (e.target as Element).closest?.('[data-ripple]')
      if (!host) return
      const img = host.querySelector('img')
      if (img && img !== active) start(img)
    }
    const onOut = (e: PointerEvent) => {
      const host = (e.target as Element).closest?.('[data-ripple]')
      if (host && !host.contains(e.relatedTarget as Node)) stop()
    }
    if (!reduce && fine) {
      document.addEventListener('pointerover', onOver)
      document.addEventListener('pointerout', onOut)
    }

    return () => {
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
      window.removeEventListener('pointermove', onMove)
      document.removeEventListener('pointerover', onOver)
      document.removeEventListener('pointerout', onOut)
      stop()
    }
  }, [])

  return (
    <>
      <div ref={bar} className="scroll-thread" aria-hidden="true" />
      <svg width="0" height="0" className="absolute" aria-hidden="true" focusable="false">
        <filter id="domus-fabric">
          <feTurbulence ref={turb} type="fractalNoise" baseFrequency="0.008 0.03" numOctaves={2} seed={3} />
          <feDisplacementMap ref={disp} in="SourceGraphic" scale={0} />
        </filter>
      </svg>
    </>
  )
}
