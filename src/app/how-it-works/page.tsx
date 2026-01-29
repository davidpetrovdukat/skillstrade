import { Header } from '@/components/layout/Header'
import { Footer } from '@/components/layout/Footer'
import { Hero } from '@/components/how-it-works/Hero'
import { ProcessSteps } from '@/components/how-it-works/ProcessSteps'
import { VettingFunnel } from '@/components/how-it-works/VettingFunnel'
import { TokenSystem } from '@/components/how-it-works/TokenSystem'
import { MoneyBack } from '@/components/how-it-works/MoneyBack'

export default function HowItWorksPage() {
    return (
        <div className="min-h-screen bg-background text-white selection:bg-primary selection:text-black border-x border-white/20 max-w-[1440px] mx-auto">
            <Header />
            <main>
                <Hero />
                <ProcessSteps />
                <VettingFunnel />
                <TokenSystem />
                <MoneyBack />
            </main>
            <Footer />
        </div>
    )
}
