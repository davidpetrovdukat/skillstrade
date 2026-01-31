import { Header } from '@/components/layout/Header'
import { Hero } from '@/components/landing/Hero'
import { Marquee } from '@/components/landing/Marquee'
import { Features } from '@/components/landing/Features'
import { Services } from '@/components/landing/Services'
import { TalentCarousel } from '@/components/landing/TalentCarousel'
import { HowItWorks } from '@/components/landing/HowItWorks'
import { Pricing } from '@/components/landing/Pricing'
import { Footer } from '@/components/layout/Footer'

import { connectMongo } from '@/lib/db';
import { Service } from '@/models/Service';
import { Freelancer } from '@/models/Freelancer';

export const dynamic = 'force-dynamic';

export default async function Home() {
  let topServices: any[] = [];
  let featuredTalents: any[] = [];

  try {
    await connectMongo();
    // Fetch Services (Limit 6 for the grid)
    topServices = await Service.find({}).limit(6).lean();
    // Fetch Freelancers (Limit 8 for carousel)
    featuredTalents = await Freelancer.find({ isAvailable: true }).limit(8).lean();
  } catch (error) {
    console.error("Home Page DB Error:", error);
    // Silent fail: empty arrays are already set
  }

  return (
    <div className="flex min-h-screen w-full flex-col border-x border-white/20 max-w-[1440px] mx-auto">
      <Header />
      <main className="flex-1">
        <Hero />
        <Marquee />
        <Features />
        <Services services={JSON.parse(JSON.stringify(topServices))} />
        <TalentCarousel talents={JSON.parse(JSON.stringify(featuredTalents))} />
        <HowItWorks />
        <Pricing />
      </main>
      <Footer />
    </div>
  )
}
