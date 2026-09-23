'use client';

import { useState } from 'react';
import { Menu, ChevronDown, Trophy, Shield, DollarSign, MapPin, Sparkles } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

export default function NavbarV2() {
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const [mobileTorneoOpen, setMobileTorneoOpen] = useState(true);

    const mainNavLinks = [
        { href: "/#promotora", label: "Nosotros" },
        { href: "/#galeria", label: "Galería" },
        { href: "/#scouts", label: "Talento & Scouts" },
        { href: "/#testimonios", label: "Testimonios" },
    ];

    const torneoSubLinks = [
        { href: "/#torneo", label: "Generalidades" },
        { href: "/#categorias", label: "Categorías" },
        { href: "/#inscripciones", label: "Inscripciones" },
        { href: "/#sedes", label: "Sedes" },
    ];

    const secondaryNavLinks = [
        { href: "/#noticias", label: "Noticias" },
        { href: "/#patrocinadores", label: "Patrocinadores" },
    ];

    return (
        <>
            <header className="fixed top-0 left-0 right-0 z-50 bg-[#000035] text-white shadow-lg font-oswald tracking-wide">
                <div className="mx-auto w-full responsive-padding py-2.5 flex items-center justify-between">
                    <Link href="/" className="flex items-center gap-3 cursor-pointer hover:opacity-90 transition-opacity flex-shrink-0">
                        <div className="relative h-12 w-12 flex-shrink-0">
                            <Image
                                src="/logo-copa-simple.png"
                                alt="Torneo Nuevas Estrellas Logo"
                                fill
                                className="object-contain"
                                sizes="(max-width: 300px) 100px, 100px"
                            />
                        </div>
                        <span className="hidden lg:block text-2xl xl:text-3xl font-bold whitespace-nowrap leading-none text-white tracking-tight">
                            Nuevas Estrellas
                        </span>
                    </Link>

                    {/* Hamburger menu */}
                    <button
                        className="xl:hidden p-2 rounded-lg hover:bg-white/10 text-white transition-colors"
                        onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                        aria-label="Abrir menú"
                    >
                        <Menu className="h-6 w-6" />
                    </button>

                    {/* Desktop Navigation - Reduced gap and larger typography */}
                    <nav className="hidden xl:flex gap-4 2xl:gap-5 items-center flex-shrink-0">
                        {mainNavLinks.map((link) => (
                            <a
                                key={link.href}
                                href={link.href}
                                className="hover:text-amber-300 transition-colors font-bold text-[18px] 2xl:text-[20px] tracking-wide whitespace-nowrap text-white py-1 px-1.5"
                            >
                                {link.label}
                            </a>
                        ))}

                        {/* El Torneo 2026 Dropdown on Hover */}
                        <div className="relative group py-1">
                            <button
                                className="flex items-center gap-1 hover:text-amber-300 transition-colors font-bold text-[18px] 2xl:text-[20px] tracking-wide whitespace-nowrap text-white focus:outline-none px-1.5"
                                aria-expanded="false"
                                aria-haspopup="true"
                            >
                                <span>El Torneo 2026</span>
                                <ChevronDown className="w-4 h-4 transition-transform duration-200 group-hover:rotate-180 text-amber-300" />
                            </button>

                            {/* Dropdown Menu */}
                            <div className="absolute top-full left-0 pt-2 opacity-0 invisible group-hover:opacity-100 group-hover:visible translate-y-1 group-hover:translate-y-0 transition-all duration-200 w-56 pointer-events-none group-hover:pointer-events-auto">
                                <div className="bg-white text-gray-800 rounded-xl shadow-xl border border-gray-100 py-2 overflow-hidden ring-1 ring-black/5">
                                    {torneoSubLinks.map((subItem) => (
                                        <a
                                            key={subItem.href}
                                            href={subItem.href}
                                            className="block px-4 py-2.5 text-lg font-bold text-gray-800 hover:bg-primary/5 hover:text-primary transition-colors"
                                        >
                                            {subItem.label}
                                        </a>
                                    ))}
                                </div>
                            </div>
                        </div>

                        {secondaryNavLinks.map((link) => (
                            <a
                                key={link.href}
                                href={link.href}
                                className="hover:text-amber-300 transition-colors font-bold text-[18px] 2xl:text-[20px] tracking-wide whitespace-nowrap text-white py-1 px-1.5"
                            >
                                {link.label}
                            </a>
                        ))}
                    </nav>
                </div>

                {/* Mobile/Tablet Menu */}
                {mobileMenuOpen && (
                    <div className="xl:hidden bg-[#000035] text-white shadow-2xl border-t border-white/15 animate-in slide-in-from-top-2 duration-200 max-h-[calc(100vh-64px)] overflow-y-auto">
                        <nav className="px-4 py-6 space-y-2 max-w-7xl mx-auto">
                            {mainNavLinks.map((link) => (
                                <a
                                    key={link.href}
                                    href={link.href}
                                    className="block py-3 px-4 text-white font-semibold text-lg hover:bg-white/10 rounded-lg transition-colors"
                                    onClick={() => setMobileMenuOpen(false)}
                                >
                                    {link.label}
                                </a>
                            ))}

                            {/* Mobile El Torneo Submenu */}
                            <div className="py-1">
                                <button
                                    onClick={() => setMobileTorneoOpen(!mobileTorneoOpen)}
                                    className="w-full flex items-center justify-between py-3 px-4 text-amber-300 font-bold text-lg hover:bg-white/10 rounded-lg transition-colors text-left"
                                >
                                    <span>El Torneo 2026</span>
                                    <ChevronDown className={`w-5 h-5 transition-transform duration-200 ${mobileTorneoOpen ? 'rotate-180' : ''}`} />
                                </button>
                                
                                {mobileTorneoOpen && (
                                    <div className="pl-4 pr-2 py-1.5 space-y-1 bg-black/20 rounded-xl mt-1">
                                        {torneoSubLinks.map((subItem) => (
                                            <a
                                                key={subItem.href}
                                                href={subItem.href}
                                                className="block py-2.5 px-3 text-base font-medium text-gray-200 hover:text-white hover:bg-white/10 rounded-lg transition-colors"
                                                onClick={() => setMobileMenuOpen(false)}
                                            >
                                                {subItem.label}
                                            </a>
                                        ))}
                                    </div>
                                )}
                            </div>

                            {secondaryNavLinks.map((link) => (
                                <a
                                    key={link.href}
                                    href={link.href}
                                    className="block py-3 px-4 text-white font-semibold text-lg hover:bg-white/10 rounded-lg transition-colors"
                                    onClick={() => setMobileMenuOpen(false)}
                                >
                                    {link.label}
                                </a>
                            ))}
                        </nav>
                    </div>
                )}
            </header>
        </>
    );
}
