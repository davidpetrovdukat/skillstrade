import { Header } from '@/components/layout/Header'
import { Footer } from '@/components/layout/Footer'
import { SignUpForm } from '@/components/auth/SignUpForm'
import { Verified, Lock } from 'lucide-react'

export default function SignUpPage() {
    return (
        <div className="min-h-screen bg-background text-white flex flex-col">
            <Header />
            <main className="flex-1 flex flex-col lg:flex-row min-h-[calc(100vh-140px)]">
                {/* LEFT SIDE: Visual */}
                <div className="hidden lg:flex w-1/2 relative flex-col justify-end bg-black min-h-[600px]">
                    {/* Background Image */}
                    <div className="absolute inset-0 w-full h-full bg-cover bg-center opacity-60 mix-blend-luminosity"
                        style={{ backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuCdzk-SkQhtmKAcBo3bwpQWshwnC_U4vVN7_qK614EuWy9Kll5JlHcS5FYgbgUYqCHb57jS12gAlXkePGwLhiPcl1aVXpVE5mHioJrON0OVn2yjLDmhPDmdjOEvH4Hz5jILrZ_Dnz9DZlrMCy9yWuXp6UwkE8CfiRrfCroW_wcpUBQoUmCiF0CmyGQDMQKpfmM5fdSPB2Vns9icfiLRhvGbsezVddzYHQFWBs4U7e-FYb_QPQNgDZUpp1phkLDD7zBT0G-phRljncF2')" }}>
                    </div>
                    {/* Dark Overlay Gradient */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-black/40"></div>
                    {/* Content */}
                    <div className="relative z-10 p-16 pb-24 max-w-2xl">
                        <span className="inline-block py-1 px-3 border border-primary text-primary text-xs font-bold tracking-widest mb-6 font-mono">
                            EXCLUSIVE NETWORK
                        </span>
                        <h1 className="text-6xl font-bold leading-[0.9] tracking-tighter text-white uppercase font-heading">
                            Join the closed network of <span className="text-primary">top 1%</span> talent.
                        </h1>
                        <div className="mt-8 flex gap-4 text-sm font-medium text-gray-400">
                            <div className="flex items-center gap-2 font-heading tracking-wide uppercase">
                                <Verified className="text-primary w-5 h-5" />
                                <span>Vetted Professionals</span>
                            </div>
                            <div className="flex items-center gap-2 font-heading tracking-wide uppercase">
                                <Lock className="text-primary w-4 h-4" />
                                <span>Invite Only</span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* RIGHT SIDE: Form */}
                <div className="w-full lg:w-1/2 bg-[#121212] flex flex-col items-center justify-center relative px-6 md:px-12 py-10 overflow-y-auto">
                    <div className="w-full max-w-[580px] flex flex-col">
                        {/* Form Header */}
                        <div className="mb-10">
                            <h2 className="text-4xl font-bold tracking-tight text-white mb-3 uppercase font-heading">Create Account</h2>
                            <p className="text-gray-400 text-lg font-light font-sans">Enter your details to verify eligibility.</p>
                        </div>

                        <SignUpForm />
                    </div>

                    {/* Mobile visual cue */}
                    <div className="lg:hidden absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-zinc-800 via-primary to-zinc-800"></div>
                </div>
            </main>
            <Footer />
        </div>
    )
}
