import Image from 'next/image';

interface AwardsSectionProps {
    image?: string;
}

export default function AwardsSection({ image }: AwardsSectionProps) {
    const sectionImage = image || "/premios 4x3 horizotal.jpg";

    return (
        <section className="py-20 bg-midnightblue text-white hidden">
            <div className="mx-auto w-full responsive-padding">
                <div className="text-center pb-12">
                    <span className="inline-block px-4 py-3 bg-secondary/30 text-white rounded-full text-sm mb-4">
                        LOGROS Y RECONOCIMIENTOS
                    </span>
                    <h2 className="text-3xl md:text-4xl font-bold pb-6">
                        Nuestros Logros Hablan por Sí Solos
                    </h2>
                    <p className="text-lg pb-8 max-w-2xl mx-auto">
                        Cada trofeo representa el esfuerzo, dedicación y talento de nuestros futbolistas. Estos logros reflejan nuestro compromiso con la excelencia y el desarrollo del fútbol juvenil colombiano.
                    </p>
                </div>
                <div className="flex justify-center relative h-[400px] w-full max-w-2xl mx-auto">
                    <Image
                        src={sectionImage}
                        alt="Premios y Logros del Torneo Nuevas Estrellas"
                        fill
                        className="rounded-lg shadow-lg object-cover"
                        sizes="(max-width: 768px) 100vw, 672px"
                    />
                </div>
            </div>
        </section>
    );
}
