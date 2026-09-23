import { Metadata } from 'next';
import NavbarV2 from '@/components/v2/NavbarV2';
import HeroV2 from '@/components/v2/HeroV2';
import TorneoIntroV2 from '@/components/v2/TorneoIntroV2';
import CategoriasV2 from '@/components/v2/CategoriasV2';
import CostosCalendarioV2 from '@/components/v2/CostosCalendarioV2';
import SedesV2 from '@/components/v2/SedesV2';
import ScoutsV2 from '@/components/v2/ScoutsV2';
import CapacitacionesV2 from '@/components/v2/CapacitacionesV2';
import NoticiasCMSV2 from '@/components/v2/NoticiasCMSV2';
import PromotoraV2 from '@/components/v2/PromotoraV2';
import PatrocinadoresV2 from '@/components/v2/PatrocinadoresV2';
import GaleriaV2 from '@/components/v2/GaleriaV2';
import FooterV2 from '@/components/v2/FooterV2';

export const metadata: Metadata = {
    title: 'Torneo Nuevas Estrellas Electrolit 2026 | Yopal, Casanare',
    description: 'Edición oficial 2026 del Torneo Nuevas Estrellas Electrolit en Yopal, Casanare del 1 al 6 de Diciembre. Categorías Sub-12, Sub-14, Sub-16 y Sub-18.',
};

export default function Torneo2026Page() {
    return (
        <div className="min-h-screen flex flex-col bg-white text-gray-900 selection:bg-primary selection:text-white">
            <NavbarV2 />
            <main className="flex-1 pt-[64px]">
                <HeroV2 />
                <PromotoraV2 />
                <GaleriaV2 />
                <ScoutsV2 />
                <CapacitacionesV2 />
                <TorneoIntroV2 />
                <CategoriasV2 />
                <CostosCalendarioV2 />
                <SedesV2 />
                <NoticiasCMSV2 />
                <PatrocinadoresV2 />
            </main>
            <FooterV2 />
        </div>
    );
}
