import Image from 'next/image';
import Link from 'next/link';
import { getAnunciosYNotasData, Anuncio, NotaPrincipal } from '@/lib/wordpress';
import { ArrowRight, Newspaper } from 'lucide-react';

export default async function NoticiasCMSV2() {
    let data;
    try {
        data = await getAnunciosYNotasData();
    } catch {
        data = null;
    }

    const anuncios = data?.anuncios || [];
    const notaPrincipal = data?.notaPrincipal;

    return (
        <section id="noticias" className="py-20 bg-white">
            <div className="mx-auto w-full responsive-padding">
                <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 max-w-6xl mx-auto">
                    <div>
                        <span className="inline-block px-4 py-1.5 bg-primary/10 text-primary font-bold rounded-full text-xs sm:text-sm uppercase tracking-wider mb-3">
                            Actualidad y Cobertura
                        </span>
                        <h2 className="text-3xl md:text-5xl font-bold text-midnightblue leading-tight">
                            Noticias y Artículos
                        </h2>
                    </div>
                    <Link
                        href="/anuncios-notas"
                        className="inline-flex items-center gap-2 text-primary font-bold hover:underline mt-4 md:mt-0 text-sm"
                    >
                        Ver todas las publicaciones <ArrowRight className="w-4 h-4" />
                    </Link>
                </div>

                <div className="grid md:grid-cols-3 gap-6 max-w-6xl mx-auto">
                    {/* Nota Principal */}
                    {notaPrincipal && (
                        <div className="md:col-span-2 bg-[#f8fafc] border border-gray-200 rounded-3xl overflow-hidden hover:shadow-lg transition-all flex flex-col justify-between group">
                            <div className="relative h-64 sm:h-80 w-full overflow-hidden">
                                <Image
                                    src={notaPrincipal.imageUrl}
                                    alt={notaPrincipal.title}
                                    fill
                                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                                    sizes="(max-width: 768px) 100vw, 66vw"
                                />
                                <div className="absolute top-4 left-4 bg-midnightblue text-white text-xs font-bold px-3 py-1 rounded-full">
                                    Nota Destacada
                                </div>
                            </div>
                            <div className="p-6 sm:p-8 flex flex-col justify-between flex-1">
                                <div>
                                    <h3 className="text-xl sm:text-2xl font-bold text-midnightblue group-hover:text-primary transition-colors line-clamp-2 mb-3">
                                        {notaPrincipal.title}
                                    </h3>
                                </div>
                                <Link
                                    href={notaPrincipal.linkUrl}
                                    className="inline-flex items-center gap-2 text-sm font-bold text-primary hover:gap-3 transition-all pt-4"
                                >
                                    Leer artículo completo <ArrowRight className="w-4 h-4" />
                                </Link>
                            </div>
                        </div>
                    )}

                    {/* Lateral list of anuncios */}
                    <div className="space-y-4 flex flex-col justify-between">
                        {anuncios.slice(0, 3).map((item, idx) => (
                            <Link
                                key={idx}
                                href={item.linkUrl}
                                className="bg-[#f8fafc] border border-gray-100 hover:border-gray-200 rounded-2xl p-4 flex items-center gap-4 hover:shadow-md transition-all group"
                            >
                                <div className="relative w-20 h-20 rounded-xl overflow-hidden flex-shrink-0">
                                    <Image
                                        src={item.imageUrl}
                                        alt={item.title}
                                        fill
                                        className="object-cover group-hover:scale-105 transition-transform"
                                        sizes="80px"
                                    />
                                </div>
                                <div className="flex-1 min-w-0">
                                    <span className="text-[10px] font-bold text-primary uppercase tracking-wider block mb-1">
                                        Fútbol Base
                                    </span>
                                    <h4 className="text-xs sm:text-sm font-bold text-midnightblue line-clamp-2 group-hover:text-primary transition-colors">
                                        {item.title}
                                    </h4>
                                </div>
                            </Link>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}
