import { Header } from '@/components/layout/Header'
import { Footer } from '@/components/layout/Footer'
import { ServiceHero } from '@/components/services/ServiceHero'
import { ServiceFilters } from '@/components/services/ServiceFilters'
import { ServiceCard } from '@/components/services/ServiceCard'
import { CustomBriefCTA } from '@/components/services/CustomBriefCTA'
import { Verified, Lock, Copyright } from 'lucide-react'
import { connectMongo } from '@/lib/db'
import { Service } from '@/models/Service'
import { Freelancer } from '@/models/Freelancer'

export const dynamic = 'force-dynamic'; // Force dynamic rendering for searchParams access

interface PageProps {
    searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}

export default async function ServicesPage(props: PageProps) {
    const searchParams = await props.searchParams;
    const search = typeof searchParams.search === 'string' ? searchParams.search : null
    const category = typeof searchParams.category === 'string' ? searchParams.category : null
    const sort = typeof searchParams.sort === 'string' ? searchParams.sort : null
    const view = typeof searchParams.view === 'string' ? searchParams.view : 'grid'

    await connectMongo()

    // 1. Build Query
    const query: any = {}

    if (search) {
        const searchRegex = { $regex: search, $options: 'i' }
        query.$or = [
            { title: searchRegex },
            { tags: searchRegex },
            { category: searchRegex },
            { overview: searchRegex }
        ]
    }

    if (category && category !== 'All') {
        // Case insensitive match for category
        query.category = { $regex: new RegExp(`^${category}$`, 'i') }
    }

    // 2. Sort
    let sortOption: any = { createdAt: -1 } // Default: Newest
    if (sort === 'price-asc') sortOption = { priceTokens: 1 }
    if (sort === 'price-desc') sortOption = { priceTokens: -1 }

    // 3. Fetch & Populate
    // Check if models are registered to avoid Next.js hot reload issues in dev (optional but safer)
    // defined in imports

    const servicesDocs = await Service.find(query)
        .sort(sortOption)
        .populate({
            path: 'freelancer',
            model: Freelancer,
            select: 'name avatarUrl rating slug verified flag'
        })
        .lean()

    // 4. Transform to Component Props
    const services = servicesDocs.map((doc: any) => {
        // Calculate average rating from embedded reviews
        let rating = 0;
        if (doc.reviews && doc.reviews.length > 0) {
            const sum = doc.reviews.reduce((acc: number, r: any) => acc + r.rating, 0);
            rating = sum / doc.reviews.length;
        } else {
            // Fallback to freelancer rating or default
            rating = doc.freelancer?.rating || 5.0;
        }

        return {
            id: doc._id.toString(),
            title: doc.title,
            imageUrl: doc.imageUrl || '/window.svg',
            delivery_days: doc.deliveryDays,
            price_tokens: doc.priceTokens,
            rating: rating,
            category: doc.category,
            tags: doc.tags || [],
            freelancer: {
                id: doc.freelancer?._id?.toString(),
                name: doc.freelancer?.name || "Unknown",
                avatarUrl: doc.freelancer?.avatarUrl,
                slug: doc.freelancer?.slug || "#",
                verified: doc.freelancer?.verified ?? false,
                rating: doc.freelancer?.rating || 5.0,
            }
        }
    })

    const gridClasses = view === 'list'
        ? 'grid grid-cols-1 gap-6 max-w-4xl mx-auto'
        : 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'

    return (
        <div className="flex min-h-screen w-full flex-col border-x border-white/20 max-w-[1440px] mx-auto">
            <Header />
            <main className="flex-1">
                <ServiceHero />
                <ServiceFilters />

                <div className="w-full max-w-[1400px] mx-auto px-6 py-8">
                    {services.length === 0 ? (
                        <div className="text-center py-20">
                            <h3 className="text-2xl font-bold text-white mb-2 font-heading uppercase">No services found</h3>
                            <p className="text-white/50 font-mono">Try adjusting your filters or search terms.</p>
                        </div>
                    ) : (
                        <div className={gridClasses}>
                            {/* First 3 items */}
                            {services.slice(0, 3).map((service) => (
                                <ServiceCard
                                    key={service.id}
                                    id={service.id}
                                    imageUrl={service.imageUrl}
                                    deliveryDays={service.delivery_days}
                                    title={service.title}
                                    price={service.price_tokens}
                                    freelancer={{
                                        name: service.freelancer.name,
                                        slug: service.freelancer.slug,
                                        avatarUrl: service.freelancer.avatarUrl,
                                        verified: service.freelancer.verified,
                                        rating: service.rating
                                    }}
                                />
                            ))}

                            {/* CTA Banner logic */}
                            <div className={view === 'list' ? 'col-span-1' : 'col-span-1 md:col-span-2 lg:col-span-3'}>
                                <CustomBriefCTA />
                            </div>

                            {/* Remaining items */}
                            {services.slice(3).map((service) => (
                                <ServiceCard
                                    key={service.id}
                                    id={service.id}
                                    imageUrl={service.imageUrl}
                                    deliveryDays={service.delivery_days}
                                    title={service.title}
                                    price={service.price_tokens}
                                    freelancer={{
                                        name: service.freelancer.name,
                                        slug: service.freelancer.slug,
                                        avatarUrl: service.freelancer.avatarUrl,
                                        verified: service.freelancer.verified,
                                        rating: service.rating
                                    }}
                                />
                            ))}
                        </div>
                    )}

                    <section className="mt-24 mb-12 border-t border-white/10 pt-12">
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-0">
                            <div className="md:px-8 md:border-r border-white/10 flex flex-col gap-3">
                                <Verified className="text-primary w-10 h-10 mb-2" />
                                <h4 className="text-xl font-bold uppercase text-white font-heading">Vetted Scope</h4>
                                <p className="text-white/40 text-sm leading-relaxed font-mono">
                                    Every service package is pre-vetted by Skill-Trade moderators to ensure deliverable clarity and fair pricing before it goes live.
                                </p>
                            </div>
                            <div className="md:px-8 md:border-r border-white/10 flex flex-col gap-3">
                                <Lock className="text-primary w-10 h-10 mb-2" />
                                <h4 className="text-xl font-bold uppercase text-white font-heading">Protected Funds</h4>
                                <p className="text-white/40 text-sm leading-relaxed font-mono">
                                    Your Tokens are held in smart-contract escrow and only released to the freelancer once you approve the final delivery.
                                </p>
                            </div>
                            <div className="md:px-8 flex flex-col gap-3">
                                <Copyright className="text-primary w-10 h-10 mb-2" />
                                <h4 className="text-xl font-bold uppercase text-white font-heading">IP Transfer</h4>
                                <p className="text-white/40 text-sm leading-relaxed font-mono">
                                    Automatic intellectual property rights transfer upon payment completion. You own 100% of the work delivered.
                                </p>
                            </div>
                        </div>
                    </section>
                </div>
            </main>
            <Footer />
        </div>
    )
}
