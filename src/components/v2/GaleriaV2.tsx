'use client';

import { useState, useRef, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Camera, ExternalLink, ChevronLeft, ChevronRight, Award, Trophy } from 'lucide-react';

const galleryPhotos = [
    {
        id: 'slide-1',
        src: '/galeria/abrezo grupo.jpg',
        title: 'Celebración y Unión de Equipo',
        category: 'Partidos',
        desc: 'Momentos inolvidables de triunfo, compañerismo y entrega deportiva en la cancha.',
        credit: 'Registro Oficial Torneo Nuevas Estrellas'
    },
    {
        id: 'slide-2',
        src: '/nm - entrenadores observando .jpg',
        title: 'Observación y Scouting Profesional',
        category: 'Scouting',
        desc: 'Veedores y directores de captación de clubes nacionales e internacionales analizando cada jugada.',
        credit: 'Edición Histórica · Veedurías'
    },
    {
        id: 'slide-3',
        src: '/equipo jovenes posando verde y amarillo.jpg',
        title: 'Clubes Participantes de Todo el País',
        category: 'Equipos',
        desc: 'Delegaciones y academias formativas compitiendo en el más alto nivel del fútbol base.',
        credit: 'Fase de Grupos · Yopal'
    },
    {
        id: 'slide-4',
        src: '/galeria/incio_partido.jpg',
        title: 'Protocolos y Competencia Oficial',
        category: 'Partidos',
        desc: 'Actos protocolarios con terna arbitral federada garantizando juego limpio y disciplina.',
        credit: 'Cuerpo Arbitral Oficial'
    },
    {
        id: 'slide-5',
        src: '/sub 18 canteranos patriotas foto aereopuerto a argentinajpg.jpg',
        title: 'Canteranos Proyectados al Exterior',
        category: 'Proyección',
        desc: 'Futbolistas destacados rumbo a giras y pruebas de captación en el fútbol internacional.',
        credit: 'Convenios & Alianzas Internacionales'
    },
    {
        id: 'slide-6',
        src: '/galeria/coaching.jpg',
        title: 'Charlas Técnicas y Formación Integral',
        category: 'Formación',
        desc: 'Capacitaciones y acompañamiento táctico, psicológico y ético para deportistas y cuerpos técnicos.',
        credit: 'Talleres de Capacitación'
    },
    {
        id: 'slide-7',
        src: '/equipo jovenes posando azul.jpg',
        title: 'Formación y Disciplina Deportiva',
        category: 'Equipos',
        desc: 'Equipos semifinalistas demostrando orden táctico y espíritu competitivo.',
        credit: 'Cuadro de Honor'
    },
    {
        id: 'slide-8',
        src: '/nm - joven alzando brazos.jpg',
        title: 'Alegría y Pasión por el Fútbol',
        category: 'Partidos',
        desc: 'El sueño cumplido de jóvenes promesas que dejan el corazón en cada edición.',
        credit: 'Momentos Inolvidables'
    }
];

export default function GaleriaV2() {
    const [currentIndex, setCurrentIndex] = useState(0);
    const thumbnailRefs = useRef<(HTMLButtonElement | null)[]>([]);

    const activePhoto = galleryPhotos[currentIndex];

    const handlePrev = () => {
        setCurrentIndex((prev) => (prev === 0 ? galleryPhotos.length - 1 : prev - 1));
    };

    const handleNext = () => {
        setCurrentIndex((prev) => (prev === galleryPhotos.length - 1 ? 0 : prev + 1));
    };

    useEffect(() => {
        thumbnailRefs.current[currentIndex]?.scrollIntoView({
            behavior: 'smooth',
            block: 'nearest',
            inline: 'center'
        });
    }, [currentIndex]);

    return (
        <section id="galeria" className="py-20 bg-[#f8fafc] border-t border-gray-100">
            <div className="mx-auto w-full max-w-6xl responsive-padding">
                {/* Header */}
                <div className="text-center max-w-3xl mx-auto pb-10">
                    <span className="inline-flex items-center gap-2 px-4 py-1.5 bg-primary/10 text-primary font-bold rounded-full text-xs sm:text-sm uppercase tracking-wider mb-3">
                        Registro Histórico
                    </span>
                    <h2 className="text-3xl md:text-5xl font-bold text-midnightblue leading-tight pb-4">
                        Galería de Torneos Anteriores
                    </h2>
                    <p className="text-base sm:text-lg text-gray-700 leading-relaxed">
                        Revive los mejores momentos, equipos destacados, veedurías profesionales y celebraciones que han marcado la trayectoria de Nuevas Estrellas.
                    </p>
                </div>

                {/* Carousel Container */}
                <div className="bg-white rounded-3xl p-4 sm:p-8 shadow-xl border border-gray-200/80 mb-8">
                    {/* Main Slide Presentation */}
                    <div className="relative">
                        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-center">
                            {/* Slide Image (16:9 Aspect Ratio with zoomed & blurred background fill) */}
                            <div className="lg:col-span-8 relative aspect-video w-full rounded-2xl overflow-hidden shadow-lg group bg-black/5">
                                {/* Capa de fondo: La misma imagen con zoom y desenfoque para rellenar los bordes */}
                                <div className="absolute inset-0 overflow-hidden pointer-events-none">
                                    <Image
                                        key={`bg-${activePhoto.src}`}
                                        src={activePhoto.src}
                                        alt=""
                                        fill
                                        aria-hidden="true"
                                        className="object-cover scale-125 blur-lg brightness-95 transition-all duration-500"
                                        sizes="(max-width: 1024px) 100vw, 70vw"
                                    />
                                </div>

                                {/* Capa frontal: La imagen completa nítida sin recortar */}
                                <Image
                                    key={`fg-${activePhoto.src}`}
                                    src={activePhoto.src}
                                    alt={activePhoto.title}
                                    fill
                                    priority
                                    className="relative z-10 object-contain drop-shadow-2xl transition-transform duration-500 group-hover:scale-[1.01]"
                                    sizes="(max-width: 1024px) 100vw, 70vw"
                                />
                                
                                {/* Prev / Next overlay arrows */}
                                <div className="absolute z-20 inset-x-3 top-1/2 -translate-y-1/2 flex justify-between pointer-events-none">
                                    <button
                                        onClick={handlePrev}
                                        aria-label="Foto anterior"
                                        className="pointer-events-auto p-1 text-white hover:text-gray-200 transition-all hover:scale-125 focus:outline-none drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]"
                                    >
                                        <ChevronLeft className="w-8 h-8 sm:w-10 sm:h-10 stroke-[2.5]" />
                                    </button>
                                    <button
                                        onClick={handleNext}
                                        aria-label="Foto siguiente"
                                        className="pointer-events-auto p-1 text-white hover:text-gray-200 transition-all hover:scale-125 focus:outline-none drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]"
                                    >
                                        <ChevronRight className="w-8 h-8 sm:w-10 sm:h-10 stroke-[2.5]" />
                                    </button>
                                </div>
                            </div>

                            {/* Slide Figcaption */}
                            <div className="lg:col-span-4 flex flex-col justify-between h-full py-2">
                                <div>
                                    <span className="inline-block px-3 py-1 bg-amber-100 text-amber-900 rounded-full text-xs font-bold uppercase tracking-wider mb-3">
                                        {activePhoto.category}
                                    </span>
                                    <h3 className="text-xl sm:text-2xl font-bold text-midnightblue leading-snug mb-3">
                                        {activePhoto.title}
                                    </h3>
                                    <p className="text-sm sm:text-base text-gray-600 leading-relaxed">
                                        {activePhoto.desc}
                                    </p>
                                </div>

                                <div className="pt-6 mt-6 border-t border-gray-100">
                                    <span className="text-xs text-gray-500 font-medium block">
                                        {activePhoto.credit}
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Carousel Thumbnails Row (Horizontally scrollable and scalable for any number of images) */}
                    <div className="mt-8 pt-6 border-t border-gray-100">
                        <div className="flex gap-3 sm:gap-4 overflow-x-auto pb-2 pt-1 px-1 scroll-smooth focus:outline-none no-scrollbar">
                            {galleryPhotos.map((photo, index) => {
                                const isActive = currentIndex === index;
                                return (
                                    <button
                                        key={photo.id}
                                        ref={(el) => { thumbnailRefs.current[index] = el; }}
                                        onClick={() => setCurrentIndex(index)}
                                        aria-label={`Ver diapositiva ${index + 1}: ${photo.title}`}
                                        className={`group relative flex-shrink-0 w-20 h-20 sm:w-24 sm:h-24 md:w-28 md:h-28 rounded-xl overflow-hidden cursor-pointer transition-all duration-300 focus:outline-none ${
                                            isActive
                                                ? 'ring-4 ring-primary shadow-lg scale-105 opacity-100'
                                                : 'opacity-70 hover:opacity-100 hover:scale-102 hover:ring-2 hover:ring-primary/50'
                                        }`}
                                    >
                                        <Image
                                            src={photo.src}
                                            alt={photo.title}
                                            fill
                                            className="object-cover"
                                            sizes="120px"
                                        />
                                        {isActive && (
                                            <div className="absolute inset-0 bg-primary/10 pointer-events-none" />
                                        )}
                                    </button>
                                );
                            })}
                        </div>
                    </div>
                </div>

                {/* Bottom CTA to previous editions */}
                <div className="text-center">
                    <Link
                        href="/torneos"
                        className="inline-flex items-center gap-2 text-sm font-bold text-primary hover:text-blue-700 bg-primary/5 hover:bg-primary/10 px-6 py-3 rounded-full transition-all border border-primary/20 shadow-sm"
                    >
                        Ver Historial de Ediciones y Resultados Anteriores
                        <ExternalLink className="w-4 h-4" />
                    </Link>
                </div>
            </div>
        </section>
    );
}

