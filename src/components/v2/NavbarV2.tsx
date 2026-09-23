'use client';

import { useState } from 'react';
import { Menu } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import NewsTicker from '@/components/ui/NewsTicker';

export default function NavbarV2() {
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

    const WHATSAPP_URL = "https://wa.me/573132644781?text=" + encodeURIComponent("¡Hola! Deseo recibir información oficial para inscribir a mi equipo en el Torneo Nuevas Estrellas Electrolit 2026 en Yopal.");

    const navLinks = [
        { href: "/#promotora", label: "Sobre Nosotros" },
        { href: "/#galeria", label: "Galería" },
        { href: "/#scouts", label: "Talento & Scouts" },
        { href: "/#torneo", label: "El Torneo 2026" },
        { href: "/#categorias", label: "Categorías" },
        { href: "/#inscripciones", label: "Inscripciones" },
        { href: "/#sedes", label: "Sedes" },
        { href: "/#noticias", label: "Noticias" },
        { href: "/#patrocinadores", label: "Patrocinadores" },
    ];

    return (
        <>
            <header className="fixed top-0 left-0 right-0 z-50 bg-primary text-white shadow-lg">
                <div className="mx-auto w-full responsive-padding py-2 flex items-center justify-between">
                    <Link href="/" className="flex items-center gap-2 cursor-pointer hover:opacity-90 transition-opacity flex-shrink-0">
                        <div className="relative h-12 w-12 flex-shrink-0">
                            <Image
                                src="/logo-copa-simple.png"
                                alt="Torneo Nuevas Estrellas Logo"
                                fill
                                className="object-contain"
                                sizes="(max-width: 300px) 100px, 100px"
                            />
                        </div>
                        <div className="hidden lg:flex flex-col">
                            <span className="text-base font-bold whitespace-nowrap leading-tight text-white">
                                Torneo Nuevas Estrellas
                            </span>
                            <span className="text-[11px] font-semibold whitespace-nowrap text-amber-300">
                                Electrolit 2026 · Yopal
                            </span>
                        </div>
                    </Link>

                    {/* Hamburger menu */}
                    <button
                        className="xl:hidden p-2 rounded-lg hover:bg-white/10 text-white transition-colors"
                        onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                        aria-label="Abrir menú"
                    >
                        <Menu className="h-6 w-6" />
                    </button>

                    {/* Desktop Navigation */}
                    <nav className="hidden xl:flex gap-3 items-center flex-shrink-0">
                        <div className="flex gap-5 items-center mr-3">
                            {navLinks.map((link) => (
                                <a
                                    key={link.href}
                                    href={link.href}
                                    className="hover:text-amber-300 transition-colors font-medium text-sm whitespace-nowrap text-white"
                                >
                                    {link.label}
                                </a>
                            ))}
                        </div>

                        {/* CTA button */}
                        <Link
                            href="/inscripciones"
                            className="px-5 py-2 rounded-full font-semibold text-sm transition-all duration-300 inline-block text-center whitespace-nowrap bg-white text-primary hover:bg-gray-100 shadow-sm"
                        >
                            Inscribir Equipo
                        </Link>
                    </nav>
                </div>

                {/* Mobile/Tablet Menu */}
                {mobileMenuOpen && (
                    <div className="xl:hidden bg-primary text-white shadow-2xl border-t border-white/15 animate-in slide-in-from-top-2 duration-200 max-h-[calc(100vh-64px)] overflow-y-auto">
                        <nav className="px-4 py-6 space-y-3 max-w-7xl mx-auto">
                            {navLinks.map((link) => (
                                <a
                                    key={link.href}
                                    href={link.href}
                                    className="block py-2.5 px-4 text-white font-medium hover:bg-white/10 rounded-lg transition-colors"
                                    onClick={() => setMobileMenuOpen(false)}
                                >
                                    {link.label}
                                </a>
                            ))}
                            <div className="space-y-2 pt-4 border-t border-white/15">
                                <Link
                                    href="/inscripciones"
                                    className="block py-3 px-4 bg-white text-primary hover:bg-gray-100 rounded-lg text-center font-semibold transition-colors shadow-sm"
                                    onClick={() => setMobileMenuOpen(false)}
                                >
                                    Inscribir Equipo
                                </Link>
                            </div>
                        </nav>
                    </div>
                )}
            </header>
        </>
    );
}
