import Link from 'next/link'
import Image from 'next/image'

export interface TalentCardProps {
    id: string
    image: string
    name: string
    flag: string
    role: string
    skills: string[]
    statusColor?: string
}

export function TalentCard({ id, image, name, flag, role, skills, statusColor = 'bg-green-500' }: TalentCardProps) {
    return (
        <Link href={`/talents/${id}`} className="block group">
            <article className="flex flex-col bg-surface border border-white/10 hover:border-primary transition-colors duration-300 h-full">
                <div className="relative aspect-[3/4] overflow-hidden bg-gray-800">
                    <div className="w-full h-full relative">
                        <Image
                            src={image}
                            alt={name}
                            fill
                            className="object-cover grayscale group-hover:grayscale-0 transition-all duration-700 ease-in-out"
                        />
                    </div>
                    <div
                        className={`absolute top-4 right-4 size-3 rounded-full border border-black z-10 ${statusColor} ${statusColor === 'bg-green-500' ? 'shadow-[0_0_10px_rgba(74,222,128,0.5)]' : ''}`}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-60" />
                </div>

                <div className="p-6 flex flex-col gap-4 flex-1">
                    <div>
                        <h3 className="text-2xl font-bold uppercase text-white leading-none mb-2 group-hover:text-primary transition-colors font-heading">
                            {name}
                        </h3>
                        <div className="flex items-center gap-2 text-white/40 text-sm font-mono">
                            <span className="text-lg">{flag}</span>
                            <span className="font-medium">{role}</span>
                        </div>
                    </div>

                    <div className="flex flex-wrap gap-2 mt-auto">
                        {skills.map(skill => (
                            <span key={skill} className="text-[10px] font-bold uppercase tracking-wider text-white/40 border border-white/20 px-2 py-1 font-mono">
                                [{skill}]
                            </span>
                        ))}
                    </div>

                    <button className="mt-4 w-full py-3 border border-white/10 text-xs font-bold uppercase tracking-[0.15em] group-hover:bg-white group-hover:text-black group-hover:border-white transition-all font-heading">
                        View Profile
                    </button>
                </div>
            </article>
        </Link>
    )
}
