
'use client';

import { useState } from 'react';
import { CheckCircle, Info } from 'lucide-react';

interface ServiceTabsProps {
    overview: string;
    deliverables: string[];
    faq?: { q: string; a: string; }[];
}

type Tab = 'overview' | 'deliverables' | 'faq';

export function ServiceTabs({ overview, deliverables, faq }: ServiceTabsProps) {
    const [activeTab, setActiveTab] = useState<Tab>('overview');

    return (
        <div>
            <div className="flex border-b border-white/10 mb-8">
                <button
                    onClick={() => setActiveTab('overview')}
                    className={`px-6 py-4 font-bold uppercase tracking-wider text-sm transition-colors border-b-2 ${activeTab === 'overview'
                        ? 'text-primary border-primary'
                        : 'text-white/60 hover:text-white border-transparent'
                        }`}
                >
                    Overview
                </button>
                <button
                    onClick={() => setActiveTab('deliverables')}
                    className={`px-6 py-4 font-bold uppercase tracking-wider text-sm transition-colors border-b-2 ${activeTab === 'deliverables'
                        ? 'text-primary border-primary'
                        : 'text-white/60 hover:text-white border-transparent'
                        }`}
                >
                    What's Included
                </button>
                <button
                    onClick={() => setActiveTab('faq')}
                    className={`px-6 py-4 font-bold uppercase tracking-wider text-sm transition-colors border-b-2 ${activeTab === 'faq'
                        ? 'text-primary border-primary'
                        : 'text-white/60 hover:text-white border-transparent'
                        }`}
                >
                    FAQ
                </button>
            </div>

            <div className="min-h-[200px]">
                {activeTab === 'overview' && (
                    <div className="prose prose-invert max-w-none">
                        <p className="text-lg leading-relaxed text-white/80">
                            {overview}
                        </p>
                    </div>
                )}

                {activeTab === 'deliverables' && (
                    <div>
                        <h3 className="text-xl font-bold mb-4 flex items-center gap-2 text-white uppercase tracking-wide">
                            <span className="text-primary"><CheckCircle /></span>
                            Deliverables
                        </h3>
                        <div className="border border-white/10 divide-y divide-white/10">
                            {deliverables.map((item, index) => (
                                <div key={index} className="p-4 flex items-start gap-4 hover:bg-white/5 transition-colors">
                                    <CheckCircle className="text-primary w-5 h-5 mt-0.5 shrink-0" />
                                    <div>
                                        <h4 className="text-white font-bold text-sm mb-1">{item}</h4>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                {activeTab === 'faq' && (
                    <div className="flex flex-col gap-4">
                        {faq && faq.length > 0 ? (
                            faq.map((item, index) => (
                                <div key={index} className="border border-white/10 p-5 bg-white/5 hover:bg-white/10 transition-colors">
                                    <h4 className="font-bold text-white text-sm mb-2">{item.q}</h4>
                                    <p className="text-sm text-white/60 leading-relaxed">{item.a}</p>
                                </div>
                            ))
                        ) : (
                            <div className="flex flex-col items-center justify-center py-10 text-white/40">
                                <Info className="w-10 h-10 mb-2 opacity-50" />
                                <p>No Frequently Asked Questions available for this service.</p>
                            </div>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
}
