
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { TrendingUp, Lock, FileText, Quote, ChevronDown } from "lucide-react";

export default function JoinPage() {
    return (
        <div className="flex min-h-screen w-full flex-col bg-background text-white font-display border-x border-white/20 max-w-[1440px] mx-auto">
            <Header />
            <main className="flex-1 w-full flex flex-col items-center">
                <div className="flex flex-col max-w-[1200px] w-full flex-1 px-6 md:px-12 py-12 md:py-20 gap-24">
                    {/* 1. HERO SECTION */}
                    <section className="flex flex-col gap-6 w-full max-w-[800px] pt-10">
                        <div className="flex flex-col gap-4">
                            <h1 className="text-6xl md:text-8xl font-bold leading-[0.9] tracking-tighter uppercase text-white font-heading">
                                Join the <br />
                                <span className="text-white">Top 1%.</span>
                            </h1>
                            <div className="flex flex-wrap items-center gap-4 mt-2">
                                <span className="bg-primary text-black text-sm md:text-base font-bold px-3 py-1 uppercase tracking-wide rounded-none font-heading">
                                    Acceptance Rate: &lt;2%
                                </span>
                            </div>
                        </div>
                        <div className="flex flex-col gap-4 max-w-[600px] mt-4 border-l-2 border-primary pl-6">
                            <h2 className="text-xl md:text-2xl font-normal leading-snug text-white/60 font-mono">
                                Stop chasing clients. We bring the briefs to you. No bidding
                                wars. Just pure craft.
                            </h2>
                        </div>
                    </section>

                    {/* 2. BENEFITS GRID */}
                    <section className="w-full">
                        {/* Brutalist Grid: Using gap-px and background color to create 1px borders */}
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-px bg-white/20 border border-white/20">
                            {/* Card 1 */}
                            <div className="bg-background p-8 md:p-10 flex flex-col gap-6 group hover:bg-white/5 transition-colors duration-300">
                                <TrendingUp className="text-primary w-10 h-10" />
                                <div className="flex flex-col gap-2">
                                    <h3 className="text-2xl font-bold uppercase tracking-tight font-heading">
                                        Higher Rates
                                    </h3>
                                    <p className="text-white/40 text-sm leading-relaxed font-mono">
                                        Access premium clients who value expertise over cheap labor.
                                        Our freelancers earn 3x the market average.
                                    </p>
                                </div>
                            </div>
                            {/* Card 2 */}
                            <div className="bg-background p-8 md:p-10 flex flex-col gap-6 group hover:bg-white/5 transition-colors duration-300">
                                <Lock className="text-primary w-10 h-10" />
                                <div className="flex flex-col gap-2">
                                    <h3 className="text-2xl font-bold uppercase tracking-tight font-heading">
                                        Guaranteed Pay
                                    </h3>
                                    <p className="text-white/40 text-sm leading-relaxed font-mono">
                                        100% upfront deposit into escrow before you start. Payments
                                        are released automatically upon milestone completion.
                                    </p>
                                </div>
                            </div>
                            {/* Card 3 */}
                            <div className="bg-background p-8 md:p-10 flex flex-col gap-6 group hover:bg-white/5 transition-colors duration-300">
                                <FileText className="text-primary w-10 h-10" />
                                <div className="flex flex-col gap-2">
                                    <h3 className="text-2xl font-bold uppercase tracking-tight font-heading">
                                        Zero Admin
                                    </h3>
                                    <p className="text-white/40 text-sm leading-relaxed font-mono">
                                        We handle the contracts, legal, and invoicing. You focus on
                                        the work, we handle the boring business logic.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </section>

                    {/* 3. APPLICATION FORM */}
                    <section className="w-full flex flex-col items-center">
                        <div className="w-full max-w-[600px] flex flex-col gap-10">
                            <div className="text-center mb-4">
                                <h3 className="text-3xl font-bold uppercase tracking-tight font-heading">
                                    Request Access
                                </h3>
                                <p className="text-white/40 mt-2 font-mono">
                                    Submit your profile for manual review.
                                </p>
                            </div>
                            <form className="flex flex-col gap-8 w-full">
                                {/* Full Name */}
                                <label className="flex flex-col w-full gap-2 group">
                                    <span className="text-xs uppercase tracking-widest text-white/40 font-bold group-focus-within:text-primary transition-colors font-heading">
                                        Full Name
                                    </span>
                                    <input
                                        className="w-full bg-transparent border-b border-white/20 px-0 py-3 text-lg text-white placeholder-white/20 focus:outline-none focus:ring-0 focus:border-primary transition-colors rounded-none font-display"
                                        placeholder="e.g. Alex Chen"
                                        type="text"
                                    />
                                </label>
                                {/* Portfolio URL */}
                                <label className="flex flex-col w-full gap-2 group">
                                    <span className="text-xs uppercase tracking-widest text-white/40 font-bold group-focus-within:text-primary transition-colors font-heading">
                                        Portfolio URL
                                    </span>
                                    <input
                                        className="w-full bg-transparent border-b border-white/20 px-0 py-3 text-lg text-white placeholder-white/20 focus:outline-none focus:ring-0 focus:border-primary transition-colors rounded-none font-display"
                                        placeholder="https://your-work.com"
                                        type="url"
                                    />
                                </label>
                                {/* LinkedIn Profile */}
                                <label className="flex flex-col w-full gap-2 group">
                                    <span className="text-xs uppercase tracking-widest text-white/40 font-bold group-focus-within:text-primary transition-colors font-heading">
                                        LinkedIn Profile
                                    </span>
                                    <input
                                        className="w-full bg-transparent border-b border-white/20 px-0 py-3 text-lg text-white placeholder-white/20 focus:outline-none focus:ring-0 focus:border-primary transition-colors rounded-none font-display"
                                        placeholder="https://linkedin.com/in/..."
                                        type="url"
                                    />
                                </label>
                                {/* Primary Skill Dropdown */}
                                <label className="flex flex-col w-full gap-2 group relative">
                                    <span className="text-xs uppercase tracking-widest text-white/40 font-bold group-focus-within:text-primary transition-colors font-heading">
                                        Primary Skill
                                    </span>
                                    <select className="w-full bg-transparent border-b border-white/20 px-0 py-3 text-lg text-white focus:outline-none focus:ring-0 focus:border-primary transition-colors rounded-none appearance-none cursor-pointer font-display [&>option]:bg-black">
                                        <option disabled defaultValue="" value="">
                                            Select your craft
                                        </option>
                                        <option value="ui">UI/UX Design</option>
                                        <option value="dev">Full-Stack Development</option>
                                        <option value="branding">Brand Strategy</option>
                                        <option value="motion">Motion Graphics</option>
                                    </select>
                                    {/* Custom arrow icon */}
                                    <div className="absolute right-0 bottom-4 pointer-events-none text-white/40">
                                        <ChevronDown className="w-5 h-5" />
                                    </div>
                                </label>
                                {/* Why You Textarea */}
                                <label className="flex flex-col w-full gap-2 group">
                                    <span className="text-xs uppercase tracking-widest text-white/40 font-bold group-focus-within:text-primary transition-colors font-heading">
                                        Why You?
                                    </span>
                                    <textarea
                                        className="w-full bg-transparent border-b border-white/20 px-0 py-3 text-lg text-white placeholder-white/20 focus:outline-none focus:ring-0 focus:border-primary transition-colors resize-none rounded-none font-display"
                                        placeholder="Tell us about your most complex project..."
                                        rows={4}
                                    ></textarea>
                                </label>
                                {/* Submit Button */}
                                <button
                                    className="mt-8 w-full bg-primary hover:bg-white text-black font-bold text-lg py-5 px-8 rounded-none uppercase tracking-widest transition-colors duration-200 font-heading"
                                    type="button"
                                >
                                    Apply for Review
                                </button>
                            </form>
                        </div>
                    </section>

                    {/* 4. SOCIAL PROOF */}
                    <section className="w-full py-10 md:py-20 border-t border-white/10">
                        <div className="max-w-[900px] mx-auto text-center flex flex-col gap-6 items-center">
                            <Quote className="text-primary w-12 h-12 opacity-50 fill-current" />
                            <blockquote className="text-3xl md:text-5xl font-light italic leading-tight text-white/90 font-display">
                                "Skill-Trade doubled my income in 3 months. The quality of
                                briefs here is unlike anything on other platforms."
                            </blockquote>
                            <div className="flex items-center justify-center gap-3 mt-4">
                                <div className="h-px w-8 bg-primary"></div>
                                <cite className="not-italic text-sm font-bold uppercase tracking-widest text-white/40 font-heading">
                                    Alex, Senior UI Designer
                                </cite>
                                <div className="h-px w-8 bg-primary"></div>
                            </div>
                        </div>
                    </section>
                </div>
            </main>
            <Footer />
        </div>
    );
}
