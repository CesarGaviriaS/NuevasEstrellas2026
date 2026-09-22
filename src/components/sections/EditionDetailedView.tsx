'use client';

import { useState, useEffect } from 'react';
import HonorRoll from './HonorRoll';
import ParticipatingTeams from './ParticipatingTeams';
import GalleryPreview from './GalleryPreview';
import CronogramaCard from './CronogramaCard';
import SponsorsCarousel from '@/components/ui/SponsorsCarousel';
import { ChevronDown, ChevronUp } from 'lucide-react';
import { TORNEOS, TournamentEdition } from '@/lib/dataTorneos';
import { getTournamentEditionData } from '@/lib/wordpress';
import { notFound } from 'next/navigation';

interface EditionDetailedViewProps {
    edition: string;
    initialData?: TournamentEdition | null;
}

export default function EditionDetailedView({ edition, initialData }: EditionDetailedViewProps) {
    const [showScouts, setShowScouts] = useState(true);
    const fallbackTournament = TORNEOS.find(t => t.id === edition || t.year === edition);
    const [tournamentData, setTournamentData] = useState<TournamentEdition | null>(initialData || fallbackTournament || null);

    useEffect(() => {
        let isMounted = true;
        getTournamentEditionData(edition).then(data => {
            if (isMounted && data) {
                setTournamentData(data);
            }
        });
        return () => { isMounted = false; };
    }, [edition]);

    if (!tournamentData) {
        return notFound();
    }

    const { sections } = tournamentData;

    return (
        <div className="space-y-8 animate-in slide-in-from-bottom-4 duration-500">

            {/* Header */}
            <div className="flex flex-col md:flex-row items-center justify-center gap-6 mb-8">
                {/* Logo */}
                <div className="flex-shrink-0">
                    <img
                        src="/logo-copa-simple.png"
                        alt="Copa Nuevas Estrellas"
                        className="w-24 h-24 md:w-32 md:h-32 object-contain"
                    />
                </div>

                {/* Title and Description */}
                <div className="text-center md:text-left">
                    <h1 className="text-3xl md:text-5xl font-bold text-midnightblue mb-2">
                        Torneo Nuevas Estrellas
                    </h1>
                    <h2 className="text-2xl md:text-3xl font-bold text-primary">
                        {tournamentData.title || `Edición ${tournamentData.year || edition}`}
                    </h2>
                    {tournamentData.description && (
                        <p className="text-gray-600 mt-2 text-sm sm:text-base max-w-2xl">
                            {tournamentData.description}
                        </p>
                    )}
                </div>
            </div>

            {/* Scouts Carousel (Collapsible) */}
            {sections.scouts.enabled && sections.scouts.data.length > 0 && (
                <div className="w-full max-w-6xl mx-auto bg-white shadow-sm border rounded-xl border-gray-100 mb-8 overflow-hidden transition-all duration-300">
                    <button
                        onClick={() => setShowScouts(!showScouts)}
                        className="w-full flex items-center justify-between p-4 bg-gray-50/50 hover:bg-gray-50 transition-colors"
                    >
                        <p className="text-sm font-bold text-gray-400 uppercase tracking-widest">{sections.scouts.title || "Scouting Garantizado"}</p>
                        {showScouts ? (
                            <ChevronUp className="h-5 w-5 text-gray-400" />
                        ) : (
                            <ChevronDown className="h-5 w-5 text-gray-400" />
                        )}
                    </button>

                    <div className={`transition-all duration-300 ease-in-out ${showScouts ? 'max-h-48 opacity-100' : 'max-h-0 opacity-0'}`}>
                        <div className="py-2 border-t border-gray-100">
                            <SponsorsCarousel
                                sponsors={sections.scouts.data}
                                heightClass="h-16 md:h-20"
                                itemClass="px-4 w-[120px] md:w-[150px]"
                            />
                        </div>
                    </div>
                </div>
            )}

            {/* Stacked Cards */}
            <div className="space-y-6 max-w-6xl mx-auto">

                {/* 1. Cuadro de Honor */}
                {sections.honorRoll.enabled && (
                    <HonorRoll data={sections.honorRoll.data} />
                )}

                {/* 2. Listado de Equipos */}
                {sections.participatingTeams.enabled && (
                    <ParticipatingTeams data={sections.participatingTeams.data} />
                )}

                {/* 3. Galería Preview */}
                {sections.gallery.enabled && (
                    <GalleryPreview
                        images={sections.gallery.data}
                        fullGalleryLink={sections.gallery.fullGalleryLink}
                    />
                )}

                {/* 4. Cronograma */}
                {sections.cronograma.enabled && (
                    <CronogramaCard 
                        venues={sections.cronograma.venues}
                        documents={sections.cronograma.documents}
                        status={sections.cronograma.status}
                        scoutingImages={sections.cronograma.scoutingImages}
                        data={sections.cronograma.data}
                    />
                )}

            </div>

        </div>
    );
}
