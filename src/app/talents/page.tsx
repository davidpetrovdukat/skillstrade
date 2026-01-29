import { Header } from '@/components/layout/Header'
import { Footer } from '@/components/layout/Footer'
import { TalentHero } from '@/components/talents/TalentHero'
import { TalentCard } from '@/components/talents/TalentCard'
import { JoinRosterCTA } from '@/components/talents/JoinRosterCTA'
import { connectMongo } from '@/lib/db'
import { Freelancer } from '@/models/Freelancer'

export const dynamic = 'force-dynamic'

async function getFreelancers() {
    await connectMongo()
    const freelancers = await Freelancer.find({}).sort({ rating: -1 }).lean()

    return freelancers.map(f => ({
        id: (f as any)._id.toString(),
        image: f.avatarUrl,
        name: f.name,
        flag: f.flag,
        role: f.role,
        skills: f.skills || [],
        statusColor: f.isAvailable ? 'bg-green-500' : 'bg-red-500'
    }))
}

export default async function TalentsPage() {
    const profiles = await getFreelancers()

    return (
        <div className="flex min-h-screen w-full flex-col border-x border-white/20 max-w-[1440px] mx-auto">
            <Header />
            <main className="flex-1">
                <TalentHero />

                <div className="w-full max-w-[1400px] mx-auto px-6 py-12">
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                        {profiles.map((profile) => (
                            <TalentCard
                                key={profile.id}
                                id={profile.id}
                                image={profile.image}
                                name={profile.name}
                                flag={profile.flag}
                                role={profile.role}
                                skills={profile.skills.slice(0, 3)}
                                statusColor={profile.statusColor}
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
