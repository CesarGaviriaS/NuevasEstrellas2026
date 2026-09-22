import Image from 'next/image';
import { Eye, Users, CheckCircle2 } from 'lucide-react';

const scoutsList = [
    { name: 'Santa Fe', logo: '/EscudosFutbol/santafe.png' },
    { name: 'Atlético Nacional', logo: '/EscudosFutbol/nacional.png' },
    { name: 'Junior FC', logo: '/EscudosFutbol/junior.png' },
    { name: 'América de Cali', logo: '/EscudosFutbol/america.jpg' },
    { name: 'Millonarios FC', logo: '/EscudosFutbol/Millonarios.png' },
    { name: 'Deportes Tolima', logo: '/EscudosFutbol/D_Tolima.png' },
    { name: 'Once Caldas', logo: '/EscudosFutbol/oncecaldas.png' },
    { name: 'Fortaleza CEIF', logo: '/EscudosFutbol/fortaleza.png' },
    { name: 'Cúcuta Deportivo', logo: '/EscudosFutbol/cucuta.png' },
    { name: 'Jaguares FC', logo: '/EscudosFutbol/jaguares.png' },
    { name: 'Boyacá Chicó', logo: '/EscudosFutbol/bChico.png' },
    { name: 'Llaneros FC', logo: '/EscudosFutbol/llanerosFC.png' },
    { name: 'La Equidad', logo: '/EscudosFutbol/equidad.png' },
    { name: 'Real Santander', logo: '/EscudosFutbol/R_santander.png' },
    { name: 'Bogotá FC', logo: '/EscudosFutbol/BogotaFC.png' },
    { name: 'Real Cundinamarca', logo: '/EscudosFutbol/realcundinamarca.png' },
];

export default function ScoutsV2() {
    return (
        <section id="scouts" className="py-20 bg-white">
            <div className="mx-auto w-full responsive-padding">
                <div className="text-center max-w-3xl mx-auto pb-14">
                    <span className="inline-block px-4 py-1.5 bg-primary/10 text-primary font-bold rounded-full text-xs sm:text-sm uppercase tracking-wider mb-3">
                        Vitrina de Scouting Profesional
                    </span>
                    <h2 className="text-3xl md:text-5xl font-bold text-midnightblue leading-tight pb-4">
                        Ojeadores y Clubes en Seguimiento
                    </h2>
                    <p className="text-base sm:text-lg text-gray-700 leading-relaxed">
                        El Torneo Nuevas Estrellas es el escenario donde los cazatalentos del Fútbol Profesional Colombiano e internacional descubren a las futuras figuras de nuestro balompié.
                    </p>
                </div>

                {/* Clubs Grid */}
                <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-8 gap-4 max-w-6xl mx-auto pb-12">
                    {scoutsList.map((club, idx) => (
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
                            <span className="text-[11px] font-semibold text-center text-midnightblue line-clamp-1">
                                {club.name}
                            </span>
                        </div>
                    ))}
                </div>

                {/* Info highlight */}
                <div className="max-w-4xl mx-auto bg-[#f8fafc] border border-primary/20 rounded-2xl p-6 sm:p-8 flex flex-col sm:flex-row items-center gap-6">
                    <div className="w-14 h-14 rounded-full bg-primary text-white flex items-center justify-center flex-shrink-0">
                        <Eye className="w-7 h-7" />
                    </div>
                    <div className="space-y-1 text-center sm:text-left">
                        <h4 className="text-lg font-bold text-midnightblue">
                            Informes Técnicos Individuales y Contacto Directo
                        </h4>
                        <p className="text-sm text-gray-700 leading-relaxed">
                            Los futbolistas destacados reciben seguimiento técnico y retroalimentación directa con los directores de scouting y captación de talento de los clubes participantes.
                        </p>
                    </div>
                </div>
            </div>
        </section>
    );
}
