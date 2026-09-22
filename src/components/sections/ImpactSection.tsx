import Image from 'next/image';
import StarList from '@/components/ui/StarList';
import { impactText as defaultImpactText } from '@/lib/data';

interface ImpactSectionProps {
    text?: string;
    bgImage?: string;
}

export default function ImpactSection({ text = defaultImpactText, bgImage }: ImpactSectionProps) {
    const backgroundImage = bgImage || "/fond nuestro impacto.png";

    return (
        <section id="impact" className="relative py-20 bg-midnightblue text-white overflow-hidden">
            {/* Background Image */}
            <div className="absolute inset-0 z-0">
                <Image
                    src={backgroundImage}
                    alt="Background"
                    fill
                    className="object-cover"
                    quality={100}
                    priority
                />
                {/* Blue Overlay */}
                <div className="absolute inset-0 bg-midnightblue/90" />
            </div>

            <div className="relative z-10 mx-auto w-full responsive-padding">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                    <div className="max-w-3xl">
                        <span className="inline-block px-4 py-3 bg-secondary/30 text-white rounded-full text-sm mb-4">
                            NUESTRO IMPACTO
                        </span>
                        <h2 className="text-3xl md:text-4xl font-bold pb-6">
                            Estrellas que brillan, reflejo de nuestro compromiso
                        </h2>
                        <p className="text-lg pb-6 leading-relaxed">
                            {text}
                        </p>
                        <p className="text-lg pb-6 leading-relaxed">
                            Sus logros nos motivan a seguir buscando las nuevas estrellas. Para Nuevas Estrellas el fútbol no tiene fronteras, es un mundo con oportunidades.
                        </p>
                        <p className="text-lg pb-8 leading-relaxed">
                            Gestionamos Alianzas para impulsar el talento. Articulamos una red de oportunidades entre clubes aficionados que buscan proyectar a sus jugadores y clubes profesionales que están en constante búsqueda de nuevos talentos colombianos.
                        </p>

                        {/* Star List - Mobile Only */}
                        <div className="lg:hidden mb-8">
                            <StarList />
                        </div>

                        <div className="flex gap-4 flex-wrap">
                            <div className="relative h-20 w-40">
                                <Image
                                    src="/logo nuevas estrellas con letras.png"
                                    alt="Nuevas Estrellas"
                                    fill
                                    className="object-contain filter brightness-0 invert"
                                    sizes="160px"
                                />
                            </div>
                            <div className="relative h-20 w-40">
                                <Image
                                    src="/logo torneo nuevas estrellas.png"
                                    alt="Torneo"
                                    fill
                                    className="object-contain filter brightness-0 invert"
                                    sizes="160px"
                                />
                            </div>
                        </div>
                    </div>

                    {/* Star List - Desktop Only */}
                    <div className="hidden lg:flex justify-center items-center">
                        <StarList />
                    </div>
                </div>
            </div>
        </section>
    );
}
