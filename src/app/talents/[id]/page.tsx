import { notFound } from 'next/navigation'
import { Header } from '@/components/layout/Header'
import { Footer } from '@/components/layout/Footer'
import { ProfileHero } from '@/components/profile/ProfileHero'
import { ProfileBio } from '@/components/profile/ProfileBio'
import { PortfolioGrid } from '@/components/profile/PortfolioGrid'
import { ServicePackages } from '@/components/profile/ServicePackages'
import { Reviews } from '@/components/profile/Reviews'
import { PROFILES } from '@/lib/data'

interface PageProps {
    params: Promise<{
        id: string
    }>
}

// Ensure params are correctly typed for Next.js App Router 
export async function generateStaticParams() {
    return PROFILES.map((profile) => ({
        id: profile.id,
    }))
}

export default async function ProfilePage(props: PageProps) {
    const params = await props.params;
    console.log('Requested ID:', params.id);
    console.log('Available Profiles:', PROFILES.map(p => p.id));
    const profile = PROFILES.find((p) => p.id === params.id)

    if (!profile) {
        notFound()
    }

    return (
        <div className="flex min-h-screen w-full flex-col border-x border-white/20 max-w-[1440px] mx-auto">
            <Header />
            <main className="flex-1">
                <ProfileHero profile={profile} />
                <ProfileBio bio={profile.bio} />
                {profile.portfolio.length > 0 && <PortfolioGrid portfolio={profile.portfolio} />}
                {profile.active_services.length > 0 && <ServicePackages services={profile.active_services} />}
                {profile.reviews.length > 0 && <Reviews reviews={profile.reviews} />}
            </main>
            <Footer />
        </div>
    )
}
