'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { heroSlides } from '@/lib/data';

interface HeroSectionProps {
    title?: string;
    subtitle?: string;
    slide1?: string;
    slide2?: string;
    slide3?: string;
}

export default function HeroSection({
    title = 'Nuevas Estrellas: Desarrollo de Talento',
    subtitle = 'Impulsando el desarrollo integral de jóvenes futbolistas talentosos de Colombia.'
}: HeroSectionProps) {
    const [currentSlide, setCurrentSlide] = useState(0);

    // Auto-play hero slider (circular navigation)
    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentSlide((prev) => {
                return (prev + 1) % heroSlides.length; // Circular navigation
            });
        }, 5000);
        return () => clearInterval(interval);
    }, []);

    return (
        <section className="relative min-h-[550px] h-screen max-h-[1080px] overflow-hidden">
            <div className="relative w-full h-full">
                <div
                    className="flex transition-transform duration-1000 ease-in-out h-full"
                    style={{ transform: `translateX(-${currentSlide * 100}%)` }}
                >
                    {heroSlides.map((slide, index) => (
                        <div key={index} className="min-w-full h-full relative">
                            <Image
                                src={slide.image}
                                alt={slide.title}
                                fill
                                className="object-cover"
                                priority={index === 0}
                                sizes="100vw"
                            />
                            <div className="absolute inset-0 bg-black/40" />
                        </div>
                    ))}
                </div>
            </div>

            {/* Dynamic text overlay */}
            <div className="absolute inset-0 flex items-end justify-start text-white z-20 pointer-events-none">
                <div className="text-left max-w-4xl responsive-padding pb-16 sm:pb-20 pt-28">
                    <h1 className="text-3xl sm:text-5xl md:text-6xl font-bold pb-4 sm:pb-6 leading-tight drop-shadow-md">
                        {title}
                    </h1>
                    <p className="text-lg sm:text-xl md:text-2xl leading-relaxed opacity-95 drop-shadow-sm">
                        {subtitle}
                    </p>
                </div>
            </div>

            <div className="absolute bottom-6 sm:bottom-8 left-1/2 -translate-x-1/2 flex gap-2 z-30">
                {heroSlides.map((_, index) => (
                    <button
                        key={index}
                        onClick={() => setCurrentSlide(index)}
                        className={`h-2 rounded-full transition-all duration-300 ${index === currentSlide ? 'w-12 bg-white' : 'w-3 bg-white/50 hover:bg-white/75'
                            }`}
                        aria-label={`Ir a la diapositiva ${index + 1}`}
                    />
                ))}
            </div>
        </section>
    );
}
