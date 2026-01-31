'use client';

import { useState } from 'react';
import { ServiceGallery } from '@/components/service-detail/ServiceGallery';
import { ServiceHeader } from '@/components/service-detail/ServiceHeader';
import { ServiceTabs } from '@/components/service-detail/ServiceTabs';
import { ServiceReviews } from '@/components/service-detail/ServiceReviews';
import { AddonsSection } from '@/components/service-detail/AddonsSection';
import { ServicePricingCard } from '@/components/service-detail/ServicePricingCard';
import { Addon } from '@/lib/services-data';

interface ServiceDetailClientProps {
    service: any;
    freelancer: any;
    formattedReviews: any[];
    formattedAddons: Addon[];
}

export function ServiceDetailClient({
    service,
    freelancer,
    formattedReviews,
    formattedAddons
}: ServiceDetailClientProps) {
    const [selectedAddonIds, setSelectedAddonIds] = useState<Set<string>>(new Set());

    const toggleAddon = (addonId: string) => {
        const newSet = new Set(selectedAddonIds);
        if (newSet.has(addonId)) {
            newSet.delete(addonId);
        } else {
            newSet.add(addonId);
        }
        setSelectedAddonIds(newSet);
    };

    // Calculate total price with addons
    const addonsTotal = formattedAddons
        .filter(addon => selectedAddonIds.has(addon.id))
        .reduce((sum, addon) => sum + addon.price_tokens, 0);

    const totalPrice = service.priceTokens + addonsTotal;

    return (
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
                    faq={[]}
                />

                <AddonsSection
                    addons={formattedAddons}
                    selectedAddonIds={selectedAddonIds}
                    onToggleAddon={toggleAddon}
                />

                <ServiceReviews reviews={formattedReviews} />
            </div>

            {/* RIGHT COLUMN (Sticky Buy Box) */}
            <div className="lg:col-span-4 relative">
                <ServicePricingCard
                    serviceId={service._id}
                    price_tokens={totalPrice}
                    display_price_eur={service.displayPrice} // Will be recalculated by component logic anyway
                    delivery_days={service.deliveryDays}
                    revisions={2}
                    selectedAddonIds={selectedAddonIds}
                />
            </div>
        </div>
    );
}
