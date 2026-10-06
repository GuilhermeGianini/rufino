'use client'

import { useRef, type PointerEvent, type ReactNode } from 'react'
import { cn } from '@/lib/utils'

/** Card que inclina acompanhando o mouse, com brilho suave. Só funciona com mouse. */
export function Tilt({ children, className }: { children: ReactNode; className?: string }) {
  const ref = useRef<HTMLDivElement>(null)

  const move = (e: PointerEvent<HTMLDivElement>) => {
    if (e.pointerType !== 'mouse' || !ref.current) return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    const r = ref.current.getBoundingClientRect()
    const x = (e.clientX - r.left) / r.width
    const y = (e.clientY - r.top) / r.height
    const s = ref.current.style
    ref.current.classList.add('is-hover')
    s.setProperty('--ry', `${((x - 0.5) * 10).toFixed(2)}deg`)
    s.setProperty('--rx', `${((0.5 - y) * 8).toFixed(2)}deg`)
    s.setProperty('--gx', `${(x * 100).toFixed(1)}%`)
    s.setProperty('--gy', `${(y * 100).toFixed(1)}%`)
  }
  const leave = () => {
    if (!ref.current) return
    ref.current.classList.remove('is-hover')
    ref.current.style.setProperty('--rx', '0deg')
    ref.current.style.setProperty('--ry', '0deg')
  }

  return (
    <div ref={ref} className={cn('tilt', className)} onPointerMove={move} onPointerLeave={leave}>
      {children}
      <span className="tilt-glare" aria-hidden="true" />
    </div>
  )
}
