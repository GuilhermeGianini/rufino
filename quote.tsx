'use client'

import { useState, type FormEvent } from 'react'
import { ArrowUpRight } from 'lucide-react'
import { site, waLink } from '@/lib/site'
import { cn } from '@/lib/utils'
import { Reveal } from './reveal'
import { Split } from './split'

const serviceOptions = ['Cortinas', 'Persianas', 'Almofadas']

const field =
  'w-full border-0 border-b border-cream/25 bg-transparent px-0 py-3 text-cream placeholder:text-cream/40 focus:border-brass-soft focus:ring-0 focus:outline-none'

export function Quote() {
  const [selected, setSelected] = useState<string[]>([])
  const [error, setError] = useState('')

  const toggle = (s: string) => setSelected((v) => (v.includes(s) ? v.filter((x) => x !== s) : [...v, s]))

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const data = new FormData(e.currentTarget)
    const name = String(data.get('name') ?? '').trim().slice(0, 80)
    const area = String(data.get('area') ?? '').trim().slice(0, 80)
    const details = String(data.get('details') ?? '').trim().slice(0, 600)
    if (!name || selected.length === 0) {
      setError('Informe seu nome e escolha pelo menos um serviço.')
      return
    }
    setError('')
    const msg = [
      `Olá! Meu nome é ${name}.`,
      `Gostaria de um orçamento para: ${selected.join(', ')}.`,
      area && `Bairro/cidade: ${area}.`,
      details && `Detalhes: ${details}`,
    ]
      .filter(Boolean)
      .join('\n')
    window.open(waLink(msg), '_blank', 'noopener')
  }

  return (
    <section id="orcamento" className="grain relative overflow-hidden bg-navy py-24 text-cream md:py-36">
      <div className="pleats-navy absolute inset-y-0 right-0 hidden w-[38%] opacity-60 lg:block" aria-hidden="true" />
      <div className="absolute inset-y-0 right-0 hidden w-[38%] bg-gradient-to-r from-navy via-navy/40 to-transparent lg:block" aria-hidden="true" />

      <div className="wrap relative grid gap-16 lg:grid-cols-[0.9fr_1.1fr] lg:gap-24">
        <Reveal>
          <p className="kicker text-cream/60">Orçamento</p>
          <h2 className="display mt-6 text-[clamp(2.6rem,5.4vw,4.8rem)]">
              <Split>Peça seu orçamento <em className="text-brass-soft">sem compromisso.</em></Split>
            </h2>
          <p className="mt-6 max-w-md leading-relaxed text-cream/75">
            Conte o que precisa limpar e respondemos pelo WhatsApp. Se puder, envie fotos das peças na conversa.
          </p>
          <dl className="mt-12 space-y-5 border-t border-cream/15 pt-8 text-sm">
            <div>
              <dt className="text-[0.62rem] uppercase tracking-[0.24em] text-cream/50">WhatsApp</dt>
              <dd className="mt-1 font-serif text-3xl">{site.phoneDisplay}</dd>
            </div>
            {site.email && (
              <div>
                <dt className="text-[0.62rem] uppercase tracking-[0.24em] text-cream/50">E-mail</dt>
                <dd className="mt-1">{site.email}</dd>
              </div>
            )}
            {site.hours && (
              <div>
                <dt className="text-[0.62rem] uppercase tracking-[0.24em] text-cream/50">Atendimento</dt>
                <dd className="mt-1">{site.hours}</dd>
              </div>
            )}
          </dl>
        </Reveal>

        <Reveal delay={150}>
          <form onSubmit={onSubmit} noValidate className="relative bg-navy-2/80 p-7 shadow-2xl backdrop-blur md:p-12 stitch-box">
            <fieldset>
              <legend className="text-[0.62rem] uppercase tracking-[0.24em] text-cream/60">O que vamos limpar?</legend>
              <div className="mt-4 flex flex-wrap gap-2">
                {serviceOptions.map((s) => {
                  const on = selected.includes(s)
                  return (
                    <button
                      key={s}
                      type="button"
                      aria-pressed={on}
                      onClick={() => toggle(s)}
                      className={cn(
                        'rounded-full border px-5 py-2.5 text-sm transition-colors',
                        on ? 'border-cream bg-cream text-navy' : 'border-cream/30 hover:border-cream',
                      )}
                    >
                      {s}
                    </button>
                  )
                })}
              </div>
            </fieldset>

            <div className="mt-8 grid gap-6 md:grid-cols-2">
              <label className="block">
                <span className="text-[0.62rem] uppercase tracking-[0.24em] text-cream/60">Seu nome</span>
                <input name="name" required autoComplete="name" maxLength={80} className={field} placeholder="Como podemos te chamar?" />
              </label>
              <label className="block">
                <span className="text-[0.62rem] uppercase tracking-[0.24em] text-cream/60">Bairro e cidade</span>
                <input name="area" autoComplete="address-level2" maxLength={80} className={field} placeholder="Ex.: Moema, São Paulo" />
              </label>
            </div>
            <label className="mt-6 block">
              <span className="text-[0.62rem] uppercase tracking-[0.24em] text-cream/60">Detalhes</span>
              <textarea
                name="details"
                rows={3}
                maxLength={600}
                className={cn(field, 'resize-none')}
                placeholder="Quantidade de peças, tecidos, medidas aproximadas..."
              />
            </label>

            {error && (
              <p role="alert" className="mt-5 text-sm text-brass-soft">
                {error}
              </p>
            )}

            <button
              type="submit"
              className="group mt-10 inline-flex w-full items-center justify-between gap-3 rounded-full bg-cream py-4 pr-4 pl-7 text-[0.74rem] font-medium uppercase tracking-[0.18em] text-navy transition-colors hover:bg-white"
            >
              Enviar pelo WhatsApp
              <span className="grid size-9 place-items-center rounded-full bg-navy text-cream transition-transform duration-500 group-hover:rotate-45">
                <ArrowUpRight className="size-4" aria-hidden="true" />
              </span>
            </button>
          </form>
        </Reveal>
      </div>
    </section>
  )
}
