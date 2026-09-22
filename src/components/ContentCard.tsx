import Image from 'next/image';
import Link from 'next/link';
import { ExternalLink, ArrowRight } from 'lucide-react';

interface ContentCardProps {
    title: string;
    imageUrl: string;
    linkUrl: string;
    imageAlt?: string;
}

export default function ContentCard({ title, imageUrl, linkUrl, imageAlt }: ContentCardProps) {
    const isInternal = linkUrl.startsWith('/');

    const cardContent = (
        <>
            <div className="relative w-full overflow-hidden bg-gray-100" style={{ aspectRatio: '16/9' }}>
                <Image
                    src={imageUrl}
                    alt={imageAlt || title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                />
            </div>
            <div className="p-6 flex flex-col justify-between flex-grow">
                <div>
                    <div className="flex items-start justify-between gap-2">
                        <h3 className="text-lg font-bold text-midnightblue group-hover:text-primary transition-colors line-clamp-3">
                            {title}
                        </h3>
                        {isInternal ? (
                            <ArrowRight className="h-5 w-5 text-primary flex-shrink-0 group-hover:translate-x-1.5 transition-transform mt-0.5" />
                        ) : (
                            <ExternalLink className="h-5 w-5 text-gray-400 flex-shrink-0 group-hover:text-primary group-hover:translate-x-1 transition-transform mt-0.5" />
                        )}
                    </div>
                </div>
                <p className="mt-4 text-xs font-semibold text-primary uppercase tracking-wider flex items-center gap-1">
                    {isInternal ? 'Leer nota completa' : 'Ver artículo externo'}
                </p>
            </div>
        </>
    );

    const baseClasses = "group flex flex-col h-full bg-white rounded-xl shadow-md overflow-hidden hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1.5 border border-gray-100 hover:border-primary/30";

    if (isInternal) {
        return (
            <Link href={linkUrl} className={baseClasses}>
                {cardContent}
            </Link>
        );
    }

    return (
        <a
            href={linkUrl}
            target="_blank"
            rel="noopener noreferrer"
            className={baseClasses}
        >
            {cardContent}
        </a>
    );
}
