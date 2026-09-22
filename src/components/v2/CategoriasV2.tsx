import { Award, Users, Trophy } from 'lucide-react';

const categories = [
    {
        id: 'sub-12',
        name: 'SUB-12',
        birthYear: 'Jugadores nacidos en 2014 o después.',
        maxPlayers: 'Hasta 20 jugadores por equipo',
        note: null,
        badge: 'Infantil',
        badgeColor: 'bg-blue-100 text-blue-800'
    },
    {
        id: 'sub-14',
        name: 'SUB-14',
        birthYear: 'Jugadores nacidos en 2012 o después.',
        maxPlayers: 'Hasta 20 jugadores por equipo',
        note: null,
        badge: 'Pre-Juvenil',
        badgeColor: 'bg-amber-100 text-amber-800'
    },
    {
        id: 'sub-16',
        name: 'SUB-16',
        birthYear: 'Jugadores nacidos en 2010 o después.',
        maxPlayers: 'Hasta 20 jugadores por equipo',
        note: null,
        badge: 'Juvenil',
        badgeColor: 'bg-emerald-100 text-emerald-800'
    },
    {
        id: 'sub-18',
        name: 'SUB-18',
        birthYear: 'Jugadores nacidos en 2008 o después.',
        maxPlayers: 'Hasta 20 jugadores por equipo',
        note: 'Se permitirá la inscripción de hasta 5 jugadores nacidos en 2007.',
        badge: 'Élite',
        badgeColor: 'bg-purple-100 text-purple-800'
    },
];

export default function CategoriasV2() {
    return (
        <section id="categorias" className="py-20 bg-[#f8fafc] border-t border-b border-gray-100">
            <div className="mx-auto w-full responsive-padding">
                {/* Section Title */}
                <div className="text-center max-w-3xl mx-auto pb-14">
                    <span className="inline-block px-4 py-1.5 bg-primary/10 text-primary font-bold rounded-full text-xs sm:text-sm uppercase tracking-wider mb-3">
                        Estructura Competitiva
                    </span>
                    <h2 className="text-3xl md:text-5xl font-bold text-midnightblue leading-tight pb-4">
                        Categorías Oficiales
                    </h2>
                    <p className="text-base sm:text-lg text-gray-700 leading-relaxed">
                        El Torneo Nuevas Estrellas Electrolit 2026 contará con cuatro categorías:
                    </p>
                </div>

                {/* Categories Grid */}
                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-7xl mx-auto">
                    {categories.map((cat) => (
                        <div
                            key={cat.id}
                            className="bg-white rounded-2xl p-6 sm:p-8 shadow-sm hover:shadow-md transition-all duration-300 border border-gray-200 flex flex-col justify-between"
                        >
                            <div>
                                <div className="flex items-center justify-between mb-4">
                                    <span className={`text-xs font-bold px-3 py-1 rounded-full ${cat.badgeColor}`}>
                                        {cat.badge}
                                    </span>
                                    <Trophy className="w-5 h-5 text-primary opacity-60" />
                                </div>

                                <h3 className="text-3xl font-extrabold text-midnightblue mb-2">
                                    {cat.name}
                                </h3>
                                
                                <p className="text-sm font-semibold text-gray-800 mb-4">
                                    {cat.birthYear}
                                </p>

                                {cat.note && (
                                    <div className="bg-amber-50 border border-amber-200 text-amber-900 text-xs p-3 rounded-xl mb-4 font-medium leading-relaxed">
                                        <strong>Nota:</strong> {cat.note}
                                    </div>
                                )}
                            </div>

                            <div className="pt-4 border-t border-gray-100 text-xs text-gray-700">
                                <div className="flex items-center gap-2">
                                    <Users className="w-4 h-4 text-primary flex-shrink-0" />
                                    <span><strong>Planilla:</strong> {cat.maxPlayers}</span>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Sistema de Juego Box */}
                <div className="mt-12 max-w-4xl mx-auto bg-white border border-gray-200 rounded-2xl p-6 sm:p-8 shadow-sm flex flex-col sm:flex-row items-center gap-6">
                    <div className="w-16 h-16 rounded-full bg-primary/10 text-primary flex items-center justify-center flex-shrink-0">
                        <Award className="w-8 h-8" />
                    </div>
                    <div className="text-center sm:text-left space-y-1">
                        <h4 className="text-xl font-bold text-midnightblue">
                            Sistema de Juego
                        </h4>
                        <p className="text-sm text-gray-700 leading-relaxed">
                            En cada categoría, los equipos serán distribuidos en grupos de cuatro (todos contra todos). Los dos mejores de cada grupo avanzarán a Cuartos de Final, Semifinales y Gran Final. Los perdedores de semifinales disputarán el tercer y cuarto puesto.
                        </p>
                    </div>
                </div>
            </div>
        </section>
    );
}
