import Image from 'next/image'
import { navLinks, site, waLink } from '@/lib/site'

export function Footer() {
  const year = new Date().getFullYear()
  return (
    <footer className="relative overflow-hidden bg-navy text-cream">
      <div className="stitch text-cream/20" aria-hidden="true" />
      <div className="wrap grid gap-12 py-16 md:grid-cols-[1.4fr_1fr_1fr]">
        <div>
          <Image src="/images/logo.png" alt="Domus Trama Decor" width={680} height={206} className="h-14 w-auto" />
          <p className="mt-6 max-w-xs text-sm leading-relaxed text-cream/60">
            Lavagem de cortinas, limpeza de persianas e higienização de almofadas.
          </p>
        </div>
        <nav aria-label="Rodapé">
          <p className="text-[0.62rem] uppercase tracking-[0.24em] text-cream/45">Navegação</p>
          <ul className="mt-4 space-y-2 text-sm">
            {navLinks.map((l) => (
              <li key={l.href}>
                <a href={l.href} className="text-cream/75 transition-colors hover:text-cream">
                  {l.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>
        <div>
          <p className="text-[0.62rem] uppercase tracking-[0.24em] text-cream/45">Contato</p>
          <ul className="mt-4 space-y-2 text-sm">
            <li>
              <a href={waLink('Olá! Vim pelo site da Domus.')} target="_blank" rel="noopener" className="text-cream/75 hover:text-cream">
                WhatsApp {site.phoneDisplay}
              </a>
            </li>
            {site.email && <li className="text-cream/75">{site.email}</li>}
            {site.instagram && (
              <li>
                <a href={site.instagram} target="_blank" rel="noopener" className="text-cream/75 hover:text-cream">
                  Instagram
                </a>
              </li>
            )}
            {site.serviceArea && <li className="text-cream/75">{site.serviceArea}</li>}
          </ul>
        </div>
      </div>

      <p
        className="wrap pointer-events-none font-serif text-[clamp(4rem,17vw,15rem)] leading-[0.8] font-light italic text-cream/[0.06] select-none"
        aria-hidden="true"
      >
        Domus
      </p>

      <div className="border-t border-cream/10">
        <div className="wrap flex flex-col justify-between gap-2 py-6 text-xs text-cream/45 md:flex-row">
          <span>
            © {year} {site.legalName || site.name}
          </span>
          <span>Feito com cuidado, como cada peça.</span>
        </div>
      </div>
    </footer>
  )
}
