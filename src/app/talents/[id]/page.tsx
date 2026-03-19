import { notFound } from 'next/navigation'
import { Header } from '@/components/layout/Header'
import { Footer } from '@/components/layout/Footer'
import { ProfileHero } from '@/components/profile/ProfileHero'
import { ProfileBio } from '@/components/profile/ProfileBio'
import { ServicePackages } from '@/components/profile/ServicePackages'
import { Reviews } from '@/components/profile/Reviews'
import { connectMongo } from '@/lib/db'
import { Freelancer } from '@/models/Freelancer'
import { Service } from '@/models/Service'
import mongoose, { Types } from 'mongoose'
import { getDisplayUsername } from '@/lib/freelancer-usernames'
import { buildCanonicalAvatarMap } from '@/lib/avatar-utils'
import { FEATURE_FLAGS } from '@/lib/feature-flags'

export const dynamic = 'force-dynamic'

interface PageProps {
    params: Promise<{
        id: string
    }>
}

interface PortfolioItem {
    _id?: Types.ObjectId
    title: string
    category: string
    imageUrl: string
}

interface FreelancerProfileDoc {
    _id: Types.ObjectId
    slug?: string
    name: string
    avatarUrl?: string
    location: string
    flag: string
    role: string
    bio: string
    skills?: string[]
    portfolio?: PortfolioItem[]
    isAvailable?: boolean
    verified?: boolean
}

interface ServiceReviewDoc {
    _id?: Types.ObjectId
    authorName: string
    text: string
    rating: number
    createdAt?: Date
}

interface FreelancerServiceDoc {
    _id: Types.ObjectId
    title: string
    overview: string
    deliverables?: string[]
    priceTokens: number
    deliveryDays: number
    reviews: ServiceReviewDoc[]
}

async function getProfile(id: string) {
    await connectMongo()
    const canonicalAvatarByName = buildCanonicalAvatarMap()

    let freelancer: FreelancerProfileDoc | null = null

    // Check if it's a valid ObjectId, if so try to find by ID
    if (mongoose.Types.ObjectId.isValid(id)) {
        freelancer = await Freelancer.findById(id).lean() as FreelancerProfileDoc | null
    }

    // If not found by ID (or if id wasn't a valid ObjectId), try to find by slug
    if (!freelancer) {
        freelancer = await Freelancer.findOne({ slug: id }).lean() as FreelancerProfileDoc | null
    }

    if (!freelancer) return null

    // Fetch active services
    const services = await Service.find({ freelancer: freelancer._id }).lean() as FreelancerServiceDoc[]

    // Transform to match component expectations
    const profile = {
        id: freelancer._id.toString(),
        meta: {
            name: getDisplayUsername(freelancer.name),
            role: freelancer.role,
            location: freelancer.location,
            flag: freelancer.flag,
            timezone: "GMT (London)", // TODO: Store in DB
            avatar_url: canonicalAvatarByName.get(freelancer.name) || freelancer.avatarUrl || '/avatars/default.jpg',
            is_available: freelancer.isAvailable ?? true,
            verified: freelancer.verified ?? false
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
        portfolio: freelancer.portfolio?.map((item, index) => ({
            id: item._id?.toString() || `portfolio-${index}`,
            title: item.title,
            category: item.category,
            image_url: item.imageUrl
        })) || [],
        active_services: services.map(service => ({
            id: service._id.toString(),
            title: service.title,
            description: service.overview,
            features: service.deliverables || [],
            price_tokens: service.priceTokens,
            delivery_days: service.deliveryDays,
            rating: 5.0, // Mock for now
            reviews_count: service.reviews.length,
            popular: false
        })),
        reviews: services.flatMap((service) =>
            service.reviews.map((review, index) => ({
                id: review._id?.toString() || `${service._id.toString()}-review-${index}`,
                author: review.authorName,
                text: review.text,
                rating: review.rating,
                date: review.createdAt ? new Date(review.createdAt).toLocaleDateString() : 'Recently'
            }))
        )
    }

    return profile
}

export default async function ProfilePage(props: PageProps) {
    if (!FEATURE_FLAGS.showTalentsPage) {
        notFound()
    }

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
                {profile.active_services.length > 0 && <ServicePackages services={profile.active_services} />}
                {profile.reviews.length > 0 && <Reviews reviews={profile.reviews} />}
            </main>
            <Footer />
        </div>
    )
}
