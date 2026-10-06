import { Analytics } from '@vercel/analytics/next'
import type { Metadata, Viewport } from 'next'
import { EB_Garamond, Montserrat_Alternates } from 'next/font/google'
import './globals.css'

const montserratAlt = Montserrat_Alternates({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600'],
  variable: '--font-montserrat-alt',
  display: 'swap',
})

const cormorant = EB_Garamond({
  subsets: ['latin'],
  style: ['normal', 'italic'],
  variable: '--font-cormorant',
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'Domus Trama Decor | Limpeza de cortinas, persianas e almofadas',
  description:
    'Domus Trama Decor: lavagem de cortinas, limpeza de persianas e higienização de almofadas, com o cuidado que cada tecido pede. Peça seu orçamento pelo WhatsApp.',
  openGraph: {
    title: 'Domus Trama Decor | Limpeza de cortinas, persianas e almofadas',
    description: 'Cortinas, persianas e almofadas limpas, com o cuidado que cada tecido pede.',
    type: 'website',
    locale: 'pt_BR',
    images: ['/images/hero.webp'],
  },
  icons: {
    icon: [
      { url: '/icon-light-32x32.png', media: '(prefers-color-scheme: light)' },
      { url: '/icon-dark-32x32.png', media: '(prefers-color-scheme: dark)' },
      { url: '/icon.svg', type: 'image/svg+xml' },
    ],
    apple: '/apple-icon.png',
  },
}

export const viewport: Viewport = {
  themeColor: '#0F222D',
  colorScheme: 'light',
}

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'DryCleaningOrLaundry',
  name: 'Domus Trama Decor',
  description: 'Lavagem de cortinas, limpeza de persianas e higienização de almofadas.',
  telephone: '+55-11-99368-7070',
}

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="pt-BR" className={`${montserratAlt.variable} ${cormorant.variable} bg-paper`}>
      <body>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        {children}
        {process.env.NODE_ENV === 'production' && <Analytics />}
      </body>
    </html>
  )
}
