import { Header } from '@/components/layout/Header'
import { Footer } from '@/components/layout/Footer'
import { TalentHero } from '@/components/talents/TalentHero'
import { TalentCard } from '@/components/talents/TalentCard'
import { JoinRosterCTA } from '@/components/talents/JoinRosterCTA'

import { PROFILES } from '@/lib/data'

export default function TalentsPage() {
    return (
        <div className="flex min-h-screen w-full flex-col border-x border-white/20 max-w-[1440px] mx-auto">
            <Header />
            <main className="flex-1">
                <TalentHero />

                <div className="w-full max-w-[1400px] mx-auto px-6 py-12">
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                        {PROFILES.map((profile) => (
                            <TalentCard
                                key={profile.id}
                                id={profile.id}
                                image={profile.meta.avatar_url}
                                name={profile.meta.name}
                                flag={profile.meta.flag}
                                role={profile.meta.role}
                                skills={profile.bio.skills.slice(0, 3)} // Limit tags for card
                                statusColor={profile.meta.is_available ? 'bg-green-500' : 'bg-red-500'}
                            />
                        ))}
                    </div>
                </div>

                <JoinRosterCTA />
            </main>
            <Footer />
        </div>
    )
}
