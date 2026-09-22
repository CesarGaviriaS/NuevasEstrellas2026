import Navbar from '@/components/sections/Navbar';
import Footer from '@/components/sections/Footer';
import AnunciosNotas from '@/components/sections/AnunciosNotas';

export default function AnunciosNotasPage() {
    return (
        <div className="min-h-screen flex flex-col">
            <Navbar />
            <main className="flex-grow pt-20">
                <AnunciosNotas />
            </main>
            <Footer />
        </div>
    );
}
