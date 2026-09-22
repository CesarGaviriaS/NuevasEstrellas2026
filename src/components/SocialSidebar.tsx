"use client";

import { useState } from 'react';
import { Facebook, Instagram, Phone, Gift, X as XIcon } from 'lucide-react';

export default function SocialSidebar() {
    const [isOpen, setIsOpen] = useState(false);
    const [isGiftOpen, setIsGiftOpen] = useState(false);

    const toggleSidebar = () => setIsOpen(!isOpen);
    const toggleGift = () => setIsGiftOpen(!isGiftOpen);

    return (
        <>
            {/* Trigger Tabs - Semi-invisible */}
            <div className="fixed right-0 top-1/2 -translate-y-1/2 z-40 flex flex-col gap-2">
                {/* Phone Button */}
                <div
                    onClick={toggleSidebar}
                    className={`cursor-pointer 
                        bg-primary text-white p-3 rounded-l-lg shadow-lg 
                        transition-all duration-300 ease-in-out
                        ${isOpen ? 'translate-x-full opacity-0' : 'translate-x-0 opacity-50 hover:opacity-100'}
                    `}
                    title="Redes Sociales"
                >
                    <Phone className="w-6 h-6" />
                </div>

                {/* Gift Button */}
                <div
                    onClick={toggleGift}
                    className={`cursor-pointer 
                        bg-primary text-white p-3 rounded-l-lg shadow-lg 
                        transition-all duration-300 ease-in-out
                        ${isGiftOpen ? 'translate-x-full opacity-0' : 'translate-x-0 opacity-50 hover:opacity-100'}
                    `}
                    title="Regalos"
                >
                    <Gift className="w-6 h-6" />
                </div>
            </div>

            {/* Sidebar Column */}
            <div
                className={`fixed right-0 top-1/2 -translate-y-1/2 bg-white/95 backdrop-blur-sm shadow-2xl z-50 
                    transition-transform duration-300 ease-in-out flex flex-col items-center py-4 sm:py-6 gap-3 sm:gap-4 w-20 sm:w-24 max-h-[85vh] overflow-y-auto rounded-l-2xl border-l border-y border-gray-100
                    ${isOpen ? 'translate-x-0' : 'translate-x-full'}
                `}
            >
                {/* Close Button */}
                <button
                    onClick={toggleSidebar}
                    className="p-2 hover:bg-gray-100 rounded-full transition-colors text-gray-500 hover:text-gray-800"
                    aria-label="Cerrar redes"
                >
                    <XIcon className="w-6 h-6" />
                </button>

                {/* Icons */}
                <div className="flex flex-col gap-5 sm:gap-6 items-center py-2">
                    {/* Facebook */}
                    <a href="https://web.facebook.com/nuevasestrellasoficial" target="_blank" rel="noopener noreferrer" className="hover:scale-110 transition-transform duration-200 text-primary hover:text-blue-600">
                        <Facebook className="w-8 h-8 sm:w-10 sm:h-10" />
                        <span className="sr-only">Facebook</span>
                    </a>

                    {/* Instagram */}
                    <a href="https://instagram.com/nuevasestrellasoficial" target="_blank" rel="noopener noreferrer" className="hover:scale-110 transition-transform duration-200 text-primary hover:text-pink-600">
                        <Instagram className="w-8 h-8 sm:w-10 sm:h-10" />
                        <span className="sr-only">Instagram</span>
                    </a>

                    {/* Threads */}
                    <a href="https://www.threads.com/@nuevasestrellasoficial" className="hover:scale-110 transition-transform duration-200 text-primary hover:text-black">
                        <svg viewBox="0 0 192 192" className="w-8 h-8 sm:w-10 sm:h-10 fill-current">
                            <path d="M141.537 88.9883C140.71 88.5919 139.87 88.2104 139.019 87.8451C137.537 60.5382 122.616 44.905 97.5619 44.745C97.4484 44.7443 97.3355 44.7443 97.222 44.7443C82.2364 44.7443 69.7731 51.1409 62.102 62.7807L75.881 72.2328C81.6116 63.5383 90.6052 61.6848 97.2286 61.6848C97.3051 61.6848 97.3819 61.6848 97.4576 61.6855C105.707 61.7381 111.932 64.1366 115.961 68.814C118.893 72.2193 120.854 76.925 121.825 82.8638C114.511 81.6207 106.601 81.2385 98.145 81.7233C74.3247 83.0954 59.0111 96.9879 60.0396 116.292C60.5615 126.084 65.4397 134.508 73.775 140.011C80.8224 144.663 89.899 146.938 99.3323 146.423C111.79 145.74 121.563 140.987 128.381 132.296C133.559 125.696 136.834 117.143 138.28 106.366C144.217 109.949 148.617 114.664 151.047 120.332C155.179 129.967 155.42 145.8 142.501 158.708C131.182 170.016 117.576 174.908 97.0135 175.059C74.2042 174.89 56.9538 167.575 45.7381 153.317C35.2355 139.966 29.8077 120.682 29.6052 96C29.8077 71.3178 35.2355 52.0336 45.7381 38.6827C56.9538 24.4249 74.2039 17.11 97.0132 16.9405C119.988 17.1113 137.539 24.4614 149.184 38.788C154.894 45.8136 159.199 54.6488 162.037 64.9503L178.184 60.6422C174.744 47.9622 169.331 37.0357 161.965 27.974C147.036 9.60668 125.202 0.195148 97.0695 0H96.9569C68.8816 0.19447 47.2921 9.6418 32.7883 28.0793C19.8819 44.4864 13.2244 67.3157 13.0007 95.9325L13 96L13.0007 96.0675C13.2244 124.684 19.8819 147.514 32.7883 163.921C47.2921 182.358 68.8816 191.806 96.9569 192H97.0695C122.03 191.827 139.624 185.292 154.118 170.811C173.081 151.866 172.51 128.119 166.26 113.541C161.776 103.087 153.227 94.5962 141.537 88.9883ZM98.4405 129.507C88.0005 130.095 77.1544 125.409 76.6196 115.372C76.2232 107.93 81.9158 99.626 99.0812 98.6368C101.047 98.5234 102.976 98.468 104.871 98.468C111.106 98.468 116.939 99.0737 122.242 100.233C120.264 124.935 108.662 128.946 98.4405 129.507Z" />
                        </svg>
                        <span className="sr-only">Threads</span>
                    </a>

                    {/* X (Twitter) */}
                    <a href="https://x.com/nuestrellas" className="hover:scale-110 transition-transform duration-200 text-primary hover:text-black">
                        <svg viewBox="0 0 24 24" className="w-8 h-8 sm:w-10 sm:h-10 fill-current">
                            <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                        </svg>
                        <span className="sr-only">X</span>
                    </a>

                    {/* WhatsApp */}
                    <a href="#" className="hover:scale-110 transition-transform duration-200 text-primary hover:text-green-600">
                        <svg viewBox="0 0 24 24" className="w-8 h-8 sm:w-10 sm:h-10 fill-current">
                            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                        </svg>
                        <span className="sr-only">WhatsApp</span>
                    </a>
                </div>
            </div>

            {/* Gift Promotion Panel */}
            <div
                className={`fixed right-0 top-1/2 -translate-y-1/2 bg-white/95 backdrop-blur-sm shadow-2xl z-50 
                    transition-transform duration-300 ease-in-out flex flex-col items-center p-4 sm:p-6 w-[88vw] max-w-xs sm:w-80 max-h-[85vh] overflow-y-auto rounded-l-2xl border-l border-y border-gray-100
                    ${isGiftOpen ? 'translate-x-0' : 'translate-x-full'}
                `}
            >
                {/* Close Button */}
                <button
                    onClick={toggleGift}
                    className="self-end p-2 hover:bg-gray-100 rounded-full transition-colors text-gray-500 hover:text-gray-800"
                    aria-label="Cerrar promoción"
                >
                    <XIcon className="w-6 h-6" />
                </button>

                {/* Promotion Content */}
                <div className="flex flex-col items-center gap-4 mt-2">
                    {/* Image */}
                    <img
                        src="/promociones/camiseta-lucho-diaz.png"
                        alt="Camiseta Luis Díaz autografiada"
                        className="w-full h-auto rounded-lg shadow-md"
                    />

                    {/* Text */}
                    <p className="text-center text-gray-800 font-semibold text-lg">
                        ¿Quieres ganarte una camisa autografiada por Luis Díaz?
                    </p>

                    {/* Link Button */}
                    <a
                        href="https://www.instagram.com/p/DRPLhIvEWkd/"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="bg-primary text-white px-6 py-3 rounded-lg hover:bg-primary/90 transition-colors font-medium shadow-md hover:shadow-lg"
                    >
                        Conoce más acá
                    </a>
                </div>
            </div>

            {/* Backdrop for mobile or just to focus */}
            {isOpen && (
                <div
                    className="fixed inset-0 bg-black/20 z-30"
                    onClick={toggleSidebar}
                />
            )}

            {/* Backdrop for Gift Panel */}
            {isGiftOpen && (
                <div
                    className="fixed inset-0 bg-black/20 z-30"
                    onClick={toggleGift}
                />
            )}
        </>
    );
}
