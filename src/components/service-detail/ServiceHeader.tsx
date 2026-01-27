
import Image from 'next/image';
import { Clock, Globe, Star, Calendar } from 'lucide-react';

interface ServiceHeaderProps {
    title: string;
    freelancer: {
        name: string;
        avatarUrl: string;
        role: string;
        rating: number;
        reviews_count: number;
        verified: boolean;
        location: string;
        flag: string;
        avg_reply?: string;
        languages?: string;
    };
}

export function ServiceHeader({ title, freelancer }: ServiceHeaderProps) {
    return (
        <div className="border-b border-white/10 pb-8">
            <h1 className="text-white text-3xl md:text-5xl font-bold uppercase leading-tight tracking-tight mb-6 font-display">
                {title}
            </h1>
            <div className="flex flex-col md:flex-row flex-wrap items-start md:items-center justify-between gap-6 p-4 bg-surface border border-white/10">
                <div className="flex items-center gap-4">
                    <div className="relative h-14 w-14 rounded-full border border-white/20 overflow-hidden shrink-0">
                        <Image
                            src={freelancer.avatarUrl}
                            alt={freelancer.name}
                            fill
                            className="object-cover"
                        />
                    </div>
                    <div className="flex flex-col">
                        <p className="text-white text-lg font-bold uppercase tracking-wide flex items-center gap-2">
                            {freelancer.name}
                            {freelancer.verified && (
                                <span className="bg-primary text-black text-[10px] px-1.5 py-0.5 font-bold uppercase">Pro</span>
                            )}
                        </p>
                        <p className="text-white/60 text-sm font-mono">{freelancer.role}</p>
                    </div>
                </div>

                <div className="flex flex-wrap gap-4 md:gap-8 text-sm w-full md:w-auto">
                    <div className="flex items-center gap-2 text-white/60">
                        <Clock className="w-4 h-4 text-primary" />
                        <span>Avg. Reply: <span className="text-white font-mono">{freelancer.avg_reply || "1hr"}</span></span>
                    </div>
                    <div className="flex items-center gap-2 text-white/60">
                        <Globe className="w-4 h-4 text-primary" />
                        <span>{freelancer.languages || "English"}</span>
                    </div>
                    <div className="flex items-center gap-1 text-primary">
                        <Star className="w-4 h-4 fill-current" />
                        <span className="text-white font-mono font-bold">{freelancer.rating.toFixed(1)}</span>
                        <span className="text-white/60">({freelancer.reviews_count})</span>
                    </div>
                </div>
            </div>
        </div>
    );
}
