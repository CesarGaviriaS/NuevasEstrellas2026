'use client';

import { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import { ChevronLeft, ChevronRight, MessageCircle } from 'lucide-react';

const instagramSlides = [
    { id: 1, src: '/instagram-posts/PRESENTACION TORNEO NUEVAS ESTRELLAS 2026 - VERTICAL_page-0001.jpg', title: 'Torneo Nuevas Estrellas 2026' },
    { id: 2, src: '/instagram-posts/PRESENTACION TORNEO NUEVAS ESTRELLAS 2026 - VERTICAL_page-0002.jpg', title: 'Plataforma de Oportunidades' },
    { id: 3, src: '/instagram-posts/PRESENTACION TORNEO NUEVAS ESTRELLAS 2026 - VERTICAL_page-0003.jpg', title: 'Nuestra Misión y Visión' },
    { id: 4, src: '/instagram-posts/PRESENTACION TORNEO NUEVAS ESTRELLAS 2026 - VERTICAL_page-0004.jpg', title: 'Scouting y Veedurías' },
    { id: 5, src: '/instagram-posts/PRESENTACION TORNEO NUEVAS ESTRELLAS 2026 - VERTICAL_page-0005.jpg', title: 'Clubes Profesionales Invitados' },
    { id: 6, src: '/instagram-posts/PRESENTACION TORNEO NUEVAS ESTRELLAS 2026 - VERTICAL_page-0006.jpg', title: 'Metodología y Evaluación TIPS' },
    { id: 7, src: '/instagram-posts/PRESENTACION TORNEO NUEVAS ESTRELLAS 2026 - VERTICAL_page-0007.jpg', title: 'Categorías Sub-12 a Sub-18' },
    { id: 8, src: '/instagram-posts/PRESENTACION TORNEO NUEVAS ESTRELLAS 2026 - VERTICAL_page-0008.jpg', title: 'Sedes Oficiales en Yopal' },
    { id: 9, src: '/instagram-posts/PRESENTACION TORNEO NUEVAS ESTRELLAS 2026 - VERTICAL_page-0009.jpg', title: 'Inscripciones y Beneficios' },
    { id: 10, src: '/instagram-posts/PRESENTACION TORNEO NUEVAS ESTRELLAS 2026 - VERTICAL_page-0010.jpg', title: 'Premiación y Reconocimientos' },
    { id: 11, src: '/instagram-posts/PRESENTACION TORNEO NUEVAS ESTRELLAS 2026 - VERTICAL_page-0011.jpg', title: 'Charlas y Capacitaciones' },
    { id: 12, src: '/instagram-posts/PRESENTACION TORNEO NUEVAS ESTRELLAS 2026 - VERTICAL_page-0012.jpg', title: 'Patrocinadores Oficiales' },
    { id: 13, src: '/instagram-posts/PRESENTACION TORNEO NUEVAS ESTRELLAS 2026 - VERTICAL_page-0013.jpg', title: 'Contacto e Inscripciones' },
];

export default function InstagramSidebarCarousel() {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [isPaused, setIsPaused] = useState(false);
    const timeoutRef = useRef<NodeJS.Timeout | null>(null);

    const resetTimeout = () => {
        if (timeoutRef.current) {
            clearTimeout(timeoutRef.current);
        }
    };

    useEffect(() => {
        resetTimeout();
        if (!isPaused) {
            timeoutRef.current = setTimeout(() => {
                setCurrentIndex((prevIndex) => (prevIndex === instagramSlides.length - 1 ? 0 : prevIndex + 1));
            }, 4000);
        }
        return () => {
            resetTimeout();
        };
    }, [currentIndex, isPaused]);

    const handlePrev = () => {
        setCurrentIndex((prev) => (prev === 0 ? instagramSlides.length - 1 : prev - 1));
    };

    const handleNext = () => {
        setCurrentIndex((prev) => (prev === instagramSlides.length - 1 ? 0 : prev + 1));
    };

    const activeSlide = instagramSlides[currentIndex];

    return (
        <aside
            className="bg-white rounded-3xl p-4 sm:p-5 shadow-xl border border-gray-200/90 overflow-hidden"
            onMouseEnter={() => setIsPaused(true)}
            onMouseLeave={() => setIsPaused(false)}
        >
            {/* Carousel Slide Container with Smooth Crossfade */}
            <div className="relative w-full aspect-[4/5] rounded-2xl overflow-hidden bg-gray-950 shadow-inner group">
                {instagramSlides.map((slide, idx) => {
                    const isActive = currentIndex === idx;
                    return (
                        <div
                            key={slide.id}
                            className={`absolute inset-0 transition-opacity duration-500 ease-in-out ${
                                isActive ? 'opacity-100 z-10' : 'opacity-0 z-0 pointer-events-none'
                            }`}
                        >
                            <Image
                                src={slide.src}
                                alt={slide.title}
                                fill
                                priority={idx < 3}
                                className="object-contain"
                                sizes="(max-width: 1024px) 100vw, 380px"
                            />
                        </div>
                    );
                })}

                {/* Left/Right arrow overlay buttons */}
                <div className="absolute inset-x-2 top-1/2 -translate-y-1/2 flex justify-between pointer-events-none z-20">
                    <button
                        onClick={handlePrev}
                        aria-label="Diapositiva anterior"
                        className="pointer-events-auto p-1 text-white hover:text-gray-200 transition-all hover:scale-125 focus:outline-none drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]"
                    >
                        <ChevronLeft className="w-7 h-7 sm:w-8 sm:h-8 stroke-[2.5]" />
                    </button>
                    <button
                        onClick={handleNext}
                        aria-label="Diapositiva siguiente"
                        className="pointer-events-auto p-1 text-white hover:text-gray-200 transition-all hover:scale-125 focus:outline-none drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]"
                    >
                        <ChevronRight className="w-7 h-7 sm:w-8 sm:h-8 stroke-[2.5]" />
                    </button>
                </div>
            </div>

            {/* Dots Indicator */}
            <div className="flex items-center justify-center gap-1.5 mt-4">
                {instagramSlides.map((slide, idx) => (
                    <button
                        key={slide.id}
                        onClick={() => setCurrentIndex(idx)}
                        aria-label={`Ir a diapositiva ${idx + 1}`}
                        className={`h-1.5 rounded-full transition-all duration-300 ${
                            currentIndex === idx
                                ? 'w-6 bg-primary'
                                : 'w-1.5 bg-gray-300 hover:bg-gray-400'
                        }`}
                    />
                ))}
            </div>

            {/* Quick Action Buttons */}
            <div className="mt-4 pt-4 border-t border-gray-100 space-y-2">
                <a
                    href="https://wa.me/573002125586?text=Hola,%20deseo%20m%C3%A1s%20informaci%C3%B3n%20sobre%20el%20Torneo%20Nuevas%20Estrellas%202026"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center gap-2 w-full py-2.5 px-4 bg-primary text-white hover:bg-blue-700 rounded-xl text-xs font-bold transition-colors shadow-sm"
                >
                    <MessageCircle className="w-4 h-4" />
                    <span>Inscribir Equipo por WhatsApp (+57 300 212 5586)</span>
                </a>
            </div>
        </aside>
    );
}
