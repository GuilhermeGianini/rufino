'use client'

import Image from 'next/image'
import { useEffect, useRef, useState, type KeyboardEvent, type PointerEvent } from 'react'
import { cn } from '@/lib/utils'

/** Foto com cortina que a pessoa abre arrastando (mouse ou toque) ou pelas setas do teclado. */
export function CurtainPlay({ src, alt }: { src: string; alt: string }) {
  const wrap = useRef<HTMLDivElement>(null)
  const box = useRef<HTMLDivElement>(null)
  const label = useRef<HTMLSpanElement>(null)
  const value = useRef(0.1)
  const dragging = useRef(false)
  const [touched, setTouched] = useState(false)

  const set = (o: number) => {
    const v = Math.max(0, Math.min(1, o))
    value.current = v
    wrap.current?.style.setProperty('--o', v.toFixed(3))
    box.current?.setAttribute('aria-valuenow', String(Math.round(v * 100)))
    if (label.current) label.current.textContent = `${Math.round(v * 100)}%`
  }
  const fromX = (x: number) => {
    const r = box.current!.getBoundingClientRect()
    return Math.abs((x - r.left) / r.width - 0.5) * 2
  }

  useEffect(() => {
    set(0.1)
    const el = box.current!
    const io = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          window.setTimeout(() => set(0.7), 450)
          io.disconnect()
        }
      },
      { threshold: 0.45 },
    )
    io.observe(el)
    const up = () => {
      dragging.current = false
      el.classList.remove('is-drag')
    }
    window.addEventListener('pointerup', up)
    return () => {
      io.disconnect()
      window.removeEventListener('pointerup', up)
    }
  }, [])

  const onDown = (e: PointerEvent<HTMLDivElement>) => {
    dragging.current = true
    box.current?.classList.add('is-drag')
    setTouched(true)
    set(fromX(e.clientX))
  }
  const onMove = (e: PointerEvent<HTMLDivElement>) => {
    if (e.pointerType === 'mouse' || dragging.current) {
      if (!touched) setTouched(true)
      set(fromX(e.clientX))
    }
  }
  const onKey = (e: KeyboardEvent<HTMLDivElement>) => {
    if (e.key === 'ArrowRight' || e.key === 'ArrowUp') set(value.current + 0.1)
    else if (e.key === 'ArrowLeft' || e.key === 'ArrowDown') set(value.current - 0.1)
    else return
    e.preventDefault()
    setTouched(true)
  }

  return (
    <div ref={wrap} className="cplay">
      <div
        ref={box}
        role="slider"
        tabIndex={0}
        aria-label="Abertura da cortina"
        aria-valuemin={0}
        aria-valuemax={100}
        aria-valuenow={10}
        onPointerDown={onDown}
        onPointerMove={onMove}
        onKeyDown={onKey}
        className="cplay-box"
      >
        <Image src={src} alt={alt} fill sizes="(min-width: 1024px) 1200px, 100vw" className="cplay-photo object-cover" />
        <div className="cplay-rod" aria-hidden="true" />
        <div className="cplay-drape pleats l" aria-hidden="true" />
        <div className="cplay-drape pleats r" aria-hidden="true" />
        <span className={cn('cplay-hint', touched && 'opacity-0')} aria-hidden="true">
          ← Arraste para abrir →
        </span>
      </div>
      <div className="cplay-meter">
        <span>Abertura</span>
        <b ref={label}>10%</b>
        <span className="cplay-bar" />
      </div>
    </div>
  )
}
