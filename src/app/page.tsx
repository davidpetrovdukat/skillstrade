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
import { getDisplayUsername } from '@/lib/freelancer-usernames';
import { buildCanonicalAvatarMap } from '@/lib/avatar-utils';
import { FEATURE_FLAGS } from '@/lib/feature-flags';
import type { Types } from 'mongoose';

export const dynamic = 'force-dynamic';

interface HomeService {
  _id: Types.ObjectId;
  title: string;
  imageUrl?: string | null;
}

interface HomeTalent {
  _id: Types.ObjectId;
  slug?: string;
  name: string;
  avatarUrl?: string;
  role: string;
  flag: string;
  skills?: string[];
}

export default async function Home() {
  let topServices: HomeService[] = [];
  let featuredTalents: HomeTalent[] = [];
  const canonicalAvatarByName = buildCanonicalAvatarMap();

  try {
    await connectMongo();
    topServices = await Service.find({}).limit(6).lean() as HomeService[];
    if (FEATURE_FLAGS.showHomepageCollectiveBlock) {
      const raw = await Freelancer.find({ isAvailable: true }).limit(8).lean() as HomeTalent[];
      featuredTalents = raw.map((talent) => ({
        _id: talent._id,
        slug: talent.slug,
        name: getDisplayUsername(talent.name),
        avatarUrl: canonicalAvatarByName.get(talent.name) || talent.avatarUrl,
        role: talent.role,
        flag: talent.flag,
        skills: talent.skills || [],
      }));
    }
  } catch (error) {
    console.error("Home Page DB Error:", error);
  }

  return (
    <div className="flex min-h-screen w-full flex-col border-x border-white/20 max-w-[1440px] mx-auto">
      <Header />
      <main className="flex-1">
        <Hero />
        <Marquee />
        <Features />
        <Services services={JSON.parse(JSON.stringify(topServices))} />
        {FEATURE_FLAGS.showHomepageCollectiveBlock && (
          <TalentCarousel talents={JSON.parse(JSON.stringify(featuredTalents))} />
        )}
        <HowItWorks />
        <Pricing />
      </main>
      <Footer />
    </div>
  )
}
