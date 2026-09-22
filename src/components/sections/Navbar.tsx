'use client';

import { useState } from 'react';
import { Menu } from 'lucide-react';
import { useScrollPosition } from '@/hooks/useScrollPosition';
import Image from 'next/image';
import Link from 'next/link';
import NewsTicker from '@/components/ui/NewsTicker';

export default function Navbar() {
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const scrollPosition = useScrollPosition();
    const isScrolled = scrollPosition > 0;

    const navLinks = [
        { href: "/#about", label: "Nosotros" },
        { href: "/#model", label: "Nuestro Modelo" },
        { href: "/#impact", label: "Impacto" },
        { href: "/#team", label: "Fundador" },
        { href: "/#contact", label: "Contacto" },
    ];

    return (
        <>
            <header className={`fixed top-0 left-0 right-0 z-50 transition-colors duration-300 ${isScrolled ? 'bg-white shadow-lg' : 'bg-primary text-white shadow-lg'
                }`}>
                <div className="mx-auto w-full responsive-padding py-2 flex items-center justify-between">
                    <Link href="/" className="flex items-center gap-2 cursor-pointer hover:opacity-80 transition-opacity flex-shrink-0">
                        <div className="relative h-12 w-12 flex-shrink-0">
                            <Image
                                src="/logo-nuevas-estrellas.png"
                                alt="Nuevas Estrellas Logo"
                                fill
                                className="object-contain"
                                sizes="(max-width: 300px) 100px, 100px"
                            />
                        </div>
                        <span className={`hidden lg:block text-lg font-semibold whitespace-nowrap ${isScrolled ? 'text-midnightblue' : 'text-white'}`}>
                            Promotora deportiva
                        </span>
                    </Link>

                    {/* Hamburger menu - visible on mobile AND medium screens (< xl) */}
                    <button
                        className={`xl:hidden p-2 rounded-lg hover:bg-black/5 transition-colors ${isScrolled ? 'text-midnightblue' : 'text-white'}`}
                        onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                        aria-label="Abrir menú"
                    >
                        <Menu className="h-6 w-6" />
                    </button>

                    {/* Desktop Navigation - visible on xl+ screens */}
                    <nav className="hidden xl:flex gap-3 items-center flex-shrink-0">
                        {/* Secondary nav links */}
                        <div className="flex gap-6 items-center mr-4">
                            {navLinks.map((link) => (
                                <a
                                    key={link.href}
                                    href={link.href}
                                    className={`hover:opacity-80 transition-colors font-medium text-sm whitespace-nowrap ${isScrolled ? 'text-midnightblue' : 'text-white'}`}
                                >
                                    {link.label}
                                </a>
                            ))}
                        </div>

                        {/* Primary CTA buttons */}
                        <Link href="/torneos" className={`px-5 py-2 rounded-full font-medium text-sm transition-all duration-300 inline-block text-center whitespace-nowrap ${isScrolled
                            ? 'bg-midnightblue text-white hover:bg-blue-900 shadow-sm'
                            : 'bg-white text-blue-900 hover:bg-blue-50 shadow-sm'
                            }`}>
                            Torneo Nuevas Estrellas
                        </Link>
                        <Link href="/anuncios-notas" className={`px-5 py-2 rounded-full font-medium text-sm transition-all duration-300 inline-block text-center whitespace-nowrap ${isScrolled
                            ? 'bg-midnightblue text-white hover:bg-blue-900 shadow-sm'
                            : 'bg-white text-blue-900 hover:bg-blue-50 shadow-sm'
                            }`}>
                            Fútbol Entre Líneas
                        </Link>
                    </nav>
                </div>

                {/* Mobile/Tablet Navigation Menu (< xl) */}
                {mobileMenuOpen && (
                    <div className="xl:hidden bg-white shadow-2xl border-t border-gray-200 animate-in slide-in-from-top-2 duration-200 max-h-[calc(100vh-64px)] overflow-y-auto">
                        <nav className="px-4 py-6 space-y-3 max-w-7xl mx-auto">
                            {navLinks.map((link) => (
                                <a
                                    key={link.href}
                                    href={link.href}
                                    className="block py-2.5 px-4 text-midnightblue font-medium hover:bg-primary/10 hover:text-primary rounded-lg transition-colors"
                                    onClick={() => setMobileMenuOpen(false)}
                                >
                                    {link.label}
                                </a>
                            ))}
                            {/* CTA buttons in menu for all screens below xl */}
                            <div className="space-y-2 pt-4 border-t border-gray-200">
                                <Link
                                    href="/torneos"
                                    className="block py-3 px-4 bg-midnightblue text-white hover:bg-blue-900 rounded-lg text-center font-medium transition-colors shadow-sm"
                                    onClick={() => setMobileMenuOpen(false)}
                                >
                                    Torneo Nuevas Estrellas
                                </Link>
                                <Link
                                    href="/anuncios-notas"
                                    className="block py-3 px-4 bg-blue-600 text-white hover:bg-blue-700 rounded-lg text-center font-medium transition-colors shadow-sm"
                                    onClick={() => setMobileMenuOpen(false)}
                                >
                                    Fútbol Entre Líneas
                                </Link>
                            </div>
                        </nav>
                    </div>
                )}
            </header>
            <div className="fixed top-[64px] left-0 right-0 z-40">
                <NewsTicker />
            </div>
        </>
    );
}

