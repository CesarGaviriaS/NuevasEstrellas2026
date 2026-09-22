'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Camera, Plus, ChevronDown, ChevronUp } from 'lucide-react';
import Link from 'next/link';

interface GalleryPreviewProps {
    images: string[];
    fullGalleryLink?: string;
}

export default function GalleryPreview({ images, fullGalleryLink }: GalleryPreviewProps) {
    const [isOpen, setIsOpen] = useState(true);

    if (!images || images.length === 0) return null;

    return (
        <Card className="border-none shadow-lg overflow-hidden bg-white">
            <CardHeader className="bg-white border-b border-gray-100 pb-4 pt-6">
                <div className="flex items-center justify-between px-2">
                    <div className="flex items-center gap-2">
                        <Camera className="h-6 w-6 text-midnightblue" />
                        <CardTitle className="text-xl md:text-2xl text-midnightblue">Galería</CardTitle>
                    </div>
                    <button onClick={() => setIsOpen(!isOpen)} className="p-1 hover:bg-gray-100 rounded-full transition-colors">
                        {isOpen ? <ChevronUp className="h-6 w-6 text-gray-600" /> : <ChevronDown className="h-6 w-6 text-gray-600" />}
                    </button>
                </div>
            </CardHeader>
            <div className={`transition-all duration-300 ease-in-out ${isOpen ? 'max-h-[1000px] opacity-100' : 'max-h-0 opacity-0 overflow-hidden'}`}>
                <CardContent className="p-6 md:p-8 bg-white">
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                        {images.slice(0, 2).map((src, idx) => (
                            <div key={idx} className="relative aspect-video rounded-xl overflow-hidden group shadow-sm">
                                <img
                                    src={src}
                                    alt={`Galería imagen ${idx + 1}`}
                                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                                />
                                <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-opacity" />
                            </div>
                        ))}

                        {/* 'View More' / '+' Button Card */}
                        <Link href={fullGalleryLink || '/galeria'} className="relative aspect-video rounded-xl overflow-hidden group border-2 border-dashed border-gray-200 flex flex-col items-center justify-center hover:border-primary hover:bg-primary/5 transition-all">
                            <div className="p-3 bg-gray-100 rounded-full text-gray-400 group-hover:bg-primary group-hover:text-white transition-colors mb-2">
                                <Plus className="h-8 w-8" />
                            </div>
                            <span className="font-bold text-gray-500 group-hover:text-primary transition-colors">Ver Galería Completa</span>
                        </Link>
                    </div>
                </CardContent>
            </div>
        </Card>
    );
}
