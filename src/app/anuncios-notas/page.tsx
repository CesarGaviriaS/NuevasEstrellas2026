import NavbarV2 from '@/components/v2/NavbarV2';
import Footer from '@/components/sections/Footer';
import AnunciosNotas from '@/components/sections/AnunciosNotas';

export default function AnunciosNotasPage() {
    return (
        <div className="min-h-screen flex flex-col">
            <NavbarV2 />
            <main className="flex-grow pt-[64px]">
                <AnunciosNotas />
            </main>
            <Footer />
        </div>
    );
}
