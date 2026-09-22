import Navbar from '@/components/sections/Navbar';
import HomeSectionRenderer from '@/components/sections/HomeSectionRenderer';
import Footer from '@/components/sections/Footer';
import { getHomeConfig } from '@/lib/wordpress';
import { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Nuevas Estrellas (Versión Anterior)',
    description: 'Respaldo de la versión anterior del sitio web Nuevas Estrellas.',
};

export default async function VersionAntiguaPage() {
    const initialConfig = await getHomeConfig();

    return (
        <div className="min-h-screen flex flex-col">
            <Navbar />
            <main className="flex-grow">
                <HomeSectionRenderer initialConfig={initialConfig} />
            </main>
            <Footer />
        </div>
    );
}
