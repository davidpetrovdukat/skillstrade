
import { Header } from '@/components/layout/Header'
import { Footer } from '@/components/layout/Footer'
import { ServiceHero } from '@/components/services/ServiceHero'
import { ServiceFilters } from '@/components/services/ServiceFilters'
import { ServiceCard } from '@/components/services/ServiceCard'
import { CustomBriefCTA } from '@/components/services/CustomBriefCTA'
import { Verified, Lock, Copyright } from 'lucide-react'
import { SERVICES_DATA } from '@/lib/services-data'

export const dynamic = 'force-dynamic'; // Force dynamic rendering for searchParams access

interface PageProps {
    searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}

export default async function ServicesPage(props: PageProps) {
    const searchParams = await props.searchParams;
    const search = typeof searchParams.search === 'string' ? searchParams.search.toLowerCase() : null
    const category = typeof searchParams.category === 'string' ? searchParams.category : null
    const sort = typeof searchParams.sort === 'string' ? searchParams.sort : null
    const view = typeof searchParams.view === 'string' ? searchParams.view : 'grid'

    let services = [...SERVICES_DATA]

    // 1. Filter by Search (Title or Tags)
    if (search) {
        services = services.filter(service =>
            service.title.toLowerCase().includes(search) ||
            (service.tags && service.tags.some(tag => tag.toLowerCase().includes(search))) ||
            (service.category && service.category.toLowerCase().includes(search)) // Also match category names in search
        )
    }

    // 2. Filter by Category
    if (category) {
        services = services.filter(service => service.category === category)
    }

    // 3. Sort
    if (sort === 'price-asc') {
        services.sort((a, b) => a.price_tokens - b.price_tokens)
    } else if (sort === 'price-desc') {
        services.sort((a, b) => b.price_tokens - a.price_tokens)
    }

    // Determine grid columns based on view mode
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
                            {services.slice(0, 3).map((service) => (
                                <ServiceCard
                                    key={service.id}
                                    id={service.id}
                                    imageUrl={service.imageUrl}
                                    deliveryDays={service.delivery_days}
                                    title={service.title}
                                    price={service.price_tokens}
                                    freelancer={{
                                        ...service.freelancer,
                                        rating: service.rating // Use specific service rating
                                    }}
                                />
                            ))}

                            {/* Only show CTA if in grid mode and not searching, OR just place it intelligently? 
                                For simplicity, in list mode we might want to move it or hide it, or just let it be a tile.
                                In list mode, it will just take up full width which is fine.
                            */}
                            <div className={view === 'list' ? 'col-span-1' : 'col-span-1 md:col-span-2 lg:col-span-3'}>
                                <CustomBriefCTA />
                            </div>

                            {services.slice(3).map((service) => (
                                <ServiceCard
                                    key={service.id}
                                    id={service.id}
                                    imageUrl={service.imageUrl}
                                    deliveryDays={service.delivery_days}
                                    title={service.title}
                                    price={service.price_tokens}
                                    freelancer={{
                                        ...service.freelancer,
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
