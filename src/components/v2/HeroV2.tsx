'use client';

import { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { getAnunciosYNotasData, stripHtml } from '@/lib/wordpress';
import { Newspaper, CheckCircle2 } from 'lucide-react';

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
    const [page, setPage] = useState(1);
    const [hasMoreWP, setHasMoreWP] = useState(true);
    const [isLoadingMore, setIsLoadingMore] = useState(false);
    const scrollContainerRef = useRef<HTMLDivElement>(null);
    const seenUrlsRef = useRef<Set<string>>(new Set());

    // Fetch initial batch
    useEffect(() => {
        let isMounted = true;
        async function fetchInitial() {
            try {
                const res = await fetch('https://nuevasestrellas.com/cms/wp-json/wp/v2/posts?_embed&per_page=10&page=1');
                if (res.ok) {
                    const posts = await res.json();
                    if (isMounted && Array.isArray(posts) && posts.length > 0) {
                        const formatted: ArticleItem[] = [];
                        posts.forEach((p: any) => {
                            if (p.slug === 'hello-world') return;
                            const title = stripHtml(p.title?.rendered || '');
                            const linkUrl = `/anuncios-notas/${p.slug}`;
                            const img = p._embedded?.['wp:featuredmedia']?.[0]?.source_url || '/articulos/FutbolEntreLineas.png';
                            
                            // Determine category
                            const terms = p._embedded?.['wp:term']?.[0] || [];
                            const isCol = terms.some((t: any) => {
                                const n = (t.name || '').toLowerCase();
                                const s = (t.slug || '').toLowerCase();
                                return s.includes('columna') || s.includes('futbol-entre-lineas') || s.includes('opinion') || n.includes('columna') || n.includes('fútbol');
                            });
                            const category = isCol ? 'Fútbol Entre Líneas' : 'Noticias';

                            if (!seenUrlsRef.current.has(linkUrl)) {
                                seenUrlsRef.current.add(linkUrl);
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
                            if (posts.length < 10) {
                                setHasMoreWP(false);
                            }
                            setIsLoadingNews(false);
                            return;
                        }
                    }
                }
            } catch (err) {
                console.warn('Error fetching WP posts:', err);
            }

            // Fallback to getAnunciosYNotasData
            try {
                const fallbackData = await getAnunciosYNotasData();
                if (isMounted) {
                    const fallbackList: ArticleItem[] = [];
                    if (fallbackData.notaPrincipal?.linkUrl && !seenUrlsRef.current.has(fallbackData.notaPrincipal.linkUrl)) {
                        seenUrlsRef.current.add(fallbackData.notaPrincipal.linkUrl);
                        fallbackList.push({
                            id: 'principal',
                            title: fallbackData.notaPrincipal.title,
                            imageUrl: fallbackData.notaPrincipal.imageUrl,
                            linkUrl: fallbackData.notaPrincipal.linkUrl,
                            category: 'Fútbol Entre Líneas'
                        });
                    }
                    fallbackData.anuncios.forEach((a, i) => {
                        if (a.linkUrl && !seenUrlsRef.current.has(a.linkUrl)) {
                            seenUrlsRef.current.add(a.linkUrl);
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
                    setHasMoreWP(false);
                }
            } catch (e) {
                console.warn('Fallback error:', e);
            } finally {
                if (isMounted) setIsLoadingNews(false);
            }
        }

        fetchInitial();
        return () => {
            isMounted = false;
        };
    }, []);

    // Function to load more articles on scroll
    const loadMoreArticles = async () => {
        if (isLoadingMore || !hasMoreWP) return;
        setIsLoadingMore(true);

        try {
            const nextPage = page + 1;
            const res = await fetch(`https://nuevasestrellas.com/cms/wp-json/wp/v2/posts?_embed&per_page=10&page=${nextPage}`);
            if (res.ok) {
                const posts = await res.json();
                if (Array.isArray(posts) && posts.length > 0) {
                    const newItems: ArticleItem[] = [];
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

                        if (!seenUrlsRef.current.has(linkUrl)) {
                            seenUrlsRef.current.add(linkUrl);
                            newItems.push({
                                id: String(p.id),
                                title,
                                imageUrl: img,
                                linkUrl,
                                category
                            });
                        }
                    });

                    if (newItems.length > 0) {
                        setArticles((prev) => [...prev, ...newItems]);
                        setPage(nextPage);
                    }
                    if (posts.length < 10) {
                        setHasMoreWP(false);
                    }
                } else {
                    setHasMoreWP(false);
                }
            } else {
                setHasMoreWP(false);
            }
        } catch (e) {
            setHasMoreWP(false);
        } finally {
            setIsLoadingMore(false);
        }
    };

    // Scroll listener for infinite scroll
    const handleScroll = (e: React.UIEvent<HTMLDivElement>) => {
        const { scrollTop, scrollHeight, clientHeight } = e.currentTarget;
        if (scrollHeight - scrollTop - clientHeight < 50) {
            loadMoreArticles();
        }
    };

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

                        {/* Right Column: Sleek Mini-News Widget (2.5 items height) */}
                        <div className="lg:col-span-5 flex justify-center lg:justify-end">
                            <div className="w-full max-w-md bg-black/40 backdrop-blur-md rounded-2xl p-4 sm:p-5 border border-white/10 shadow-xl text-white">
                                <div className="flex items-center justify-between pb-3 border-b border-white/10 mb-1">
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
                                    <div className="py-8 text-center text-xs text-white/60">
                                        Cargando publicaciones...
                                    </div>
                                ) : articles.length === 0 ? (
                                    <div className="py-6 text-center text-xs text-white/60">
                                        Próximamente más noticias oficiales.
                                    </div>
                                ) : (
                                    /* Container sized exactly for 2.5 cards height (~195px) */
                                    <div
                                        ref={scrollContainerRef}
                                        onScroll={handleScroll}
                                        className="h-[195px] overflow-y-auto divide-y divide-white/10 pr-2 liquid-glass-scroll"
                                    >
                                        {articles.map((article, idx) => (
                                            <Link
                                                key={`${article.id}-${idx}`}
                                                href={article.linkUrl}
                                                className="flex items-center gap-3 py-2.5 hover:bg-white/5 rounded-xl px-2 transition-all group"
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
                                                    <span className="text-[10px] font-bold text-amber-300 uppercase tracking-wider block mb-0.5">
                                                        {article.category}
                                                    </span>
                                                    <h4 className="text-xs font-semibold text-white line-clamp-2 leading-snug group-hover:text-amber-200 transition-colors">
                                                        {article.title}
                                                    </h4>
                                                </div>
                                            </Link>
                                        ))}

                                        {isLoadingMore && (
                                            <div className="py-2.5 text-center text-[11px] text-white/60 animate-pulse">
                                                Cargando más publicaciones...
                                            </div>
                                        )}

                                        {!hasMoreWP && articles.length > 0 && (
                                            <div className="py-3 text-center text-[11px] text-white/50 flex items-center justify-center gap-1.5 border-t border-white/5 mt-1 transition-opacity duration-500">
                                                <CheckCircle2 className="w-3.5 h-3.5 text-amber-300/70" />
                                                <span>Has llegado al final</span>
                                            </div>
                                        )}
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
