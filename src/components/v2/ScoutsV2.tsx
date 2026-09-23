import Image from 'next/image';
import { Eye, CheckCircle2, Trophy, Award } from 'lucide-react';

const invitedClubs = [
    { name: 'Patriotas Boyacá', logo: '/EscudosFutbol/bChico.png' },
    { name: 'Bogotá F.C.', logo: '/EscudosFutbol/BogotaFC.png' },
    { name: 'Real Cundinamarca', logo: '/EscudosFutbol/realcundinamarca.png' },
    { name: 'Cúcuta Deportivo', logo: '/EscudosFutbol/cucuta.png' },
    { name: 'Atlético Junior', logo: '/EscudosFutbol/junior.png' },
    { name: 'Barranquilla F.C.', logo: '/EscudosFutbol/junior.png' },
    { name: 'Independiente Santa Fe', logo: '/EscudosFutbol/santafe.png' },
    { name: 'Fortaleza CEIF', logo: '/EscudosFutbol/fortaleza.png' },
    { name: 'Atlético Nacional', logo: '/EscudosFutbol/nacional.png' },
    { name: 'América de Cali', logo: '/EscudosFutbol/america.jpg' },
    { name: 'Millonarios FC', logo: '/EscudosFutbol/Millonarios.png' },
    { name: 'Deportes Tolima', logo: '/EscudosFutbol/D_Tolima.png' },
];

export default function ScoutsV2() {
    return (
        <section id="scouts" className="py-20 bg-white border-t border-gray-100">
            <div className="mx-auto w-full responsive-padding">
                <div className="text-center max-w-3xl mx-auto pb-14">
                    <span className="inline-flex items-center gap-2 px-4 py-1.5 bg-primary/10 text-primary font-bold rounded-full text-xs sm:text-sm uppercase tracking-wider mb-3">
                        <Eye className="w-4 h-4" />
                        Scouting y Selección de Jugadores
                    </span>
                    <h2 className="text-3xl md:text-5xl font-bold text-midnightblue leading-tight pb-4">
                        El talento estará en Yopal… Los scouts también.
                    </h2>
                    <p className="text-base sm:text-lg text-gray-700 leading-relaxed font-medium">
                        El Torneo Nuevas Estrellas Electrolit 2026 será una plataforma de observación y proyección para jóvenes futbolistas con talento y potencial para llegar al fútbol profesional.
                    </p>
                    <p className="text-xs sm:text-sm text-gray-600 mt-2">
                        La organización ha extendido invitación a 12 clubes profesionales y trabaja para contar con la presencia de entre 6 y 8 clubes durante el torneo, cuyos scouts estarán atentos al desempeño de los jugadores con mayor proyección.
                    </p>
                </div>

                {/* Clubs Grid */}
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4 max-w-6xl mx-auto pb-12">
                    {invitedClubs.map((club, idx) => (
                        <div
                            key={idx}
                            className="bg-[#f8fafc] border border-gray-100 rounded-2xl p-4 flex flex-col items-center justify-center hover:bg-white hover:shadow-md hover:border-gray-200 transition-all group"
                        >
                            <div className="relative w-14 h-14 mb-2 flex items-center justify-center">
                                <Image
                                    src={club.logo}
                                    alt={`Escudo ${club.name}`}
                                    fill
                                    className="object-contain p-1 group-hover:scale-105 transition-transform"
                                    sizes="60px"
                                />
                            </div>
                            <span className="text-[11px] font-bold text-center text-midnightblue line-clamp-1">
                                {club.name}
                            </span>
                            <span className="text-[10px] text-gray-500 font-medium">Club Invitado</span>
                        </div>
                    ))}
                </div>

                {/* Evaluation Criteria Details */}
                <div className="max-w-4xl mx-auto bg-[#f8fafc] rounded-3xl p-6 sm:p-8 border border-gray-200">
                    <h3 className="text-lg font-bold text-midnightblue mb-4 text-center">
                        Criterios de Observación y Evaluación de los Scouts
                    </h3>
                    <div className="grid sm:grid-cols-2 gap-4 text-xs sm:text-sm text-gray-700">
                        <div className="flex items-start gap-3 bg-white p-4 rounded-xl border border-gray-100">
                            <CheckCircle2 className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                            <div>
                                <span className="font-bold text-midnightblue block">Rendimiento Deportivo:</span>
                                Toma de decisiones, lectura de juego en tiempo real y regularidad en los 6 días de competencia.
                            </div>
                        </div>
                        <div className="flex items-start gap-3 bg-white p-4 rounded-xl border border-gray-100">
                            <CheckCircle2 className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                            <div>
                                <span className="font-bold text-midnightblue block">Condiciones Técnicas y Físicas:</span>
                                Fundamentos con balón, velocidad, biotipo y capacidad atlética en su posición natural.
                            </div>
                        </div>
                        <div className="flex items-start gap-3 bg-white p-4 rounded-xl border border-gray-100">
                            <CheckCircle2 className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                            <div>
                                <span className="font-bold text-midnightblue block">Comportamiento Competitivo:</span>
                                Disciplina táctica, liderazgo, trabajo en equipo y actitud en situaciones de alta presión.
                            </div>
                        </div>
                        <div className="flex items-start gap-3 bg-white p-4 rounded-xl border border-gray-100">
                            <CheckCircle2 className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                            <div>
                                <span className="font-bold text-midnightblue block">Seguimiento Institucional:</span>
                                Los jugadores de mayor proyección podrán ser considerados para convocatorias y pruebas directas en clubes.
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
