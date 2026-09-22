import { MapPin, Check } from 'lucide-react';

const sedes = [
    {
        name: 'Complejo Deportivo Los Hobos',
        city: 'Yopal, Casanare',
        type: 'Canchas Sintéticas y Naturales Reglamentarias',
        description: 'Sede principal del torneo, con instalaciones modernas, camerinos equipados y graderías cubiertas para delegaciones y familias.',
        features: ['Iluminación profesional', 'Zona médica y de hidratación', 'Acceso vial rápido']
    },
    {
        name: 'Estadio Santiago de las Atalayas',
        city: 'Yopal, Casanare',
        type: 'Gramado Natural Profesional',
        description: 'Escenario insigne del departamento de Casanare con capacidad para grandes eventos y fases definitivas del torneo.',
        features: ['Cancha de fútbol 11 profesional', 'Tribunas para espectadores', 'Cabinas de transmisión']
    },
    {
        name: 'Canchas Auxiliares Pier Lora Muñoz',
        city: 'Yopal, Casanare',
        type: 'Escenario Deportivo Municipal',
        description: 'Espacios complementarios diseñados para el desarrollo ágil de la fase de grupos y entrenamientos de las delegaciones.',
        features: ['Gramado óptimo', 'Ubicación céntrica', 'Seguridad permanente']
    },
];

export default function SedesV2() {
    return (
        <section id="sedes" className="py-20 bg-[#f8fafc] border-t border-b border-gray-100">
            <div className="mx-auto w-full responsive-padding">
                <div className="text-center max-w-3xl mx-auto pb-14">
                    <span className="inline-block px-4 py-1.5 bg-primary/10 text-primary font-bold rounded-full text-xs sm:text-sm uppercase tracking-wider mb-3">
                        Escenarios Deportivos
                    </span>
                    <h2 className="text-3xl md:text-5xl font-bold text-midnightblue leading-tight pb-4">
                        Sedes Oficiales en Yopal, Casanare
                    </h2>
                    <p className="text-base sm:text-lg text-gray-700 leading-relaxed">
                        Canchas de primer nivel para brindar las mejores condiciones técnicas y de seguridad a todos los deportistas.
                    </p>
                </div>

                <div className="grid md:grid-cols-3 gap-6 max-w-6xl mx-auto">
                    {sedes.map((sede, idx) => (
                        <div
                            key={idx}
                            className="bg-white rounded-2xl p-7 border border-gray-200 shadow-sm hover:shadow-md transition-all flex flex-col justify-between"
                        >
                            <div>
                                <div className="w-10 h-10 rounded-full bg-primary/10 text-primary flex items-center justify-center mb-4">
                                    <MapPin className="w-5 h-5" />
                                </div>
                                <h3 className="text-xl font-bold text-midnightblue mb-1">{sede.name}</h3>
                                <div className="text-xs font-semibold text-primary mb-3">{sede.type} · {sede.city}</div>
                                <p className="text-gray-700 text-sm leading-relaxed mb-6">
                                    {sede.description}
                                </p>
                            </div>

                            <div className="border-t border-gray-100 pt-4 space-y-2">
                                {sede.features.map((feat, fIdx) => (
                                    <div key={fIdx} className="flex items-center gap-2 text-xs text-gray-700">
                                        <Check className="w-3.5 h-3.5 text-primary flex-shrink-0" />
                                        <span>{feat}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
