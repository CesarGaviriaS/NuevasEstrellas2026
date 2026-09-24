import { CheckCircle, Calendar, Download, PhoneCall, AlertCircle, ShieldCheck } from 'lucide-react';
import DownloadLink from '@/components/ui/DownloadLink';

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
                        Registro y Cronograma Oficial
                    </span>
                    <h2 className="text-3xl md:text-5xl font-bold text-midnightblue leading-tight pb-4">
                        Inscripciones y Fechas Clave
                    </h2>
                    <p className="text-base sm:text-lg text-gray-700 leading-relaxed">
                        Asegura la participación de tu club dentro de los plazos establecidos y cupos disponibles por categoría.
                    </p>
                </div>

                <div className="grid lg:grid-cols-12 gap-8 max-w-6xl mx-auto items-start">
                    {/* Payment Schedule Box without raw numbers (5 cols) */}
                    <div className="lg:col-span-5 bg-gradient-to-br from-primary to-midnightblue text-white rounded-3xl p-8 shadow-xl relative overflow-hidden">
                        <div className="relative z-10 space-y-6">
                            <span className="inline-block px-3.5 py-1 bg-white/20 text-white font-semibold rounded-full text-xs uppercase tracking-wider">
                                Inscripción Oficial 2026
                            </span>

                            <div>
                                <div className="text-3xl sm:text-4xl font-extrabold tracking-tight leading-tight">
                                    Cupos Limitados por Categoría
                                </div>
                                <p className="text-xs sm:text-sm text-white/80 mt-2">
                                    Aplica para clubes y academias en Sub-12, Sub-14, Sub-16 y Sub-18.
                                </p>
                            </div>

                            <div className="border-t border-white/20 pt-5 space-y-4">
                                <div className="text-sm font-bold text-amber-300 uppercase tracking-wider">
                                    Cronograma de Inscripción
                                </div>

                                <div className="bg-white/10 rounded-xl p-4 space-y-2">
                                    <div className="flex items-center gap-2 font-semibold text-sm">
                                        <Calendar className="w-4 h-4 text-amber-300 flex-shrink-0" />
                                        <span>Primer pago (50% de la inscripción)</span>
                                    </div>
                                    <div className="text-xs text-white/80 pl-6">
                                        Fecha límite: <strong>15 de Octubre de 2026</strong> (Reserva oficial de cupo)
                                    </div>
                                </div>

                                <div className="bg-white/10 rounded-xl p-4 space-y-2">
                                    <div className="flex items-center gap-2 font-semibold text-sm">
                                        <Calendar className="w-4 h-4 text-amber-300 flex-shrink-0" />
                                        <span>Segundo pago (50% restante)</span>
                                    </div>
                                    <div className="text-xs text-white/80 pl-6">
                                        Fecha límite: <strong>31 de Octubre de 2026</strong> (Cierre de inscripciones)
                                    </div>
                                </div>

                                <div className="bg-amber-500/20 border border-amber-400/30 rounded-xl p-3.5 text-xs text-amber-200">
                                    <strong>Congreso Técnico Virtual:</strong> 12 de Noviembre de 2026
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
                                Documentación y Planillas Oficiales 2026
                            </h4>
                            <p className="text-xs sm:text-sm text-gray-700 mb-5">
                                Descarga los formatos reglamentarios requeridos para el registro de deportistas y cuerpo técnico disponibles en PDF y Word:
                            </p>
                            <div className="grid sm:grid-cols-2 gap-3.5">
                                {/* Doc 1: Planilla */}
                                <div className="p-3.5 bg-gray-50 border border-gray-200 rounded-2xl flex flex-col justify-between">
                                    <div className="mb-3">
                                        <div className="font-bold text-midnightblue text-xs leading-snug">
                                            Planilla de Inscripción 2026
                                        </div>
                                        <div className="text-[11px] text-gray-500 mt-0.5">Registro de hasta 20 jugadores</div>
                                    </div>
                                    <div className="flex gap-2 pt-2 border-t border-gray-200">
                                        <DownloadLink
                                            href="/documentos2026/PLANILLA DE INSCRIPCIÓN 2026.pdf"
                                            className="flex-1 inline-flex items-center justify-center gap-1 py-1.5 px-2.5 bg-red-50 hover:bg-red-100 text-red-700 border border-red-200 rounded-lg text-xs font-bold transition-colors"
                                        >
                                            <Download className="w-3.5 h-3.5" /> PDF
                                        </DownloadLink>
                                        <DownloadLink
                                            href="/documentos2026/PLANILLA DE INSCRIPCIÓN 2026.docx"
                                            className="flex-1 inline-flex items-center justify-center gap-1 py-1.5 px-2.5 bg-blue-50 hover:bg-blue-100 text-blue-700 border border-blue-200 rounded-lg text-xs font-bold transition-colors"
                                        >
                                            <Download className="w-3.5 h-3.5" /> Word
                                        </DownloadLink>
                                    </div>
                                </div>

                                {/* Doc 2: Exoneración */}
                                <div className="p-3.5 bg-gray-50 border border-gray-200 rounded-2xl flex flex-col justify-between">
                                    <div className="mb-3">
                                        <div className="font-bold text-midnightblue text-xs leading-snug">
                                            Autorización y Exoneración
                                        </div>
                                        <div className="text-[11px] text-gray-500 mt-0.5">Firma de padres / acudientes</div>
                                    </div>
                                    <div className="flex gap-2 pt-2 border-t border-gray-200">
                                        <DownloadLink
                                            href="/documentos2026/Carta de Autorización participacion torneo 2026 y Exoneración de Responsabilidad.pdf"
                                            className="flex-1 inline-flex items-center justify-center gap-1 py-1.5 px-2.5 bg-red-50 hover:bg-red-100 text-red-700 border border-red-200 rounded-lg text-xs font-bold transition-colors"
                                        >
                                            <Download className="w-3.5 h-3.5" /> PDF
                                        </DownloadLink>
                                        <DownloadLink
                                            href="/documentos2026/Carta de Autorización participacion torneo 2026 y Exoneración de Responsabilidad.docx"
                                            className="flex-1 inline-flex items-center justify-center gap-1 py-1.5 px-2.5 bg-blue-50 hover:bg-blue-100 text-blue-700 border border-blue-200 rounded-lg text-xs font-bold transition-colors"
                                        >
                                            <Download className="w-3.5 h-3.5" /> Word
                                        </DownloadLink>
                                    </div>
                                </div>

                                {/* Doc 3: Carta Intención */}
                                <div className="p-3.5 bg-gray-50 border border-gray-200 rounded-2xl flex flex-col justify-between">
                                    <div className="mb-3">
                                        <div className="font-bold text-midnightblue text-xs leading-snug">
                                            Carta de Intención de Participación
                                        </div>
                                        <div className="text-[11px] text-gray-500 mt-0.5">Formalización y reserva de cupo</div>
                                    </div>
                                    <div className="flex gap-2 pt-2 border-t border-gray-200">
                                        <DownloadLink
                                            href="/documentos2026/CARTA DE INTENCIÓN DE PARTICIPACIÓN.pdf"
                                            className="flex-1 inline-flex items-center justify-center gap-1 py-1.5 px-2.5 bg-red-50 hover:bg-red-100 text-red-700 border border-red-200 rounded-lg text-xs font-bold transition-colors"
                                        >
                                            <Download className="w-3.5 h-3.5" /> PDF
                                        </DownloadLink>
                                        <DownloadLink
                                            href="/documentos2026/CARTA DE INTENCIÓN DE PARTICIPACIÓN.docx"
                                            className="flex-1 inline-flex items-center justify-center gap-1 py-1.5 px-2.5 bg-blue-50 hover:bg-blue-100 text-blue-700 border border-blue-200 rounded-lg text-xs font-bold transition-colors"
                                        >
                                            <Download className="w-3.5 h-3.5" /> Word
                                        </DownloadLink>
                                    </div>
                                </div>

                                {/* Doc 4: Uso de Imagen */}
                                <div className="p-3.5 bg-gray-50 border border-gray-200 rounded-2xl flex flex-col justify-between">
                                    <div className="mb-3">
                                        <div className="font-bold text-midnightblue text-xs leading-snug">
                                            Autorización de Uso de Imagen
                                        </div>
                                        <div className="text-[11px] text-gray-500 mt-0.5">Cobertura audiovisual y medios</div>
                                    </div>
                                    <div className="flex gap-2 pt-2 border-t border-gray-200">
                                        <DownloadLink
                                            href="/documentos2026/AUTORIZACIÓN DE USO DE IMAGEN.pdf"
                                            className="flex-1 inline-flex items-center justify-center gap-1 py-1.5 px-2.5 bg-red-50 hover:bg-red-100 text-red-700 border border-red-200 rounded-lg text-xs font-bold transition-colors"
                                        >
                                            <Download className="w-3.5 h-3.5" /> PDF
                                        </DownloadLink>
                                        <DownloadLink
                                            href="/documentos2026/AUTORIZACIÓN DE USO DE IMAGEN.docx"
                                            className="flex-1 inline-flex items-center justify-center gap-1 py-1.5 px-2.5 bg-blue-50 hover:bg-blue-100 text-blue-700 border border-blue-200 rounded-lg text-xs font-bold transition-colors"
                                        >
                                            <Download className="w-3.5 h-3.5" /> Word
                                        </DownloadLink>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
