'use client';

import Image from 'next/image';

const WHATSAPP_URL = "https://wa.me/573132644781?text=" + encodeURIComponent("¡Hola! Deseo recibir información para inscribir a mi equipo en el Torneo Nuevas Estrellas Electrolit 2026.");

export default function HeroV2() {
    return (
        <section className="relative min-h-[550px] h-screen max-h-[1080px] overflow-hidden">
            {/* Single Hero Background Image */}
            <div className="relative w-full h-full">
                <Image
                    src="/galeria/entrenado_mirando_horizonte.png"
                    alt="Torneo Nuevas Estrellas Electrolit 2026"
                    fill
                    className="object-cover"
                    priority
                    sizes="100vw"
                />
                <div className="absolute inset-0 bg-black/50" />
            </div>

            {/* Static Hero Content */}
            <div className="absolute inset-0 flex items-end justify-start text-white z-20 pointer-events-none">
                <div className="text-left max-w-4xl responsive-padding pb-16 sm:pb-20 pt-28">
                    <div className="inline-block bg-primary/90 text-amber-300 text-xs sm:text-sm font-bold px-3.5 py-1 rounded-full mb-3 pointer-events-auto shadow-sm">
                        📍 Yopal, Casanare · 1 al 6 de Diciembre de 2026
                    </div>
                    <h1 className="text-3xl sm:text-5xl md:text-6xl font-bold pb-3 sm:pb-5 leading-tight drop-shadow-md">
                        Torneo Nuevas Estrellas Electrolit 2026
                    </h1>
                    <p className="text-lg sm:text-xl md:text-2xl leading-relaxed opacity-95 drop-shadow-sm pb-6">
                        El Torneo de las Oportunidades · Yopal, Casanare · 1 al 6 de Diciembre de 2026.
                    </p>
                    <div className="flex flex-wrap items-center gap-3 pointer-events-auto">
                        <a
                            href={WHATSAPP_URL}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="bg-primary hover:bg-blue-700 text-white font-semibold text-sm sm:text-base px-6 py-3 rounded-full shadow-lg transition-all"
                        >
                            Inscribir Equipo
                        </a>
                        <a
                            href="/2#torneo"
                            className="bg-white/20 hover:bg-white/30 text-white font-medium text-sm sm:text-base px-6 py-3 rounded-full border border-white/30 backdrop-blur-sm transition-all"
                        >
                            Conoce el Torneo
                        </a>
                    </div>
                </div>
            </div>
        </section>
    );
}
