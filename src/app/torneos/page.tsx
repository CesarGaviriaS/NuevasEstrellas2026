'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Navbar from '@/components/sections/Navbar';
import Footer from '@/components/sections/Footer';
import { Card, CardContent } from '@/components/ui/card';
import { ArrowRight, Calendar } from 'lucide-react';
import { TORNEOS, TournamentEdition } from '@/lib/dataTorneos';
import { getTournamentsList } from '@/lib/wordpress';

export default function TorneosPage() {
    const [editions, setEditions] = useState<TournamentEdition[]>(TORNEOS);

    useEffect(() => {
        let isMounted = true;
        getTournamentsList().then(list => {
            if (isMounted && list && list.length > 0) {
                setEditions(list);
            }
        });
        return () => { isMounted = false; };
    }, []);

    return (
        <div className="min-h-screen flex flex-col bg-gray-50">
            <Navbar />
            <main className="flex-grow pt-24 pb-12 px-4 sm:px-6 lg:px-8">
                <div className="max-w-7xl mx-auto space-y-12">

                    {/* Header */}
                    <div className="flex flex-col md:flex-row items-center justify-center gap-6 animate-in slide-in-from-top-4 duration-500">
                        {/* Logo */}
                        <div className="flex-shrink-0">
                            <img
                                src="/logo-copa-simple.png"
                                alt="Copa Nuevas Estrellas"
                                className="w-24 h-24 md:w-32 md:h-32 object-contain"
                            />
                        </div>

                        {/* Title */}
                        <div className="text-center md:text-left">
                            <h1 className="text-4xl md:text-5xl font-bold text-midnightblue mb-2">
                                Torneo Nuevas Estrellas
                            </h1>
                            <p className="text-xl text-primary font-semibold">
                                Ediciones
                            </p>
                        </div>
                    </div>

                    {/* Editions Grid */}
                    <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">

                        {editions.map((edition) => (
                            <Link key={edition.id} href={`/torneos/${edition.id}`} className="group">
                                <Card className="h-full overflow-hidden hover:shadow-xl transition-all duration-300 border-none bg-white relative">
                                    <div className="absolute inset-0 bg-gradient-to-br from-midnightblue/5 to-primary/5 group-hover:opacity-100 transition-opacity" />
                                    <CardContent className="p-0 relative">
                                        <div className="h-48 bg-gray-200 overflow-hidden relative">
                                            <img
                                                src={edition.coverImage}
                                                alt={edition.title}
                                                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                                            />
                                            <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors" />
                                        </div>
                                        <div className="p-6">
                                            <div className="flex justify-between items-center mb-4">
                                                <span className={`p-2 rounded-lg ${edition.year === '2025' ? 'bg-primary/10 text-primary' : 'bg-gray-100 text-gray-600'}`}>
                                                    <Calendar className="w-6 h-6" />
                                                </span>
                                                <span className="text-4xl font-bold text-gray-200 group-hover:text-primary/20 transition-colors">
                                                    {edition.year}
                                                </span>
                                            </div>
                                            <h3 className="text-2xl font-bold text-midnightblue mb-2 group-hover:text-primary transition-colors">
                                                {edition.title}
                                            </h3>
                                            <div className="flex items-center text-gray-600 font-medium group-hover:translate-x-2 transition-transform">
                                                Ver detalles <ArrowRight className="ml-2 w-4 h-4" />
                                            </div>
                                        </div>
                                    </CardContent>
                                </Card>
                            </Link>
                        ))}

                    </div>
                </div>
            </main>
            <Footer />
        </div>
    );
}

