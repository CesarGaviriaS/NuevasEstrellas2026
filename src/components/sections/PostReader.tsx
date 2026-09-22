'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { 
    Calendar, 
    Clock, 
    User, 
    ArrowLeft, 
    Share2, 
    Check, 
    Copy,
    MessageCircle,
    Twitter,
    Facebook
} from 'lucide-react';
import { 
    WordPressPost, 
    getPostBySlug, 
    formatWPDate, 
    calculateReadingTime, 
    getFeaturedImageUrl, 
    stripHtml,
    getAnunciosYNotasData,
    AnunciosYNotasState,
    getStaticAnunciosYNotas
} from '@/lib/wordpress';
import ContentCard from '@/components/ContentCard';

interface PostReaderProps {
    slug: string;
    initialPost?: WordPressPost | null;
}

export default function PostReader({ slug, initialPost }: PostReaderProps) {
    const [post, setPost] = useState<WordPressPost | null>(initialPost || null);
    const [isLoading, setIsLoading] = useState(!initialPost);
    const [copied, setCopied] = useState(false);
    const [recentData, setRecentData] = useState<AnunciosYNotasState>(getStaticAnunciosYNotas());

    useEffect(() => {
        let isMounted = true;

        async function loadPostData() {
            try {
                if (!initialPost) {
                    setIsLoading(true);
                    const fetchedPost = await getPostBySlug(slug);
                    if (isMounted) {
                        setPost(fetchedPost);
                    }
                }
                const allData = await getAnunciosYNotasData();
                if (isMounted) {
                    setRecentData(allData);
                }
            } catch (err) {
                console.error('Error cargando la nota:', err);
            } finally {
                if (isMounted) {
                    setIsLoading(false);
                }
            }
        }

        loadPostData();

        return () => {
            isMounted = false;
        };
    }, [slug, initialPost]);

    const handleCopyLink = () => {
        if (typeof window !== 'undefined') {
            navigator.clipboard.writeText(window.location.href);
            setCopied(true);
            setTimeout(() => setCopied(false), 2500);
        }
    };

    if (isLoading) {
        return (
            <div className="py-24 max-w-4xl mx-auto px-4 text-center">
                <div className="animate-spin rounded-full h-12 w-12 border-4 border-primary border-t-transparent mx-auto mb-4"></div>
                <p className="text-gray-500 font-medium">Cargando artículo...</p>
            </div>
        );
    }

    if (!post) {
        return (
            <div className="py-24 max-w-2xl mx-auto px-4 text-center">
                <div className="w-16 h-16 bg-red-100 text-red-600 rounded-full flex items-center justify-center mx-auto mb-4">
                    <ArrowLeft className="h-8 w-8" />
                </div>
                <h1 className="text-2xl font-bold text-midnightblue mb-2">Artículo no encontrado</h1>
                <p className="text-gray-600 mb-6">
                    La publicación que estás buscando no existe o fue movida recientemente.
                </p>
                <Link
                    href="/anuncios-notas"
                    className="inline-flex items-center gap-2 bg-midnightblue text-white px-6 py-3 rounded-xl font-semibold hover:bg-primary transition-colors shadow-md"
                >
                    <ArrowLeft className="h-4 w-4" />
                    Volver a Noticias y Notas
                </Link>
            </div>
        );
    }

    const title = stripHtml(post.title.rendered);
    const dateFormatted = formatWPDate(post.date);
    const readingTime = calculateReadingTime(post.content.rendered);
    const featuredImg = getFeaturedImageUrl(post, '/articulos/20-11-2025.png');
    const authorName = post._embedded?.author?.[0]?.name || 'Nuevas Estrellas';
    const categories = post._embedded?.['wp:term']?.[0]?.map(t => t.name) || ['Torneo'];

    // Filtramos artículos relacionados (distintos del actual)
    const relatedArticles = recentData.anuncios
        .filter(a => !a.linkUrl.includes(slug))
        .slice(0, 3);

    const shareUrl = typeof window !== 'undefined' ? window.location.href : `https://nuevasestrellas.com/anuncios-notas/${slug}`;
    const shareText = encodeURIComponent(`Lee "${title}" en Nuevas Estrellas`);

    return (
        <article className="py-12 bg-gradient-to-b from-gray-50 to-white min-h-screen">
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                
                {/* Botón de retorno y breadcrumb */}
                <div className="mb-8">
                    <Link
                        href="/anuncios-notas"
                        className="inline-flex items-center gap-2 text-sm font-semibold text-gray-600 hover:text-primary transition-colors group"
                    >
                        <ArrowLeft className="h-4 w-4 group-hover:-translate-x-1 transition-transform" />
                        <span>Volver a Noticias y Notas</span>
                    </Link>
                </div>

                {/* Cabecera del Artículo */}
                <header className="mb-10">
                    {/* Badges de Categoría */}
                    <div className="flex flex-wrap items-center gap-2 mb-4">
                        {categories.map((cat, i) => (
                            <span 
                                key={i}
                                className="bg-midnightblue text-white text-xs font-bold uppercase tracking-wider px-3 py-1 rounded-full shadow-sm"
                            >
                                {cat}
                            </span>
                        ))}
                    </div>

                    {/* Título Principal */}
                    <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-midnightblue tracking-tight leading-tight mb-6">
                        {title}
                    </h1>

                    {/* Metadata: Fecha, Autor, Tiempo de lectura */}
                    <div className="flex flex-wrap items-center gap-y-2 gap-x-6 text-sm text-gray-500 pb-6 border-b border-gray-200">
                        <div className="flex items-center gap-1.5">
                            <User className="h-4 w-4 text-primary" />
                            <span className="font-medium text-gray-700">{authorName}</span>
                        </div>
                        <div className="flex items-center gap-1.5">
                            <Calendar className="h-4 w-4 text-primary" />
                            <span>{dateFormatted}</span>
                        </div>
                        <div className="flex items-center gap-1.5">
                            <Clock className="h-4 w-4 text-primary" />
                            <span>{readingTime} min de lectura</span>
                        </div>
                    </div>
                </header>

                {/* Imagen Destacada */}
                {featuredImg && (
                    <div className="relative w-full aspect-video rounded-2xl overflow-hidden shadow-xl mb-12 bg-gray-100 border border-gray-200">
                        <Image
                            src={featuredImg}
                            alt={title}
                            fill
                            priority
                            className="object-cover"
                            sizes="(max-width: 1024px) 100vw, 896px"
                        />
                    </div>
                )}

                {/* Cuerpo del Artículo (Estilos editoriales para contenido de WordPress) */}
                <div 
                    className="wp-content prose prose-lg max-w-none text-gray-800 leading-relaxed space-y-6"
                    dangerouslySetInnerHTML={{ __html: post.content.rendered }}
                />

                {/* Sección de Compartir */}
                <div className="my-12 py-6 border-y border-gray-200 flex flex-col sm:flex-row items-center justify-between gap-4">
                    <div className="flex items-center gap-2 text-midnightblue font-bold text-sm">
                        <Share2 className="h-4 w-4 text-primary" />
                        <span>Comparte esta noticia:</span>
                    </div>

                    <div className="flex items-center gap-3">
                        <a
                            href={`https://api.whatsapp.com/send?text=${shareText}%20${encodeURIComponent(shareUrl)}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="p-2.5 rounded-full bg-green-50 text-green-600 hover:bg-green-600 hover:text-white transition-all shadow-sm"
                            title="Compartir en WhatsApp"
                        >
                            <MessageCircle className="h-5 w-5" />
                        </a>
                        <a
                            href={`https://twitter.com/intent/tweet?text=${shareText}&url=${encodeURIComponent(shareUrl)}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="p-2.5 rounded-full bg-sky-50 text-sky-500 hover:bg-sky-500 hover:text-white transition-all shadow-sm"
                            title="Compartir en X"
                        >
                            <Twitter className="h-5 w-5" />
                        </a>
                        <a
                            href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="p-2.5 rounded-full bg-blue-50 text-blue-600 hover:bg-blue-600 hover:text-white transition-all shadow-sm"
                            title="Compartir en Facebook"
                        >
                            <Facebook className="h-5 w-5" />
                        </a>
                        <button
                            onClick={handleCopyLink}
                            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-gray-100 text-gray-700 text-xs font-semibold hover:bg-midnightblue hover:text-white transition-all shadow-sm"
                            title="Copiar enlace"
                        >
                            {copied ? (
                                <>
                                    <Check className="h-4 w-4 text-green-500" />
                                    <span>¡Copiado!</span>
                                </>
                            ) : (
                                <>
                                    <Copy className="h-4 w-4" />
                                    <span>Copiar enlace</span>
                                </>
                            )}
                        </button>
                    </div>
                </div>

                {/* Noticias Relacionadas */}
                {relatedArticles.length > 0 && (
                    <div className="mt-16 pt-10 border-t border-gray-100">
                        <div className="flex items-center justify-between mb-8">
                            <h3 className="text-2xl font-bold text-midnightblue">
                                Más noticias del Torneo
                            </h3>
                            <Link 
                                href="/anuncios-notas" 
                                className="text-sm font-semibold text-primary hover:underline"
                            >
                                Ver todas →
                            </Link>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                            {relatedArticles.map((art, idx) => (
                                <ContentCard
                                    key={idx}
                                    title={art.title}
                                    imageUrl={art.imageUrl}
                                    linkUrl={art.linkUrl}
                                    imageAlt={art.imageAlt}
                                />
                            ))}
                        </div>
                    </div>
                )}
            </div>
        </article>
    );
}
