
import { SERVICES_DATA } from '@/lib/services-data';
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

interface PageProps {
    params: Promise<{
        id: string;
    }>;
}

export function generateStaticParams() {
    return SERVICES_DATA.map((service) => ({
        id: service.id,
    }));
}

export default async function ServiceDetailPage(props: PageProps) {
    const params = await props.params;
    const service = SERVICES_DATA.find((s) => s.id === params.id);

    if (!service) {
        notFound();
    }

    return (
        <div className="flex min-h-screen w-full flex-col bg-background text-white font-display overflow-x-hidden">
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
                        <ServiceGallery images={service.gallery || []} title={service.title} />

                        <ServiceHeader title={service.title} freelancer={service.freelancer} />

                        <ServiceTabs
                            overview={service.overview || "No overview available."}
                            deliverables={service.deliverables || []}
                            faq={service.faq || []}
                        />

                        <AddonsSection addons={service.addons || []} />

                        <ServiceReviews reviews={service.reviews || []} />
                    </div>

                    {/* RIGHT COLUMN (Sticky Buy Box) */}
                    <div className="lg:col-span-4 relative">
                        <ServicePricingCard
                            price_tokens={service.price_tokens}
                            display_price_eur={service.display_price_eur}
                            delivery_days={service.delivery_days}
                            revisions={service.revisions || 0}
                        />
                    </div>
                </div>
            </main>
            <Footer />
        </div>
    );
}
