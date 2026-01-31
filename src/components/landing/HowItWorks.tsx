export function HowItWorks() {
    return (
        // Note: bg-[#f3f4f6] is roughly standard tailwind gray-100, checking globals it might be simpler to use hardcoded or theme. 
        // Plan said bg-background-light which is f3f4f6.
        <section className="bg-[#f3f4f6] text-black border-b border-black/10 py-24 px-6 md:px-16">
            <h2 className="text-xs font-bold text-black/50 mb-16 uppercase tracking-[0.2em] font-mono">How it works</h2>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-12 relative">
                <div className="hidden md:block absolute top-[28px] left-0 w-full h-px bg-black/20 z-0" />

                <div className="flex flex-col border-l md:border-l-0 border-black/20 pl-8 md:pl-0 relative z-10">
                    <div className="md:w-14 md:h-14 w-10 h-10 flex items-center justify-center bg-[#f3f4f6] border md:border-black/20 mb-8 z-10">
                        <span className="text-xl font-bold font-heading invisible md:visible">01</span>
                    </div>
                    <h3 className="text-3xl font-bold uppercase mb-4 font-heading">Select</h3>
                    <p className="text-black/60 max-w-xs leading-relaxed font-mono text-sm">
                        Browse curated portfolios. Filter by skill, rate, and niche. Choose the verified expert that matches your vision.
                    </p>
                </div>

                <div className="flex flex-col border-l md:border-l-0 border-black/20 pl-8 md:pl-0 relative z-10">
                    <div className="md:w-14 md:h-14 w-10 h-10 flex items-center justify-center bg-primary border md:border-black/20 mb-8 z-10">
                        <span className="text-xl font-bold font-heading invisible md:visible text-black">02</span>
                    </div>
                    <h3 className="text-3xl font-bold uppercase mb-4 font-heading">BRIEF & DEPOSIT</h3>
                    <p className="text-black/60 max-w-xs leading-relaxed font-mono text-sm">
                        Describe your project goals. Secure the funds in escrow using tokens. Work begins only when you say go.
                    </p>
                </div>

                <div className="flex flex-col border-l md:border-l-0 border-black/20 pl-8 md:pl-0 relative z-10">
                    <div className="md:w-14 md:h-14 w-10 h-10 flex items-center justify-center bg-black border md:border-black/20 mb-8 z-10">
                        <span className="text-xl font-bold font-heading invisible md:visible text-white">03</span>
                    </div>
                    <h3 className="text-3xl font-bold uppercase mb-4 font-heading">Receive</h3>
                    <p className="text-black/60 max-w-xs leading-relaxed font-mono text-sm">
                        Review the final output. Request revisions if needed. You own 100% of the IP instantly.
                    </p>
                </div>
            </div>
        </section>
    )
}
