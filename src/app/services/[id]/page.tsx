import { notFound } from 'next/navigation';
import { ServiceDetailClient } from '@/components/service-detail/ServiceDetailClient';
import { ArrowLeft } from 'lucide-react';
import Link from 'next/link';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { connectMongo } from '@/lib/db';
import { Service } from '@/models/Service';
import { Freelancer } from '@/models/Freelancer';
import { User } from '@/models/User';
import { buildCanonicalAvatarMap } from '@/lib/avatar-utils';
import type { Types } from 'mongoose';

export const dynamic = 'force-dynamic';

interface PageProps {
    params: Promise<{
        id: string;
    }>;
}

interface ServiceReviewDoc {
    _id?: Types.ObjectId;
    authorName: string;
    rating: number;
    text: string;
    createdAt?: Date;
}

interface ServiceAddonDoc {
    _id?: Types.ObjectId;
    title: string;
    priceTokens: number;
    description: string;
    isStandalone: boolean;
}

interface PopulatedFreelancer {
    _id: Types.ObjectId;
    name: string;
    avatarUrl?: string;
    role: string;
    rating?: number;
    reviewsCount?: number;
    verified?: boolean;
    location: string;
    flag: string;
}

interface PopulatedServiceDoc {
    _id: Types.ObjectId;
    title: string;
    category: string;
    overview: string;
    deliverables?: string[];
    imageUrl?: string;
    displayPrice?: string;
    deliveryDays: number;
    priceTokens: number;
    freelancer?: PopulatedFreelancer | null;
    reviews?: ServiceReviewDoc[];
    addons?: ServiceAddonDoc[];
}

export default async function ServiceDetailPage(props: PageProps) {
    const params = await props.params;
    const canonicalAvatarByName = buildCanonicalAvatarMap();

    await connectMongo();

    // Check if ID is valid MongoDB ObjectId
    if (!params.id.match(/^[0-9a-fA-F]{24}$/)) {
        return notFound();
    }

    const serviceDoc = await Service.findById(params.id)
        .populate({
            path: 'freelancer',
            model: Freelancer,
            populate: {
                path: 'user',
                model: User,
                select: 'firstName lastName'
            }
        })
        .lean() as PopulatedServiceDoc | null;

    if (!serviceDoc?.freelancer) {
        notFound();
    }

    const service = serviceDoc;
    const freelancerDoc = service.freelancer as PopulatedFreelancer;
    const freelancer = {
        ...freelancerDoc,
        avatarUrl: canonicalAvatarByName.get(freelancerDoc.name) || freelancerDoc.avatarUrl || '/avatars/default.jpg',
        rating: freelancerDoc.rating || 5,
        reviewsCount: freelancerDoc.reviewsCount ?? 0,
        verified: freelancerDoc.verified ?? false,
    };

    // Transform Review Data
    const formattedReviews = (service.reviews || []).map((review, index) => ({
        id: review._id?.toString() || `review-${index}`,
        user: review.authorName,
        rating: review.rating,
        text: review.text,
        date: review.createdAt ? new Date(review.createdAt).toLocaleDateString() : 'Recently',
    }));

    // Transform Addons
    const formattedAddons = (service.addons || []).map((addon, index) => ({
        id: addon._id?.toString() || `addon-${index}`,
        title: addon.title,
        price_tokens: addon.priceTokens,
        desc: addon.description,
        is_standalone: addon.isStandalone
    }));

    return (
        <div className="flex min-h-screen w-full flex-col bg-background text-white font-display overflow-x-hidden border-x border-white/20 max-w-[1440px] mx-auto">
            <Header />
            <main className="flex-1 w-full max-w-[1440px] mx-auto px-6 md:px-10 lg:px-40 py-8">
                {/* Breadcrumbs */}
                <div className="flex flex-wrap gap-2 py-4 mb-4 items-center">
                    <Link
                        href="/services"
                        className="text-white/60 text-sm font-medium hover:text-primary transition-colors flex items-center gap-1"
                    >
                        <ArrowLeft className="w-4 h-4" />
                        Back to Services
                    </Link>
                    <span className="text-white/60 text-sm">/</span>
                    <span className="text-white/60 text-sm font-medium">{service.category}</span>
                    <span className="text-white/60 text-sm">/</span>
                    <span className="text-primary text-sm font-medium truncate max-w-[200px] md:max-w-none">
                        {service.title}
                    </span>
                </div>

                {/* Main Layout */}
                <ServiceDetailClient
                    service={JSON.parse(JSON.stringify(service))}
                    freelancer={JSON.parse(JSON.stringify(freelancer))}
                    formattedReviews={JSON.parse(JSON.stringify(formattedReviews))}
                    formattedAddons={JSON.parse(JSON.stringify(formattedAddons))}
                />
            </main>
            <Footer />
        </div>
    );
}
