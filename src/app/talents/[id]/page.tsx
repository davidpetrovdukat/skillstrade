import { notFound } from 'next/navigation'
import { Header } from '@/components/layout/Header'
import { Footer } from '@/components/layout/Footer'
import { ProfileHero } from '@/components/profile/ProfileHero'
import { ProfileBio } from '@/components/profile/ProfileBio'
import { PortfolioGrid } from '@/components/profile/PortfolioGrid'
import { ServicePackages } from '@/components/profile/ServicePackages'
import { Reviews } from '@/components/profile/Reviews'
import { connectMongo } from '@/lib/db'
import { Freelancer } from '@/models/Freelancer'
import { Service } from '@/models/Service'
import mongoose from 'mongoose'

export const dynamic = 'force-dynamic'

interface PageProps {
    params: Promise<{
        id: string
    }>
}

async function getProfile(id: string) {
    await connectMongo()

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return null
    }

    const freelancer = await Freelancer.findById(id).lean()
    if (!freelancer) return null

    // Fetch active services
    const services = await Service.find({ freelancer: freelancer._id }).lean()

    // Transform to match component expectations
    const profile = {
        id: (freelancer as any)._id.toString(),
        meta: {
            name: freelancer.name,
            role: freelancer.role,
            location: freelancer.location,
            flag: freelancer.flag,
            timezone: "GMT (London)", // TODO: Store in DB
            avatar_url: freelancer.avatarUrl,
            is_available: freelancer.isAvailable ?? true,
            verified: freelancer.verified
        },
        stats: {
            job_success_score: 98, // Mock for now
            jobs_completed: 42,
            avg_response_time: "2 hours",
            total_earned_display: "€58k+"
        },
        bio: {
            tagline: freelancer.bio, // Using bio as tagline for now.
            about_text: freelancer.bio,
            skills: freelancer.skills || [],
            languages: ["English (Native)"] // Mock for now
        },
        portfolio: freelancer.portfolio?.map((p: any) => ({
            id: p._id?.toString() || Math.random().toString(),
            title: p.title,
            category: p.category,
            image_url: p.imageUrl
        })) || [],
        active_services: services.map(s => ({
            id: (s as any)._id.toString(),
            title: s.title,
            description: s.overview,
            features: s.deliverables,
            price_tokens: s.priceTokens,
            delivery_days: s.deliveryDays,
            rating: 5.0, // Mock for now
            reviews_count: s.reviews.length,
            popular: false
        })),
        reviews: services.flatMap(s => s.reviews.map(r => ({
            id: (r as any)._id?.toString() || Math.random().toString(),
            author: r.authorName,
            text: r.text,
            rating: r.rating,
            date: r.createdAt ? new Date(r.createdAt).toLocaleDateString() : 'Recently'
        })))
    }

    return profile
}

export default async function ProfilePage(props: PageProps) {
    const params = await props.params;
    const profile = await getProfile(params.id)

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
