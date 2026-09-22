'use client';

import Image from 'next/image';
import { whoWeAreData } from '@/lib/data';

interface WhoWeAreSectionProps {
    intro?: string;
    image?: string;
}

export default function WhoWeAreSection({ intro, image }: WhoWeAreSectionProps) {
    const introduction = intro || whoWeAreData.introduction;
    const sectionImage = image || "/equipo muchachos 2-1.jpg";

    return (
        <section id="who-we-are" className="py-20 bg-white">
            <div className="mx-auto w-full responsive-padding">
                <div className="grid md:grid-cols-2 items-center gap-8 lg:gap-16">
                    <div className="order-2 md:order-1">
                        <span className="inline-block px-4 py-2 sm:py-3 bg-secondary/30 text-primary rounded-full text-xs sm:text-sm font-semibold mb-4">
                            {whoWeAreData.title}
                        </span>
                        <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold pb-4 sm:pb-6 text-midnightblue">
                            {whoWeAreData.subtitle}
                        </h2>
                        <div className="space-y-4 sm:space-y-6 text-gray-700 text-base sm:text-lg leading-relaxed">
                            <p>{introduction}</p>
                            <p>{whoWeAreData.development}</p>
                            <p>{whoWeAreData.activities}</p>
                            <p>{whoWeAreData.opportunities}</p>
                        </div>
                    </div>
                    <div className="relative h-[260px] sm:h-[380px] md:h-[480px] lg:h-[500px] w-full order-1 md:order-2 rounded-xl overflow-hidden shadow-lg">
                        <Image
                            src={sectionImage}
                            alt="Equipo Nuevas Estrellas"
                            fill
                            className="object-cover"
                            sizes="(max-width: 768px) 100vw, 50vw"
                        />
                    </div>
                </div>
            </div>
        </section>
    );
}
