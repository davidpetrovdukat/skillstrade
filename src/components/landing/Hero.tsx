import Link from 'next/link'
import Image from 'next/image'
import { Star } from 'lucide-react'

export function Hero() {
    return (
        <section className="grid grid-cols-1 lg:grid-cols-2 min-h-[85vh] border-b border-white/20 relative">
            <div className="flex flex-col justify-center p-8 md:p-16 lg:p-20 border-b lg:border-b-0 lg:border-r border-white/20 bg-background z-10">
                <div>
                    <h1 className="text-6xl md:text-8xl font-bold leading-[0.85] tracking-tighter uppercase mb-8 font-heading">
                        Your Vision.<br />
                        <span className="text-primary">Our Skills.</span>
                    </h1>
                    <p className="text-white/60 text-lg md:text-xl font-mono max-w-md mb-12">
                        Access the top 1% of global creative talent. Secure, verified, and ready to deploy on your schedule.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4">
                        <Link href="/services" className="bg-primary text-black px-8 py-4 text-sm font-bold uppercase tracking-widest hover:bg-white transition-colors font-heading text-center">
                            Browse Talent
                        </Link>
                        <button className="bg-transparent border border-white/20 text-white px-8 py-4 text-sm font-bold uppercase tracking-widest hover:bg-white hover:text-black transition-colors font-heading">
                            View Plans
                        </button>
                    </div>
                </div>
            </div>

            <div className="relative flex items-end justify-center bg-[#111] p-8 overflow-hidden">
                <div
                    className="absolute inset-0 opacity-20"
                    style={{
                        backgroundImage: 'radial-gradient(#333 1px, transparent 1px)',
                        backgroundSize: '20px 20px'
                    }}
                />

                <div className="relative w-full h-full max-h-[70vh] bg-neutral-800 rounded-t-[20rem] overflow-hidden border border-white/10 group mt-10">
                    <Image
                        alt="Creative Talent"
                        src="https://lh3.googleusercontent.com/aida-public/AB6AXuDslLZGNsE5vYGAXtUAJQ3aLam41exUEGrBZ2MSn9dwSTXp5BMQNYddpoT1GHN7o53gZVqYgVRMjfqE05E5IozB16GhGnfBeDVTZ6qh2dSFE5C3So3XlhmEziTrgkJVbBTttLLdYpYR0Ij77fY16t3SC-N-ZO6Mj2VGXy9EqnGc6Y52d722Br2EVlGyrBmDUBwG8csIl7X6KQ6XS1jg_fkJ3oKCS5zkd1QQKIkIE2GmrvWZDv6r-DnvFFufrJPV9CiFGzQsEAM_08_P"
                        fill
                        className="object-cover grayscale group-hover:grayscale-0 transition-all duration-700 scale-105 group-hover:scale-110"
                    />

                    <div className="absolute bottom-6 left-1/2 -translate-x-1/2 w-[90%] bg-black/80 backdrop-blur-md border border-white/20 p-4 flex items-center justify-between">
                        <div className="flex items-center gap-3">
                            <div className="size-2 bg-primary animate-pulse rounded-full" />
                            <div>
                                <p className="text-white font-bold text-lg uppercase leading-none font-heading">Elena R.</p>
                                <p className="text-white/40 text-xs font-mono uppercase mt-1">Verified Expert</p>
                            </div>
                        </div>
                        <div className="text-right border-l border-white/10 pl-4">
                            <p className="text-primary font-bold text-lg leading-none font-heading">4.98</p>
                            <div className="flex text-primary text-[10px]">
                                <Star className="w-3 h-3 fill-current" />
                                <Star className="w-3 h-3 fill-current" />
                                <Star className="w-3 h-3 fill-current" />
                                <Star className="w-3 h-3 fill-current" />
                                <Star className="w-3 h-3 fill-current" />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}
