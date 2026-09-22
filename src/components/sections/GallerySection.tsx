'use client';

import { useState } from 'react';
import Image from 'next/image';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { carouselImages } from '@/lib/data';

export default function GallerySection() {
    const [currentCarouselSlide, setCurrentCarouselSlide] = useState(0);

    const moveCarousel = (direction: number) => {
        setCurrentCarouselSlide((prev) => {
            const newSlide = prev + direction;
            if (newSlide < 0) {
                return carouselImages.length - 1; // Go to last slide
            }
            if (newSlide >= carouselImages.length) {
                return 0; // Go to first slide
            }
            return newSlide;
        });
    };

    return (
        <section className="py-20 bg-white">
            <div className="mx-auto w-full responsive-padding">
                <div className="text-center pb-12">
                    <span className="inline-block px-4 py-3 bg-secondary/30 text-primary rounded-full text-sm mb-4">
                        GALERÍA DE FOTOS
                    </span>
                    <h2 className="text-3xl md:text-4xl font-bold pb-4">
                        Nuestros Equipos en Acción
                    </h2>
                    <p className="text-gray-700 max-w-2xl mx-auto">
                        Cada imagen cuenta la historia de dedicación, trabajo en equipo y pasión por el fútbol. Conoce a los jóvenes talentos que hacen posible el Torneo Nuevas Estrellas.
                    </p>
                </div>

                {/* Carousel Container */}
                <div className="max-w-6xl mx-auto relative">
                    <div className="relative overflow-hidden rounded-lg">
                        <div className="owl-carousel relative">
                            <div className="flex transition-transform duration-500 ease-in-out"
                                style={{ transform: `translateX(-${currentCarouselSlide * 100}%)` }}>
                                {carouselImages.map((image, index) => (
                                    <div key={index} className={`item w-full flex-shrink-0 aspect-video ${index % 2 === 1 ? 'black' : ''}`}>
                                        <div className="relative w-full h-full">
                                            <Image
                                                src={image.src}
                                                alt={image.title}
                                                fill
                                                className="object-cover"
                                                sizes="(max-width: 768px) 100vw, 1152px"
                                            />
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Navigation Buttons */}
                    <div className="absolute inset-0 flex items-center justify-between pointer-events-none">
                        <button
                            className="bg-black/50 text-white p-3 rounded-full hover:bg-black/70 transition-colors pointer-events-auto ml-4"
                            onClick={() => moveCarousel(-1)}
                        >
                            <ChevronLeft className="h-6 w-6" />
                        </button>
                        <button
                            className="bg-black/50 text-white p-3 rounded-full hover:bg-black/70 transition-colors pointer-events-auto mr-4"
                            onClick={() => moveCarousel(1)}
                        >
                            <ChevronRight className="h-6 w-6" />
                        </button>
                    </div>

                    {/* Indicators */}
                    <div className="flex justify-center mt-6 space-x-2">
                        {carouselImages.map((_, index) => (
                            <button
                                key={index}
                                onClick={() => setCurrentCarouselSlide(index)}
                                className={`w-3 h-3 rounded-full transition-colors ${index === currentCarouselSlide ? 'bg-primary' : 'bg-gray-300'
                                    }`}
                            />
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}
