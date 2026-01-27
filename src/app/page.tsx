import { Header } from '@/components/layout/Header'
import { Hero } from '@/components/landing/Hero'
import { Marquee } from '@/components/landing/Marquee'
import { Features } from '@/components/landing/Features'
import { Services } from '@/components/landing/Services'
import { TalentCarousel } from '@/components/landing/TalentCarousel'
import { HowItWorks } from '@/components/landing/HowItWorks'
import { Pricing } from '@/components/landing/Pricing'
import { Footer } from '@/components/layout/Footer'

export default function Home() {
  return (
    <div className="flex min-h-screen w-full flex-col border-x border-white/20 max-w-[1440px] mx-auto">
      <Header />
      <main className="flex-1">
        <Hero />
        <Marquee />
        <Features />
        <Services />
        <TalentCarousel />
        <HowItWorks />
        <Pricing />
      </main>
      <Footer />
    </div>
  )
}
