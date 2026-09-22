'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { getAnunciosYNotasData, AnunciosYNotasState, getStaticAnunciosYNotas } from '@/lib/wordpress';
import { ArrowRight, Newspaper, ChevronDown, ChevronUp } from 'lucide-react';

export default function HeroV2() {
    const [newsData, setNewsData] = useState<AnunciosYNotasState>(getStaticAnunciosYNotas());
    const [isLoadingNews, setIsLoadingNews] = useState(true);

    useEffect(() => {
        let isMounted = true;
        async function fetchHeroNews() {
            try {
                const data = await getAnunciosYNotasData();
                if (isMounted) {
                    setNewsData(data);
                }
            } catch (e) {
                console.warn('Error cargando noticias en Hero:', e);
            } finally {
                if (isMounted) {
                    setIsLoadingNews(false);
                }
            }
        }
        fetchHeroNews();
        return () => {
            isMounted = false;
        };
    }, []);

    // Combine all available articles without duplicates
    const seenUrls = new Set<string>();
    const allArticles = [];
    if (newsData.notaPrincipal && newsData.notaPrincipal.linkUrl) {
        seenUrls.add(newsData.notaPrincipal.linkUrl);
        allArticles.push({
            title: newsData.notaPrincipal.title,
            imageUrl: newsData.notaPrincipal.imageUrl,
            linkUrl: newsData.notaPrincipal.linkUrl,
            category: 'Fútbol Entre Líneas'
        });
    }
    newsData.anuncios.forEach((a) => {
        if (a.linkUrl && !seenUrls.has(a.linkUrl)) {
            seenUrls.add(a.linkUrl);
            allArticles.push({
                title: a.title,
                imageUrl: a.imageUrl,
                linkUrl: a.linkUrl,
                category: 'Noticias'
            });
        }
    });

    return (
        <section className="relative min-h-[620px] lg:h-[88vh] lg:min-h-[680px] lg:max-h-[1080px] overflow-hidden">
            {/* Single Hero Background Image */}
            <div className="relative w-full h-full min-h-[620px] lg:min-h-full">
                <Image
                    src="/galeria/entrenado_mirando_horizonte.png"
                    alt="Torneo Nuevas Estrellas Electrolit 2026"
                    fill
                    className="object-cover object-center"
                    priority
                    sizes="100vw"
                />
                <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/55 to-black/40" />
            </div>

            {/* Content Container */}
            <div className="absolute inset-0 z-20 flex items-center">
                <div className="mx-auto w-full responsive-padding py-12 lg:py-0">
                    <div className="grid lg:grid-cols-12 gap-8 lg:gap-12 items-center">
                        {/* Left Column: Hero Main Presentation */}
                        <div className="lg:col-span-7 text-white space-y-5">
                            <p className="text-sm sm:text-base font-semibold tracking-wide text-amber-300">
                                Yopal, Casanare · 1 al 6 de Diciembre de 2026
                            </p>

                            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold leading-tight drop-shadow-md">
                                Torneo Nuevas Estrellas Electrolit 2026
                            </h1>

                            <p className="text-lg sm:text-xl lg:text-2xl leading-relaxed text-gray-200 drop-shadow-sm font-medium">
                                El Torneo de las Oportunidades
                            </p>

                            <div className="flex flex-wrap items-center gap-3 pt-2">
                                <Link
                                    href="/2#torneo"
                                    className="bg-white/20 hover:bg-white/30 text-white font-semibold text-sm sm:text-base px-6 py-3 rounded-full border border-white/30 backdrop-blur-sm transition-all"
                                >
                                    Conoce más
                                </Link>
                                <Link
                                    href="/inscripciones"
                                    className="bg-primary hover:bg-blue-700 text-white font-bold text-sm sm:text-base px-7 py-3 rounded-full shadow-lg transition-all"
                                >
                                    Inscribir Equipo
                                </Link>
                            </div>
                        </div>

                        {/* Right Column: Sleek Mini-News Widget */}
                        <div className="lg:col-span-5 flex justify-center lg:justify-end">
                            <div className="w-full max-w-md bg-black/40 backdrop-blur-md rounded-2xl p-5 border border-white/10 shadow-xl text-white">
                                <div className="flex items-center justify-between pb-3 border-b border-white/10 mb-2">
                                    <div className="flex items-center gap-2">
                                        <Newspaper className="w-4 h-4 text-amber-300" />
                                        <span className="text-xs font-bold uppercase tracking-wider text-white">
                                            Noticias & Actualizaciones
                                        </span>
                                    </div>
                                    <Link
                                        href="/anuncios-notas"
                                        className="text-[11px] text-amber-300 hover:text-amber-200 font-semibold transition-colors"
                                    >
                                        Ver todas
                                    </Link>
                                </div>

                                {isLoadingNews && allArticles.length === 0 ? (
                                    <div className="py-8 text-center text-xs text-white/60">
                                        Cargando publicaciones...
                                    </div>
                                ) : allArticles.length === 0 ? (
                                    <div className="py-6 text-center text-xs text-white/60">
                                        Próximamente más noticias oficiales.
                                    </div>
                                ) : (
                                    <div className="divide-y divide-white/10 max-h-[300px] overflow-y-auto pr-1 scrollbar-thin scrollbar-thumb-white/20">
                                        {allArticles.map((article, idx) => (
                                            <Link
                                                key={idx}
                                                href={article.linkUrl}
                                                className="flex items-center gap-3.5 py-3 hover:bg-white/5 rounded-xl px-2 transition-all group"
                                            >
                                                {/* 16:9 Thumbnail */}
                                                <div className="relative w-24 sm:w-28 aspect-video rounded-lg overflow-hidden flex-shrink-0 bg-white/5 border border-white/10">
                                                    <Image
                                                        src={article.imageUrl}
                                                        alt={article.title}
                                                        fill
                                                        className="object-cover group-hover:scale-105 transition-transform duration-300"
                                                        sizes="(max-width: 640px) 96px, 112px"
                                                    />
                                                </div>
                                                <div className="flex-1 min-w-0">
                                                    <span className="text-[10px] font-bold text-amber-300 uppercase tracking-wider block mb-1">
                                                        {article.category}
                                                    </span>
                                                    <h4 className="text-xs sm:text-sm font-semibold text-white line-clamp-2 leading-snug group-hover:text-amber-200 transition-colors">
                                                        {article.title}
                                                    </h4>
                                                </div>
                                            </Link>
                                        ))}
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
