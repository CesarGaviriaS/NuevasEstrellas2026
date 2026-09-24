'use client';

import { useState } from 'react';
import Image from 'next/image';
import { MessageSquareQuote, Quote } from 'lucide-react';

interface Testimonial {
    id: string;
    name: string;
    role: string;
    organization: string;
    type: 'jugador' | 'entrenador' | 'scout' | 'patrocinador';
    typeLabel: string;
    avatar?: string;
    initials: string;
    quote: string;
    highlight: string;
}

const testimonials: Testimonial[] = [
    {
        id: '1',
        name: 'Profesor Carlos Toledo',
        role: 'Director Técnico y Formador',
        organization: 'Club Cundinamarca',
        type: 'entrenador',
        typeLabel: 'Entrenador',
        avatar: '/profesor carlos toledo club cundinamarca.jpg',
        initials: 'CT',
        quote: 'Participar en Nuevas Estrellas ha sido una de las mejores experiencias competitivas para nuestros muchachos. La seriedad de la organización, la calidad de los escenarios y la presencia constante de veedores profesionales hacen que valga cada minuto de esfuerzo.',
        highlight: 'Organización seria y veedurías reales'
    },
    {
        id: '2',
        name: 'David Alejandro Moreno',
        role: 'Jugador Categoría Sub-16',
        organization: 'Proyectado a Cantera Profesional',
        type: 'jugador',
        typeLabel: 'Jugador',
        initials: 'DM',
        quote: 'El torneo me dio la confianza y la vitrina que necesitaba. Jugar frente a scouts de clubes de primera división en un ambiente tan exigente y ordenado te cambia la mentalidad como futbolista.',
        highlight: 'Una vitrina directa hacia el fútbol profesional'
    },
    {
        id: '3',
        name: 'Director de Captación y Scouting',
        role: 'Veedor Deportivo Invitado',
        organization: 'Club Profesional Primera División',
        type: 'scout',
        typeLabel: 'Scout / Veedor',
        initials: 'VS',
        quote: 'En Yopal y en los Llanos hay una riqueza técnica y física impresionante. Torneo Nuevas Estrellas nos brinda las garantías tácticas y la organización necesaria para hacer seguimiento riguroso y transparente a los nuevos prospectos.',
        highlight: 'Seguimiento riguroso en condiciones reales de juego'
    },
    {
        id: '4',
        name: 'Representante Institucional',
        role: 'Coordinador de Alianzas Deportivas',
        organization: 'Aliado Institucional & Patrocinio',
        type: 'patrocinador',
        typeLabel: 'Patrocinador',
        initials: 'EP',
        quote: 'Apoyar el Torneo Nuevas Estrellas es apostar por el futuro de la juventud colombiana. El impacto social, el posicionamiento de marca y los valores de disciplina y juego limpio que promueven son ejemplares.',
        highlight: 'Impacto social y proyección comunitaria positiva'
    },
    {
        id: '5',
        name: 'Mateo Restrepo',
        role: 'Capitán Equipo Campeón Sub-14',
        organization: 'Academia Formativa Regional',
        type: 'jugador',
        typeLabel: 'Jugador',
        initials: 'MR',
        quote: 'La competencia es muy intensa pero muy sana. Los árbitros federados y el cronograma se respetan al 100%. Nos sentimos como profesionales jugando este torneo.',
        highlight: 'Nivel competitivo y respeto total al juego limpio'
    },
    {
        id: '6',
        name: 'Lic. Fernando Gómez',
        role: 'Entrenador Categoría Sub-18',
        organization: 'Escuela de Fútbol del Llano',
        type: 'entrenador',
        typeLabel: 'Entrenador',
        initials: 'FG',
        quote: 'Las charlas formativas y el acompañamiento previo a los partidos marcan la diferencia. No solo se premia al que gana, sino que se educa integralmente a los deportistas.',
        highlight: 'Formación táctica, humana y deportiva integral'
    }
];

const filterCategories = [
    { key: 'todos', label: 'Todos los Testimonios' },
    { key: 'entrenador', label: 'Entrenadores' },
    { key: 'jugador', label: 'Jugadores' },
    { key: 'scout', label: 'Scouts & Veedores' },
    { key: 'patrocinador', label: 'Patrocinadores & Aliados' }
];

export default function TestimoniosV2() {
    const [selectedType, setSelectedType] = useState('todos');

    const filteredTestimonials = selectedType === 'todos'
        ? testimonials
        : testimonials.filter(t => t.type === selectedType);

    return (
        <section id="testimonios" className="py-20 bg-gradient-to-b from-white to-gray-50/80 border-t border-gray-100">
            <div className="mx-auto w-full max-w-7xl responsive-padding">
                {/* Section Header */}
                <div className="text-center max-w-3xl mx-auto pb-12">
                    <span className="inline-flex items-center gap-2 px-4 py-1.5 bg-primary/10 text-primary font-bold rounded-full text-xs sm:text-sm uppercase tracking-wider mb-3">
                        <MessageSquareQuote className="w-4 h-4" />
                        Voces y Experiencias
                    </span>
                    <h2 className="text-3xl md:text-5xl font-bold text-midnightblue leading-tight pb-4">
                        Lo Que Dicen Quienes Viven el Torneo
                    </h2>
                    <p className="text-base sm:text-lg text-gray-700 leading-relaxed">
                        Conoce las impresiones de entrenadores, futbolistas, veedores oficiales y marcas aliadas que confían en Nuevas Estrellas como la plataforma de proyección deportiva por excelencia.
                    </p>
                </div>

                {/* Filter Tabs */}
                <div className="flex flex-wrap justify-center gap-2 sm:gap-3 mb-12">
                    {filterCategories.map((cat) => (
                        <button
                            key={cat.key}
                            onClick={() => setSelectedType(cat.key)}
                            className={`px-4 sm:px-6 py-2.5 rounded-full text-xs sm:text-sm font-semibold transition-all duration-300 shadow-sm ${
                                selectedType === cat.key
                                    ? 'bg-primary text-white shadow-md shadow-primary/20 scale-105'
                                    : 'bg-white text-gray-600 hover:bg-gray-100 border border-gray-200'
                            }`}
                        >
                            {cat.label}
                        </button>
                    ))}
                </div>

                {/* Testimonials Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
                    {filteredTestimonials.map((t) => (
                        <div
                            key={t.id}
                            className="flex flex-col justify-between bg-white rounded-2xl p-6 sm:p-8 shadow-md hover:shadow-xl transition-all duration-300 border border-gray-100 hover:border-primary/30 relative group"
                        >
                            {/* Decorative Quote mark */}
                            <div className="absolute top-6 right-6 text-gray-100 group-hover:text-primary/10 transition-colors pointer-events-none">
                                <Quote className="w-10 h-10" />
                            </div>

                            <div>
                                {/* Highlight Tagline */}
                                <h4 className="font-bold text-midnightblue text-base leading-snug mb-3 pr-8">
                                    &ldquo;{t.highlight}&rdquo;
                                </h4>

                                {/* Full Quote */}
                                <p className="text-sm text-gray-600 leading-relaxed mb-6 italic">
                                    &ldquo;{t.quote}&rdquo;
                                </p>
                            </div>

                            {/* Author Info */}
                            <div className="pt-4 border-t border-gray-100 flex items-center gap-3.5">
                                {t.avatar ? (
                                    <div className="relative w-12 h-12 rounded-full overflow-hidden flex-shrink-0 border-2 border-primary/20">
                                        <Image
                                            src={t.avatar}
                                            alt={t.name}
                                            fill
                                            className="object-cover"
                                        />
                                    </div>
                                ) : (
                                    <div className="w-12 h-12 rounded-full bg-gradient-to-tr from-primary to-blue-600 text-white font-bold flex items-center justify-center flex-shrink-0 text-sm shadow-sm">
                                        {t.initials}
                                    </div>
                                )}
                                <div>
                                    <h5 className="font-bold text-midnightblue text-sm leading-tight">
                                        {t.name}
                                    </h5>
                                    <p className="text-xs text-gray-500 leading-tight mt-0.5">
                                        {t.role}
                                    </p>
                                    <p className="text-[11px] text-primary font-semibold leading-tight mt-0.5">
                                        {t.organization}
                                    </p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
