import PaginatedGallery from '@/components/sections/PaginatedGallery';

import Link from 'next/link';
import { notFound } from 'next/navigation';
import Navbar from '@/components/sections/Navbar';
import Footer from '@/components/sections/Footer';
import { GALLERY_DATA } from '@/lib/dataGaleria';

const ALLOWED_EDITIONS = ['2024', '2025', '2026'];

export async function generateStaticParams() {
    return ALLOWED_EDITIONS.map((edition) => ({
        edition: edition,
    }));
}

interface Props {
    params: Promise<{
        edition: string;
    }>
}

export default async function GalleryPage({ params }: Props) {
    const { edition } = await params;
    const galleryData = GALLERY_DATA[edition];

    if (!galleryData) {
        notFound();
    }

    return (
        <div className="min-h-screen flex flex-col bg-gray-50">
            <Navbar />

            <main className="flex-grow pt-28 pb-12 px-4 md:px-8 max-w-7xl mx-auto w-full">
                {/* Header */}
                <div className="mb-8">
                    <Link
                        href={`/torneos/${edition}`}
                        className="inline-flex items-center text-sm text-gray-500 hover:text-primary mb-4 transition-colors"
                    >
                        Volver al Torneo {edition}
                    </Link>
                    <h1 className="text-3xl md:text-5xl font-bold text-midnightblue">
                        Galería {edition}
                    </h1>
                    <p className="text-gray-600 mt-2">
                        Los mejores momentos del torneo.
                    </p>
                </div>

                <PaginatedGallery items={galleryData.items} />

            </main>

            <Footer />
        </div>
    );
}
