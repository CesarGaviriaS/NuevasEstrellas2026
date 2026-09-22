import Link from 'next/link';
import { ExternalLink, ArrowRight } from 'lucide-react';

interface TitleCardProps {
    title: string;
    linkUrl: string;
    date: string;
}

export default function TitleCard({ title, linkUrl, date }: TitleCardProps) {
    const isInternal = linkUrl.startsWith('/');

    const cardContent = (
        <div className="flex items-start justify-between gap-3">
            <div className="flex-1">
                <p className="text-xs font-medium text-gray-400 mb-1">{date}</p>
                <h4 className="text-sm font-semibold text-midnightblue group-hover:text-primary transition-colors line-clamp-2">
                    {title}
                </h4>
            </div>
            {isInternal ? (
                <ArrowRight className="h-4 w-4 text-primary flex-shrink-0 group-hover:translate-x-1 transition-transform mt-1" />
            ) : (
                <ExternalLink className="h-4 w-4 text-gray-400 flex-shrink-0 group-hover:text-primary group-hover:translate-x-1 transition-transform mt-1" />
            )}
        </div>
    );

    const baseClasses = "group block bg-white rounded-lg shadow-sm hover:shadow-md transition-all duration-300 p-4 border border-gray-100 hover:border-primary/40";

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
