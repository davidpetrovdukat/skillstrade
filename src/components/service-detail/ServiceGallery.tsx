
'use client';

import Image from 'next/image';

interface ServiceGalleryProps {
    images: string[];
    title: string;
}

export function ServiceGallery({ images, title }: ServiceGalleryProps) {
    // Use the first image or fallback
    const mainImage = images?.[0] || '/window.svg';

    return (
        <div className="w-full aspect-video bg-[#2a2d24] relative overflow-hidden group border border-white/10">
            <Image
                src={mainImage}
                alt={title}
                fill
                className="object-cover"
                priority
            />
        </div>
    );
}
