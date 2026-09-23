import { CheckCircle, Calendar, Download, PhoneCall, AlertCircle, ShieldCheck } from 'lucide-react';

const WHATSAPP_URL = "https://wa.me/573002125586?text=" + encodeURIComponent("¡Hola! Deseo apartar el cupo de mi equipo para el Torneo Nuevas Estrellas Electrolit 2026.");

const includedItems = [
    "Mínimo 4 partidos oficiales por equipo garantizados.",
    "Terna arbitral oficial y veedor de campo en todos los compromisos.",
    "Puntos de hidratación oficial Electrolit para los deportistas.",
    "Balón oficial del torneo Keiros durante los encuentros.",
    "Asistencia y primeros auxilios en todos los escenarios deportivos.",
    "Cobertura fotográfica y seguimiento audiovisual de partidos destacados.",
    "Participación de directores técnicos en la Clínica de Capacitación.",
    "Vitrina permanente ante ojeadores y clubes del FPC.",
];

export default function CostosCalendarioV2() {
    return (
        <section id="inscripciones" className="py-20 bg-white">
            <div className="mx-auto w-full responsive-padding">
                {/* Title */}
                <div className="text-center max-w-3xl mx-auto pb-14">
                    <span className="inline-block px-4 py-1.5 bg-primary/10 text-primary font-bold rounded-full text-xs sm:text-sm uppercase tracking-wider mb-3">
                        Inversión y Proceso Oficial
                    </span>
                    <h2 className="text-3xl md:text-5xl font-bold text-midnightblue leading-tight pb-4">
                        Inscripciones y Calendario de Pagos
                    </h2>
                    <p className="text-base sm:text-lg text-gray-700 leading-relaxed">
                        Asegura la participación de tu club con facilidades de pago en 2 cuotas y cupos limitados por categoría.
                    </p>
                </div>

                <div className="grid lg:grid-cols-12 gap-8 max-w-6xl mx-auto items-start">
                    {/* Price & Payment Schedule Box (5 cols) */}
                    <div className="lg:col-span-5 bg-gradient-to-br from-primary to-midnightblue text-white rounded-3xl p-8 shadow-xl relative overflow-hidden">
                        <div className="relative z-10 space-y-6">
                            <span className="inline-block px-3.5 py-1 bg-white/20 text-white font-semibold rounded-full text-xs uppercase tracking-wider">
                                Valor por Equipo
                            </span>

                            <div>
                                <div className="text-4xl sm:text-5xl font-extrabold tracking-tight">
                                    $3.000.000 <span className="text-xl font-medium text-white/80">COP</span>
                                </div>
                                <p className="text-xs sm:text-sm text-white/80 mt-1">
                                    Aplica para cualquier categoría oficial (Sub-12, Sub-14, Sub-16, Sub-18).
                                </p>
                            </div>

                            <div className="border-t border-white/20 pt-5 space-y-4">
                                <div className="text-sm font-bold text-amber-300 uppercase tracking-wider">
                                    Cronograma de Pago
                                </div>

                                <div className="bg-white/10 rounded-xl p-4 space-y-3">
                                    <div className="flex items-center justify-between">
                                        <div className="flex items-center gap-2">
                                            <Calendar className="w-4 h-4 text-amber-300" />
                                            <span className="font-semibold text-sm">1ª Cuota (50%)</span>
                                        </div>
                                        <span className="font-bold text-sm">$1.500.000</span>
                                    </div>
                                    <div className="text-xs text-white/80 pl-6">
                                        Fecha límite: <strong>15 de Octubre</strong> (Reserva oficial de cupo)
                                    </div>
                                </div>

                                <div className="bg-white/10 rounded-xl p-4 space-y-3">
                                    <div className="flex items-center justify-between">
                                        <div className="flex items-center gap-2">
                                            <Calendar className="w-4 h-4 text-amber-300" />
                                            <span className="font-semibold text-sm">2ª Cuota (50%)</span>
                                        </div>
                                        <span className="font-bold text-sm">$1.500.000</span>
                                    </div>
                                    <div className="text-xs text-white/80 pl-6">
                                        Fecha límite: <strong>31 de Octubre</strong> (Cierre de inscripciones)
                                    </div>
                                </div>
                            </div>

                            <a
                                href={WHATSAPP_URL}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="w-full inline-flex items-center justify-center gap-2 bg-white hover:bg-gray-100 text-midnightblue font-bold py-3.5 px-6 rounded-full shadow-lg transition-all text-sm sm:text-base mt-4"
                            >
                                <PhoneCall className="w-5 h-5 text-primary" /> Inscribir Equipo
                            </a>
                        </div>
                    </div>

                    {/* What's Included & Docs (7 cols) */}
                    <div className="lg:col-span-7 space-y-6">
                        <div className="bg-[#f8fafc] border border-gray-200 rounded-3xl p-6 sm:p-8">
                            <h3 className="text-xl sm:text-2xl font-bold text-midnightblue mb-4 flex items-center gap-2">
                                <ShieldCheck className="w-6 h-6 text-primary" /> ¿Qué incluye la inscripción?
                            </h3>
                            <div className="grid sm:grid-cols-2 gap-3 pt-2">
                                {includedItems.map((item, idx) => (
                                 <div key={idx} className="flex items-start gap-2.5 text-xs sm:text-sm text-gray-700">
                                     <CheckCircle className="w-4 h-4 text-primary flex-shrink-0 mt-0.5" />
                                     <span>{item}</span>
                                 </div>
                                ))}
                            </div>
                        </div>

                        {/* Official Documents Download Box */}
                        <div className="bg-white border border-gray-200 rounded-3xl p-6 sm:p-8 shadow-sm">
                            <h4 className="text-lg font-bold text-midnightblue mb-2">
                                Documentación y Planillas de Inscripción
                            </h4>
                            <p className="text-xs sm:text-sm text-gray-700 mb-4">
                                Descarga los formatos reglamentarios requeridos para el registro de deportistas y cuerpo técnico:
                            </p>
                            <div className="grid sm:grid-cols-3 gap-3">
                                <a
                                    href="/pdf/PLANILLA DE INSCRIPCIÃ_N TORNEO NUEVAS ESTRELLAS ELECTROLIT 2025..pdf"
                                    download
                                    className="flex items-center gap-2 p-3 bg-gray-50 hover:bg-primary/5 border border-gray-200 hover:border-primary/30 rounded-xl text-xs font-semibold text-midnightblue transition-all"
                                >
                                    <Download className="w-4 h-4 text-primary flex-shrink-0" />
                                    <span>Planilla de Inscripción (PDF)</span>
                                </a>
                                <a
                                    href="/pdf/Carta de AutorizaciÃ³n y ExoneraciÃ³n de Responsabilidad.pdf"
                                    download
                                    className="flex items-center gap-2 p-3 bg-gray-50 hover:bg-primary/5 border border-gray-200 hover:border-primary/30 rounded-xl text-xs font-semibold text-midnightblue transition-all"
                                >
                                    <Download className="w-4 h-4 text-primary flex-shrink-0" />
                                    <span>Exoneración de Resp. (PDF)</span>
                                </a>
                                <a
                                    href="/pdf/AUTORIZACIÃ_N DE USO DE IMAGEN TORNEO 2025.pdf"
                                    download
                                    className="flex items-center gap-2 p-3 bg-gray-50 hover:bg-primary/5 border border-gray-200 hover:border-primary/30 rounded-xl text-xs font-semibold text-midnightblue transition-all"
                                >
                                    <Download className="w-4 h-4 text-primary flex-shrink-0" />
                                    <span>Uso de Imagen (PDF)</span>
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
