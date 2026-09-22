"use client";

import Link from 'next/link';
import { Star } from 'lucide-react';

const players = [
    { name: "Larry Vásquez", url: "https://www.transfermarkt.co/larry-vasquez/profil/spieler/260925" },
    { name: "Leonardo Pico", url: "https://www.transfermarkt.co/leonardo-pico/profil/spieler/213528" },
    { name: "Jhon Arias", url: "https://www.transfermarkt.co/jhon-arias/profil/spieler/588989" },
    { name: "Cristian Barrios", url: "https://www.transfermarkt.co/cristian-barrios/profil/spieler/587296" },
    { name: "Wason Rentería", url: "https://www.transfermarkt.co/wason-renteria/profil/spieler/45592" },
    { name: "Carlos Rentería", url: "https://www.transfermarkt.co/carlos-renteria/profil/spieler/76286" },
    { name: "Marcos Pérez", url: "#" },
    { name: "Cristian Martínez Borja", url: "#" }
];

export default function StarList() {
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-6">
            {players.map((player, index) => (
                <Link
                    key={index}
                    href={player.url}
                    target={player.url !== "#" ? "_blank" : "_self"}
                    className="flex items-center gap-4 group transition-transform duration-300 hover:scale-105 cursor-pointer"
                >
                    <div
                        className="animate-float"
                        style={{
                            animationDelay: `${index * 0.2}s`
                        }}
                    >
                        <Star className="w-8 h-8 text-sky-400 fill-current" />
                    </div>
                    <span className="text-xl font-medium text-white/90 group-hover:text-white transition-colors">
                        {player.name}
                    </span>
                </Link>
            ))}

            <style jsx>{`
                @keyframes float {
                    0%, 100% {
                        transform: translateY(0);
                    }
                    50% {
                        transform: translateY(-10px);
                    }
                }
                .animate-float {
                    animation: float 3s ease-in-out infinite;
                }
            `}</style>
        </div>
    );
}
