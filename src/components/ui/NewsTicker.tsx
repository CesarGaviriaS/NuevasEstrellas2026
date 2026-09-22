'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { getPosts, stripHtml, isNoticiaPost, isColumnaPost, WordPressPost } from '@/lib/wordpress';

interface NewsItem {
    id: number;
    title: string;
    linkUrl: string;
    category: 'columna' | 'noticia';
}

export default function NewsTicker() {
    const [newsItems, setNewsItems] = useState<NewsItem[]>([]);

    useEffect(() => {
        let isMounted = true;

        async function fetchTickerNews() {
            try {
                const posts = await getPosts();
                if (!isMounted) return;

                const validPosts = posts.filter(
                    (p: WordPressPost) => p.slug !== 'hello-world' || p.title.rendered !== 'Hello world!'
                );

                const items: NewsItem[] = [];

                for (const p of validPosts) {
                    const isCol = isColumnaPost(p);
                    const isNoti = isNoticiaPost(p);

                    if (isCol || isNoti) {
                        items.push({
                            id: p.id,
                            title: stripHtml(p.title.rendered),
                            linkUrl: `/anuncios-notas/${p.slug}`,
                            category: isCol ? 'columna' : 'noticia'
                        });
                    }
                }

                setNewsItems(items);
            } catch (err) {
                console.error('Error cargando noticias para el NewsTicker:', err);
            }
        }

        fetchTickerNews();

        return () => {
            isMounted = false;
        };
    }, []);

    if (newsItems.length === 0) return null;

    // Duplicate items for seamless loop across any screen size / zoom level
    const loopItems = [...newsItems, ...newsItems, ...newsItems, ...newsItems, ...newsItems, ...newsItems, ...newsItems, ...newsItems];

    return (
        <div className="w-full overflow-hidden bg-white pt-1 pb-1 shadow-sm border-b border-gray-100">
            <div className="flex items-center w-max animate-scroll-slow">
                {loopItems.map((item, index) => (
                    <Link
                        key={`${item.id}-${index}`}
                        href={item.linkUrl}
                        className="flex-shrink-0 flex items-center gap-3 px-8 group"
                    >
                        <span className={`text-[10px] font-bold uppercase px-2 py-0.5 rounded leading-none ${item.category === 'columna'
                            ? 'bg-midnightblue text-white'
                            : 'bg-primary text-white'
                            }`}>
                            {item.category === 'columna' ? 'Columna' : 'Noticia'}
                        </span>
                        <span className="text-midnightblue text-xs whitespace-nowrap leading-none group-hover:text-primary transition-colors">
                            {item.title}
                        </span>
                        <span className="text-gray-300 mx-4 leading-none">•</span>
                    </Link>
                ))}
            </div>
        </div>
    );
}
