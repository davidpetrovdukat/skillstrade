
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { TrendingUp, Lock, FileText, Quote, ChevronDown } from "lucide-react";
import { JoinForm } from "@/components/join/JoinForm";

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
                            <JoinForm />
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
