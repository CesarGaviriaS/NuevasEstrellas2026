import Image from 'next/image';

interface TalentSectionProps {
    image?: string;
}

export default function TalentSection({ image }: TalentSectionProps) {
    const sectionImage = image || "/sub 18 canteranos patriotas foto aereopuerto a argentinajpg.jpg";

    return (
        <section className="py-20 bg-midnightblue text-white">
            <div className="mx-auto w-full responsive-padding">
                <div className="grid md:grid-cols-2 gap-8 lg:gap-12 items-center">
                    <div className="order-2 md:order-1 relative h-[280px] sm:h-[360px] md:h-[420px] w-full rounded-xl overflow-hidden shadow-lg">
                        <Image
                            src={sectionImage}
                            alt="Apoyando el Talento Colombiano"
                            fill
                            className="object-cover"
                            sizes="(max-width: 768px) 100vw, 50vw"
                        />
                    </div>
                    <div className="order-1 md:order-2">
                        <span className="inline-block px-4 py-2 sm:py-3 bg-secondary/30 text-white rounded-full text-xs sm:text-sm font-semibold mb-4">
                            TALENTO COLOMBIANO
                        </span>
                        <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold pb-4 sm:pb-6 leading-tight">
                            Gestionamos Alianzas para Impulsar el Talento
                        </h2>
                        <p className="text-white/90 pb-4">
                            Articulamos una red de oportunidades entre clubes aficionados que buscan proyectar a sus jugadores y clubes profesionales que están en constante búsqueda de nuevos talentos colombianos.
                        </p>
                        <p className="text-white/90 pb-4">
                            Para Nuevas Estrellas el fútbol no tiene fronteras, es un mundo con oportunidades. Programas de viajes, intercambios, scouting internacional, visibilidad y oportunidades reales.
                        </p>
                        <p className="text-white/90">
                            Formamos parte de la misión de impulsar el desarrollo integral y la visibilidad de jóvenes futbolistas talentosos de Colombia, conectándolos con clubes profesionales, formadores de élite y oportunidades reales en el fútbol competitivo.
                        </p>
                    </div>
                </div>
            </div>
        </section>
    );
}
