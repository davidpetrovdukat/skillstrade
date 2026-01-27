
import { Star } from 'lucide-react';

interface Review {
    user: string;
    text: string;
    rating: number;
}

interface ServiceReviewsProps {
    reviews: Review[];
}

export function ServiceReviews({ reviews }: ServiceReviewsProps) {
    if (!reviews || reviews.length === 0) return null;

    return (
        <div className="pt-8 border-t border-white/10">
            <h3 className="text-2xl font-bold text-white uppercase tracking-tight mb-6">
                Client Reviews ({reviews.length})
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {reviews.map((review, index) => (
                    <div key={index} className="bg-surface border border-white/10 p-6 flex flex-col gap-4">
                        <div className="flex justify-between items-start">
                            <div className="flex gap-1 text-primary text-sm">
                                {[...Array(5)].map((_, i) => (
                                    <Star
                                        key={i}
                                        className={`w-4 h-4 ${i < review.rating ? 'fill-current text-primary' : 'text-white/20'}`}
                                    />
                                ))}
                            </div>
                            <span className="text-xs text-white/60 font-mono">Verified Client</span>
                        </div>
                        <p className="text-white text-sm leading-relaxed">
                            "{review.text}"
                        </p>
                        <div className="flex items-center gap-3 mt-auto pt-4 border-t border-white/10">
                            <div className="bg-primary/20 h-8 w-8 flex items-center justify-center text-primary font-bold text-xs rounded-full">
                                {review.user.charAt(0)}
                            </div>
                            <span className="text-sm text-white/60 font-medium uppercase">{review.user}</span>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
