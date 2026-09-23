import Image from 'next/image';
import { Target, Eye, Compass, ShieldCheck, MapPin, Award, Users } from 'lucide-react';

export default function PromotoraV2() {
    return (
        <section id="promotora" className="py-20 bg-[#f8fafc] border-t border-b border-gray-100">
            <div className="mx-auto w-full responsive-padding">
                {/* Header */}
                <div className="text-center max-w-3xl mx-auto pb-14">
                    <span className="inline-block px-4 py-1.5 bg-primary/10 text-primary font-bold rounded-full text-xs sm:text-sm uppercase tracking-wider mb-3">
                        Sobre Nosotros
                    </span>
                    <h2 className="text-3xl md:text-5xl font-bold text-midnightblue leading-tight pb-4">
                        Promotora Deportiva Nuevas Estrellas
                    </h2>
                    <p className="text-base sm:text-lg text-gray-700 leading-relaxed font-medium">
                        Una oportunidad para el talento que quiere llegar lejos.
                    </p>
                    <p className="text-sm sm:text-base text-gray-600 leading-relaxed mt-2">
                        Organización dedicada a la identificación, desarrollo y proyección de jóvenes futbolistas con talento, disciplina y aspiraciones de llegar al fútbol profesional colombiano e internacional.
                    </p>
                </div>

                {/* Grid: Directivos (Left) + Misión, Visión & Propósito (Right) */}
                <div className="grid lg:grid-cols-12 gap-8 max-w-6xl mx-auto items-stretch">
                    
                    {/* Directivos & Equipo de Trabajo Card */}
                    <div className="lg:col-span-5 bg-white rounded-3xl p-6 sm:p-8 border border-gray-200 shadow-sm flex flex-col justify-between">
                        <div>
                            <div className="relative w-36 h-36 mx-auto rounded-full overflow-hidden mb-5 border-4 border-primary/20 shadow-md">
                                <Image
                                    src="/francisco lagos 1x1.jpg"
                                    alt="Luis Francisco Lagos R. - Promotora Nuevas Estrellas"
                                    fill
                                    className="object-cover"
                                    sizes="150px"
                                />
                            </div>
                            <div className="text-center mb-5">
                                <h3 className="text-xl font-bold text-midnightblue">
                                    Luis Francisco Lagos R.
                                </h3>
                                <p className="text-xs font-semibold text-primary uppercase tracking-wider mb-2">
                                    Dirigente Deportivo & Fundador
                                </p>
                                <p className="text-xs sm:text-sm text-gray-600 leading-relaxed">
                                    Gestor deportivo con más de dos décadas impulsando el fútbol de formación y profesional. Exgerente y accionista de Patriotas Boyacá, fundador del Club Atlético Provincia de Sugamuxi y columnista de opinión deportiva.
                                </p>
                            </div>

                            <div className="pt-4 border-t border-gray-100 bg-gray-50/80 rounded-2xl p-4 mb-4">
                                <div className="font-bold text-sm text-midnightblue mb-1">
                                    Lic. Wagner Sinisterra
                                </div>
                                <div className="text-xs font-semibold text-primary uppercase tracking-wider mb-1">
                                    Dirección Deportiva & Captación
                                </div>
                                <p className="text-xs text-gray-600 leading-relaxed">
                                    Formador y captador de talentos con amplia trayectoria en detección temprana y proyección de juveniles a clubes profesionales.
                                </p>
                            </div>
                        </div>

                        {/* Sedes / Ubicación */}
                        <div className="pt-4 border-t border-gray-100 space-y-2 text-xs text-gray-700">
                            <div className="flex items-center gap-2">
                                <MapPin className="w-4 h-4 text-primary flex-shrink-0" />
                                <span><strong>Sede Deportiva:</strong> Villanueva, Casanare</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <MapPin className="w-4 h-4 text-primary flex-shrink-0" />
                                <span><strong>Sede Administrativa:</strong> Tunja, Boyacá</span>
                            </div>
                        </div>
                    </div>

                    {/* Mission, Vision, Experience & Purpose Cards */}
                    <div className="lg:col-span-7 space-y-5 flex flex-col justify-between">
                        
                        {/* Misión */}
                        <div className="bg-white rounded-2xl p-6 border border-gray-200 shadow-sm flex items-start gap-4">
                            <div className="w-12 h-12 rounded-xl bg-primary/10 text-primary flex items-center justify-center flex-shrink-0">
                                <Target className="w-6 h-6" />
                            </div>
                            <div>
                                <h4 className="font-bold text-midnightblue text-base sm:text-lg mb-1 uppercase tracking-wide">
                                    Misión
                                </h4>
                                <p className="text-xs sm:text-sm text-gray-700 leading-relaxed">
                                    Identificar, formar y promover jóvenes talentos del fútbol colombiano, brindándoles oportunidades para alcanzar su máximo potencial en un entorno de excelencia deportiva y humana.
                                </p>
                            </div>
                        </div>

                        {/* Visión */}
                        <div className="bg-white rounded-2xl p-6 border border-gray-200 shadow-sm flex items-start gap-4">
                            <div className="w-12 h-12 rounded-xl bg-amber-500/10 text-amber-600 flex items-center justify-center flex-shrink-0">
                                <Eye className="w-6 h-6" />
                            </div>
                            <div>
                                <h4 className="font-bold text-midnightblue text-base sm:text-lg mb-1 uppercase tracking-wide">
                                    Visión
                                </h4>
                                <p className="text-xs sm:text-sm text-gray-700 leading-relaxed">
                                    Ser el referente en la formación integral de jóvenes futbolistas, forjando futuras estrellas del fútbol que inspiren y dejen una huella en la sociedad y el deporte.
                                </p>
                            </div>
                        </div>

                        {/* Experiencia y Proyección */}
                        <div className="bg-white rounded-2xl p-6 border border-gray-200 shadow-sm flex items-start gap-4">
                            <div className="w-12 h-12 rounded-xl bg-emerald-500/10 text-emerald-600 flex items-center justify-center flex-shrink-0">
                                <ShieldCheck className="w-6 h-6" />
                            </div>
                            <div>
                                <h4 className="font-bold text-midnightblue text-base sm:text-lg mb-1 uppercase tracking-wide">
                                    Experiencia y Proyección
                                </h4>
                                <p className="text-xs sm:text-sm text-gray-700 leading-relaxed">
                                    Nuestra labor incluye la realización de torneos, veedurías e intercambios deportivos, así como el acompañamiento y promoción hacia clubes profesionales. <strong>Actualmente, 30 futbolistas hacen parte de categorías juveniles élite y profesionales en ocho clubes de Primera y Segunda División de Colombia.</strong>
                                </p>
                            </div>
                        </div>

                        {/* Propósito / Lema */}
                        <div className="bg-gradient-to-r from-primary to-midnightblue text-white rounded-2xl p-6 shadow-md flex items-start gap-4">
                            <div className="w-12 h-12 rounded-xl bg-white/10 text-amber-300 flex items-center justify-center flex-shrink-0">
                                <Compass className="w-6 h-6" />
                            </div>
                            <div>
                                <h4 className="font-bold text-amber-300 text-base sm:text-lg mb-1 uppercase tracking-wide">
                                    Nuestro Propósito
                                </h4>
                                <p className="text-xs sm:text-sm text-white/90 leading-relaxed">
                                    Crear escenarios donde los jóvenes puedan demostrar su talento, desarrollar su potencial y acercarse al fútbol profesional.
                                </p>
                                <p className="text-sm sm:text-base font-extrabold text-white mt-2 italic">
                                    «¡Tú pones el talento… Nosotros el camino!»
                                </p>
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        </section>
    );
}
