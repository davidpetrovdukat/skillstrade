'use client';

import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { Mail, MapPin, Building2, Smartphone, Send, ArrowRight } from 'lucide-react';

export default function ContactPage() {
    return (
        <div className="flex min-h-screen w-full flex-col bg-background text-white selection:bg-primary selection:text-black font-heading">
            <Header />

            <main className="flex-1 w-full max-w-[1440px] mx-auto flex flex-col">
                {/* Hero / Header Section */}
                <section className="px-6 md:px-12 py-20 border-b border-white/10">
                    <h1 className="text-5xl md:text-7xl font-bold uppercase tracking-tighter mb-6 text-primary">
                        Contact Us
                    </h1>
                    <p className="text-xl md:text-2xl font-light text-white/60 max-w-2xl font-sans">
                        Have a question or need support? We are here to help you build the future of work.
                    </p>
                </section>

                <div className="grid grid-cols-1 lg:grid-cols-2 flex-1">
                    {/* Left Column: Contact Details */}
                    <div className="p-6 md:p-12 border-b lg:border-b-0 lg:border-r border-white/10 flex flex-col gap-12">

                        {/* Company Info */}
                        <div className="flex flex-col gap-8">
                            <div>
                                <h3 className="text-sm font-bold uppercase tracking-widest text-primary mb-6 flex items-center gap-2">
                                    <Building2 className="w-4 h-4" /> Company Details
                                </h3>
                                <div className="space-y-4 font-mono text-sm text-white/80">
                                    <div className="p-4 border border-white/10 bg-white/5">
                                        <p className="text-white/40 text-xs uppercase mb-1">Registered Name</p>
                                        <p className="font-bold text-lg text-white">RENATASTRADAS MB</p>
                                    </div>
                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                        <div className="p-4 border border-white/10 bg-white/5">
                                            <p className="text-white/40 text-xs uppercase mb-1">Reg. No</p>
                                            <p className="font-bold text-lg text-white">307123019</p>
                                        </div>
                                        <div className="p-4 border border-white/10 bg-white/5">
                                            <p className="text-white/40 text-xs uppercase mb-1">VAT No</p>
                                            <p className="font-bold text-lg text-white">LT100017846812</p>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div>
                                <h3 className="text-sm font-bold uppercase tracking-widest text-primary mb-6 flex items-center gap-2">
                                    <MapPin className="w-4 h-4" /> Location
                                </h3>
                                <div className="p-6 border border-white/10 bg-white/5 flex flex-col gap-2">
                                    <p className="text-xl font-bold">Šiauliai</p>
                                    <p className="text-white/60 font-mono">Vytauto g. 147-18, LT-76341<br />Lithuania</p>
                                </div>
                            </div>

                            <div>
                                <h3 className="text-sm font-bold uppercase tracking-widest text-primary mb-6 flex items-center gap-2">
                                    <Mail className="w-4 h-4" /> Support
                                </h3>
                                <a href="mailto:info@skills-trade.com" className="group flex items-center gap-4 p-6 border border-white/10 bg-white/5 hover:bg-primary hover:border-primary transition-all duration-300">
                                    <div className="size-10 bg-white/10 rounded-full flex items-center justify-center group-hover:bg-black/10 transition-colors">
                                        <Mail className="w-5 h-5 group-hover:text-black" />
                                    </div>
                                    <div className="flex flex-col">
                                        <span className="text-xs uppercase text-white/40 group-hover:text-black/60 font-bold">Email Us</span>
                                        <span className="text-xl font-bold group-hover:text-black">info@skills-trade.com</span>
                                    </div>
                                    <ArrowRight className="ml-auto w-5 h-5 group-hover:text-black transform group-hover:translate-x-1 transition-transform" />
                                </a>
                            </div>

                            {/* Mock Phone - Keeping as placeholder per instructions */}
                            <div>
                                <h3 className="text-sm font-bold uppercase tracking-widest text-primary mb-6 flex items-center gap-2">
                                    <Smartphone className="w-4 h-4" /> Phone
                                </h3>
                                <div className="p-4 border border-white/10 bg-white/5 opacity-50 cursor-not-allowed">
                                    <p className="font-mono text-white/40">+370 (6XX) XXXXX <span className="text-xs ml-2 border border-white/20 px-1">COMING SOON</span></p>
                                </div>
                            </div>
                        </div>

                    </div>

                    {/* Right Column: Contact Form & Map */}
                    <div className="flex flex-col">
                        {/* Map Integration */}
                        <div className="h-[300px] w-full border-b border-white/10 grayscale contrast-125 invert-[.9]">
                            {/* Google Maps Embed using exact address */}
                            <iframe
                                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2236.467869680373!2d23.3136873!3d55.9341499!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x46e5e297871b6f0f%3A0x640b3c2d4a5d8b2d!2sVytauto%20g.%20147%2C%2076341%20%C5%A0iauliai%2C%20Lithuania!5e0!3m2!1sen!2sus!4v1700000000000!5m2!1sen!2sus"
                                width="100%"
                                height="100%"
                                style={{ border: 0 }}
                                allowFullScreen={false}
                                loading="lazy"
                                referrerPolicy="no-referrer-when-downgrade"
                            ></iframe>
                        </div>

                        {/* Contact Form */}
                        <div className="p-6 md:p-12 flex-1 flex flex-col justify-center bg-surface">
                            <h3 className="text-2xl font-bold uppercase tracking-tight mb-8">Send a Message</h3>

                            <form className="flex flex-col gap-6" onSubmit={(e) => e.preventDefault()}>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div className="flex flex-col gap-2">
                                        <label className="text-xs font-bold uppercase tracking-widest text-white/60">Name</label>
                                        <input type="text" className="bg-transparent border-b border-white/20 py-3 text-lg focus:outline-none focus:border-primary transition-colors placeholder:text-white/20" placeholder="John Doe" />
                                    </div>
                                    <div className="flex flex-col gap-2">
                                        <label className="text-xs font-bold uppercase tracking-widest text-white/60">Email</label>
                                        <input type="email" className="bg-transparent border-b border-white/20 py-3 text-lg focus:outline-none focus:border-primary transition-colors placeholder:text-white/20" placeholder="john@example.com" />
                                    </div>
                                </div>

                                <div className="flex flex-col gap-2">
                                    <label className="text-xs font-bold uppercase tracking-widest text-white/60">Subject</label>
                                    <select className="bg-transparent border-b border-white/20 py-3 text-lg focus:outline-none focus:border-primary transition-colors text-white [&>option]:bg-black">
                                        <option>General Support</option>
                                        <option>Billing Inquiry</option>
                                        <option>Partnership</option>
                                        <option>Legal</option>
                                    </select>
                                </div>

                                <div className="flex flex-col gap-2">
                                    <label className="text-xs font-bold uppercase tracking-widest text-white/60">Message</label>
                                    <textarea rows={4} className="bg-transparent border-b border-white/20 py-3 text-lg focus:outline-none focus:border-primary transition-colors resize-none placeholder:text-white/20" placeholder="How can we help you?"></textarea>
                                </div>

                                <button className="mt-4 bg-primary text-black font-bold uppercase tracking-widest py-4 px-8 hover:bg-white transition-colors flex items-center justify-center gap-2">
                                    Send Message <Send className="w-4 h-4" />
                                </button>
                            </form>
                        </div>
                    </div>
                </div>

                <Footer />
            </main>
        </div>
    );
}
