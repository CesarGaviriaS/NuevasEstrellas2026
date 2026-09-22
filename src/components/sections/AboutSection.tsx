import Image from 'next/image';
import { impactText } from '@/lib/data';

export default function AboutSection() {
    return (
        <section id="about" className="py-20 md:py-28 bg-midnightblue text-white">
            <div className="mx-auto w-full responsive-padding">
                <div className="grid md:grid-cols-2 items-center gap-8 lg:gap-16">
                    <div className="relative h-[280px] sm:h-[360px] md:h-[420px] w-full rounded-xl overflow-hidden shadow-lg">
                        <Image
                            src="/muchacho corazon  fondo vertical.jpg"
                            alt="About Nuevas Estrellas"
                            fill
                            className="object-cover"
                            sizes="(max-width: 768px) 100vw, 50vw"
                        />
                    </div>
                    <div>
                        <span className="inline-block px-4 py-2 sm:py-3 bg-secondary/30 text-white rounded-full text-xs sm:text-sm font-semibold mb-4">
                            NUESTRA ESENCIA
                        </span>
                        <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold pb-6 leading-tight">
                            Nuevas Estrellas - Impulsando el desarrollo integral de jóvenes futbolistas talentosos
                        </h2>
                        <p className="text-white/90 pb-4 text-base sm:text-lg leading-relaxed">
                            Impulsar el desarrollo integral y la visibilidad de jóvenes futbolistas talentosos de Colombia, conectándolos con clubes profesionales, formadores de élite y oportunidades reales en el fútbol competitivo.
                        </p>
                        <p className="text-white text-lg leading-relaxed">
                            {impactText} Sus logros nos motivan a seguir buscando las nuevas estrellas.
                        </p>
                    </div>
                </div>
            </div>
        </section>
    );
}
