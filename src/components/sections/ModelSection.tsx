'use client';

import Image from 'next/image';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent } from '@/components/ui/card';
import { SmoothTabsContent } from '@/components/ui/SmoothTabsContent';

export default function ModelSection() {
    return (
        <section id="model" className="py-20 bg-gray-50">
            <div className="mx-auto w-full responsive-padding">
                <div className="text-center pb-12">
                    <span className="inline-block px-4 py-3 bg-secondary/30 text-primary rounded-full text-sm mb-4">
                        NUESTRO MODELO
                    </span>
                    <h2 className="text-3xl md:text-4xl font-bold">
                        Torneo Nuevas Estrellas - Una Plataforma para Brillar
                    </h2>
                </div>

                <Tabs defaultValue="torneo" className="max-w-6xl mx-auto transition-all duration-500 ease-in-out">

                    {/* Tabs Header */}
                    <TabsList className="grid w-full grid-cols-2 sm:grid-cols-4 mb-10 h-auto p-1.5 gap-1.5 bg-gray-200/70 rounded-xl">
                        <TabsTrigger value="torneo" className="transition-all duration-300 py-2.5 px-3 text-sm sm:text-base font-semibold cursor-pointer rounded-lg data-[state=active]:bg-primary data-[state=active]:text-white data-[state=active]:shadow-md hover:bg-gray-200">Torneo</TabsTrigger>
                        <TabsTrigger value="programas" className="transition-all duration-300 py-2.5 px-3 text-sm sm:text-base font-semibold cursor-pointer rounded-lg data-[state=active]:bg-primary data-[state=active]:text-white data-[state=active]:shadow-md hover:bg-gray-200">Programas</TabsTrigger>
                        <TabsTrigger value="scouting" className="transition-all duration-300 py-2.5 px-3 text-sm sm:text-base font-semibold cursor-pointer rounded-lg data-[state=active]:bg-primary data-[state=active]:text-white data-[state=active]:shadow-md hover:bg-gray-200">Scouting</TabsTrigger>
                        <TabsTrigger value="gestion" className="transition-all duration-300 py-2.5 px-3 text-sm sm:text-base font-semibold cursor-pointer rounded-lg data-[state=active]:bg-primary data-[state=active]:text-white data-[state=active]:shadow-md hover:bg-gray-200">Gestión</TabsTrigger>
                    </TabsList>

                    {/* ---------------------------------------------------------------------- */}
                    {/*                               TORNEO                                   */}
                    {/* ---------------------------------------------------------------------- */}
                    <SmoothTabsContent value="torneo">
                        <div className="grid md:grid-cols-2 gap-8 lg:gap-10 items-stretch">
                            {/* IZQUIERDA */}
                            <Card className="bg-primary text-white rounded-xl overflow-hidden transition-all duration-300 hover:shadow-xl min-h-[380px] md:h-full flex flex-col">
                                <CardContent className="p-6 sm:p-8 md:p-10 space-y-6 flex flex-col justify-center flex-grow">
                                    <h3 className="text-2xl sm:text-3xl font-bold">Torneo Nuevas Estrellas Electrolit</h3>
                                    <p className="opacity-90 leading-relaxed text-sm sm:text-base">
                                        1200 futbolistas participantes de clubes de 10 departamentos, con cuatro categorías juveniles:
                                        sub 12, sub 14, sub 16 y sub 18, con scoutings de clubes profesionales.
                                    </p>
                                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-4 border-t border-white/20">
                                        <p className="font-semibold text-sm sm:text-base">1200 futbolistas</p>
                                        <p className="font-semibold text-sm sm:text-base">10 departamentos</p>
                                        <p className="font-semibold text-sm sm:text-base">4 categorías</p>
                                    </div>
                                </CardContent>
                            </Card>

                            {/* DERECHA */}
                            <div className="relative w-full h-[300px] sm:h-[400px] md:h-full min-h-[300px] md:min-h-[420px] rounded-xl overflow-hidden shadow-lg">
                                <Image
                                    src="/nm - panoramica marca y perosnas.png"
                                    alt="Torneo Nuevas Estrellas"
                                    fill
                                    className="object-cover"
                                    sizes="(max-width: 768px) 100vw, 50vw"
                                />
                            </div>
                        </div>
                    </SmoothTabsContent>

                    {/* ---------------------------------------------------------------------- */}
                    {/*                               PROGRAMAS                                */}
                    {/* ---------------------------------------------------------------------- */}
                    <SmoothTabsContent value="programas">
                        <div className="grid md:grid-cols-2 gap-8 lg:gap-10 items-stretch">
                            <Card className="bg-primary text-white rounded-xl overflow-hidden transition-all duration-300 hover:shadow-xl min-h-[380px] md:h-full flex flex-col">
                                <CardContent className="p-6 sm:p-8 md:p-10 space-y-6 flex flex-col justify-center flex-grow">
                                    <h3 className="text-2xl sm:text-3xl font-bold">Programas de Mejoramiento Individual</h3>
                                    <p className="opacity-90 leading-relaxed text-sm sm:text-base">
                                        Diseñamos planes personalizados que incluyen historia clínica deportiva,
                                        seguimiento nutricional y perfeccionamiento técnico y físico según la necesidad del jugador.
                                    </p>
                                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-4 border-t border-white/20">
                                        <p className="font-semibold text-sm sm:text-base">Historia clínica</p>
                                        <p className="font-semibold text-sm sm:text-base">Nutrición</p>
                                        <p className="font-semibold text-sm sm:text-base">Condición física</p>
                                    </div>
                                </CardContent>
                            </Card>

                            <div className="relative w-full h-[300px] sm:h-[400px] md:h-full min-h-[300px] md:min-h-[420px] rounded-xl overflow-hidden shadow-lg">
                                <Image
                                    src="/nm - joven alzando brazos.jpg"
                                    alt="Programas de Mejoramiento"
                                    fill
                                    className="object-cover"
                                    sizes="(max-width: 768px) 100vw, 50vw"
                                />
                            </div>
                        </div>
                    </SmoothTabsContent>

                    {/* ---------------------------------------------------------------------- */}
                    {/*                                SCOUTING                                */}
                    {/* ---------------------------------------------------------------------- */}
                    <SmoothTabsContent value="scouting">
                        <div className="grid md:grid-cols-2 gap-8 lg:gap-10 items-stretch">
                            <Card className="bg-primary text-white rounded-xl overflow-hidden transition-all duration-300 hover:shadow-xl min-h-[380px] md:h-full flex flex-col">
                                <CardContent className="p-6 sm:p-8 md:p-10 space-y-6 flex flex-col justify-center flex-grow">
                                    <h3 className="text-2xl sm:text-3xl font-bold">Scouting Profesional</h3>
                                    <p className="opacity-90 leading-relaxed text-sm sm:text-base">
                                        Observación técnica realizada por profesionales experimentados, análisis por video,
                                        mediciones físicas y valoración del perfil deportivo para proyección competitiva.
                                    </p>
                                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-4 border-t border-white/20">
                                        <p className="font-semibold text-sm sm:text-base">Análisis técnico</p>
                                        <p className="font-semibold text-sm sm:text-base">Mediciones físicas</p>
                                        <p className="font-semibold text-sm sm:text-base">Proyección deportiva</p>
                                    </div>
                                </CardContent>
                            </Card>

                            <div className="relative w-full h-[300px] sm:h-[400px] md:h-full min-h-[300px] md:min-h-[420px] rounded-xl overflow-hidden shadow-lg">
                                <Image
                                    src="/nm - entrenadores observando .jpg"
                                    alt="Scouting Profesional"
                                    fill
                                    className="object-cover"
                                    sizes="(max-width: 768px) 100vw, 50vw"
                                />
                            </div>
                        </div>
                    </SmoothTabsContent>

                    {/* ---------------------------------------------------------------------- */}
                    {/*                                GESTIÓN                                 */}
                    {/* ---------------------------------------------------------------------- */}
                    <SmoothTabsContent value="gestion">
                        <div className="grid md:grid-cols-2 gap-8 lg:gap-10 items-stretch">
                            <Card className="bg-primary text-white rounded-xl overflow-hidden transition-all duration-300 hover:shadow-xl min-h-[380px] md:h-full flex flex-col">
                                <CardContent className="p-6 sm:p-8 md:p-10 space-y-6 flex flex-col justify-center flex-grow">
                                    <h3 className="text-2xl sm:text-3xl font-bold">Gestión y Formación</h3>
                                    <p className="opacity-90 leading-relaxed text-sm sm:text-base">
                                        Capacitamos entrenadores, formadores y clubes en metodologías modernas, planificación profesional
                                        y administración deportiva enfocada en el alto rendimiento juvenil.
                                    </p>
                                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-4 border-t border-white/20">
                                        <p className="font-semibold text-sm sm:text-base">Formación</p>
                                        <p className="font-semibold text-sm sm:text-base">Metodología</p>
                                        <p className="font-semibold text-sm sm:text-base">Administración</p>
                                    </div>
                                </CardContent>
                            </Card>

                            <div className="relative w-full h-[300px] sm:h-[400px] md:h-full min-h-[300px] md:min-h-[420px] rounded-xl overflow-hidden shadow-lg">
                                <Image
                                    src="/nm - arbitros 1x1.jpg"
                                    alt="Gestión y Formación"
                                    fill
                                    className="object-cover"
                                    sizes="(max-width: 768px) 100vw, 50vw"
                                />
                            </div>
                        </div>
                    </SmoothTabsContent>

                </Tabs>

                <div className="text-center pt-12 max-w-2xl mx-auto">
                    <p className="text-gray-700 text-lg">
                        Para Nuevas Estrellas el fútbol no tiene fronteras, es un mundo con oportunidades. Programas de viajes, intercambios, scouting internacional, visibilidad y oportunidades reales.
                    </p>
                </div>
            </div>
        </section>
    );
}
