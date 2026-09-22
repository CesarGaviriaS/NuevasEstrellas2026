'use client';

import { useState } from 'react';
import { Calendar, MapPin, Users, Trophy, FileText, Info, Clock, Shield, Plus, X, Download, ChevronDown, ChevronUp } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import TournamentFlow from '@/components/ui/TournamentFlow';
import ScoutingCarousel from '@/components/ui/ScoutingCarousel';
import CategoryModal from '@/components/modals/CategoryModal';
import { TOURNAMENT_DATA } from '@/lib/tournamentData';

const SCOUTING_IMAGES = [
    "/EscudosFutbol/BogotaFC.png",
    "/EscudosFutbol/D_Tolima.png",
    "/EscudosFutbol/EFC_Cheroes.png",
    //"/EscudosFutbol/Millonarios.png",
    "/EscudosFutbol/R_santander.png",
    //"/EscudosFutbol/america.jpg",
    //"/EscudosFutbol/bChico.png",
    //"/EscudosFutbol/barranquillaFC.png",
    "/EscudosFutbol/cucuta.png",
    //"/EscudosFutbol/equidad.png",
    //"/EscudosFutbol/fortaleza.png",
    //"/EscudosFutbol/jaguares.png",
    "/EscudosFutbol/junior.png",
    "/EscudosFutbol/llanerosFC.png",
    //"/EscudosFutbol/nacional.png",
    //"/EscudosFutbol/oncecaldas.png",
    //"/EscudosFutbol/palmira.png",
    //"/EscudosFutbol/patriotas.png",
    "/EscudosFutbol/realcundinamarca.png",
    //"/EscudosFutbol/santafe.png",
    //"/EscudosFutbol/uMagdalena.png"
];

const VENUES = [
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

export default function TorneoInfo() {
    const [showCongressModal, setShowCongressModal] = useState(false);
    const [showSchedule, setShowSchedule] = useState(false);
    const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
    const [selectedVenue, setSelectedVenue] = useState(VENUES[0]);

    return (
        <section className="py-4 bg-gray-50 min-h-screen">
            <div className="mx-auto w-full px-2 lg:px-1 xl:px-0 max-w-7xl">

                {/* Header */}
                <div className="flex flex-col md:flex-row items-center justify-center gap-6">
                    {/* Logo */}
                    <div className="flex-shrink-0">
                        <img
                            src="/logo-copa-simple.png"
                            alt="Copa Nuevas Estrellas"
                            className="w-24 h-24 md:w-32 md:h-32 object-contain"
                        />
                    </div>

                    {/* Title and Description */}
                    <div className="text-center md:text-left">
                        <h1 className="text-4xl md:text-5xl font-bold text-midnightblue mb-4">
                            Torneo Nuevas Estrellas <span className="text-primary">Electrolit 2025</span>
                        </h1>
                        <p className="text-lg text-gray-600 max-w-2xl">
                            El escenario definitivo para el talento juvenil en Colombia.
                        </p>
                    </div>
                </div>

                {/* Cronograma Dropdown */}
                <div className="mb-6">
                    <button
                        onClick={() => setShowSchedule(!showSchedule)}
                        className="w-full bg-white p-4 rounded-xl shadow-sm border border-gray-200 flex items-center justify-between hover:bg-gray-50 transition-colors"
                    >
                        <div className="flex items-center gap-3">
                            <Calendar className="h-6 w-6 text-primary" />
                            <span className="text-xl font-bold text-midnightblue">Cronograma</span>
                        </div>
                        {showSchedule ? (
                            <ChevronUp className="h-6 w-6 text-gray-500" />
                        ) : (
                            <ChevronDown className="h-6 w-6 text-gray-500" />
                        )}
                    </button>

                    {showSchedule && (
                        <div className="mt-2 grid grid-cols-2 md:grid-cols-4 gap-3 animate-in slide-in-from-top-2 duration-200">
                            {['Sub 12', 'Sub 14', 'Sub 16', 'Sub 18'].map((category) => (
                                <button
                                    key={category}
                                    onClick={() => setSelectedCategory(category)}
                                    className="p-4 bg-white border border-blue-100 rounded-xl hover:bg-blue-50 hover:border-blue-200 transition-all shadow-sm group cursor-pointer"
                                >
                                    <span className="font-bold text-midnightblue group-hover:text-primary transition-colors">
                                        {category}
                                    </span>
                                </button>
                            ))}
                        </div>
                    )}
                </div>

                <CategoryModal
                    isOpen={!!selectedCategory}
                    onClose={() => setSelectedCategory(null)}
                    category={selectedCategory || ''}
                    groups={selectedCategory ? TOURNAMENT_DATA[selectedCategory]?.groups || [] : []}
                    schedule={selectedCategory ? TOURNAMENT_DATA[selectedCategory]?.schedule || [] : []}
                />

                {/* Dashboard Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3">

                    {/* 1. Main Event Card (Map & Date) - Spans 2 columns */}
                    <Card className="md:col-span-2 overflow-hidden border-none shadow-lg">
                        <CardHeader className="bg-midnightblue text-white pb-4">
                            <div className="flex items-center gap-2">
                                <MapPin className="h-5 w-5 text-secondary" />
                                <CardTitle className="text-xl">Sede y lugar de competencia</CardTitle>
                            </div>
                        </CardHeader>
                        <CardContent className="p-0">
                            <div className="grid md:grid-cols-2 h-full">
                                <div className="p-6 space-y-6">
                                    <div>
                                        <h3 className="font-bold text-midnightblue text-lg mb-2 flex items-center gap-2">
                                            <Calendar className="h-5 w-5 text-primary" />
                                            Fecha del Torneo
                                        </h3>
                                        <p className="text-gray-600 text-lg">1 al 6 de Diciembre, 2025</p>
                                    </div>
                                    <div>
                                        <h3 className="font-bold text-midnightblue text-lg mb-2 flex items-center gap-2">
                                            <MapPin className="h-5 w-5 text-primary" />
                                            Ubicación
                                        </h3>
                                        <p className="text-gray-600 mb-2">Sogamoso, Boyacá</p>
                                        <div className="space-y-2">
                                            {VENUES.map((venue) => (
                                                <button
                                                    key={venue.name}
                                                    onClick={() => setSelectedVenue(venue)}
                                                    className={`w-full text-left px-3 py-2 rounded-lg text-sm font-medium transition-colors flex items-center justify-between group ${selectedVenue.name === venue.name
                                                        ? 'bg-blue-100 text-blue-800 border-blue-200'
                                                        : 'bg-gray-50 text-gray-600 hover:bg-gray-100'
                                                        }`}
                                                >
                                                    <span>{venue.name}</span>
                                                    {selectedVenue.name === venue.name && (
                                                        <div className="h-2 w-2 rounded-full bg-blue-500" />
                                                    )}
                                                </button>
                                            ))}
                                        </div>
                                    </div>

                                </div>
                                <div className="h-64 md:h-auto w-full bg-gray-200 relative">
                                    <iframe
                                        src={selectedVenue.mapUrl}
                                        width="100%"
                                        height="100%"
                                        style={{ border: 0, position: 'absolute', top: 0, left: 0 }}
                                        allowFullScreen
                                        loading="lazy"
                                        referrerPolicy="no-referrer-when-downgrade"
                                    ></iframe>
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    {/* 2. Documentos Card */}
                    <Card className="border-none shadow-lg flex flex-col">
                        <CardHeader className="bg-gray-100 pb-4">
                            <div className="flex items-center gap-2">
                                <FileText className="h-5 w-5 text-gray-600" />
                                <CardTitle className="text-xl text-gray-800">Documentos</CardTitle>
                            </div>
                        </CardHeader>
                        <CardContent className="p-6 flex-grow flex flex-col gap-4">
                            <a
                                href="/pdf/AUTORIZACIÃ_N DE USO DE IMAGEN TORNEO 2025.pdf"
                                download
                                className="flex items-center gap-3 p-3 bg-white border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors group shadow-sm"
                            >
                                <div className="p-2 bg-blue-50 rounded-full text-blue-600 group-hover:bg-blue-100 transition-colors">
                                    <Download className="h-4 w-4" />
                                </div>
                                <div className="flex-1">
                                    <p className="text-sm font-bold text-gray-700 leading-tight">Autorización de imagen</p>
                                    <p className="text-xs text-gray-500 mt-0.5">Descargar PDF</p>
                                </div>
                            </a>

                            <a
                                href="/pdf/Carta de AutorizaciÃ³n y ExoneraciÃ³n de Responsabilidad.pdf"
                                download
                                className="flex items-center gap-3 p-3 bg-white border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors group shadow-sm"
                            >
                                <div className="p-2 bg-blue-50 rounded-full text-blue-600 group-hover:bg-blue-100 transition-colors">
                                    <Download className="h-4 w-4" />
                                </div>
                                <div className="flex-1">
                                    <p className="text-sm font-bold text-gray-700 leading-tight">Carta autorización</p>
                                    <p className="text-xs text-gray-500 mt-0.5">Descargar PDF</p>
                                </div>
                            </a>

                            <a
                                href="/pdf/PLANILLA DE INSCRIPCIÃ_N TORNEO NUEVAS ESTRELLAS ELECTROLIT 2025..pdf"
                                download
                                className="flex items-center gap-3 p-3 bg-white border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors group shadow-sm"
                            >
                                <div className="p-2 bg-blue-50 rounded-full text-blue-600 group-hover:bg-blue-100 transition-colors">
                                    <Download className="h-4 w-4" />
                                </div>
                                <div className="flex-1">
                                    <p className="text-sm font-bold text-gray-700 leading-tight">Planilla de inscripción</p>
                                    <p className="text-xs text-gray-500 mt-0.5">Descargar PDF</p>
                                </div>
                            </a>
                        </CardContent>
                    </Card>

                    {/* 3. Scouting Card */}
                    <Card className="border-none shadow-lg">
                        <CardHeader className="bg-primary/10 pb-4">
                            <div className="flex items-center gap-2">
                                <Users className="h-5 w-5 text-primary" />
                                <CardTitle className="text-xl text-primary">Scouting Garantizado</CardTitle>
                            </div>
                        </CardHeader>
                        <CardContent className="p-6">
                            <p className="text-gray-600 mb-4">
                                Presencia de mínimo <strong>9 clubes profesionales</strong> buscando talentos con registro de estadísticas.
                            </p>
                            <div className="pt-4">
                                <ScoutingCarousel images={SCOUTING_IMAGES} />
                            </div>
                        </CardContent>
                    </Card>



                    {/* 4. Details Card (Categories) */}
                    <Card className="border-none shadow-lg sm:col-span-2 lg:col-span-3">
                        <CardHeader className="bg-blue-50 pb-4">
                            <div className="flex items-center gap-2">
                                <Trophy className="h-5 w-5 text-blue-600" />
                                <CardTitle className="text-xl text-blue-800">Categorías y Sistema de Juego</CardTitle>
                            </div>
                        </CardHeader>
                        <CardContent className="p-6">
                            <div className="flex flex-col lg:flex-row gap-6">
                                {/* Categorías */}
                                <div className="lg:w-1/3">
                                    <h4 className="font-bold text-midnightblue text-sm mb-3">Categorías</h4>
                                    <ul className="space-y-3">
                                        <li className="flex items-center justify-between p-2 bg-white rounded-lg border border-blue-100">
                                            <span className="font-medium text-gray-700">Sub 12</span>
                                            <span className="text-sm text-gray-500">Nacidos 2013</span>
                                        </li>
                                        <li className="flex items-center justify-between p-2 bg-white rounded-lg border border-blue-100">
                                            <span className="font-medium text-gray-700">Sub 14</span>
                                            <span className="text-sm text-gray-500">Nacidos 2011</span>
                                        </li>
                                        <li className="flex items-center justify-between p-2 bg-white rounded-lg border border-blue-100">
                                            <span className="font-medium text-gray-700">Sub 16</span>
                                            <span className="text-sm text-gray-500">Nacidos 2009</span>
                                        </li>
                                        <li className="flex items-center justify-between p-2 bg-white rounded-lg border border-blue-100">
                                            <span className="font-medium text-gray-700">Sub 18</span>
                                            <span className="text-sm text-gray-500">2007 - 2006 (5)</span>
                                        </li>
                                    </ul>
                                </div>
                                {/* Sistema de Juego */}
                                <div className="lg:w-2/3 flex flex-col items-center justify-center">
                                    <h4 className="font-bold text-midnightblue text-sm mb-3">Sistema de Juego</h4>
                                    <TournamentFlow />
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    {/* 5. Status & Dates Card (Moved) */}
                    <Card className="border-none shadow-lg flex flex-col">
                        <CardHeader className="bg-gray-100 pb-4">
                            <div className="flex items-center gap-2">
                                <Clock className="h-5 w-5 text-gray-600" />
                                <CardTitle className="text-xl text-gray-800">Estado e Inscripciones</CardTitle>
                            </div>
                        </CardHeader>
                        <CardContent className="p-6 flex-grow flex flex-col justify-center space-y-6">
                            <div className="p-4 bg-gray-200 rounded-xl border border-gray-300 text-gray-500 text-center">
                                <p className="text-xs font-bold uppercase tracking-wider mb-1">Inscripciones</p>
                                <p className="text-xl font-bold">CERRADAS</p>
                                <p className="text-sm">Hasta el 31 de Octubre</p>
                            </div>
                            <div className="flex justify-between items-center border-b pb-2">
                                <span className="text-gray-600">Congreso Técnico</span>
                                <div className="flex items-center gap-2">
                                    <span className="font-bold text-midnightblue">6 Nov<br />6:00 PM</span>
                                    <button
                                        onClick={() => setShowCongressModal(true)}
                                        className="p-1 bg-yellow-100 hover:bg-yellow-200 rounded-full text-yellow-700 transition-colors"
                                        title="Ver más información"
                                    >
                                        <Plus className="h-4 w-4" />
                                    </button>
                                </div>
                            </div>
                            <div className="space-y-3">
                                <div className="flex justify-between items-center border-b pb-2">
                                    <span className="text-gray-600">Inicio Torneo</span>
                                    <span className="font-bold text-midnightblue">1 Dic 2025</span>
                                </div>
                                <div className="flex justify-between items-center border-b pb-2">
                                    <span className="text-gray-600">Gran Final</span>
                                    <span className="font-bold text-midnightblue">6 Dic 2025</span>
                                </div>

                            </div>

                            <div className="text-xs text-gray-500 italic text-center mt-auto">
                                * Transporte, alimentación y alojamiento por cuenta de los participantes.
                            </div>
                        </CardContent>
                    </Card>

                </div>

                {/* Modal for Congreso Técnico */}
                {showCongressModal && (
                    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4" onClick={() => setShowCongressModal(false)}>
                        <div className="bg-white rounded-xl shadow-2xl max-w-lg w-full" onClick={(e) => e.stopPropagation()}>
                            <div className="bg-yellow-50 p-6 rounded-t-xl border-b border-yellow-100">
                                <div className="flex items-center justify-between">
                                    <div className="flex items-center gap-3">
                                        <Info className="h-6 w-6 text-yellow-600" />
                                        <h3 className="text-2xl font-bold text-yellow-800">Congreso Técnico</h3>
                                    </div>
                                    <button
                                        onClick={() => setShowCongressModal(false)}
                                        className="p-2 hover:bg-yellow-200 rounded-full transition-colors"
                                    >
                                        <X className="h-5 w-5 text-yellow-700" />
                                    </button>
                                </div>
                            </div>
                            <div className="p-6 space-y-4">
                                <div className="flex items-start gap-3">
                                    <div className="p-2 bg-yellow-100 rounded-full text-yellow-700 shrink-0">
                                        <Users className="h-5 w-5" />
                                    </div>
                                    <div>
                                        <p className="font-bold text-gray-800 text-lg">Asistencia Obligatoria</p>
                                        <p className="text-gray-600">Para todos los delegados</p>
                                    </div>
                                </div>
                                <div className="pt-2">
                                    <p className="font-semibold text-gray-700 mb-2">Temas a tratar:</p>
                                    <p className="text-gray-600 leading-relaxed">
                                        Sorteo de grupos, premiación, reglamento, calendario, inauguración y sedes.
                                    </p>
                                </div>
                                <div className="pt-2 border-t">
                                    <div className="flex items-center gap-2 text-gray-600">
                                        <Calendar className="h-5 w-5" />
                                        <span className="font-semibold">6 de Noviembre, 2025 - 6:00 PM</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </section>
    );
}
