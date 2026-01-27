import { notFound } from 'next/navigation';
import { LEGAL_DOCS } from '@/lib/legal-content';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { LegalSidebar } from '@/components/legal/LegalSidebar';
import { Clock } from 'lucide-react';

interface LegalPageProps {
    params: Promise<{
        slug: string;
    }>;
}

export function generateStaticParams() {
    return Object.keys(LEGAL_DOCS).map((slug) => ({
        slug,
    }));
}

export default async function LegalPage(props: LegalPageProps) {
    const params = await props.params;
    const doc = LEGAL_DOCS[params.slug];

    if (!doc) {
        notFound();
    }

    return (
        <div className="min-h-screen bg-background text-white flex flex-col font-display">
            <Header />

            <div className="flex flex-1 relative">
                <LegalSidebar />

                <main className="flex flex-1 flex-col px-6 py-12 md:px-16 lg:px-24 max-w-6xl">
                    {/* Page Header */}
                    <div className="mb-16 pt-4">
                        <h2 className="mb-4 text-5xl font-bold uppercase leading-none tracking-tighter text-white md:text-7xl font-heading break-words">
                            {doc.title.split(' ').map((word, i) => (
                                <span key={i} className="block">{word}</span>
                            ))}
                        </h2>
                        <div className="flex items-center gap-2">
                            <Clock className="w-4 h-4 text-gray-500" />
                            <p className="text-sm font-medium text-gray-500">
                                Last Updated: {doc.lastUpdated}
                            </p>
                        </div>
                    </div>

                    <div className="h-px w-full bg-white/15 mb-16"></div>

                    <div className="flex flex-col gap-16">
                        {doc.sections.map((section, idx) => (
                            <section key={idx}>
                                <h3 className="mb-6 text-2xl font-bold uppercase tracking-tight text-white font-heading">{section.title}</h3>
                                <div className="flex flex-col gap-4">
                                    {section.content.map((paragraph, pIdx) => (
                                        <p key={pIdx} className="text-lg leading-relaxed text-gray-300 max-w-3xl">
                                            {paragraph}
                                        </p>
                                    ))}
                                    {/* Special formatting used in template for list items in user conduct */}
                                    {/* If we needed complex structure we'd change the data model, currently just standard paragraphs. */}
                                </div>
                            </section>
                        ))}
                    </div>

                    <div className="mt-32 mb-12 flex items-center justify-between">
                        <div className="h-px flex-1 bg-white/10 mr-4"></div>
                        <p className="text-xs text-gray-600 font-mono">END OF DOCUMENT</p>
                    </div>
                </main>
            </div>

            <Footer />
        </div>
    );
}
