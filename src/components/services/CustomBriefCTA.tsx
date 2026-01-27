export function CustomBriefCTA() {
    return (
        <div className="md:col-span-2 relative overflow-hidden rounded-none border border-white/10 bg-[#1A1A1A] flex flex-col md:flex-row items-center justify-between p-8 md:px-12 gap-6 group">
            {/* Animated Shine Effect */}
            <div className="absolute inset-0 bg-[linear-gradient(45deg,transparent_25%,rgba(255,255,255,0.02)_50%,transparent_75%,transparent_100%)] bg-[length:250%_250%] animate-[shine_3s_infinite] pointer-events-none" />

            <div className="relative z-10 flex flex-col gap-2 md:w-2/3">
                <h3 className="text-3xl font-black uppercase italic text-white font-heading">Can't find what you need?</h3>
                <p className="text-white/60 text-lg font-mono">
                    Post a custom brief and let our vetted talent come to you with tailored proposals.
                </p>
            </div>

            <button className="relative z-10 whitespace-nowrap bg-white text-black hover:bg-primary px-8 py-4 text-sm font-black uppercase tracking-widest transition-colors rounded-none shadow-[4px_4px_0px_0px_rgba(212,255,0,0.3)] hover:shadow-[4px_4px_0px_0px_rgba(212,255,0,1)] hover:-translate-x-[2px] hover:-translate-y-[2px] font-heading">
                Post Custom Brief
            </button>
        </div>
    )
}
