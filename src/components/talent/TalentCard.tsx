import Image from 'next/image'

interface TalentCardProps {
  name: string
  avatar: string
  flag: string
  role: string
  tags: string[]
  className?: string
}

export function TalentCard({ name, avatar, flag, role, tags, className = '' }: TalentCardProps) {
  return (
    <article className={`group flex flex-col bg-surface border border-white/10 hover:border-primary transition-colors duration-300 ${className}`}>
      <div className="relative aspect-[3/4] overflow-hidden bg-gray-800">
        <Image 
          src={avatar} 
          alt={name}
          fill
          className="object-cover grayscale group-hover:grayscale-0 transition-all duration-700 ease-in-out"
        />
        {/* Simulating "Online" or "Verified" status with a dot if needed, for now hardcoded like the HTML roughly implied via green/red dots */}
        <div className="absolute top-4 right-4 size-3 bg-green-500 rounded-full border border-black shadow-[0_0_10px_rgba(74,222,128,0.5)] z-10" />
        
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
          {tags.map((tag) => (
            <span key={tag} className="text-[10px] font-bold uppercase tracking-wider text-white/40 border border-white/20 px-2 py-1 font-mono">
              [{tag}]
            </span>
          ))}
        </div>
        
        <button className="mt-4 w-full py-3 border border-white/20 text-xs font-bold uppercase tracking-[0.15em] hover:bg-white hover:text-black hover:border-white transition-all font-heading">
          View Profile
        </button>
      </div>
    </article>
  )
}
