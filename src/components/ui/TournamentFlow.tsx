'use client';

import { Trophy, Users, ArrowDown, ArrowRight } from 'lucide-react';

export default function TournamentFlow() {
    return (
        <div className="w-full">
            {/* Mobile Version (Vertical) */}
            <div className="w-full py-4 flex lg:hidden flex-col items-center space-y-2">

                {/* Stage 1: Groups */}
                <div className="flex flex-col items-center animate-in fade-in slide-in-from-top-4 duration-700 delay-0 fill-mode-both">
                    <div className="flex items-center gap-2 mb-1">
                        <div className="bg-gray-100 p-1.5 rounded-full">
                            <Users className="h-4 w-4 text-gray-600" />
                        </div>
                        <span className="text-xs font-bold text-gray-600 uppercase tracking-wider">Fase de Grupos</span>
                    </div>
                    <div className="flex gap-1 opacity-60">
                        {[...Array(4)].map((_, i) => (
                            <div key={i} className="w-8 h-6 bg-gray-200 rounded border border-gray-300 flex items-center justify-center text-[10px] text-gray-500">
                                G{i + 1}
                            </div>
                        ))}
                    </div>
                </div>

                {/* Arrow */}
                <ArrowDown className="h-4 w-4 text-gray-300 animate-bounce" />

                {/* Stage 2: Cuartos */}
                <div className="flex flex-col items-center animate-in fade-in slide-in-from-top-4 duration-700 delay-300 fill-mode-both">
                    <span className="text-xs font-bold text-blue-800 mb-1">Cuartos de Final</span>
                    <div className="flex gap-2">
                        {[...Array(4)].map((_, i) => (
                            <div key={i} className="w-6 h-6 bg-blue-50 border border-blue-200 rounded flex items-center justify-center">
                                <div className="w-1.5 h-1.5 bg-blue-400 rounded-full"></div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Arrow */}
                <ArrowDown className="h-4 w-4 text-gray-300 animate-bounce delay-100" />

                {/* Stage 3: Semis */}
                <div className="flex flex-col items-center animate-in fade-in slide-in-from-top-4 duration-700 delay-500 fill-mode-both">
                    <span className="text-xs font-bold text-primary mb-1">Semifinales</span>
                    <div className="flex gap-4">
                        <div className="w-8 h-8 bg-primary/10 border border-primary/30 rounded-lg flex items-center justify-center shadow-sm">
                            <span className="text-xs font-bold text-primary">SF1</span>
                        </div>
                        <div className="w-8 h-8 bg-primary/10 border border-primary/30 rounded-lg flex items-center justify-center shadow-sm">
                            <span className="text-xs font-bold text-primary">SF2</span>
                        </div>
                    </div>
                </div>

                {/* Arrow */}
                <ArrowDown className="h-4 w-4 text-gray-300 animate-bounce delay-200" />

                {/* Stage 4: Final */}
                <div className="flex flex-col items-center animate-in fade-in zoom-in duration-700 delay-700 fill-mode-both">
                    <div className="relative">
                        <div className="absolute -inset-4 bg-yellow-400/20 rounded-full blur-xl animate-pulse"></div>
                        <div className="relative bg-gradient-to-br from-yellow-100 to-yellow-50 border border-yellow-200 p-3 rounded-xl shadow-md flex flex-col items-center">
                            <Trophy className="h-8 w-8 text-yellow-600 mb-1 drop-shadow-sm" />
                            <span className="text-sm font-extrabold text-yellow-800">GRAN FINAL</span>
                        </div>
                    </div>
                </div>
            </div>

            {/* Desktop Version (Horizontal) */}
            <div className="hidden lg:flex w-full py-4 items-center justify-between">

                {/* Stage 1: Groups */}
                <div className="flex flex-col items-center animate-in fade-in slide-in-from-left-4 duration-700 delay-0 fill-mode-both">
                    <div className="flex items-center gap-2 mb-2">
                        <div className="bg-gray-100 p-1.5 rounded-full">
                            <Users className="h-4 w-4 text-gray-600" />
                        </div>
                        <span className="text-xs font-bold text-gray-600 uppercase tracking-wider">Fase de Grupos</span>
                    </div>
                    <div className="flex flex-col gap-1 opacity-60">
                        {[...Array(4)].map((_, i) => (
                            <div key={i} className="w-8 h-6 bg-gray-200 rounded border border-gray-300 flex items-center justify-center text-[10px] text-gray-500">
                                G{i + 1}
                            </div>
                        ))}
                    </div>
                </div>

                {/* Arrow */}
                <ArrowRight className="h-5 w-5 text-gray-300 animate-pulse" />

                {/* Stage 2: Cuartos */}
                <div className="flex flex-col items-center animate-in fade-in slide-in-from-left-4 duration-700 delay-300 fill-mode-both">
                    <span className="text-xs font-bold text-blue-800 mb-2">Cuartos de Final</span>
                    <div className="flex flex-col gap-2">
                        {[...Array(4)].map((_, i) => (
                            <div key={i} className="w-8 h-8 bg-blue-50 border border-blue-200 rounded flex items-center justify-center">
                                <div className="w-2 h-2 bg-blue-400 rounded-full"></div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Arrow */}
                <ArrowRight className="h-5 w-5 text-gray-300 animate-pulse delay-100" />

                {/* Stage 3: Semis */}
                <div className="flex flex-col items-center animate-in fade-in slide-in-from-left-4 duration-700 delay-500 fill-mode-both">
                    <span className="text-xs font-bold text-primary mb-2">Semifinales</span>
                    <div className="flex flex-col gap-3">
                        <div className="w-10 h-10 bg-primary/10 border border-primary/30 rounded-lg flex items-center justify-center shadow-sm">
                            <span className="text-xs font-bold text-primary">SF1</span>
                        </div>
                        <div className="w-10 h-10 bg-primary/10 border border-primary/30 rounded-lg flex items-center justify-center shadow-sm">
                            <span className="text-xs font-bold text-primary">SF2</span>
                        </div>
                    </div>
                </div>

                {/* Arrow */}
                <ArrowRight className="h-5 w-5 text-gray-300 animate-pulse delay-200" />

                {/* Stage 4: Final */}
                <div className="flex flex-col items-center animate-in fade-in zoom-in duration-700 delay-700 fill-mode-both">
                    <div className="relative">
                        <div className="absolute -inset-4 bg-yellow-400/20 rounded-full blur-xl animate-pulse"></div>
                        <div className="relative bg-gradient-to-br from-yellow-100 to-yellow-50 border border-yellow-200 p-4 rounded-xl shadow-md flex flex-col items-center min-w-[100px]">
                            <Trophy className="h-10 w-10 text-yellow-600 mb-1 drop-shadow-sm" />
                            <span className="text-sm font-extrabold text-yellow-800">GRAN FINAL</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
