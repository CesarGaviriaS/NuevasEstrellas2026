'use client';

import { useState, useEffect } from 'react';
import ContentCard from '@/components/ContentCard';
import TitleCard from '@/components/TitleCard';
import { getStaticAnunciosYNotas, getAnunciosYNotasData, AnunciosYNotasState } from '@/lib/wordpress';
import { Newspaper } from 'lucide-react';

export default function AnunciosNotas() {
    const [data, setData] = useState<AnunciosYNotasState>(getStaticAnunciosYNotas());
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        let isMounted = true;
        
        async function fetchLiveNews() {
            try {
                setIsLoading(true);
                const liveData = await getAnunciosYNotasData();
                if (isMounted) {
                    setData(liveData);
                }
            } catch (err) {
                console.error('Error cargando noticias en vivo desde WordPress:', err);
            } finally {
                if (isMounted) {
                    setIsLoading(false);
                }
            }
        }

        fetchLiveNews();

        return () => {
            isMounted = false;
        };
    }, []);

    const { anuncios, notaPrincipal, notasSecundarias } = data;
    const hasAnyContent = anuncios.length > 0 || notaPrincipal !== null;

    return (
        <section className="py-20 bg-gradient-to-b from-gray-50 to-white min-h-[600px]">
            <div className="mx-auto w-full responsive-padding">
                {/* Header */}
                <div className="text-center mb-12">
                    <h1 className="text-4xl md:text-5xl font-bold text-midnightblue">
                        Noticias y Actualidad
                    </h1>
                </div>

                {isLoading && !hasAnyContent ? (
                    <div className="py-20 text-center">
                        <div className="animate-spin rounded-full h-12 w-12 border-4 border-primary border-t-transparent mx-auto mb-4" />
                        <p className="text-gray-500 font-medium">Cargando publicaciones desde WordPress...</p>
                    </div>
                ) : !hasAnyContent ? (
                    <div className="py-16 text-center max-w-md mx-auto bg-white rounded-2xl p-8 border border-gray-100 shadow-sm">
                        <Newspaper className="w-12 h-12 text-gray-300 mx-auto mb-3" />
                        <h3 className="text-lg font-bold text-midnightblue mb-1">No hay publicaciones disponibles</h3>
                        <p className="text-sm text-gray-500">Pronto se publicarán nuevas notas y noticias oficiales.</p>
                    </div>
                ) : (
                    /* Three Column Layout */
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
                        {/* Anuncios Section - Takes 2 columns on large screens */}
                        <div className="lg:col-span-2">
                            <div className="flex items-center justify-between mb-6">
                                <h2 className="text-3xl font-bold text-midnightblue text-center lg:text-left">
                                    Noticias
                                </h2>
                                {isLoading && (
                                    <span className="text-xs text-gray-400 animate-pulse">
                                        Actualizando...
                                    </span>
                                )}
                            </div>

                            {anuncios.length > 0 ? (
                                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                                    {anuncios.map((anuncio, index) => (
                                        <ContentCard
                                            key={index}
                                            title={anuncio.title}
                                            imageUrl={anuncio.imageUrl}
                                            linkUrl={anuncio.linkUrl}
                                            imageAlt={anuncio.imageAlt}
                                        />
                                    ))}
                                </div>
                            ) : (
                                <div className="bg-white rounded-2xl p-8 text-center border border-gray-100 text-gray-500 text-sm">
                                    Próximamente más noticias del torneo.
                                </div>
                            )}
                        </div>

                        {/* Notas Section - Takes 1 column */}
                        <div>
                            <h2 className="text-3xl font-bold text-midnightblue mb-6 text-center lg:text-left">
                                Fútbol entre líneas
                            </h2>
                            <div className="space-y-4">
                                {notaPrincipal && (
                                    <ContentCard
                                        title={notaPrincipal.title}
                                        imageUrl={notaPrincipal.imageUrl}
                                        linkUrl={notaPrincipal.linkUrl}
                                        imageAlt={notaPrincipal.imageAlt}
                                    />
                                )}

                                {notasSecundarias.map((nota, index) => (
                                    <TitleCard
                                        key={index}
                                        title={nota.title}
                                        linkUrl={nota.linkUrl}
                                        date={nota.date}
                                    />
                                ))}

                                {!notaPrincipal && notasSecundarias.length === 0 && (
                                    <div className="bg-white rounded-2xl p-8 text-center border border-gray-100 text-gray-500 text-sm">
                                        Próximamente más columnas de opinión.
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </section>
    );
}
