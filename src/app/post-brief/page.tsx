'use client';

import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { ChevronDown, Upload, ArrowRight, CheckCircle, X, Loader2 } from 'lucide-react';
import { useState, useRef, useMemo } from 'react';
import { useCurrencyStore, CURRENCY_SYMBOLS } from '@/store/useCurrencyStore';
import { RAW_SERVICES_DATA } from '@/lib/services-data';
import { sendBrief } from '@/actions/brief';

export default function PostBriefPage() {
    const { currency } = useCurrencyStore();
    const symbol = CURRENCY_SYMBOLS[currency];
    const [showToast, setShowToast] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [file, setFile] = useState<File | null>(null);
    const [category, setCategory] = useState('Design & Creative');
    const [otherCategory, setOtherCategory] = useState('');
    const fileInputRef = useRef<HTMLInputElement>(null);

    // Dynamic Budget Ranges based on currency
    // Using approx exchange rates for display logic: 1 EUR = 1.1 USD = 0.85 GBP
    const budgetRanges = useMemo(() => {
        const ranges = {
            EUR: [
                { value: 'tier1', label: '< €1,000' },
                { value: 'tier2', label: '€1k - €5k' },
                { value: 'tier3', label: '€5k - €10k' },
                { value: 'tier4', label: '€10k+' }
            ],
            USD: [
                { value: 'tier1', label: '< $1,100' },
                { value: 'tier2', label: '$1.1k - $5.5k' },
                { value: 'tier3', label: '$5.5k - $11k' },
                { value: 'tier4', label: '$11k+' }
            ],
            GBP: [
                { value: 'tier1', label: '< £850' },
                { value: 'tier2', label: '£850 - £4.2k' },
                { value: 'tier3', label: '£4.2k - £8.5k' },
                { value: 'tier4', label: '£8.5k+' }
            ]
        };
        return ranges[currency] || ranges.EUR;
    }, [currency]);

    // Extract Categories from Data
    const validCategories = useMemo(() => {
        const cats = new Set<string>();
        // Add defaults first
        cats.add("Design & Creative");
        cats.add("Development");
        cats.add("Marketing");
        // Add from data
        // Note: The RAW_SERVICES_DATA doesn't have a direct 'category' field on the top level in the snippet shown,
        // but implementation_plan mentions adding it.
        // Assuming we might want to hardcode the main ones or try to infer.
        // For robustness, I'll stick to a solid predefined list + Other, as extracting from unstructured titles is flaky.
        return ["Design & Creative", "Development", "Marketing", "Writing", "Video & Animation", "Business", "Other"];
    }, []);

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            setFile(e.target.files[0]);
        }
    };

    const handleDrop = (e: React.DragEvent) => {
        e.preventDefault();
        if (e.dataTransfer.files && e.dataTransfer.files[0]) {
            setFile(e.dataTransfer.files[0]);
        }
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setIsSubmitting(true);

        const formData = new FormData(e.currentTarget);
        formData.append('currency', currency);
        if (file) {
            formData.append('attachment', file);
        }

        const result = await sendBrief(formData);

        setIsSubmitting(false);
        if (result.success) {
            setShowToast(true);
            setFile(null); // Reset file
            (e.target as HTMLFormElement).reset(); // Reset form
            setCategory('Design & Creative');
            setOtherCategory('');
            setTimeout(() => setShowToast(false), 5000);
        } else {
            alert('Error sending brief: ' + result.error);
        }
    };

    return (
        <div className="flex min-h-screen w-full flex-col border-x border-white/20 max-w-[1440px] mx-auto bg-background-dark font-display text-white selection:bg-primary selection:text-background-dark">
            <Header />

            <main className="flex-grow flex flex-col items-center justify-center px-4 py-16 md:py-24 relative overflow-hidden">
                {/* Background Decor */}
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[600px] bg-primary/5 rounded-full blur-[120px] pointer-events-none -z-10" />

                <div className="w-full max-w-[800px] relative z-10 flex flex-col gap-10">
                    {/* Header Section */}
                    <div className="text-center space-y-4">
                        <h1 className="text-5xl md:text-7xl font-bold text-white uppercase tracking-tighter leading-[0.9] font-heading">
                            Custom Brief.
                        </h1>
                        <p className="text-[#b5b79e] text-lg font-normal max-w-md mx-auto font-mono">
                            Find the perfect expert. Quotes sent within 24h.
                        </p>
                    </div>

                    {/* Form Card */}
                    <div className="backdrop-blur-xl bg-[#1f2111]/60 border border-white/10 p-8 md:p-12 w-full shadow-2xl relative">
                        {/* Decorative corner accents */}
                        <div className="absolute top-0 left-0 w-3 h-3 border-t border-l border-primary" />
                        <div className="absolute top-0 right-0 w-3 h-3 border-t border-r border-primary" />
                        <div className="absolute bottom-0 left-0 w-3 h-3 border-b border-l border-primary" />
                        <div className="absolute bottom-0 right-0 w-3 h-3 border-b border-r border-primary" />

                        <form className="flex flex-col gap-8" onSubmit={handleSubmit}>
                            {/* Project Title */}
                            <div className="group">
                                <label className="block text-xs uppercase tracking-widest text-[#b5b79e] mb-2 font-bold font-mono">
                                    Project Title
                                </label>
                                <input
                                    name="title"
                                    required
                                    className="w-full bg-transparent border-0 border-b border-white/20 px-0 py-3 text-2xl font-medium text-white placeholder:text-white/20 focus:border-primary focus:ring-0 transition-colors rounded-none outline-none font-heading"
                                    placeholder="e.g. Fintech App Redesign"
                                    type="text"
                                />
                            </div>

                            {/* Contact Details */}
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="group">
                                    <label className="block text-xs uppercase tracking-widest text-[#b5b79e] mb-2 font-bold font-mono">
                                        Name
                                    </label>
                                    <input
                                        name="name"
                                        required
                                        className="w-full bg-transparent border-0 border-b border-white/20 px-0 py-3 text-lg font-medium text-white placeholder:text-white/20 focus:border-primary focus:ring-0 transition-colors rounded-none outline-none font-heading"
                                        placeholder="John"
                                        type="text"
                                    />
                                </div>
                                <div className="group">
                                    <label className="block text-xs uppercase tracking-widest text-[#b5b79e] mb-2 font-bold font-mono">
                                        Surname
                                    </label>
                                    <input
                                        name="surname"
                                        required
                                        className="w-full bg-transparent border-0 border-b border-white/20 px-0 py-3 text-lg font-medium text-white placeholder:text-white/20 focus:border-primary focus:ring-0 transition-colors rounded-none outline-none font-heading"
                                        placeholder="Doe"
                                        type="text"
                                    />
                                </div>
                            </div>

                            <div className="group">
                                <label className="block text-xs uppercase tracking-widest text-[#b5b79e] mb-2 font-bold font-mono">
                                    Email
                                </label>
                                <input
                                    name="email"
                                    required
                                    className="w-full bg-transparent border-0 border-b border-white/20 px-0 py-3 text-lg font-medium text-white placeholder:text-white/20 focus:border-primary focus:ring-0 transition-colors rounded-none outline-none font-heading"
                                    placeholder="john@example.com"
                                    type="email"
                                />
                            </div>

                            {/* Grid for Category, Budget, Deadline */}
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                {/* Category */}
                                <div className="md:col-span-1">
                                    <label className="block text-xs uppercase tracking-widest text-[#b5b79e] mb-2 font-bold font-mono">
                                        Category
                                    </label>
                                    <div className="relative">
                                        <select
                                            name="category"
                                            value={category}
                                            onChange={(e) => setCategory(e.target.value)}
                                            className="w-full bg-[#2a2b20] text-white border border-transparent rounded-none px-4 py-3 appearance-none focus:border-primary focus:ring-0 cursor-pointer hover:bg-[#323326] transition-colors font-mono outline-none"
                                        >
                                            {validCategories.map(cat => (
                                                <option key={cat} value={cat}>{cat}</option>
                                            ))}
                                        </select>
                                        <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-primary w-5 h-5" />
                                    </div>
                                    {category === 'Other' && (
                                        <div className="mt-2 animate-in slide-in-from-top-2 fade-in">
                                            <input
                                                name="otherCategory"
                                                value={otherCategory}
                                                onChange={(e) => setOtherCategory(e.target.value)}
                                                className="w-full bg-transparent border-0 border-b border-white/20 px-0 py-2 text-sm text-white placeholder:text-white/20 focus:border-primary focus:ring-0 transition-colors rounded-none outline-none font-mono"
                                                placeholder="Specify category..."
                                                required
                                            />
                                        </div>
                                    )}
                                </div>

                                {/* Budget */}
                                <div className="md:col-span-1">
                                    <label className="block text-xs uppercase tracking-widest text-[#b5b79e] mb-2 font-bold font-mono">
                                        Budget Range
                                    </label>
                                    <div className="relative">
                                        <select name="budget" className="w-full bg-[#2a2b20] text-white border border-transparent rounded-none px-4 py-3 appearance-none focus:border-primary focus:ring-0 cursor-pointer hover:bg-[#323326] transition-colors font-mono outline-none">
                                            {budgetRanges.map(range => (
                                                <option key={range.value} value={range.label}>{range.label}</option>
                                            ))}
                                        </select>
                                        <span className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-primary font-bold">{symbol}</span>
                                    </div>
                                </div>

                                {/* Deadline */}
                                <div className="md:col-span-1">
                                    <label className="block text-xs uppercase tracking-widest text-[#b5b79e] mb-2 font-bold font-mono">
                                        Deadline
                                    </label>
                                    <input
                                        name="deadline"
                                        className="w-full bg-[#2a2b20] text-white border border-transparent rounded-none px-4 py-3 focus:border-primary focus:ring-0 cursor-pointer hover:bg-[#323326] transition-colors h-[48px] font-mono outline-none dark:[color-scheme:dark]"
                                        type="date"
                                    />
                                </div>
                            </div>

                            {/* Description */}
                            <div>
                                <label className="block text-xs uppercase tracking-widest text-[#b5b79e] mb-2 font-bold font-mono">
                                    Description
                                </label>
                                <textarea
                                    name="description"
                                    required
                                    className="w-full bg-[#2a2b20] text-white border border-transparent rounded-none p-4 min-h-[160px] focus:border-primary focus:ring-0 placeholder:text-white/30 resize-y font-mono outline-none"
                                    placeholder="Describe goals, deliverables, and scope..."
                                />
                            </div>

                            {/* Attachments Drag & Drop */}
                            <div>
                                <label className="block text-xs uppercase tracking-widest text-[#b5b79e] mb-2 font-bold font-mono">
                                    Attachments
                                </label>
                                <div
                                    onDrop={handleDrop}
                                    onDragOver={(e) => e.preventDefault()}
                                    onClick={() => fileInputRef.current?.click()}
                                    className="w-full h-32 flex flex-col items-center justify-center cursor-pointer group transition-all rounded-none bg-white/5 hover:bg-white/10 border border-dashed border-white/20 hover:border-primary/50 relative overflow-hidden"
                                >
                                    {/* Simple pattern background for upload zone */}
                                    <div className="absolute inset-0 opacity-10" style={{
                                        backgroundImage: 'radial-gradient(#fff 1px, transparent 1px)',
                                        backgroundSize: '10px 10px'
                                    }} />
                                    <input
                                        type="file"
                                        ref={fileInputRef}
                                        className="hidden"
                                        onChange={handleFileChange}
                                    />
                                    {file ? (
                                        <div className="flex flex-col items-center z-10 text-primary">
                                            <CheckCircle className="w-8 h-8 mb-2" />
                                            <p className="font-mono text-sm">{file.name}</p>
                                            <p className="text-xs opacity-60">{(file.size / 1024 / 1024).toFixed(2)} MB</p>
                                        </div>
                                    ) : (
                                        <>
                                            <Upload className="text-white/40 group-hover:text-primary w-8 h-8 mb-2 transition-colors relative z-10" />
                                            <p className="text-sm text-white/60 group-hover:text-white transition-colors font-mono relative z-10">
                                                Drop files here or click to browse
                                            </p>
                                        </>
                                    )}
                                </div>
                            </div>

                            {/* Actions */}
                            <div className="pt-4">
                                <button
                                    type="submit"
                                    disabled={isSubmitting}
                                    className="w-full bg-primary hover:bg-[#c4d325] text-black font-bold text-lg py-4 px-6 rounded-none tracking-wide uppercase transition-all active:scale-[0.99] flex items-center justify-center gap-2 group font-heading hover:shadow-[0_0_20px_rgba(208,249,6,0.3)] disabled:opacity-50 disabled:cursor-not-allowed"
                                >
                                    {isSubmitting ? (
                                        <>
                                            <Loader2 className="w-5 h-5 animate-spin" />
                                            Sending...
                                        </>
                                    ) : (
                                        <>
                                            Submit Request
                                            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                                        </>
                                    )}
                                </button>
                                <p className="text-center text-[#b5b79e] text-xs mt-4 opacity-70 font-mono">
                                    No payment required yet. We will send you a quote.
                                </p>
                            </div>
                        </form>
                    </div>
                </div>
            </main>

            {/* Toast Notification */}
            {showToast && (
                <div className="fixed bottom-6 right-6 md:bottom-10 md:right-10 z-50 animate-in slide-in-from-bottom-5 fade-in duration-300">
                    <div className="bg-primary text-black px-6 py-4 rounded-none shadow-[4px_4px_0px_0px_rgba(255,255,255,0.2)] flex items-center gap-3 max-w-sm border border-black/10">
                        <CheckCircle className="w-6 h-6" />
                        <div>
                            <p className="font-bold text-sm leading-tight font-heading uppercase">Brief received!</p>
                            <p className="text-xs font-medium opacity-80 leading-tight font-mono">Check your dashboard for updates.</p>
                        </div>
                        <button
                            onClick={() => setShowToast(false)}
                            className="ml-2 text-black/60 hover:text-black"
                        >
                            <X className="w-5 h-5" />
                        </button>
                    </div>
                </div>
            )}

            <Footer />
        </div>
    );
}
