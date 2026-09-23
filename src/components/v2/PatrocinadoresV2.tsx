import Image from 'next/image';
import SponsorsCarousel from '@/components/ui/SponsorsCarousel';
import { Handshake } from 'lucide-react';

const sponsors2026 = [
    { name: "Electrolit", logo: "/patrocinadores/logo elecrolit.png" },
    { name: "Keiros Balón Oficial", logo: "/patrocinadores/balones keiros.png" },
    { name: "Gobernación de Casanare", logo: "/logo-copa-simple.png" },
    { name: "INDERCAS", logo: "/logo-nuevas-estrellas.png" },
    { name: "Varsan", logo: "/patrocinadores/LOGO VARSAN PNG.png" },
    { name: "IDRY Yopal", logo: "/logo-copa-simple.png" },
    { name: "Liga de Fútbol de Casanare", logo: "/logo-nuevas-estrellas.png" },
    { name: "Fundación Creando Progreso", logo: "/logo-copa-simple.png" },
    { name: "Criollanos F.C.", logo: "/logo-nuevas-estrellas.png" },
    { name: "Dr. Camilo Camargo - Medicina Deportiva", logo: "/logo-copa-simple.png" },
];

const aliadosInstitucionales = [
    { nombre: 'ELECTROLIT', rol: 'Patrocinador Oficial del Torneo' },
    { nombre: 'BALONES KEIROS', rol: 'Balón Oficial de Competencia' },
    { nombre: 'GOBERNACIÓN DE CASANARE', rol: 'Apoyo Institucional Departamental' },
    { nombre: 'INDERCAS', rol: 'Instituto Departamental de Deportes' },
    { nombre: 'IDRY', rol: 'Instituto de Deporte y Recreación de Yopal' },
    { nombre: 'LIGA DE FÚTBOL DE CASANARE', rol: 'Aval y Respaldo Deportivo' },
    { nombre: 'FUNDACIÓN CREANDO PROGRESO', rol: 'Impacto y Desarrollo Social' },
    { nombre: 'CRIOLLANOS F.C.', rol: 'Club Aliado Regional' },
    { nombre: 'DR. CAMILO CAMARGO', rol: 'Medicina Deportiva y Acompañamiento' },
];

export default function PatrocinadoresV2() {
    return (
        <section id="patrocinadores" className="py-20 bg-midnightblue text-white">
            <div className="mx-auto w-full responsive-padding">
                <div className="text-center pb-12 max-w-3xl mx-auto">
                    <span className="inline-flex items-center gap-2 px-4 py-1.5 bg-secondary/30 text-white font-bold rounded-full text-xs sm:text-sm uppercase tracking-wider mb-3">
                        <Handshake className="w-4 h-4" />
                        Alianzas Estratégicas 2026
                    </span>
                    <h2 className="text-3xl md:text-5xl font-bold pb-4">
                        Patrocinadores e Instituciones Aliadas
                    </h2>
                    <p className="text-white/80 text-base sm:text-lg leading-relaxed">
                        Agradecemos el respaldo de las marcas y entidades que impulsan el desarrollo del fútbol juvenil en Colombia y hacen posible la edición 2026 en Yopal, Casanare.
                    </p>
                </div>

                {/* Sponsors Carousel */}
                <div className="mt-4 mb-14">
                    <SponsorsCarousel sponsors={sponsors2026} />
                </div>

                {/* Grid of Institutional Allies */}
                <div className="max-w-5xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 pt-4 border-t border-white/10">
                    {aliadosInstitucionales.map((aliado, idx) => (
                        <div
                            key={idx}
                            className="bg-white/5 border border-white/10 rounded-2xl p-4 flex flex-col justify-center hover:bg-white/10 transition-colors"
                        >
                            <span className="font-bold text-amber-300 text-sm mb-0.5">
                                {aliado.nombre}
                            </span>
                            <span className="text-xs text-white/70">
                                {aliado.rol}
                            </span>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
