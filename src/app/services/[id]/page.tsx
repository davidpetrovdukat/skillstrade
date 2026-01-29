import { notFound } from 'next/navigation';
import { ServiceHeader } from '@/components/service-detail/ServiceHeader';
import { ServiceGallery } from '@/components/service-detail/ServiceGallery';
import { ServiceTabs } from '@/components/service-detail/ServiceTabs';
import { ServicePricingCard } from '@/components/service-detail/ServicePricingCard';
import { ServiceReviews } from '@/components/service-detail/ServiceReviews';
import { AddonsSection } from '@/components/service-detail/AddonsSection';
import { ArrowLeft } from 'lucide-react';
import Link from 'next/link';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { connectMongo } from '@/lib/db';
import { Service } from '@/models/Service';
import { Freelancer } from '@/models/Freelancer';
import { User } from '@/models/User';

export const dynamic = 'force-dynamic';

interface PageProps {
    params: Promise<{
        id: string;
    }>;
}

export default async function ServiceDetailPage(props: PageProps) {
    const params = await props.params;

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
        .lean();

    if (!serviceDoc) {
        notFound();
    }

    // Type coercion for the populated document
    const service = serviceDoc as any;
    const freelancer = service.freelancer;

    // Transform Review Data
    const formattedReviews = (service.reviews || []).map((r: any) => ({
        id: r._id?.toString() || Math.random().toString(),
        user: r.authorName, // Fixed: Component expects 'user', not 'author'
        rating: r.rating,
        text: r.text,
        date: new Date(r.createdAt).toLocaleDateString(),
    }));

    // Transform Addons
    const formattedAddons = (service.addons || []).map((a: any) => ({
        id: a._id?.toString() || Math.random().toString(),
        title: a.title,
        price_tokens: a.priceTokens,
        desc: a.description,
        is_standalone: a.isStandalone
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
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 relative">
                    {/* LEFT COLUMN (Main Content) */}
                    <div className="lg:col-span-8 flex flex-col gap-10">
                        <ServiceGallery
                            images={service.imageUrl ? [service.imageUrl] : ['/window.svg']}
                            title={service.title}
                        />

                        <ServiceHeader
                            title={service.title}
                            freelancer={{
                                name: freelancer.name,
                                avatarUrl: freelancer.avatarUrl,
                                role: freelancer.role,
                                rating: freelancer.rating,
                                reviews_count: freelancer.reviewsCount,
                                verified: freelancer.verified,
                                location: freelancer.location,
                                flag: freelancer.flag,
                            }}
                        />

                        <ServiceTabs
                            overview={service.overview}
                            deliverables={service.deliverables || []}
                            faq={[]} // FAQ not yet in model
                        />

                        <AddonsSection addons={formattedAddons} />

                        <ServiceReviews reviews={formattedReviews} />
                    </div>

                    {/* RIGHT COLUMN (Sticky Buy Box) */}
                    <div className="lg:col-span-4 relative">
                        <ServicePricingCard
                            price_tokens={service.priceTokens}
                            display_price_eur={service.displayPrice || `€${service.priceTokens / 100}`}
                            delivery_days={service.deliveryDays}
                            revisions={2} // Default revisions
                        />
                    </div>
                </div>
            </main>
            <Footer />
        </div>
    );
}
