'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Camera, ExternalLink, Trophy, Users, Award } from 'lucide-react';

const galleryPhotos = [
    {
        src: '/galeria/abrezo grupo.jpg',
        title: 'Celebración y Unión de Equipo',
        category: 'Partidos',
        desc: 'Momentos de compañerismo y triunfo en cancha.'
    },
    {
        src: '/sub 18 canteranos patriotas foto aereopuerto a argentinajpg.jpg',
        title: 'Canteranos Proyectados al Exterior',
        category: 'Proyección',
        desc: 'Futbolistas rumbo a giras y veedurías internacionales.'
    },
    {
        src: '/nm - entrenadores observando .jpg',
        title: 'Observación y Scouting Profesional',
        category: 'Scouting',
        desc: 'Entrenadores y veedores analizando el talento juvenil.'
    },
    {
        src: '/equipo jovenes posando verde y amarillo.jpg',
        title: 'Clubes Participantes de Todo el País',
        category: 'Equipos',
        desc: 'Delegaciones regionales compitiendo en alto nivel.'
    },
    {
        src: '/galeria/incio_partido.jpg',
        title: 'Protocolos y Competencia Oficial',
        category: 'Partidos',
        desc: 'Inicio de jornada con terna arbitral federada.'
    },
    {
        src: '/nm - joven alzando brazos.jpg',
        title: 'Alegría y Pasión por el Fútbol',
        category: 'Partidos',
        desc: 'El talento juvenil demostrando su entrega.'
    },
    {
        src: '/equipo jovenes posando azul.jpg',
        title: 'Formación y Disciplina Deportiva',
        category: 'Equipos',
        desc: 'Equipos finalistas en ediciones anteriores.'
    },
    {
        src: '/galeria/coaching.jpg',
        title: 'Charlas Técnicas y Formación Integral',
        category: 'Scouting',
        desc: 'Acompañamiento táctico y humano para los jugadores.'
    }
];

const categories = ['Todos', 'Partidos', 'Equipos', 'Scouting', 'Proyección'];

export default function GaleriaV2() {
    const [selectedCategory, setSelectedCategory] = useState('Todos');

    const filteredPhotos = selectedCategory === 'Todos'
        ? galleryPhotos
        : galleryPhotos.filter(p => p.category === selectedCategory);

    return (
        <section id="galeria" className="py-20 bg-white border-t border-gray-100">
            <div className="mx-auto w-full responsive-padding">
                {/* Header */}
                <div className="text-center max-w-3xl mx-auto pb-10">
                    <span className="inline-flex items-center gap-2 px-4 py-1.5 bg-primary/10 text-primary font-bold rounded-full text-xs sm:text-sm uppercase tracking-wider mb-3">
                        <Camera className="w-4 h-4" />
                        Registro Histórico
                    </span>
                    <h2 className="text-3xl md:text-5xl font-bold text-midnightblue leading-tight pb-4">
                        Galería de Torneos Anteriores
                    </h2>
                    <p className="text-base sm:text-lg text-gray-700 leading-relaxed">
                        Revive los mejores momentos, equipos destacados, veedurías y celebraciones que han marcado la historia de Nuevas Estrellas.
                    </p>
                </div>

                {/* Filter Tabs */}
                <div className="flex flex-wrap justify-center gap-2 mb-10">
                    {categories.map((cat) => (
                        <button
                            key={cat}
                            onClick={() => setSelectedCategory(cat)}
                            className={`px-5 py-2 rounded-full text-xs sm:text-sm font-semibold transition-all ${
                                selectedCategory === cat
                                    ? 'bg-primary text-white shadow-md'
                                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                            }`}
                        >
                            {cat}
                        </button>
                    ))}
                </div>

                {/* Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                    {filteredPhotos.map((photo, idx) => (
                        <div
                            key={idx}
                            className="group relative rounded-2xl overflow-hidden bg-gray-900 aspect-[4/3] shadow-md hover:shadow-xl transition-all duration-300"
                        >
                            <Image
                                src={photo.src}
                                alt={photo.title}
                                fill
                                className="object-cover group-hover:scale-105 transition-transform duration-500"
                                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-transparent opacity-90 group-hover:opacity-100 transition-opacity" />
                            <div className="absolute bottom-0 left-0 right-0 p-4 text-white">
                                <span className="text-[10px] font-bold text-amber-300 uppercase tracking-wider block mb-1">
                                    {photo.category}
                                </span>
                                <h3 className="font-bold text-sm sm:text-base leading-snug line-clamp-1 mb-1">
                                    {photo.title}
                                </h3>
                                <p className="text-xs text-gray-300 line-clamp-1">
                                    {photo.desc}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Bottom CTA to previous editions */}
                <div className="mt-12 text-center">
                    <Link
                        href="/torneos"
                        className="inline-flex items-center gap-2 text-sm font-bold text-primary hover:text-blue-700 bg-primary/5 hover:bg-primary/10 px-6 py-3 rounded-full transition-all border border-primary/20"
                    >
                        Ver Historial de Ediciones y Resultados
                        <ExternalLink className="w-4 h-4" />
                    </Link>
                </div>
            </div>
        </section>
    );
}
