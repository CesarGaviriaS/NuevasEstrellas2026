import { Metadata } from 'next';
import NavbarV2 from '@/components/v2/NavbarV2';
import FooterV2 from '@/components/v2/FooterV2';
import { Download, PhoneCall, Calendar, ShieldCheck, FileText, CheckCircle2, AlertCircle, ArrowLeft } from 'lucide-react';
import Link from 'next/link';

export const metadata: Metadata = {
    title: 'Inscripciones | Torneo Nuevas Estrellas Electrolit 2026',
    description: 'Proceso oficial de inscripción, requisitos, fechas de pago y formatos descargables para el Torneo Nuevas Estrellas Electrolit 2026 en Yopal, Casanare.',
};

const WHATSAPP_URL = "https://wa.me/573002125586?text=" + encodeURIComponent("¡Hola! Deseo formalizar la inscripción de mi equipo para el Torneo Nuevas Estrellas Electrolit 2026 en Yopal.");

const requisitos = [
    {
        num: "1",
        title: "Confirmación de Participación",
        desc: "Enviar la carta de intención de participación y formalizar el pago de inscripción dentro de los plazos establecidos por la organización."
    },
    {
        num: "2",
        title: "Documentación de los Jugadores",
        desc: "Presentar documento de identidad, carta de exoneración de responsabilidad firmada por los padres/acudientes y autorización para el uso de imagen y datos personales."
    },
    {
        num: "3",
        title: "Seguro Deportivo Vigente",
        desc: "Presentar la póliza de seguro contra accidentes deportivos con cobertura activa durante los días de competencia del certamen."
    },
    {
        num: "4",
        title: "Planilla Oficial de Inscripción",
        desc: "Diligenciar la planilla oficial con un máximo de hasta 20 futbolistas inscritos por categoría, según el reglamento del torneo."
    },
];

export default function InscripcionesPage() {
    return (
        <div className="min-h-screen flex flex-col bg-[#f8fafc] text-gray-900">
            <NavbarV2 />
            <main className="flex-1 pt-28 pb-20">
                <div className="mx-auto w-full responsive-padding max-w-6xl">
                    {/* Back link */}
                    <Link
                        href="/"
                        className="inline-flex items-center gap-2 text-sm font-semibold text-primary hover:underline mb-8"
                    >
                        <ArrowLeft className="w-4 h-4" /> Volver al Torneo 2026
                    </Link>

                    {/* Header */}
                    <div className="text-center max-w-3xl mx-auto mb-14">
                        <span className="inline-block px-4 py-1.5 bg-primary/10 text-primary font-bold rounded-full text-xs sm:text-sm uppercase tracking-wider mb-3">
                            Registro Oficial
                        </span>
                        <h1 className="text-3xl sm:text-5xl font-extrabold text-midnightblue leading-tight mb-4">
                            Inscripción de Equipos 2026
                        </h1>
                        <p className="text-base sm:text-lg text-gray-700 leading-relaxed">
                            Torneo Nuevas Estrellas Electrolit · Yopal, Casanare · 1 al 6 de Diciembre de 2026. Sigue los pasos y descarga los formatos oficiales para asegurar el cupo de tu club.
                        </p>
                    </div>

                    <div className="grid lg:grid-cols-12 gap-8 items-start">
                        {/* Left Column: Requirements & Steps (7 cols) */}
                        <div className="lg:col-span-7 space-y-8">
                            {/* Requisitos */}
                            <div className="bg-white rounded-3xl p-6 sm:p-8 border border-gray-200 shadow-sm space-y-6">
                                <h2 className="text-2xl font-bold text-midnightblue flex items-center gap-2">
                                    <ShieldCheck className="w-6 h-6 text-primary" /> Requisitos de Participación
                                </h2>
                                <p className="text-sm text-gray-700 leading-relaxed">
                                    Para formalizar la inscripción de cada equipo en las categorías Sub-12, Sub-14, Sub-16 o Sub-18, cada club deberá entregar la siguiente documentación:
                                </p>
                                <div className="space-y-4 pt-2">
                                    {requisitos.map((req) => (
                                        <div key={req.num} className="flex items-start gap-4 p-4 rounded-2xl bg-gray-50 border border-gray-100">
                                            <div className="w-8 h-8 rounded-full bg-primary text-white font-bold flex items-center justify-center flex-shrink-0 text-sm">
                                                {req.num}
                                            </div>
                                            <div>
                                                <h3 className="font-bold text-midnightblue text-sm mb-1">{req.title}</h3>
                                                <p className="text-xs text-gray-700 leading-relaxed">{req.desc}</p>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* Formatos Descargables */}
                            <div className="bg-white rounded-3xl p-6 sm:p-8 border border-gray-200 shadow-sm space-y-5">
                                <div>
                                    <h2 className="text-2xl font-bold text-midnightblue flex items-center gap-2">
                                        <FileText className="w-6 h-6 text-primary" /> Documentación y Planillas Oficiales 2026
                                    </h2>
                                    <p className="text-sm text-gray-700 leading-relaxed mt-1">
                                        Descarga los formatos reglamentarios requeridos para el congreso técnico y registro de delegaciones (disponibles en PDF y Word):
                                    </p>
                                </div>

                                <div className="grid sm:grid-cols-2 gap-4 pt-1">
                                    {/* Doc 1: Planilla */}
                                    <div className="p-4 bg-gray-50 border border-gray-200 rounded-2xl flex flex-col justify-between">
                                        <div className="mb-3">
                                            <div className="font-bold text-midnightblue text-sm leading-snug">
                                                Planilla de Inscripción 2026
                                            </div>
                                            <div className="text-xs text-gray-500 mt-1">
                                                Formato oficial para registro de hasta 20 jugadores y cuerpo técnico
                                            </div>
                                        </div>
                                        <div className="flex gap-2 pt-3 border-t border-gray-200">
                                            <a
                                                href="/documentos2026/PLANILLA DE INSCRIPCIÓN 2026.pdf"
                                                download
                                                className="flex-1 inline-flex items-center justify-center gap-1.5 py-2 px-3 bg-red-50 hover:bg-red-100 text-red-700 border border-red-200 rounded-xl text-xs font-bold transition-colors"
                                            >
                                                <Download className="w-4 h-4" /> PDF
                                            </a>
                                            <a
                                                href="/documentos2026/PLANILLA DE INSCRIPCIÓN 2026.docx"
                                                download
                                                className="flex-1 inline-flex items-center justify-center gap-1.5 py-2 px-3 bg-blue-50 hover:bg-blue-100 text-blue-700 border border-blue-200 rounded-xl text-xs font-bold transition-colors"
                                            >
                                                <Download className="w-4 h-4" /> Word
                                            </a>
                                        </div>
                                    </div>

                                    {/* Doc 2: Exoneración */}
                                    <div className="p-4 bg-gray-50 border border-gray-200 rounded-2xl flex flex-col justify-between">
                                        <div className="mb-3">
                                            <div className="font-bold text-midnightblue text-sm leading-snug">
                                                Autorización y Exoneración de Resp.
                                            </div>
                                            <div className="text-xs text-gray-500 mt-1">
                                                Firma obligatoria de padres de familia o acudientes
                                            </div>
                                        </div>
                                        <div className="flex gap-2 pt-3 border-t border-gray-200">
                                            <a
                                                href="/documentos2026/Carta de Autorización participacion torneo 2026 y Exoneración de Responsabilidad.pdf"
                                                download
                                                className="flex-1 inline-flex items-center justify-center gap-1.5 py-2 px-3 bg-red-50 hover:bg-red-100 text-red-700 border border-red-200 rounded-xl text-xs font-bold transition-colors"
                                            >
                                                <Download className="w-4 h-4" /> PDF
                                            </a>
                                            <a
                                                href="/documentos2026/Carta de Autorización participacion torneo 2026 y Exoneración de Responsabilidad.docx"
                                                download
                                                className="flex-1 inline-flex items-center justify-center gap-1.5 py-2 px-3 bg-blue-50 hover:bg-blue-100 text-blue-700 border border-blue-200 rounded-xl text-xs font-bold transition-colors"
                                            >
                                                <Download className="w-4 h-4" /> Word
                                            </a>
                                        </div>
                                    </div>

                                    {/* Doc 3: Carta Intención */}
                                    <div className="p-4 bg-gray-50 border border-gray-200 rounded-2xl flex flex-col justify-between">
                                        <div className="mb-3">
                                            <div className="font-bold text-midnightblue text-sm leading-snug">
                                                Carta de Intención de Participación
                                            </div>
                                            <div className="text-xs text-gray-500 mt-1">
                                                Manifestación oficial de interés y apartado de cupo
                                            </div>
                                        </div>
                                        <div className="flex gap-2 pt-3 border-t border-gray-200">
                                            <a
                                                href="/documentos2026/CARTA DE INTENCIÓN DE PARTICIPACIÓN.pdf"
                                                download
                                                className="flex-1 inline-flex items-center justify-center gap-1.5 py-2 px-3 bg-red-50 hover:bg-red-100 text-red-700 border border-red-200 rounded-xl text-xs font-bold transition-colors"
                                            >
                                                <Download className="w-4 h-4" /> PDF
                                            </a>
                                            <a
                                                href="/documentos2026/CARTA DE INTENCIÓN DE PARTICIPACIÓN.docx"
                                                download
                                                className="flex-1 inline-flex items-center justify-center gap-1.5 py-2 px-3 bg-blue-50 hover:bg-blue-100 text-blue-700 border border-blue-200 rounded-xl text-xs font-bold transition-colors"
                                            >
                                                <Download className="w-4 h-4" /> Word
                                            </a>
                                        </div>
                                    </div>

                                    {/* Doc 4: Uso de Imagen */}
                                    <div className="p-4 bg-gray-50 border border-gray-200 rounded-2xl flex flex-col justify-between">
                                        <div className="mb-3">
                                            <div className="font-bold text-midnightblue text-sm leading-snug">
                                                Autorización de Uso de Imagen
                                            </div>
                                            <div className="text-xs text-gray-500 mt-1">
                                                Consentimiento para transmisión y cobertura fotográfica
                                            </div>
                                        </div>
                                        <div className="flex gap-2 pt-3 border-t border-gray-200">
                                            <a
                                                href="/documentos2026/AUTORIZACIÓN DE USO DE IMAGEN.pdf"
                                                download
                                                className="flex-1 inline-flex items-center justify-center gap-1.5 py-2 px-3 bg-red-50 hover:bg-red-100 text-red-700 border border-red-200 rounded-xl text-xs font-bold transition-colors"
                                            >
                                                <Download className="w-4 h-4" /> PDF
                                            </a>
                                            <a
                                                href="/documentos2026/AUTORIZACIÓN DE USO DE IMAGEN.docx"
                                                download
                                                className="flex-1 inline-flex items-center justify-center gap-1.5 py-2 px-3 bg-blue-50 hover:bg-blue-100 text-blue-700 border border-blue-200 rounded-xl text-xs font-bold transition-colors"
                                            >
                                                <Download className="w-4 h-4" /> Word
                                            </a>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Right Column: Pricing, Dates & Direct WhatsApp Button (5 cols) */}
                        <div className="lg:col-span-5 space-y-6 lg:sticky lg:top-28">
                            <div className="bg-gradient-to-br from-primary to-midnightblue text-white rounded-3xl p-8 shadow-xl space-y-6">
                                <span className="inline-block px-3.5 py-1 bg-white/20 text-white font-semibold rounded-full text-xs uppercase tracking-wider">
                                    Inversión por Equipo
                                </span>

                                <div>
                                    <div className="text-4xl sm:text-5xl font-extrabold tracking-tight">
                                        $3.000.000 <span className="text-xl font-medium text-white/80">COP</span>
                                    </div>
                                    <p className="text-xs text-white/80 mt-1">
                                        Cupo garantizado por categoría (Sub-12, Sub-14, Sub-16 o Sub-18).
                                    </p>
                                </div>

                                <div className="border-t border-white/20 pt-5 space-y-4">
                                    <div className="text-xs font-bold text-amber-300 uppercase tracking-wider flex items-center gap-1.5">
                                        <Calendar className="w-4 h-4" /> Cronograma de Pagos Oficial
                                    </div>

                                    <div className="bg-white/10 rounded-xl p-4 space-y-1">
                                        <div className="flex items-center justify-between font-bold text-sm">
                                            <span>1ª Cuota (50%)</span>
                                            <span>$1.500.000</span>
                                        </div>
                                        <div className="text-xs text-white/80">
                                            Fecha límite: <strong>15 de Octubre de 2026</strong>
                                        </div>
                                    </div>

                                    <div className="bg-white/10 rounded-xl p-4 space-y-1">
                                        <div className="flex items-center justify-between font-bold text-sm">
                                            <span>2ª Cuota (50%)</span>
                                            <span>$1.500.000</span>
                                        </div>
                                        <div className="text-xs text-white/80">
                                            Fecha límite: <strong>31 de Octubre de 2026</strong>
                                        </div>
                                    </div>

                                    <div className="text-xs text-amber-200 bg-amber-500/20 rounded-xl p-3">
                                        <strong>Congreso Técnico Virtual:</strong> 12 de Noviembre de 2026
                                    </div>
                                </div>

                                <a
                                    href={WHATSAPP_URL}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="w-full inline-flex items-center justify-center gap-2 bg-white hover:bg-gray-100 text-midnightblue font-bold py-4 px-6 rounded-full shadow-lg transition-all text-base"
                                >
                                    <PhoneCall className="w-5 h-5 text-primary" /> Inscribir Equipo
                                </a>

                                <p className="text-[11px] text-center text-white/70">
                                    Atención directa por la línea oficial de la Promotora Deportiva Nuevas Estrellas.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
            <FooterV2 />
        </div>
    );
}
