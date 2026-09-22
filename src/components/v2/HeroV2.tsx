'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { getAnunciosYNotasData, stripHtml } from '@/lib/wordpress';
import { Newspaper } from 'lucide-react';

interface ArticleItem {
    id: string;
    title: string;
    imageUrl: string;
    linkUrl: string;
    category: string;
}

export default function HeroV2() {
    const [articles, setArticles] = useState<ArticleItem[]>([]);
    const [isLoadingNews, setIsLoadingNews] = useState(true);

    useEffect(() => {
        let isMounted = true;
        async function fetchHeroNews() {
            try {
                const res = await fetch('https://nuevasestrellas.com/cms/wp-json/wp/v2/posts?_embed&per_page=10&page=1');
                if (res.ok) {
                    const posts = await res.json();
                    if (isMounted && Array.isArray(posts) && posts.length > 0) {
                        const formatted: ArticleItem[] = [];
                        const seenUrls = new Set<string>();

                        posts.forEach((p: any) => {
                            if (p.slug === 'hello-world') return;
                            const title = stripHtml(p.title?.rendered || '');
                            const linkUrl = `/anuncios-notas/${p.slug}`;
                            const img = p._embedded?.['wp:featuredmedia']?.[0]?.source_url || '/articulos/FutbolEntreLineas.png';

                            const terms = p._embedded?.['wp:term']?.[0] || [];
                            const isCol = terms.some((t: any) => {
                                const n = (t.name || '').toLowerCase();
                                const s = (t.slug || '').toLowerCase();
                                return s.includes('columna') || s.includes('futbol-entre-lineas') || s.includes('opinion') || n.includes('columna') || n.includes('fútbol');
                            });
                            const category = isCol ? 'Fútbol Entre Líneas' : 'Noticias';

                            if (!seenUrls.has(linkUrl)) {
                                seenUrls.add(linkUrl);
                                formatted.push({
                                    id: String(p.id),
                                    title,
                                    imageUrl: img,
                                    linkUrl,
                                    category
                                });
                            }
                        });

                        if (formatted.length > 0) {
                            setArticles(formatted);
                            setIsLoadingNews(false);
                            return;
                        }
                    }
                }
            } catch (err) {
                console.warn('Error fetching WP posts:', err);
            }

            // Fallback
            try {
                const fallbackData = await getAnunciosYNotasData();
                if (isMounted) {
                    const fallbackList: ArticleItem[] = [];
                    const seenUrls = new Set<string>();

                    if (fallbackData.notaPrincipal?.linkUrl) {
                        seenUrls.add(fallbackData.notaPrincipal.linkUrl);
                        fallbackList.push({
                            id: 'principal',
                            title: fallbackData.notaPrincipal.title,
                            imageUrl: fallbackData.notaPrincipal.imageUrl,
                            linkUrl: fallbackData.notaPrincipal.linkUrl,
                            category: 'Fútbol Entre Líneas'
                        });
                    }
                    fallbackData.anuncios.forEach((a, i) => {
                        if (a.linkUrl && !seenUrls.has(a.linkUrl)) {
                            seenUrls.add(a.linkUrl);
                            fallbackList.push({
                                id: `anuncio-${i}`,
                                title: a.title,
                                imageUrl: a.imageUrl,
                                linkUrl: a.linkUrl,
                                category: 'Noticias'
                            });
                        }
                    });
                    setArticles(fallbackList);
                }
            } catch (e) {
                console.warn('Fallback error:', e);
            } finally {
                if (isMounted) setIsLoadingNews(false);
            }
        }

        fetchHeroNews();
        return () => {
            isMounted = false;
        };
    }, []);

    // Create a smooth rotating list of at least 5-6 items for vertical carousel
    let carouselItems: ArticleItem[] = [...articles];
    if (articles.length > 0 && articles.length < 5) {
        while (carouselItems.length < 6) {
            carouselItems = [...carouselItems, ...articles];
        }
    }

    const totalCount = Math.max(carouselItems.length, 1);
    const duration = totalCount * 4; // 4 seconds per slide cycle

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

                        {/* Right Column: Vertical 3D Flowing News Carousel */}
                        <div className="lg:col-span-5 flex justify-center lg:justify-end">
                            <div className="w-full max-w-md bg-black/35 backdrop-blur-md rounded-2xl p-4 sm:p-5 border border-white/10 shadow-2xl text-white">
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

                                {isLoadingNews && articles.length === 0 ? (
                                    <div className="py-12 text-center text-xs text-white/60">
                                        Cargando publicaciones...
                                    </div>
                                ) : articles.length === 0 ? (
                                    <div className="py-12 text-center text-xs text-white/60">
                                        Próximamente más noticias oficiales.
                                    </div>
                                ) : (
                                    /* Vertical 3D Carousel Stage */
                                    <div className="vertical-carousel-wrapper">
                                        {carouselItems.map((article, idx) => {
                                            const delay = (duration / totalCount) * (idx - 1);
                                            return (
                                                <Link
                                                    key={`${article.id}-${idx}`}
                                                    href={article.linkUrl}
                                                    className="vertical-carousel-item flex items-center group cursor-pointer"
                                                    style={{
                                                        animationDelay: `${delay}s`,
                                                        animationDuration: `${duration}s`
                                                    }}
                                                >
                                                    {/* Head: 16:9 Image Thumbnail */}
                                                    <div className="relative w-28 sm:w-32 aspect-video rounded-xl overflow-hidden shadow-2xl border border-white/20 bg-slate-900 flex-shrink-0 z-20 group-hover:scale-105 transition-transform duration-300">
                                                        <Image
                                                            src={article.imageUrl}
                                                            alt={article.title}
                                                            fill
                                                            className="object-cover"
                                                            sizes="(max-width: 640px) 112px, 128px"
                                                        />
                                                    </div>

                                                    {/* Body: Sleek Overlapping Glass Card */}
                                                    <div className="-ml-4 pl-7 pr-4 py-3 bg-black/75 hover:bg-black/90 backdrop-blur-md border border-white/15 rounded-2xl flex-1 shadow-2xl transition-all">
                                                        <span className="text-[10px] font-bold text-amber-300 uppercase tracking-wider block mb-0.5">
                                                            {article.category}
                                                        </span>
                                                        <h4 className="text-xs sm:text-sm font-semibold text-white line-clamp-2 leading-snug group-hover:text-amber-200 transition-colors">
                                                            {article.title}
                                                        </h4>
                                                    </div>
                                                </Link>
                                            );
                                        })}
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
