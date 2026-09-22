'use client';

import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Calendar, ChevronDown, ChevronUp, MapPin, FileText, Download, Users, Clock, Info, Plus, X } from 'lucide-react';
import CategoryModal from '@/components/modals/CategoryModal';
import ScoutingCarousel from '@/components/ui/ScoutingCarousel';
import { TOURNAMENT_DATA, CategoryData } from '@/lib/tournamentData';
import { Venue, Document } from '@/lib/dataTorneos';

// Default Fallback Data constants
const DEFAULT_SCOUTING_IMAGES = [
    "/EscudosFutbol/BogotaFC.png",
    "/EscudosFutbol/D_Tolima.png",
    "/EscudosFutbol/EFC_Cheroes.png",
    "/EscudosFutbol/R_santander.png",
    "/EscudosFutbol/cucuta.png",
    "/EscudosFutbol/junior.png",
    "/EscudosFutbol/llanerosFC.png",
    "/EscudosFutbol/realcundinamarca.png",
];

const DEFAULT_VENUES: Venue[] = [
    {
        name: "Centro Deportivo Melgarejo Gomez",
        mapUrl: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d4776.269225382693!2d-72.9389387242443!3d5.729523494252634!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8e6a477650037b0d%3A0x767f6803f18e4620!2sCentro%20Deportivo%20Melgarejo%20G%C3%B3mez!5e1!3m2!1ses-419!2sco!4v1763686283219!5m2!1ses-419!2sco"
    },
    {
        name: "Canchas Monumental",
        mapUrl: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d992.4692162229701!2d-72.92285970302464!3d5.730869897797825!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8e6a47d0699a6f69%3A0x98a7e8fe25c1ceb8!2sCanchas%20monumental%20-%20Atl.%20Nacional%20Boyac%C3%A1!5e0!3m2!1ses-419!2sco!4v1764560951164!5m2!1ses-419!2sco"
    },
    {
        name: "Libertadores de America",
        mapUrl: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d662.1333830733757!2d-72.92353463169957!3d5.730911702431372!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8e6a47a2fcd9f5bf%3A0x2d46c65dcb4f0997!2sEscuela%20de%20Futbol%20Libertadores%20de%20America!5e1!3m2!1ses-419!2sco!4v1764557483573!5m2!1ses-419!2sco"
    }
];

const DEFAULT_DOCUMENTS: Document[] = [
    { title: "Autorización de imagen", subtitle: "Descargar PDF", url: "/pdf/AUTORIZACIÃ_N DE USO DE IMAGEN TORNEO 2025.pdf" },
    { title: "Carta autorización", subtitle: "Descargar PDF", url: "/pdf/Carta de AutorizaciÃ³n y ExoneraciÃ³n de Responsabilidad.pdf" },
    { title: "Planilla de inscripción", subtitle: "Descargar PDF", url: "/pdf/PLANILLA DE INSCRIPCIÃ_N TORNEO NUEVAS ESTRELLAS ELECTROLIT 2025..pdf" }
];

interface CronogramaCardProps {
    venues?: Venue[];
    documents?: Document[];
    status?: {
        registrationStatus: string;
        registrationDeadline: string;
        technicalCongressDate: string;
        startDate: string;
        finalDate: string;
    };
    scoutingImages?: string[];
    data?: Record<string, CategoryData>;
}

export default function CronogramaCard({
    venues = DEFAULT_VENUES,
    documents = DEFAULT_DOCUMENTS,
    status = {
        registrationStatus: "ABIERTAS",
        registrationDeadline: "Hasta el 31 de Octubre",
        technicalCongressDate: "6 Nov - 6:00 PM",
        startDate: "1 Dic",
        finalDate: "6 Dic"
    },
    scoutingImages = DEFAULT_SCOUTING_IMAGES,
    data = TOURNAMENT_DATA
}: CronogramaCardProps) {
    const [showSchedule, setShowSchedule] = useState(false);
    const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
    const [selectedVenue, setSelectedVenue] = useState<Venue>(venues[0] || DEFAULT_VENUES[0]);
    const [showCongressModal, setShowCongressModal] = useState(false);

    useEffect(() => {
        if (venues && venues.length > 0) {
            setSelectedVenue(venues[0]);
        }
    }, [venues]);

    const categoriesList = Object.keys(data).length > 0 ? Object.keys(data) : ['Sub 12', 'Sub 14', 'Sub 16', 'Sub 18'];

    return (
        <div className="space-y-8">
            {/* Section Title */}
            <div className="flex items-center gap-3 px-2 border-b border-gray-200 pb-4">
                <Info className="h-8 w-8 text-primary" />
                <h2 className="text-2xl md:text-3xl font-bold text-midnightblue">Cronograma y más información</h2>
            </div>

            {/* Cronograma Dropdown Card */}
            <Card className="border-none shadow-lg overflow-hidden bg-white">
                <CardHeader
                    className="bg-white border-b border-gray-100 py-4 cursor-pointer hover:bg-gray-50 transition-colors"
                    onClick={() => setShowSchedule(!showSchedule)}
                >
                    <div className="flex items-center justify-between px-2">
                        <div className="flex items-center gap-3">
                            <Calendar className="h-6 w-6 text-primary" />
                            <CardTitle className="text-xl md:text-2xl text-midnightblue">Cronograma de Partidos</CardTitle>
                        </div>
                        {showSchedule ? (
                            <ChevronUp className="h-6 w-6 text-gray-500" />
                        ) : (
                            <ChevronDown className="h-6 w-6 text-gray-500" />
                        )}
                    </div>
                </CardHeader>

                {showSchedule && (
                    <CardContent className="p-6 md:p-8 bg-white animate-in slide-in-from-top-2 duration-200">
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                            {categoriesList.map((category) => (
                                <button
                                    key={category}
                                    onClick={() => setSelectedCategory(category)}
                                    className="p-4 bg-white border border-blue-100 rounded-xl hover:bg-blue-50 hover:border-blue-200 transition-all shadow-sm group cursor-pointer flex flex-col items-center justify-center gap-2"
                                >
                                    <span className="p-2 bg-blue-50 rounded-full text-blue-600 group-hover:bg-blue-100 group-hover:text-primary transition-colors">
                                        <Calendar className="h-5 w-5" />
                                    </span>
                                    <span className="font-bold text-midnightblue group-hover:text-primary transition-colors">
                                        {category}
                                    </span>
                                </button>
                            ))}
                        </div>
                    </CardContent>
                )}
            </Card>

            {/* Info Grid (Map, Docs, Scouting, Status) */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">

                {/* 1. Map & Event Details */}
                <Card className="md:col-span-2 overflow-hidden border-none shadow-lg order-1 bg-white">
                    <CardHeader className="bg-midnightblue text-white pb-4">
                        <div className="flex items-center gap-2">
                            <MapPin className="h-5 w-5 text-secondary" />
                            <CardTitle className="text-xl">Sede y lugar de competencia</CardTitle>
                        </div>
                    </CardHeader>
                    <CardContent className="p-0">
                        {venues.length > 0 ? (
                            <div className="grid md:grid-cols-2 h-full">
                                <div className="p-6 space-y-6">
                                    <div>
                                        <h3 className="font-bold text-midnightblue text-lg mb-2 flex items-center gap-2">
                                            <Calendar className="h-5 w-5 text-primary" />
                                            Fecha del Torneo
                                        </h3>
                                        <p className="text-gray-600 text-lg">
                                            {status.startDate && status.startDate !== 'Por definir'
                                                ? (status.finalDate && status.finalDate !== 'Por definir' 
                                                    ? `${status.startDate} al ${status.finalDate}`
                                                    : `Inicio: ${status.startDate}`)
                                                : 'Fechas por definir próximamente'}
                                        </p>
                                    </div>
                                    <div>
                                        <h3 className="font-bold text-midnightblue text-lg mb-2 flex items-center gap-2">
                                            <MapPin className="h-5 w-5 text-primary" />
                                            Canchas y Complejos
                                        </h3>
                                        <div className="space-y-2">
                                            {venues.map((venue) => (
                                                <button
                                                    key={venue.name}
                                                    onClick={() => setSelectedVenue(venue)}
                                                    className={`w-full text-left px-3 py-2 rounded-lg text-sm font-medium transition-colors flex items-center justify-between group ${selectedVenue?.name === venue.name
                                                        ? 'bg-blue-100 text-blue-800 border-blue-200'
                                                        : 'bg-gray-50 text-gray-600 hover:bg-gray-100'
                                                        }`}
                                                >
                                                    <span>{venue.name}</span>
                                                    {selectedVenue?.name === venue.name && (
                                                        <div className="h-2 w-2 rounded-full bg-blue-500" />
                                                    )}
                                                </button>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                                <div className="h-64 md:h-auto w-full bg-gray-200 relative">
                                    {selectedVenue?.mapUrl ? (
                                        <iframe
                                            src={selectedVenue.mapUrl}
                                            width="100%"
                                            height="100%"
                                            style={{ border: 0, position: 'absolute', top: 0, left: 0 }}
                                            allowFullScreen
                                            loading="lazy"
                                            referrerPolicy="no-referrer-when-downgrade"
                                        ></iframe>
                                    ) : (
                                        <div className="flex items-center justify-center h-full p-6 text-gray-400 text-center">
                                            Mapa no disponible
                                        </div>
                                    )}
                                </div>
                            </div>
                        ) : (
                            <div className="p-8 space-y-6">
                                <div className="flex flex-col sm:flex-row items-center sm:items-start gap-4">
                                    <div className="p-3 bg-blue-50 text-midnightblue rounded-full flex-shrink-0">
                                        <MapPin className="h-6 w-6" />
                                    </div>
                                    <div className="text-center sm:text-left">
                                        <h3 className="font-bold text-lg text-midnightblue">Sedes Oficiales</h3>
                                        <p className="text-gray-500 text-sm mt-1">
                                            Las canchas y complejos deportivos oficiales para esta edición serán anunciados próximamente.
                                        </p>
                                    </div>
                                </div>

                                <div className="p-4 bg-gray-50 rounded-xl border border-gray-100">
                                    <h4 className="font-bold text-midnightblue text-sm uppercase tracking-wider mb-1 flex items-center gap-2">
                                        <Calendar className="h-4 w-4 text-primary" />
                                        Fecha Programada del Evento
                                    </h4>
                                    <p className="text-primary font-bold text-lg">
                                        {status.startDate && status.startDate !== 'Por definir'
                                            ? (status.finalDate && status.finalDate !== 'Por definir' 
                                                ? `${status.startDate} al ${status.finalDate}`
                                                : `${status.startDate}`)
                                            : 'Fechas por definir próximamente'}
                                    </p>
                                </div>
                            </div>
                        )}
                    </CardContent>
                </Card>

                {/* 2. Documents */}
                <Card className="border-none shadow-lg flex flex-col order-2 bg-white">
                    <CardHeader className="bg-gray-100 pb-4">
                        <div className="flex items-center gap-2">
                            <FileText className="h-5 w-5 text-gray-600" />
                            <CardTitle className="text-xl text-gray-800">Documentos</CardTitle>
                        </div>
                    </CardHeader>
                    <CardContent className="p-6 flex-grow flex flex-col gap-4">
                        {documents.length > 0 ? (
                            documents.map((doc, idx) => (
                                <a
                                    key={idx}
                                    href={doc.url}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="flex items-center justify-between p-4 rounded-xl border border-gray-100 hover:border-blue-200 hover:bg-blue-50/50 transition-all group"
                                >
                                    <div className="flex items-center gap-3">
                                        <div className="p-2 bg-red-50 text-red-500 rounded-lg group-hover:scale-110 transition-transform">
                                            <Download className="h-5 w-5" />
                                        </div>
                                        <div>
                                            <h4 className="font-bold text-midnightblue group-hover:text-primary transition-colors text-sm md:text-base">
                                                {doc.title}
                                            </h4>
                                            <p className="text-xs text-gray-500">{doc.subtitle || 'Descargar PDF'}</p>
                                        </div>
                                    </div>
                                    <Download className="h-4 w-4 text-gray-400 group-hover:text-primary transition-colors" />
                                </a>
                            ))
                        ) : (
                            <div className="flex flex-col items-center justify-center p-8 text-center text-gray-400">
                                <FileText className="h-8 w-8 mb-2 opacity-50" />
                                <p className="text-sm font-medium">Documentos por publicar</p>
                                <p className="text-xs text-gray-400 mt-1">Planillas y reglamentos disponibles próximamente.</p>
                            </div>
                        )}
                    </CardContent>
                </Card>

                {/* 3. Scouting Logos */}
                {scoutingImages.length > 0 && (
                    <Card className="border-none shadow-lg overflow-hidden order-3 bg-white">
                        <CardHeader className="bg-gray-100 pb-4">
                            <div className="flex items-center gap-2">
                                <Users className="h-5 w-5 text-primary" />
                                <CardTitle className="text-xl text-midnightblue">Clubes y Veedores</CardTitle>
                            </div>
                        </CardHeader>
                        <CardContent className="p-6">
                            <ScoutingCarousel images={scoutingImages} />
                        </CardContent>
                    </Card>
                )}

                {/* 4. Event Status Card */}
                <Card className="md:col-span-2 overflow-hidden border-none shadow-lg order-4 bg-gradient-to-br from-midnightblue to-primary text-white">
                    <CardContent className="p-6 sm:p-8">
                        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4 text-center">
                            <div>
                                <p className="text-xs text-white/70 uppercase tracking-wider mb-1">Inscripciones</p>
                                <span className={`inline-block px-3 py-1 rounded-full text-xs font-bold ${
                                    status.registrationStatus?.toLowerCase().includes('abierta') 
                                        ? 'bg-green-500/30 text-green-300 border border-green-500/50'
                                        : 'bg-white/20 text-white'
                                }`}>
                                    {status.registrationStatus || 'ABIERTAS'}
                                </span>
                            </div>
                            <div>
                                <p className="text-xs text-white/70 uppercase tracking-wider mb-1">Cierre Registro</p>
                                <p className="font-bold text-sm sm:text-base">{status.registrationDeadline || 'Por definir'}</p>
                            </div>
                            <div>
                                <p className="text-xs text-white/70 uppercase tracking-wider mb-1">Congreso Técnico</p>
                                <p className="font-bold text-sm sm:text-base">{status.technicalCongressDate || 'Por definir'}</p>
                            </div>
                            <div>
                                <p className="text-xs text-white/70 uppercase tracking-wider mb-1">Inicio Torneo</p>
                                <p className="font-bold text-sm sm:text-base">{status.startDate || 'Por definir'}</p>
                            </div>
                            <div>
                                <p className="text-xs text-white/70 uppercase tracking-wider mb-1">Gran Final</p>
                                <p className="font-bold text-sm sm:text-base">{status.finalDate || 'Por definir'}</p>
                            </div>
                        </div>
                    </CardContent>
                </Card>

            </div>

            {/* Category Modal */}
            {selectedCategory && data[selectedCategory] && (
                <CategoryModal
                    category={selectedCategory}
                    groups={data[selectedCategory].groups || []}
                    schedule={data[selectedCategory].schedule || []}
                    isOpen={!!selectedCategory}
                    onClose={() => setSelectedCategory(null)}
                />
            )}
        </div>
    );
}
