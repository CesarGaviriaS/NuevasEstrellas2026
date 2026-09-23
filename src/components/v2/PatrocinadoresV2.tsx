import SponsorsCarousel from '@/components/ui/SponsorsCarousel';

const sponsors2026 = [
    { name: "Electrolit", logo: "/patrocinadores/logo elecrolit.png" },
    { name: "Keiros Balón Oficial", logo: "/patrocinadores/balones keiros.png" },
    { name: "Gobernación de Casanare", logo: "/logo-copa-simple.png" },
    { name: "INDERCAS", logo: "/logo-nuevas-estrellas.png" },
    { name: "Varsan", logo: "/patrocinadores/LOGO VARSAN PNG.png" },
];

export default function PatrocinadoresV2() {
    return (
        <section id="patrocinadores" className="py-20 bg-midnightblue text-white">
            <div className="mx-auto w-full responsive-padding">
                <div className="text-center pb-12 max-w-3xl mx-auto">
                    <span className="inline-block px-4 py-1.5 bg-secondary/30 text-white font-bold rounded-full text-xs sm:text-sm uppercase tracking-wider mb-3">
                        Alianzas Estratégicas
                    </span>
                    <h2 className="text-3xl md:text-5xl font-bold pb-4">
                        Patrocinadores e Instituciones Aliadas
                    </h2>
                    <p className="text-white/80 text-base sm:text-lg leading-relaxed">
                        Agradecemos el respaldo de marcas y entidades que impulsan el desarrollo del fútbol juvenil en Colombia y hacen posible la edición 2026 en Yopal, Casanare.
                    </p>
                </div>
                <div className="mt-8">
                    <SponsorsCarousel sponsors={sponsors2026} />
                </div>
            </div>
        </section>
    );
}
