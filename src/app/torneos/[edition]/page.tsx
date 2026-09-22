import { notFound } from 'next/navigation';
import Navbar from '@/components/sections/Navbar';
import Footer from '@/components/sections/Footer';
import EditionDetailedView from '@/components/sections/EditionDetailedView';
import JsonLd from '@/components/JsonLd';
import { getTournamentEditionData } from '@/lib/wordpress';

// Validate allowed editions
const ALLOWED_EDITIONS = ['2024', '2025', '2026'];

type Props = {
    params: Promise<{
        edition: string;
    }>
}

import { Metadata } from 'next';

export async function generateStaticParams() {
    return ALLOWED_EDITIONS.map((edition) => ({
        edition: edition,
    }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const { edition } = await params;
    return {
        title: `Torneo Nuevas Estrellas ${edition} | Resultados y Clasificación`,
        description: `Consulta toda la información, resultados, calendario y tabla de posiciones del Torneo Nuevas Estrellas edición ${edition}.`,
        openGraph: {
            title: `Torneo Nuevas Estrellas ${edition}`,
            description: `Resultados y estadísticas del Torneo Nuevas Estrellas ${edition}.`,
            url: `https://nuevasestrellas.com/torneos/${edition}`,
        },
    };
}

export default async function EditionPage({ params }: Props) {
    const { edition } = await params;

    if (!ALLOWED_EDITIONS.includes(edition)) {
        notFound();
    }

    const initialData = await getTournamentEditionData(edition);

    return (
        <div className="min-h-screen flex flex-col bg-gray-50">
            <Navbar />
            <main className="flex-grow pt-24 pb-12 px-2 lg:px-1 xl:px-0 max-w-7xl mx-auto w-full">
                <JsonLd data={{
                    "@context": "https://schema.org",
                    "@type": "SportsEvent",
                    "name": `Torneo Nuevas Estrellas ${edition}`,
                    "startDate": `${edition}-01-01`,
                    "endDate": `${edition}-12-31`,
                    "eventStatus": "https://schema.org/EventScheduled",
                    "organizer": {
                        "@type": "Organization",
                        "name": "Nuevas Estrellas",
                        "url": "https://nuevasestrellas.com"
                    },
                    "location": {
                        "@type": "Place",
                        "name": "Colombia",
                        "address": {
                            "@type": "PostalAddress",
                            "addressCountry": "CO"
                        }
                    },
                    "description": `Torneo de fútbol juvenil en Colombia, edición ${edition}.`
                }} />
                <EditionDetailedView edition={edition} initialData={initialData} />
            </main>
            <Footer />
        </div>
    );
}
