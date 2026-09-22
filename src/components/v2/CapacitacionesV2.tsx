import { GraduationCap, CheckCircle2, BookOpen, Sparkles } from 'lucide-react';
import Image from 'next/image';

const highlights = [
    "Metodología moderna de entrenamiento formativo infanto-juvenil.",
    "Modelos de juego, principios tácticos y periodización en el fútbol base.",
    "Aspectos psicológicos y desarrollo integral del joven deportista.",
    "Certificado oficial de participación avalado por la Promotora Deportiva Nuevas Estrellas.",
];

export default function CapacitacionesV2() {
    return (
        <section className="py-20 bg-[#f8fafc] border-t border-b border-gray-100">
            <div className="mx-auto w-full responsive-padding">
                <div className="grid lg:grid-cols-2 gap-10 items-center max-w-6xl mx-auto">
                    <div className="space-y-6">
                        <span className="inline-block px-4 py-1.5 bg-primary/10 text-primary font-bold rounded-full text-xs sm:text-sm uppercase tracking-wider">
                            Formación Académica y Técnica
                        </span>
                        <h2 className="text-3xl sm:text-4xl font-bold text-midnightblue leading-tight">
                            Clínica de Capacitación para Entrenadores
                        </h2>
                        <p className="text-gray-700 leading-relaxed text-sm sm:text-base">
                            Durante los días del torneo en Yopal, los directores técnicos y formadores de todos los clubes inscritos tendrán acceso exclusivo a jornadas de actualización metodológica y conceptual dictadas por profesionales de amplia trayectoria.
                        </p>

                        <div className="space-y-3 pt-2">
                            {highlights.map((item, idx) => (
                                <div key={idx} className="flex items-start gap-3">
                                    <CheckCircle2 className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                                    <span className="text-sm text-gray-700">{item}</span>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="bg-white border border-gray-200 rounded-3xl p-8 shadow-sm space-y-6">
                        <div className="flex items-center gap-4 pb-4 border-b border-gray-100">
                            <div className="w-12 h-12 rounded-2xl bg-amber-100 text-amber-800 flex items-center justify-center font-bold">
                                <GraduationCap className="w-6 h-6" />
                            </div>
                            <div>
                                <h3 className="font-bold text-midnightblue text-lg">Inclusión Gratuita</h3>
                                <p className="text-xs text-gray-700">Incluido en la inscripción del equipo</p>
                            </div>
                        </div>

                        <p className="text-sm text-gray-700 leading-relaxed">
                            Buscamos que no solo jueguen los deportistas, sino que los cuerpos técnicos se enriquezcan de conocimientos para replicar mejores prácticas formativas en sus respectivas escuelas de fútbol a nivel nacional.
                        </p>

                        <div className="bg-[#f8fafc] rounded-xl p-4 border border-gray-100 text-xs text-gray-700 space-y-1">
                            <div className="font-semibold text-midnightblue">📍 Sede de las Charlas:</div>
                            <div>Auditorio oficial en Yopal (próximamente informaremos lugar y cronograma detallado de ponencias).</div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
