import Image from 'next/image';
import Link from 'next/link';
import { Trophy, Users, Shield, Calendar, MapPin, ArrowRight } from 'lucide-react';

export default function TorneoIntroV2() {
    return (
        <section id="torneo" className="py-20 bg-white">
            <div className="mx-auto w-full responsive-padding">
                {/* Section Header */}
                <div className="text-center max-w-3xl mx-auto pb-14">
                    <span className="inline-block px-4 py-1.5 bg-primary/10 text-primary font-bold rounded-full text-xs sm:text-sm uppercase tracking-wider mb-3">
                        Edición Oficial 2026
                    </span>
                    <h2 className="text-3xl md:text-5xl font-bold text-midnightblue leading-tight pb-4">
                        El Torneo de las Oportunidades
                    </h2>
                    <p className="text-base sm:text-lg text-gray-700 leading-relaxed">
                        El <strong>Torneo Nuevas Estrellas Electrolit 2026</strong> reúne a los mejores clubes y academias formativas de Colombia en una semana de competencia de alto nivel, visibilidad ante veedores profesionales y formación integral.
                    </p>
                </div>

                {/* Key Metrics Cards */}
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 max-w-6xl mx-auto pb-16">
                    <div className="bg-[#f8fafc] border border-gray-100 rounded-2xl p-6 text-center hover:shadow-md transition-shadow">
                        <div className="w-12 h-12 rounded-full bg-primary/10 text-primary flex items-center justify-center mx-auto mb-3">
                            <Trophy className="w-6 h-6" />
                        </div>
                        <div className="text-3xl sm:text-4xl font-extrabold text-primary pb-1">4</div>
                        <div className="text-sm font-bold text-midnightblue">Categorías Oficiales</div>
                        <div className="text-xs text-gray-700 mt-1">Sub-12 a Sub-18</div>
                    </div>

                    <div className="bg-[#f8fafc] border border-gray-100 rounded-2xl p-6 text-center hover:shadow-md transition-shadow">
                        <div className="w-12 h-12 rounded-full bg-primary/10 text-primary flex items-center justify-center mx-auto mb-3">
                            <Shield className="w-6 h-6" />
                        </div>
                        <div className="text-3xl sm:text-4xl font-extrabold text-primary pb-1">64</div>
                        <div className="text-sm font-bold text-midnightblue">Equipos Participantes</div>
                        <div className="text-xs text-gray-700 mt-1">16 por categoría</div>
                    </div>

                    <div className="bg-[#f8fafc] border border-gray-100 rounded-2xl p-6 text-center hover:shadow-md transition-shadow">
                        <div className="w-12 h-12 rounded-full bg-primary/10 text-primary flex items-center justify-center mx-auto mb-3">
                            <Users className="w-6 h-6" />
                        </div>
                        <div className="text-3xl sm:text-4xl font-extrabold text-primary pb-1">1.280+</div>
                        <div className="text-sm font-bold text-midnightblue">Futbolistas en Cancha</div>
                        <div className="text-xs text-gray-700 mt-1">Jóvenes talentos</div>
                    </div>

                    <div className="bg-[#f8fafc] border border-gray-100 rounded-2xl p-6 text-center hover:shadow-md transition-shadow">
                        <div className="w-12 h-12 rounded-full bg-primary/10 text-primary flex items-center justify-center mx-auto mb-3">
                            <MapPin className="w-6 h-6" />
                        </div>
                        <div className="text-3xl sm:text-4xl font-extrabold text-primary pb-1">9</div>
                        <div className="text-sm font-bold text-midnightblue">Regiones del País</div>
                        <div className="text-xs text-gray-700 mt-1">Presencia nacional</div>
                    </div>
                </div>

                {/* 2-Column Feature Showcase */}
                <div className="grid lg:grid-cols-2 gap-10 items-center max-w-6xl mx-auto bg-[#f8fafc] rounded-3xl p-8 sm:p-12 border border-gray-100">
                    <div className="space-y-6">
                        <div className="inline-flex items-center gap-2 text-xs font-bold text-primary uppercase bg-primary/10 px-3 py-1 rounded-full">
                            <Calendar className="w-4 h-4" /> 1 al 6 de Diciembre de 2026 · Yopal
                        </div>
                        <h3 className="text-2xl sm:text-3xl font-bold text-midnightblue leading-tight">
                            Una experiencia formativa y competitiva inigualable
                        </h3>
                        <p className="text-gray-700 leading-relaxed text-sm sm:text-base">
                            Organizado por la <strong>Promotora Deportiva Nuevas Estrellas</strong>, este certamen ofrece escenarios de primer nivel en Yopal, terna arbitral profesional en todos los encuentros, hidratación de calidad internacional con Electrolit y cobertura mediática permanente.
                        </p>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                            <div className="flex items-start gap-3">
                                <div className="w-8 h-8 rounded-lg bg-primary/10 text-primary flex items-center justify-center flex-shrink-0 font-bold text-sm">✓</div>
                                <div>
                                    <div className="font-bold text-midnightblue text-sm">4 Partidos Mínimos</div>
                                    <div className="text-xs text-gray-700">Fase de grupos y fases finales</div>
                                </div>
                            </div>
                            <div className="flex items-start gap-3">
                                <div className="w-8 h-8 rounded-lg bg-primary/10 text-primary flex items-center justify-center flex-shrink-0 font-bold text-sm">✓</div>
                                <div>
                                    <div className="font-bold text-midnightblue text-sm">Scouting en Directo</div>
                                    <div className="text-xs text-gray-700">Ojeadores de clubes profesionales</div>
                                </div>
                            </div>
                            <div className="flex items-start gap-3">
                                <div className="w-8 h-8 rounded-lg bg-primary/10 text-primary flex items-center justify-center flex-shrink-0 font-bold text-sm">✓</div>
                                <div>
                                    <div className="font-bold text-midnightblue text-sm">Capacitación a DTs</div>
                                    <div className="text-xs text-gray-700">Clínica técnica especializada</div>
                                </div>
                            </div>
                            <div className="flex items-start gap-3">
                                <div className="w-8 h-8 rounded-lg bg-primary/10 text-primary flex items-center justify-center flex-shrink-0 font-bold text-sm">✓</div>
                                <div>
                                    <div className="font-bold text-midnightblue text-sm">Balón Oficial Keiros</div>
                                    <div className="text-xs text-gray-700">Balón profesional en juego</div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="relative h-[320px] sm:h-[380px] rounded-2xl overflow-hidden shadow-lg border border-gray-200">
                        <Image
                            src="/equipo muchachos 2-1.jpg"
                            alt="Jóvenes futbolistas del Torneo Nuevas Estrellas"
                            fill
                            className="object-cover"
                            sizes="(max-width: 1024px) 100vw, 550px"
                        />
                    </div>
                </div>

                {/* Link to /torneos/ at the bottom of the section */}
                <div className="mt-12 text-center">
                    <Link
                        href="/torneos/"
                        className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-midnightblue text-white font-semibold text-sm sm:text-base hover:bg-blue-900 transition-all shadow-sm group"
                    >
                        <span>Ver todos los detalles e históricos</span>
                        <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </Link>
                </div>
            </div>
        </section>
    );
}
