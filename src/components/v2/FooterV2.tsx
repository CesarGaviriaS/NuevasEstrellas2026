import Image from 'next/image';
import Link from 'next/link';

export default function FooterV2() {
    const WHATSAPP_URL = "https://wa.me/573132644781?text=" + encodeURIComponent("¡Hola! Deseo más información sobre el Torneo Nuevas Estrellas Electrolit 2026.");

    return (
        <footer className="bg-primary text-white py-14">
            <div className="mx-auto w-full responsive-padding">
                <div className="text-center max-w-4xl mx-auto">
                    <div className="mb-6 relative h-20 w-full">
                        <Image
                            src="/logo nuevas estrellas con letras.png"
                            alt="Nuevas Estrellas Logo"
                            fill
                            className="object-contain mx-auto"
                            sizes="(max-width: 768px) 100vw, 300px"
                        />
                    </div>

                    <div className="mb-8">
                        <h3 className="text-2xl sm:text-4xl font-bold mb-2">
                            ¡Tú pones el talento, nosotros el camino!
                        </h3>
                        <p className="text-lg sm:text-xl font-medium text-amber-300">
                            Torneo Nuevas Estrellas Electrolit 2026 · Yopal, Casanare
                        </p>
                    </div>

                    <div className="flex flex-wrap justify-center gap-6 text-sm text-white/90 mb-8">
                        <Link href="/2#torneo" className="hover:underline">El Torneo</Link>
                        <Link href="/2#categorias" className="hover:underline">Categorías</Link>
                        <Link href="/2#inscripciones" className="hover:underline">Inscripciones</Link>
                        <Link href="/2#sedes" className="hover:underline">Sedes</Link>
                        <Link href="/2#scouts" className="hover:underline">Scouts</Link>
                        <Link href="/2#noticias" className="hover:underline">Noticias</Link>
                        <Link href="/2#promotora" className="hover:underline">La Promotora</Link>
                        <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer" className="text-amber-300 font-bold hover:underline">
                            Contacto WhatsApp
                        </a>
                    </div>

                    <div className="border-t border-white/20 pt-8 flex flex-col md:flex-row justify-between items-center text-xs text-white/80 gap-4">
                        <p>© 2026 Promotora Deportiva Nuevas Estrellas. Todos los derechos reservados.</p>
                        <p>1 al 6 de Diciembre de 2026 · Yopal, Casanare, Colombia</p>
                    </div>
                </div>
            </div>
        </footer>
    );
}
