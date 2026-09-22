'use client';

import { useState } from 'react';
import { GalleryItem } from '@/lib/dataGaleria';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface PaginatedGalleryProps {
    items: GalleryItem[];
}

const ITEMS_PER_PAGE = 16;

export default function PaginatedGallery({ items }: PaginatedGalleryProps) {
    const [currentPage, setCurrentPage] = useState(1);

    const totalPages = Math.ceil(items.length / ITEMS_PER_PAGE);

    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
    const currentItems = items.slice(startIndex, startIndex + ITEMS_PER_PAGE);

    const handlePrevious = () => {
        if (currentPage > 1) {
            setCurrentPage(prev => prev - 1);
            window.scrollTo({ top: 0, behavior: 'smooth' });
        }
    };

    const handleNext = () => {
        if (currentPage < totalPages) {
            setCurrentPage(prev => prev + 1);
            window.scrollTo({ top: 0, behavior: 'smooth' });
        }
    };

    return (
        <div>
            {/* Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6 mb-12">
                {currentItems.map((item) => (
                    <div
                        key={item.id}
                        className="aspect-video bg-gray-200 rounded-xl flex items-center justify-center text-gray-400 font-medium border-2 border-dashed border-gray-300 transform hover:scale-[1.02] transition-transform duration-300"
                    >
                        {item.imageUrl ? (
                            <img
                                src={item.imageUrl}
                                alt={`Gallery item ${item.id}`}
                                className="w-full h-full object-cover rounded-xl"
                            />
                        ) : (
                            <span className="bg-white/50 px-4 py-2 rounded-full backdrop-blur-sm">
                                {item.placeholderText}
                            </span>
                        )}
                    </div>
                ))}
            </div>

            {/* Pagination Controls */}
            {totalPages > 1 && (
                <div className="flex justify-center items-center gap-4">
                    <button
                        onClick={handlePrevious}
                        disabled={currentPage === 1}
                        className={`flex items-center gap-2 px-6 py-3 rounded-full font-semibold transition-all ${currentPage === 1
                                ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                                : 'bg-white border text-midnightblue hover:bg-gray-50 hover:shadow-md'
                            }`}
                    >
                        <ChevronLeft className="h-5 w-5" />
                        Anterior
                    </button>

                    <span className="text-gray-500 font-medium">
                        Página {currentPage} de {totalPages}
                    </span>

                    <button
                        onClick={handleNext}
                        disabled={currentPage === totalPages}
                        className={`flex items-center gap-2 px-6 py-3 rounded-full font-semibold transition-all ${currentPage === totalPages
                                ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                                : 'bg-white border text-midnightblue hover:bg-gray-50 hover:shadow-md'
                            }`}
                    >
                        Siguiente
                        <ChevronRight className="h-5 w-5" />
                    </button>
                </div>
            )}
        </div>
    );
}
