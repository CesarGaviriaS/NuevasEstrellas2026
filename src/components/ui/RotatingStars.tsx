"use client";

import { Star } from 'lucide-react';

export default function RotatingStars() {
    return (
        <div className="relative w-[500px] h-[500px] flex items-center justify-center animate-spin-slow">
            {/* Center point (invisible) around which stars rotate */}
            {[...Array(8)].map((_, i) => {
                const angle = (i * 360) / 8;
                const radius = 200; // Distance from center
                const x = Math.cos((angle * Math.PI) / 180) * radius;
                const y = Math.sin((angle * Math.PI) / 180) * radius;

                return (
                    <div
                        key={i}
                        className="absolute text-sky-400"
                        style={{
                            transform: `translate(${x}px, ${y}px)`,
                        }}
                    >
                        <Star className="w-[120px] h-[120px] fill-current" />
                    </div>
                );
            })}

            <style jsx>{`
                @keyframes spin {
                    from {
                        transform: rotate(0deg);
                    }
                    to {
                        transform: rotate(360deg);
                    }
                }
                .animate-spin-slow {
                    animation: spin 20s linear infinite;
                }
            `}</style>
        </div>
    );
}
