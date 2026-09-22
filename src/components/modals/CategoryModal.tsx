'use client';

import { X } from 'lucide-react';
import { Group, MatchDay } from '@/lib/tournamentData';

interface CategoryModalProps {
    isOpen: boolean;
    onClose: () => void;
    category: string;
    groups: Group[];
    schedule: MatchDay[];
}

export default function CategoryModal({ isOpen, onClose, category, groups, schedule }: CategoryModalProps) {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm animate-in fade-in duration-200">
            <div className="bg-white w-full max-w-7xl max-h-[90vh] overflow-y-auto rounded-xl shadow-2xl animate-in zoom-in-95 duration-200 relative">

                {/* Close Button */}
                <button
                    onClick={onClose}
                    className="absolute top-4 right-4 p-2 bg-white/10 hover:bg-gray-100 rounded-full transition-colors z-50"
                >
                    <X className="h-6 w-6 text-gray-500" />
                </button>

                {/* Header */}
                <div className="bg-midnightblue text-white py-8 px-6 text-center relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-32 h-32 bg-blue-600 rounded-full translate-x-16 -translate-y-16 opacity-50"></div>
                    <div className="absolute bottom-0 left-0 w-24 h-24 bg-blue-600 rounded-full -translate-x-12 translate-y-12 opacity-50"></div>

                    <h2 className="text-3xl md:text-4xl font-bold relative z-10">
                        Categoría {category}
                    </h2>
                </div>

                <div className="p-6 space-y-8">
                    {groups.length === 0 && schedule.length === 0 ? (
                        <div className="py-12 text-center text-gray-500 space-y-2">
                            <p className="text-lg font-medium text-gray-700">Programación y grupos por definir</p>
                            <p className="text-sm">La información oficial de esta categoría se publicará tras el congreso técnico.</p>
                        </div>
                    ) : (
                        <>
                            {/* Groups Section */}
                            {groups.length > 0 && (
                                <div className={`flex flex-wrap justify-center gap-6 ${['Sub 14', 'Sub 16', 'Sub 18'].includes(category) ? 'gap-4' : ''}`}>
                                    {groups.map((group, idx) => (
                                        <div key={idx} className={`space-y-4 flex-1 min-w-[200px] ${['Sub 14', 'Sub 16', 'Sub 18'].includes(category) ? 'max-w-[220px]' : 'max-w-md'}`}>
                                            <div className="bg-midnightblue text-white py-2 px-4 text-center rounded-lg shadow-md">
                                                <h3 className="text-xl font-bold">{group.name}</h3>
                                            </div>

                                            <div className={`grid gap-3 ${['Sub 14', 'Sub 16', 'Sub 18'].includes(category) ? 'grid-cols-1' : 'grid-cols-1 sm:grid-cols-2 md:grid-cols-3'}`}>
                                                {group.teams.map((team, tIdx) => (
                                                    <div
                                                        key={tIdx}
                                                        className="bg-white border-2 border-midnightblue text-midnightblue font-bold py-2 px-3 text-center rounded-lg shadow-sm hover:bg-blue-50 transition-colors text-sm"
                                                    >
                                                        {team.name}
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            )}

                            {/* Schedule Section */}
                            {schedule.length > 0 && (
                                <div className="pt-8 border-t border-gray-200">

                        {schedule.map((day, dIdx) => (
                            <div key={dIdx} className="mb-8">
                                <div className="flex flex-col md:flex-row items-center justify-between gap-4 mb-6 text-center md:text-left bg-gray-50 p-4 rounded-lg">
                                    <h3 className="text-xl md:text-2xl font-bold text-gray-400 uppercase tracking-widest">
                                        FASE I DE GRUPOS
                                    </h3>
                                    <div className="bg-midnightblue text-white px-4 py-1 rounded-lg whitespace-nowrap">
                                        <span className="font-bold">Categoría {category}</span>
                                    </div>
                                    <div className="flex flex-col md:flex-row items-center gap-2 md:gap-4">
                                        <h4 className="text-xl font-bold text-black uppercase tracking-wider whitespace-nowrap">FECHA 0{dIdx + 1}</h4>
                                        <h5 className="text-xl font-black text-black uppercase whitespace-nowrap">{day.date}</h5>
                                    </div>
                                </div>

                                <div className="space-y-3 max-w-5xl mx-auto">
                                    {day.matches.map((match, mIdx) => (
                                        <div key={mIdx} className="flex flex-col lg:flex-row gap-2 lg:gap-0 border border-gray-200 lg:border-0 rounded-xl lg:rounded-none overflow-hidden p-2 lg:p-0 shadow-sm lg:shadow-none bg-white lg:bg-transparent">
                                            {/* Time */}
                                            <div className="bg-cyan-400 text-white font-bold py-2.5 px-3 flex items-center justify-center w-full lg:w-[130px] lg:flex-none rounded-lg lg:rounded-none lg:rounded-l-lg text-sm">
                                                {match.time}
                                            </div>

                                            {/* Match */}
                                            <div className="bg-midnightblue text-white flex-1 py-3 px-3 flex items-center justify-between gap-3 rounded-lg lg:rounded-none">
                                                <span className="font-bold text-right flex-1 text-xs sm:text-sm md:text-base leading-tight break-words">{match.team1}</span>
                                                <div className="flex flex-col items-center justify-center px-2 flex-shrink-0">
                                                    <span className="text-xl sm:text-2xl font-black italic text-cyan-300 leading-none">VS</span>
                                                </div>
                                                <span className="font-bold text-left flex-1 text-xs sm:text-sm md:text-base leading-tight break-words">{match.team2}</span>
                                            </div>

                                            {/* Location */}
                                            <div className="bg-cyan-400 text-white font-bold py-2 px-3 flex flex-col items-center justify-center w-full lg:w-[260px] lg:flex-none text-center text-xs sm:text-sm rounded-lg lg:rounded-none lg:rounded-r-lg">
                                                <span className="text-[10px] uppercase opacity-90">Lugar:</span>
                                                <span className="uppercase font-extrabold">{match.location}</span>
                                            </div>

                                            {/* GA Badge */}
                                            <div className="hidden lg:flex bg-cyan-400 text-white font-bold w-12 items-center justify-center ml-2 rounded-lg flex-none text-sm">
                                                {match.group || 'GA'}
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </>
        )}
    </div>
</div>
</div>
);
}
