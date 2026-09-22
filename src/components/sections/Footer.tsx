import Image from 'next/image';

export default function Footer() {
    return (
        <footer className="bg-primary text-white py-12">
            <div className="mx-auto w-full responsive-padding">
                <div className="text-center">
                    <div className="mb-8 relative h-20 w-full">
                        <Image
                            src="/logo nuevas estrellas con letras.png"
                            alt="Nuevas Estrellas Logo"
                            fill
                            className="object-contain mx-auto mb-6"
                            sizes="(max-width: 768px) 100vw, 300px"
                        />
                    </div>

                    {/* Inspirational Message */}
                    <div className="mb-8">
                        <h3 className="text-3xl md:text-4xl font-bold mb-4">
                            ¡Tú pones el talento,
                        </h3>
                        <p className="text-2xl md:text-3xl font-medium opacity-90">
                            Nosotros, el camino!
                        </p>
                    </div>

                    <div className="border-t border-white/20 pt-8">
                        <div className="flex flex-col md:flex-row justify-between items-center">
                            <div className="pb-4 md:pb-0">
                                <p className="text-sm opacity-80">
                                    © 2025 Nuevas Estrellas. Todos los derechos reservados.
                                </p>
                            </div>
                            <div className="text-center md:text-right">
                                <p className="text-sm opacity-80">
                                    Impulsando el desarrollo integral de jóvenes futbolistas talentosos
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
}
