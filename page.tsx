import { About } from '@/components/site/about'
import { BeforeAfter } from '@/components/site/before-after'
import { Blinds } from '@/components/site/blinds'
import { Curtains } from '@/components/site/curtains'
import { Faq, Testimonials } from '@/components/site/faq'
import { Footer } from '@/components/site/footer'
import { Gallery } from '@/components/site/gallery'
import { Header } from '@/components/site/header'
import { Hero } from '@/components/site/hero'
import { Clients, Marquee } from '@/components/site/marquee'
import { MotionLayer } from '@/components/site/motion'
import { Pillows } from '@/components/site/pillows'
import { Process } from '@/components/site/process'
import { Quote } from '@/components/site/quote'
import { Services } from '@/components/site/services'
import { WhatsappFab } from '@/components/site/whatsapp-fab'

export default function Page() {
  return (
    <>
      <a
        href="#conteudo"
        className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-90 focus:rounded-full focus:bg-cream focus:px-5 focus:py-3 focus:text-navy"
      >
        Pular para o conteúdo
      </a>
      <MotionLayer />
      <Header />
      <main id="conteudo">
        <Hero />
        <Marquee />
        <About />
        <Services />
        <Curtains />
        <Blinds />
        <Pillows />
        <BeforeAfter />
        <Process />
        <Gallery />
        <Clients />
        <Testimonials />
        <Faq />
        <Quote />
      </main>
      <Footer />
      <WhatsappFab />
    </>
  )
}
