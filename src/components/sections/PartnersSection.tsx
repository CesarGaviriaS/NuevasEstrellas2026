import { sponsors as defaultSponsors } from '@/lib/data';
import SponsorsCarousel from '@/components/ui/SponsorsCarousel';

interface PartnersSectionProps {
    title?: string;
    description?: string;
    sponsors?: Array<{ name: string; logo: string }>;
}

export default function PartnersSection({
    title = "Nuestros Patrocinadores",
    description = "Estamos orgullosos de colaborar con estos aliados clave. Su apoyo vital ayuda a Nuevas Estrellas a impulsar el desarrollo del talento juvenil en el fútbol colombiano.",
    sponsors
}: PartnersSectionProps) {
    const list = sponsors && sponsors.length > 0 ? sponsors : defaultSponsors;
    return (
        <section className="py-20 bg-midnightblue text-white">
            <div className="mx-auto w-full responsive-padding">
                <div className="text-center pb-12">
                    <span className="inline-block px-4 py-3 bg-secondary/30 text-white rounded-full text-sm mb-4">
                        PATROCINADORES
                    </span>
                    <h2 className="text-3xl md:text-4xl font-bold pb-4">{title}</h2>
                    <p className="text-white/90 max-w-2xl mx-auto leading-relaxed">
                        {description}
                    </p>
                </div>
                <div className="mt-8">
                    <SponsorsCarousel sponsors={list} />
                </div>
            </div>
        </section>
    );
}
