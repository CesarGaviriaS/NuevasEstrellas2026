'use client';

import Image from 'next/image';

interface Sponsor {
    name: string;
    logo: string;
}

interface SponsorsCarouselProps {
    sponsors: Sponsor[];
    heightClass?: string;
    itemClass?: string;
}

export default function SponsorsCarousel({
    sponsors,
    heightClass = "h-24 md:h-32",
    itemClass = "px-8 w-[200px] md:w-[300px]"
}: SponsorsCarouselProps) {
    if (!sponsors || sponsors.length === 0) return null;

    // Duplicate items to create a seamless loop across all resolutions & zoom levels
    const loopSponsors = [...sponsors, ...sponsors, ...sponsors, ...sponsors, ...sponsors, ...sponsors, ...sponsors, ...sponsors];

    return (
        <div className="w-full overflow-hidden bg-white/5 py-4">
            <div className="flex w-max animate-scroll">
                {loopSponsors.map((sponsor, index) => (
                    <div
                        key={index}
                        className={`flex-shrink-0 flex items-center justify-center ${itemClass}`}
                    >
                        <div className={`relative w-full ${heightClass}`}>
                            <Image
                                src={sponsor.logo}
                                alt={sponsor.name}
                                fill
                                className={`object-contain transition-all duration-300 ${sponsor.name === 'Camilo Camargo' ? 'brightness-0 invert' : ''}`}
                                sizes="(max-width: 768px) 200px, 300px"
                            />
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
