'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { getAnunciosYNotasData, stripHtml } from '@/lib/wordpress';
import { Newspaper, ChevronUp, ChevronDown } from 'lucide-react';

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
    const [activeIndex, setActiveIndex] = useState(0);

    // Gesture tracking state
    const isDraggingRef = useRef(false);
    const startYRef = useRef(0);
    const lastWheelTimeRef = useRef(0);
    const carouselContainerRef = useRef<HTMLDivElement>(null);

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
                            const fm = p._embedded?.['wp:featuredmedia']?.[0];
                            const img = fm?.media_details?.sizes?.medium_large?.source_url ||
                                        fm?.media_details?.sizes?.medium?.source_url ||
                                        fm?.source_url ||
                                        '/articulos/FutbolEntreLineas.png';

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

    const nextSlide = useCallback(() => {
        if (articles.length <= 1) return;
        setActiveIndex((prev) => (prev + 1) % articles.length);
    }, [articles.length]);

    const prevSlide = useCallback(() => {
        if (articles.length <= 1) return;
        setActiveIndex((prev) => (prev - 1 + articles.length) % articles.length);
    }, [articles.length]);

    // Native Wheel Listener scoped only to the active (middle) card so top/bottom cards and surrounding areas scroll the page normally
    useEffect(() => {
        const el = carouselContainerRef.current;
        if (!el) return;

        const handleNativeWheel = (e: WheelEvent) => {
            const target = e.target as HTMLElement | null;
            const activeCardEl = target?.closest('[data-active-card="true"]');
            if (!activeCardEl) {
                // If wheel is not over the middle active card, let the browser scroll the page normally
                return;
            }

            e.preventDefault();
            e.stopPropagation();

            const now = Date.now();
            if (now - lastWheelTimeRef.current < 200) return;

            if (Math.abs(e.deltaY) > 8) {
                lastWheelTimeRef.current = now;
                if (e.deltaY > 0) {
                    nextSlide();
                } else {
                    prevSlide();
                }
            }
        };

        el.addEventListener('wheel', handleNativeWheel, { passive: false });

        return () => {
            el.removeEventListener('wheel', handleNativeWheel);
        };
    }, [nextSlide, prevSlide]);

    // Touch & Drag Handlers (attached only to the active card)
    const handleTouchStart = (e: React.TouchEvent) => {
        startYRef.current = e.touches[0].clientY;
    };

    const handleTouchEnd = (e: React.TouchEvent) => {
        const endY = e.changedTouches[0].clientY;
        const diff = startYRef.current - endY;
        if (Math.abs(diff) > 30) {
            if (diff > 0) nextSlide();
            else prevSlide();
        }
    };

    const handleMouseDown = (e: React.MouseEvent) => {
        isDraggingRef.current = true;
        startYRef.current = e.clientY;
    };

    const handleMouseUp = (e: React.MouseEvent) => {
        if (!isDraggingRef.current) return;
        isDraggingRef.current = false;
        const diff = startYRef.current - e.clientY;
        if (Math.abs(diff) > 25) {
            if (diff > 0) nextSlide();
            else prevSlide();
        }
    };

    const handleMouseLeave = () => {
        isDraggingRef.current = false;
    };

    return (
        <section className="relative w-full min-h-[calc(100dvh-64px)] lg:h-[calc(100dvh-64px)] max-h-[2160px] overflow-hidden flex items-center">
            {/* Single Hero Background Image */}
            <div className="absolute inset-0 w-full h-full">
                <Image
                    src="/galeria/entrenado_mirando_horizonte.webp"
                    alt="Torneo Nuevas Estrellas Electrolit 2026"
                    fill
                    className="object-cover object-[37.5%_center] lg:object-center"
                    priority
                    sizes="100vw"
                />
                <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/55 to-black/40" />
            </div>

            {/* Content Container */}
            <div className="relative z-20 w-full py-8 sm:py-12 lg:py-0">
                <div className="mx-auto w-full responsive-padding">
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
                                    href="/#torneo"
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

                        {/* Right Column: Frameless Interactive Vertical 3D Carousel (Aligned to top of left column) */}
                        <div className="lg:col-span-5 flex justify-center lg:justify-end lg:pt-3">
                            <div className="w-full max-w-lg lg:max-w-xl select-none">
                                {/* Clean Floating Header */}
                                <div className="flex items-center justify-between pb-2.5 mb-2 px-2 text-white min-h-[24px]">
                                    <div className="flex items-center gap-2.5">
                                        <Newspaper className="w-5 h-5 text-amber-300" />
                                        <span className="text-sm font-bold uppercase tracking-wider text-white drop-shadow-sm">
                                            Noticias y Actualidad
                                        </span>
                                    </div>
                                    <div className="flex items-center gap-3">
                                        <div className="flex items-center gap-1.5">
                                            <button
                                                onClick={prevSlide}
                                                aria-label="Noticia anterior"
                                                className="w-7 h-7 rounded-full bg-white/10 hover:bg-white/25 flex items-center justify-center transition-colors text-white/80 hover:text-white"
                                            >
                                                <ChevronUp className="w-4 h-4" />
                                            </button>
                                            <button
                                                onClick={nextSlide}
                                                aria-label="Siguiente noticia"
                                                className="w-7 h-7 rounded-full bg-white/10 hover:bg-white/25 flex items-center justify-center transition-colors text-white/80 hover:text-white"
                                            >
                                                <ChevronDown className="w-4 h-4" />
                                            </button>
                                        </div>
                                        <Link
                                            href="/anuncios-notas"
                                            className="text-xs text-amber-300 hover:text-amber-200 font-semibold transition-colors drop-shadow-sm"
                                        >
                                            Ver todas
                                        </Link>
                                    </div>
                                </div>

                                {/* Interactive 3D Gesture Stage - Fixed reserved height */}
                                <div
                                    ref={carouselContainerRef}
                                    className="relative w-full h-[320px] sm:h-[340px] flex items-center justify-center overflow-visible"
                                >
                                    {isLoadingNews && articles.length === 0 ? (
                                        /* Skeleton placeholder strictly preserving exact layout */
                                        <div className="w-full px-1 sm:px-2 flex items-center animate-pulse">
                                            <div className="relative w-36 sm:w-44 aspect-video rounded-2xl bg-white/10 border border-white/10 flex-shrink-0" />
                                            <div className="-ml-5 sm:-ml-6 pl-8 sm:pl-9 pr-5 py-5 bg-black/60 backdrop-blur-md border border-white/10 rounded-2xl flex-1 space-y-2.5">
                                                <div className="h-3 w-24 bg-amber-300/30 rounded" />
                                                <div className="h-4 w-5/6 bg-white/20 rounded" />
                                                <div className="h-4 w-3/5 bg-white/15 rounded" />
                                            </div>
                                        </div>
                                    ) : articles.length === 0 ? (
                                        <div className="w-full text-center text-sm text-white/60">
                                            Próximamente más noticias oficiales.
                                        </div>
                                    ) : (
                                        articles.map((article, idx) => {
                                            // Calculate circular distance
                                            const n = articles.length;
                                            let diff = idx - activeIndex;
                                            if (n > 2) {
                                                if (diff > n / 2) diff -= n;
                                                if (diff < -n / 2) diff += n;
                                            }

                                            const isActive = diff === 0;
                                            const isPrev = diff === -1;
                                            const isNext = diff === 1;
                                            const isVisible = isActive || isPrev || isNext;

                                            let translateY = 0;
                                            let scale = 1;
                                            let opacity = 0;
                                            let zIndex = 0;

                                            if (isActive) {
                                                translateY = 0;
                                                scale = 1;
                                                opacity = 1;
                                                zIndex = 30;
                                            } else if (isNext) {
                                                translateY = 96;
                                                scale = 0.88;
                                                opacity = 0.5;
                                                zIndex = 20;
                                            } else if (isPrev) {
                                                translateY = -96;
                                                scale = 0.88;
                                                opacity = 0.5;
                                                zIndex = 20;
                                            } else {
                                                translateY = diff > 0 ? 160 : -160;
                                                scale = 0.7;
                                                opacity = 0;
                                                zIndex = 10;
                                            }

                                            return (
                                                <div
                                                    key={`${article.id}-${idx}`}
                                                    data-active-card={isActive ? 'true' : undefined}
                                                    onTouchStart={isActive ? handleTouchStart : undefined}
                                                    onTouchEnd={isActive ? handleTouchEnd : undefined}
                                                    onMouseDown={isActive ? handleMouseDown : undefined}
                                                    onMouseUp={isActive ? handleMouseUp : undefined}
                                                    onMouseLeave={isActive ? handleMouseLeave : undefined}
                                                    className={`absolute w-full px-1 sm:px-2 ${
                                                        isActive
                                                            ? 'touch-none cursor-grab active:cursor-grabbing'
                                                            : 'touch-pan-y cursor-pointer'
                                                    }`}
                                                    style={{
                                                        transform: `translateY(${translateY}px) scale(${scale})`,
                                                        opacity,
                                                        zIndex,
                                                        visibility: isVisible ? 'visible' : 'hidden',
                                                        pointerEvents: isActive ? 'auto' : isVisible ? 'auto' : 'none',
                                                        transition: 'transform 0.4s cubic-bezier(0.16, 1, 0.3, 1), opacity 0.4s ease'
                                                    }}
                                                    onClick={() => {
                                                        if (!isActive) {
                                                            setActiveIndex(idx);
                                                        }
                                                    }}
                                                >
                                                    <Link
                                                        href={isActive ? article.linkUrl : '#'}
                                                        onClick={(e) => {
                                                            if (!isActive) {
                                                                e.preventDefault();
                                                                setActiveIndex(idx);
                                                            }
                                                        }}
                                                        className="flex items-center group"
                                                    >
                                                        {/* Head: Larger 16:9 Image Thumbnail */}
                                                        <div className="relative w-36 sm:w-44 aspect-video rounded-2xl overflow-hidden shadow-2xl border border-white/20 bg-slate-900 flex-shrink-0 z-20 group-hover:scale-105 transition-transform duration-300">
                                                            <Image
                                                                src={article.imageUrl}
                                                                alt={article.title}
                                                                fill
                                                                className="object-cover"
                                                                sizes="(max-width: 640px) 144px, 176px"
                                                            />
                                                        </div>

                                                        {/* Body: Sleek Overlapping Glass Card */}
                                                        <div className="-ml-5 sm:-ml-6 pl-8 sm:pl-9 pr-5 py-4 bg-black/75 hover:bg-black/90 backdrop-blur-md border border-white/15 rounded-2xl flex-1 shadow-2xl transition-all">
                                                            <span className="text-xs font-bold text-amber-300 uppercase tracking-wider block mb-1">
                                                                {article.category}
                                                            </span>
                                                            <h4 className="text-sm sm:text-base font-bold text-white line-clamp-2 leading-snug group-hover:text-amber-200 transition-colors">
                                                                {article.title}
                                                            </h4>
                                                        </div>
                                                    </Link>
                                                </div>
                                            );
                                        })
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
