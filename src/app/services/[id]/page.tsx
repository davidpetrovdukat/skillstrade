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
