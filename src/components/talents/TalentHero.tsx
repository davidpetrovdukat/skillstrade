export function TalentHero() {
    return (
        <section className="flex flex-col border-b border-white/10 bg-background">
            <div className="max-w-[1400px] w-full mx-auto px-6 py-16 md:py-24">
                <div className="flex flex-col md:flex-row md:items-end justify-between gap-12 md:gap-8">
                    <div className="flex flex-col gap-6 max-w-2xl">
                        <h1 className="text-6xl md:text-8xl font-bold text-white tracking-tighter leading-[0.9] font-heading">
                            THE<br />COLLECTIVE.
                        </h1>
                        <p className="text-white/60 text-lg md:text-xl font-normal max-w-lg leading-relaxed font-mono">
                            A hand-picked roster of the top creative minds in EU & UK. Curated for impact.
                        </p>
                    </div>
                    <div className="flex items-center gap-6 md:gap-8 border-t md:border-t-0 md:border-l border-white/10 pt-6 md:pt-0 md:pl-8">
                        <div className="flex flex-col gap-1">
                            <span className="text-3xl font-bold text-primary font-heading">24</span>
                            <span className="text-xs uppercase tracking-widest text-white/50 font-bold font-mono">Active Talents</span>
                        </div>
                        <div className="w-px h-10 bg-white/10 hidden md:block" />
                        <div className="flex flex-col gap-1">
                            <span className="text-3xl font-bold text-white font-heading">4.98</span>
                            <span className="text-xs uppercase tracking-widest text-white/50 font-bold font-mono">Avg Rating</span>
                        </div>
                        <div className="w-px h-10 bg-white/10 hidden md:block" />
                        <div className="flex flex-col gap-1">
                            <span className="text-3xl font-bold text-white font-heading">100%</span>
                            <span className="text-xs uppercase tracking-widest text-white/50 font-bold font-mono">Verified</span>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}
