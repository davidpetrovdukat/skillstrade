import Link from 'next/link'
import { Zap, Instagram, Linkedin } from 'lucide-react'

export function Footer() {
    return (
        <footer className="bg-background pt-20 pb-8 px-6 md:px-12 border-t border-white/20">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12 lg:gap-8 mb-20">
                <div className="lg:col-span-1">
                    <div className="flex items-center gap-2 mb-6">
                        <Zap className="text-primary w-8 h-8 fill-current" />
                        <span className="text-2xl font-bold tracking-tighter uppercase font-heading">SKILL-TRADE</span>
                    </div>
                    <p className="text-white/40 text-xs font-mono leading-relaxed max-w-[200px] mb-6">
                        The premier decentralized platform for top-tier creative talent.
                    </p>

                    {/* Company Details */}
                    <div className="text-white/30 text-[10px] font-mono space-y-1">
                        <p className="font-bold text-white/50">RENATASTRADAS MB</p>
                        <p>Reg. no. 307123019</p>
                        <p>VAT no. LT100017846812</p>
                        <p>Šiauliai, Vytauto g. 147-18, LT-76341</p>
                        <a href="mailto:info@skills-trade.com" className="hover:text-primary transition-colors block mt-2">info@skills-trade.com</a>
                        <a href="tel:+370000000" className="hover:text-primary transition-colors block">+370 000000</a>
                    </div>
                </div>

                <div className="lg:col-span-1 lg:pl-8 lg:border-l border-white/10">
                    <h4 className="text-primary text-xs font-bold uppercase tracking-widest mb-6 font-heading">Platform</h4>
                    <ul className="space-y-4">
                        <li><Link className="text-white/60 hover:text-white uppercase text-sm font-bold tracking-wide font-heading" href="/talents">Talent</Link></li>
                        <li><Link className="text-white/60 hover:text-white uppercase text-sm font-bold tracking-wide font-heading" href="/services">Services</Link></li>
                        <li><Link className="text-white/60 hover:text-white uppercase text-sm font-bold tracking-wide font-heading" href="/join">Join the roster</Link></li>
                        <li><Link className="text-white/60 hover:text-white uppercase text-sm font-bold tracking-wide font-heading" href="/post-brief">Post a brief</Link></li>
                        <li><Link className="text-white/60 hover:text-white uppercase text-sm font-bold tracking-wide font-heading" href="/how-it-works">How it works</Link></li>
                    </ul>
                </div>

                <div className="lg:col-span-1 lg:pl-8 lg:border-l border-white/10">
                    <h4 className="text-primary text-xs font-bold uppercase tracking-widest mb-6 font-heading">Company</h4>
                    <ul className="space-y-4">
                        <li><Link className="text-white/60 hover:text-white uppercase text-sm font-bold tracking-wide font-heading" href="/about">About Us</Link></li>
                        <li><Link className="text-white/60 hover:text-white uppercase text-sm font-bold tracking-wide font-heading" href="/careers">Careers</Link></li>
                        <li><Link className="text-white/60 hover:text-white uppercase text-sm font-bold tracking-wide font-heading" href="/contact">Contact Us</Link></li>
                        <li><Link className="text-white/60 hover:text-white uppercase text-sm font-bold tracking-wide font-heading" href="/manifesto">Manifesto</Link></li>
                    </ul>
                </div>

                <div className="lg:col-span-1 lg:pl-8 lg:border-l border-white/10">
                    <h4 className="text-primary text-xs font-bold uppercase tracking-widest mb-6 font-heading">Legal</h4>
                    <ul className="space-y-4">
                        <li><Link className="text-white/60 hover:text-white uppercase text-sm font-bold tracking-wide font-heading" href="/legal/privacy">Privacy</Link></li>
                        <li><Link className="text-white/60 hover:text-white uppercase text-sm font-bold tracking-wide font-heading" href="/legal/terms">Terms</Link></li>
                        <li><Link className="text-white/60 hover:text-white uppercase text-sm font-bold tracking-wide font-heading" href="/legal/cookies">Cookies</Link></li>
                        <li><Link className="text-white/60 hover:text-white uppercase text-sm font-bold tracking-wide font-heading" href="/legal/refund">Refund</Link></li>
                    </ul>
                </div>

                <div className="lg:col-span-1 lg:pl-8 lg:border-l border-white/10">
                    <h4 className="text-primary text-xs font-bold uppercase tracking-widest mb-6 font-heading">Social</h4>
                    <div className="flex gap-4">
                        <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="size-10 border border-white/20 flex items-center justify-center hover:bg-primary hover:text-black hover:border-primary transition-colors">
                            <Instagram className="w-5 h-5" />
                        </a>
                        <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="size-10 border border-white/20 flex items-center justify-center hover:bg-primary hover:text-black hover:border-primary transition-colors">
                            <Linkedin className="w-5 h-5" />
                        </a>
                    </div>
                </div>
            </div>

            <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row justify-between items-center gap-6">
                <div className="flex items-center gap-2">
                    <p className="text-[10px] text-white/30 uppercase tracking-widest font-mono">© 2026 RENATASTRADAS MB | Skills-Trade. All Rights Reserved.</p>
                </div>
                <div className="flex gap-4 items-center opacity-50 grayscale hover:grayscale-0 transition-all">
                    <img src="/pci-dss-logo.svg" alt="PCI DSS" className="h-8 w-auto" />
                    <img src="/visa-logo.svg" alt="Visa" className="h-6 w-auto" />
                    <img src="/mastercard-logo.svg" alt="Mastercard" className="h-6 w-auto" />
                </div>
            </div>
        </footer>
    )
}
