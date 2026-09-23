import Image from 'next/image';
import { Star, Trophy, Sparkles, TrendingUp } from 'lucide-react';

const successStories = [
    {
        name: 'Jhon Arias',
        role: 'Extremo / Selección Colombia',
        club: 'Fluminense FC',
        achievement: 'Campeón de Copa Libertadores y referente de la Selección Colombia de Mayores.',
        badge: 'Selección Colombia'
    },
    {
        name: 'Devis Vásquez',
        role: 'Guardameta',
        club: 'AC Milan / Empoli FC',
        achievement: 'Proyectado al fútbol europeo y Serie A de Italia tras destacada formación juvenil.',
        badge: 'Fútbol Europeo'
    },
    {
        name: 'Wason Rentería',
        role: 'Delantero',
        club: 'FC Porto / Selección Colombia',
        achievement: 'Campeón de Europa con FC Porto y goleador histórico de procesos juveniles.',
        badge: 'Ex Selección Colombia'
    },
    {
        name: 'Cristian Martínez Borja',
        role: 'Delantero',
        club: 'América de Cali / LDU Quito',
        achievement: 'Goleador y campeón en múltiples torneos de Primera División en Colombia y Ecuador.',
        badge: 'FPC Élite'
    },
    {
        name: 'Larry Vásquez',
        role: 'Volante de Primera Línea',
        club: 'Millonarios FC / Junior',
        achievement: 'Múltiple campeón del Fútbol Profesional Colombiano y referente en la mitad del campo.',
        badge: 'Campeón FPC'
    },
    {
        name: 'Raúl Loaiza',
        role: 'Mediocampista Central',
        club: 'Lanús / San Lorenzo',
        achievement: 'Destacada trayectoria en la Primera División de Argentina y torneos Conmebol.',
        badge: 'Fútbol Internacional'
    },
    {
        name: 'Leonardo Pico',
        role: 'Centrocampista',
        club: 'Junior FC / Santa Fe',
        achievement: 'Múltiples títulos de Liga y Copa Colombia en los clubes más tradicionales del país.',
        badge: 'Campeón FPC'
    },
    {
        name: 'Cristian Barrios',
        role: 'Extremo Ofensivo',
        club: 'América de Cali',
        achievement: 'Figura desequilibrante del FPC con proyección a convocatorias de Selección.',
        badge: 'FPC Élite'
    }
];

export default function HistoriasExitoV2() {
    return (
        <section className="py-20 bg-gradient-to-b from-white to-gray-50 border-t border-gray-100">
            <div className="mx-auto w-full responsive-padding">
                <div className="text-center max-w-3xl mx-auto pb-14">
                    <span className="inline-flex items-center gap-2 px-4 py-1.5 bg-amber-500/10 text-amber-700 font-bold rounded-full text-xs sm:text-sm uppercase tracking-wider mb-3">
                        <Trophy className="w-4 h-4 text-amber-600" />
                        Huella y Trayectoria
                    </span>
                    <h2 className="text-3xl md:text-5xl font-bold text-midnightblue leading-tight pb-4">
                        Talentos Formados y Proyectados
                    </h2>
                    <p className="text-base sm:text-lg text-gray-700 leading-relaxed font-medium">
                        Más de 20 años acompañando el camino de futbolistas que hoy triunfan en Colombia y el mundo.
                    </p>
                    <p className="text-xs sm:text-sm text-gray-500 mt-2">
                        Actualmente, cerca de 30 jugadores surgidos de nuestros procesos y torneos integran planteles profesionales y juveniles élite en 9 clubes del FPC.
                    </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
                    {successStories.map((player, idx) => (
                        <div
                            key={idx}
                            className="bg-white rounded-2xl p-6 border border-gray-200/80 shadow-sm hover:shadow-lg transition-all duration-300 hover:-translate-y-1 flex flex-col justify-between"
                        >
                            <div>
                                <div className="flex items-center justify-between mb-4">
                                    <span className="text-[11px] font-bold px-3 py-1 bg-primary/10 text-primary rounded-full">
                                        {player.badge}
                                    </span>
                                    <Star className="w-4 h-4 text-amber-500 fill-amber-500" />
                                </div>
                                <h3 className="text-lg font-bold text-midnightblue mb-1">
                                    {player.name}
                                </h3>
                                <p className="text-xs font-semibold text-primary mb-2">
                                    {player.role} · <span className="text-gray-600">{player.club}</span>
                                </p>
                                <p className="text-xs text-gray-600 leading-relaxed">
                                    {player.achievement}
                                </p>
                            </div>

                            <div className="pt-4 mt-4 border-t border-gray-100 flex items-center gap-2 text-[11px] font-semibold text-gray-500">
                                <TrendingUp className="w-3.5 h-3.5 text-emerald-600" />
                                <span>Proceso Formativo Nuevas Estrellas</span>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Banner Callout */}
                <div className="mt-12 max-w-4xl mx-auto bg-midnightblue text-white rounded-3xl p-8 sm:p-10 text-center shadow-xl relative overflow-hidden">
                    <div className="relative z-10">
                        <h3 className="text-xl sm:text-3xl font-extrabold mb-3">
                            «Tú pones el talento… Nosotros ponemos el camino»
                        </h3>
                        <p className="text-sm sm:text-base text-white/80 max-w-2xl mx-auto mb-6">
                            El Torneo Nuevas Estrellas Electrolit 2026 en Yopal es la oportunidad para que tu equipo y tus jugadores sean observados directamente por veedores de clubes profesionales.
                        </p>
                        <a
                            href="/inscripciones"
                            className="inline-block bg-amber-400 hover:bg-amber-300 text-midnightblue font-bold px-8 py-3.5 rounded-full shadow-lg transition-all text-sm sm:text-base"
                        >
                            Inscribir Equipo al Torneo 2026
                        </a>
                    </div>
                </div>
            </div>
        </section>
    );
}
