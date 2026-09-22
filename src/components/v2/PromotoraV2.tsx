import Image from 'next/image';
import { ShieldCheck, Award, Target, Users } from 'lucide-react';

export default function PromotoraV2() {
    return (
        <section id="promotora" className="py-20 bg-[#f8fafc] border-t border-b border-gray-100">
            <div className="mx-auto w-full responsive-padding">
                <div className="text-center max-w-3xl mx-auto pb-14">
                    <span className="inline-block px-4 py-1.5 bg-primary/10 text-primary font-bold rounded-full text-xs sm:text-sm uppercase tracking-wider mb-3">
                        Institucionalidad y Trayectoria
                    </span>
                    <h2 className="text-3xl md:text-5xl font-bold text-midnightblue leading-tight pb-4">
                        Promotora Deportiva Nuevas Estrellas
                    </h2>
                    <p className="text-base sm:text-lg text-gray-700 leading-relaxed">
                        Entidad dedicada a la captación, formación y proyección de jóvenes futbolistas hacia el profesionalismo, con sede deportiva en Villanueva (Casanare) y sede administrativa en Tunja (Boyacá).
                    </p>
                </div>

                <div className="grid lg:grid-cols-12 gap-8 max-w-6xl mx-auto items-center">
                    {/* Directivos Card */}
                    <div className="lg:col-span-5 bg-white rounded-3xl p-6 sm:p-8 border border-gray-200 shadow-sm text-center">
                        <div className="relative w-36 h-36 mx-auto rounded-full overflow-hidden mb-6 border-4 border-primary/20 shadow-md">
                            <Image
                                src="/francisco lagos 1x1.jpg"
                                alt="Luis Francisco Lagos R. - Promotora Nuevas Estrellas"
                                fill
                                className="object-cover"
                                sizes="150px"
                            />
                        </div>
                        <h3 className="text-xl font-bold text-midnightblue">
                            Luis Francisco Lagos R.
                        </h3>
                        <p className="text-xs font-semibold text-primary uppercase tracking-wider mb-4">
                            Dirigente Deportivo & Fundador
                        </p>
                        <p className="text-xs sm:text-sm text-gray-700 leading-relaxed mb-4">
                            Gestor deportivo con más de 23 años de trayectoria en el fútbol colombiano. Exgerente y accionista de Patriotas Boyacá, fundador del Club Atlético Provincia de Sugamuxi y columnista de opinión deportiva en <em>Boyacá Siete Días</em>.
                        </p>
                        <div className="pt-4 border-t border-gray-100 text-left">
                            <div className="font-bold text-xs text-midnightblue mb-1">Dirección Deportiva:</div>
                            <div className="text-xs text-gray-700">Lic. Wagner Sinisterra · Captador de Talentos y Formador</div>
                        </div>
                    </div>

                    {/* Mission, Vision & Pillars */}
                    <div className="lg:col-span-7 space-y-6">
                        <div className="bg-white rounded-2xl p-6 border border-gray-200 shadow-sm flex items-start gap-4">
                            <div className="w-12 h-12 rounded-xl bg-primary/10 text-primary flex items-center justify-center flex-shrink-0">
                                <Target className="w-6 h-6" />
                            </div>
                            <div>
                                <h4 className="font-bold text-midnightblue text-base sm:text-lg mb-1">
                                    Misión y Desarrollo Integral
                                </h4>
                                <p className="text-xs sm:text-sm text-gray-700 leading-relaxed">
                                    Captar, formar y promover futbolistas juveniles trabajando en alianza directa con los clubes profesionales más importantes del país y categorías de élite.
                                </p>
                            </div>
                        </div>

                        <div className="bg-white rounded-2xl p-6 border border-gray-200 shadow-sm flex items-start gap-4">
                            <div className="w-12 h-12 rounded-xl bg-primary/10 text-primary flex items-center justify-center flex-shrink-0">
                                <ShieldCheck className="w-6 h-6" />
                            </div>
                            <div>
                                <h4 className="font-bold text-midnightblue text-base sm:text-lg mb-1">
                                    Proyección al Profesionalismo
                                </h4>
                                <p className="text-xs sm:text-sm text-gray-700 leading-relaxed">
                                    Más de 50 jugadores proyectados a divisiones menores y planteles profesionales del Fútbol Profesional Colombiano a través de veedurías y procesos continuos.
                                </p>
                            </div>
                        </div>

                        <div className="bg-white rounded-2xl p-6 border border-gray-200 shadow-sm flex items-start gap-4">
                            <div className="w-12 h-12 rounded-xl bg-primary/10 text-primary flex items-center justify-center flex-shrink-0">
                                <Users className="w-6 h-6" />
                            </div>
                            <div>
                                <h4 className="font-bold text-midnightblue text-base sm:text-lg mb-1">
                                    Presencia Regional y Alianzas
                                </h4>
                                <p className="text-xs sm:text-sm text-gray-700 leading-relaxed">
                                    Articulación institucional con academias, ligas y escuelas de 10 departamentos de Colombia, fortaleciendo el talento del llano y del interior.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
