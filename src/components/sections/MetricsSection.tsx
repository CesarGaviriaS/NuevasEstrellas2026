interface MetricsSectionProps {
    participantes?: string;
    proyectados?: string;
    categorias?: string;
}

export default function MetricsSection({
    participantes = '1,200+',
    proyectados = '50+',
    categorias = '4'
}: MetricsSectionProps) {
    return (
        <section className="py-20 bg-white">
            <div className="mx-auto w-full responsive-padding">
                <h2 className="text-3xl md:text-4xl font-bold text-center pb-4 text-midnightblue">
                    Logros y Estadísticas del Torneo
                </h2>
                <p className="text-center text-gray-700 pb-12">Nuevas Estrellas ha logrado:</p>

                <div className="grid md:grid-cols-3 gap-12 max-w-5xl mx-auto">
                    <div className="text-center">
                        <span className="inline-block px-4 py-3 bg-secondary/30 text-primary rounded-full text-sm mb-4 font-semibold">
                            Participantes
                        </span>
                        <div className="text-5xl md:text-6xl font-bold text-primary pb-2">
                            {participantes}
                        </div>
                        <h3 className="text-xl font-bold pb-4 text-midnightblue">Futbolistas</h3>
                        <p className="text-gray-700 leading-relaxed">
                            En el Torneo Nuevas Estrellas Electrolit, representando clubes de 10 departamentos de Colombia.
                        </p>
                    </div>

                    <div className="text-center">
                        <span className="inline-block px-4 py-3 bg-secondary/30 text-primary rounded-full text-sm mb-4 font-semibold">
                            Proyectados
                        </span>
                        <div className="text-5xl md:text-6xl font-bold text-primary pb-2">
                            {proyectados}
                        </div>
                        <h3 className="text-xl font-bold pb-4 text-midnightblue">Futbolistas</h3>
                        <p className="text-gray-700 leading-relaxed">
                            Con asistencia de scouting y veedurías de 8 clubes profesionales que buscan nuevos talentos colombianos.
                        </p>
                    </div>

                    <div className="text-center">
                        <span className="inline-block px-4 py-3 bg-secondary/30 text-primary rounded-full text-sm mb-4 font-semibold">
                            Categorías
                        </span>
                        <div className="text-5xl md:text-6xl font-bold text-primary pb-2">
                            {categorias}
                        </div>
                        <h3 className="text-xl font-bold pb-4 text-midnightblue">Juveniles</h3>
                        <p className="text-gray-700 leading-relaxed">
                            Sub 12, sub 14, sub 16 y sub 18, brindando oportunidades de desarrollo para todas las edades.
                        </p>
                    </div>
                </div>
            </div>
        </section>
    );
}
