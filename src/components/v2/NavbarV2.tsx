'use client';

import { useState } from 'react';
import { Menu, ChevronDown, Trophy, Shield, DollarSign, MapPin, Sparkles } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

export default function NavbarV2() {
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const [mobileTorneoOpen, setMobileTorneoOpen] = useState(true);

    const mainNavLinks = [
        { href: "/#promotora", label: "Sobre Nosotros" },
        { href: "/#galeria", label: "Galería" },
        { href: "/#scouts", label: "Talento & Scouts" },
        { href: "/#testimonios", label: "Testimonios" },
    ];

    const torneoSubLinks = [
        {
            href: "/#torneo",
            label: "Generalidades del Torneo",
            desc: "Formato de competencia y reglamento",
            icon: Trophy
        },
        {
            href: "/#categorias",
            label: "Categorías Oficiales",
            desc: "Sub-12, Sub-14, Sub-16 y Sub-18",
            icon: Shield
        },
        {
            href: "/#inscripciones",
            label: "Inscripciones y Costos",
            desc: "Cronograma, cupos y premiación",
            icon: DollarSign
        },
        {
            href: "/#sedes",
            label: "Sedes y Escenarios",
            desc: "Canchas en Yopal, Casanare",
            icon: MapPin
        },
    ];

    const secondaryNavLinks = [
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
                    <nav className="hidden xl:flex gap-5 2xl:gap-6 items-center flex-shrink-0">
                        {mainNavLinks.map((link) => (
                            <a
                                key={link.href}
                                href={link.href}
                                className="hover:text-amber-300 transition-colors font-medium text-sm whitespace-nowrap text-white py-2"
                            >
                                {link.label}
                            </a>
                        ))}

                        {/* El Torneo 2026 Dropdown on Hover */}
                        <div className="relative group py-2">
                            <button
                                className="flex items-center gap-1.5 hover:text-amber-300 transition-colors font-medium text-sm whitespace-nowrap text-white focus:outline-none"
                                aria-expanded="false"
                                aria-haspopup="true"
                            >
                                <span>El Torneo 2026</span>
                                <ChevronDown className="w-4 h-4 transition-transform duration-200 group-hover:rotate-180 text-amber-300" />
                            </button>

                            {/* Dropdown Menu Bridge & Container */}
                            <div className="absolute top-full left-1/2 -translate-x-1/2 pt-2 opacity-0 invisible group-hover:opacity-100 group-hover:visible translate-y-1 group-hover:translate-y-0 transition-all duration-200 w-72 pointer-events-none group-hover:pointer-events-auto">
                                <div className="bg-white text-gray-900 rounded-2xl shadow-2xl border border-gray-100 p-2 overflow-hidden ring-1 ring-black/5">
                                    <div className="px-3 py-2 bg-gradient-to-r from-primary/10 to-transparent rounded-xl mb-1">
                                        <div className="flex items-center gap-1.5 text-xs font-bold text-primary uppercase tracking-wider">
                                            <Sparkles className="w-3.5 h-3.5 text-amber-500" />
                                            Edición Oficial 2026
                                        </div>
                                    </div>

                                    <div className="space-y-1">
                                        {torneoSubLinks.map((subItem) => {
                                            const Icon = subItem.icon;
                                            return (
                                                <a
                                                    key={subItem.href}
                                                    href={subItem.href}
                                                    className="flex items-start gap-3 p-2.5 rounded-xl hover:bg-gray-50 transition-colors group/item"
                                                >
                                                    <div className="p-2 rounded-lg bg-primary/5 text-primary group-hover/item:bg-primary group-hover/item:text-white transition-colors flex-shrink-0 mt-0.5">
                                                        <Icon className="w-4 h-4" />
                                                    </div>
                                                    <div>
                                                        <div className="text-sm font-bold text-midnightblue group-hover/item:text-primary transition-colors leading-tight">
                                                            {subItem.label}
                                                        </div>
                                                        <div className="text-xs text-gray-500 leading-tight mt-0.5">
                                                            {subItem.desc}
                                                        </div>
                                                    </div>
                                                </a>
                                            );
                                        })}
                                    </div>
                                </div>
                            </div>
                        </div>

                        {secondaryNavLinks.map((link) => (
                            <a
                                key={link.href}
                                href={link.href}
                                className="hover:text-amber-300 transition-colors font-medium text-sm whitespace-nowrap text-white py-2"
                            >
                                {link.label}
                            </a>
                        ))}
                    </nav>
                </div>

                {/* Mobile/Tablet Menu */}
                {mobileMenuOpen && (
                    <div className="xl:hidden bg-primary text-white shadow-2xl border-t border-white/15 animate-in slide-in-from-top-2 duration-200 max-h-[calc(100vh-64px)] overflow-y-auto">
                        <nav className="px-4 py-6 space-y-2 max-w-7xl mx-auto">
                            {mainNavLinks.map((link) => (
                                <a
                                    key={link.href}
                                    href={link.href}
                                    className="block py-2.5 px-4 text-white font-medium hover:bg-white/10 rounded-lg transition-colors"
                                    onClick={() => setMobileMenuOpen(false)}
                                >
                                    {link.label}
                                </a>
                            ))}

                            {/* Mobile El Torneo Collapsible Submenu */}
                            <div className="py-1">
                                <button
                                    onClick={() => setMobileTorneoOpen(!mobileTorneoOpen)}
                                    className="w-full flex items-center justify-between py-2.5 px-4 text-amber-300 font-bold hover:bg-white/10 rounded-lg transition-colors text-left"
                                >
                                    <span>El Torneo 2026</span>
                                    <ChevronDown className={`w-4 h-4 transition-transform duration-200 ${mobileTorneoOpen ? 'rotate-180' : ''}`} />
                                </button>
                                
                                {mobileTorneoOpen && (
                                    <div className="pl-4 pr-2 py-1.5 space-y-1 bg-black/15 rounded-xl mt-1">
                                        {torneoSubLinks.map((subItem) => {
                                            const Icon = subItem.icon;
                                            return (
                                                <a
                                                    key={subItem.href}
                                                    href={subItem.href}
                                                    className="flex items-center gap-3 py-2 px-3 text-sm text-gray-200 hover:text-white hover:bg-white/10 rounded-lg transition-colors"
                                                    onClick={() => setMobileMenuOpen(false)}
                                                >
                                                    <Icon className="w-4 h-4 text-amber-300 flex-shrink-0" />
                                                    <span>{subItem.label}</span>
                                                </a>
                                            );
                                        })}
                                    </div>
                                )}
                            </div>

                            {secondaryNavLinks.map((link) => (
                                <a
                                    key={link.href}
                                    href={link.href}
                                    className="block py-2.5 px-4 text-white font-medium hover:bg-white/10 rounded-lg transition-colors"
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
