import Image from 'next/image';
import Link from 'next/link';
import { OFFICIAL_EMAIL, OFFICIAL_PHONE_DISPLAY, OFFICIAL_WHATSAPP_URL } from '@/lib/constants';

export default function FooterV2() {
    return (
        <footer className="bg-[#000035] text-white py-14">
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
                        <p className="text-lg sm:text-xl font-medium text-amber-300 mb-3">
                            Torneo Nuevas Estrellas Electrolit 2026 · Yopal, Casanare
                        </p>
                        <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-sm font-semibold text-white/90">
                            <p>
                                Contacto e Inscripciones: <a href={OFFICIAL_WHATSAPP_URL} target="_blank" rel="noopener noreferrer" className="text-amber-300 font-bold hover:underline ml-1">{OFFICIAL_PHONE_DISPLAY}</a>
                            </p>
                            <span className="hidden sm:inline text-white/40">•</span>
                            <p>
                                Correo: <a href={`mailto:${OFFICIAL_EMAIL}`} className="text-amber-300 font-bold hover:underline ml-1">{OFFICIAL_EMAIL}</a>
                            </p>
                        </div>
                    </div>

                    <div className="flex flex-wrap justify-center gap-6 text-sm text-white/90 mb-8">
                        <Link href="/#torneo" className="hover:underline">El Torneo</Link>
                        <Link href="/#categorias" className="hover:underline">Categorías</Link>
                        <Link href="/#inscripciones" className="hover:underline">Inscripciones</Link>
                        <Link href="/#sedes" className="hover:underline">Sedes</Link>
                        <Link href="/#scouts" className="hover:underline">Scouts</Link>
                        <Link href="/#noticias" className="hover:underline">Noticias</Link>
                        <Link href="/#promotora" className="hover:underline">La Promotora</Link>
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
