import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Users, MapPin, ChevronDown, ChevronUp } from 'lucide-react';
import { CategoryData } from '@/lib/tournamentData';

interface ParticipatingTeamsProps {
    data: Record<string, CategoryData>;
}

export default function ParticipatingTeams({ data = {} }: ParticipatingTeamsProps) {
    const keys = Object.keys(data);
    const [selectedCategory, setSelectedCategory] = useState(keys[0] || '');
    const [isOpen, setIsOpen] = useState(true);

    const categories = keys;
    const activeCategory = selectedCategory || categories[0] || '';
    const groups = activeCategory && data[activeCategory] ? (data[activeCategory]?.groups || []) : [];

    if (categories.length === 0) {
        return (
            <Card className="border-none shadow-lg overflow-hidden bg-white">
                <CardHeader className="bg-gray-100 border-b border-gray-200 py-4">
                    <div className="flex items-center gap-2 px-2">
                        <Users className="h-6 w-6 text-midnightblue" />
                        <CardTitle className="text-xl md:text-2xl text-midnightblue">Equipos Participantes</CardTitle>
                    </div>
                </CardHeader>
                <CardContent className="p-8 text-center bg-white">
                    <p className="text-gray-500 text-base">
                        Los equipos y grupos participantes se publicarán próximamente tras el cierre de inscripciones.
                    </p>
                </CardContent>
            </Card>
        );
    }

    return (
        <Card className="border-none shadow-lg overflow-hidden bg-white">
            <CardHeader className="bg-gray-100 border-b border-gray-200 pb-0 pt-6">
                <div className="flex items-center justify-between mb-4 px-2">
                    <div className="flex items-center gap-2">
                        <Users className="h-6 w-6 text-midnightblue" />
                        <CardTitle className="text-xl md:text-2xl text-midnightblue">Equipos Participantes</CardTitle>
                    </div>
                    <button onClick={() => setIsOpen(!isOpen)} className="p-1 hover:bg-gray-200 rounded-full transition-colors">
                        {isOpen ? <ChevronUp className="h-6 w-6 text-gray-600" /> : <ChevronDown className="h-6 w-6 text-gray-600" />}
                    </button>
                </div>

                {/* Internal Navbar for Categories */}
                <div className={`flex overflow-x-auto overflow-y-hidden gap-2 pb-0 no-scrollbar transition-all duration-300 ${isOpen ? 'opacity-100 max-h-20' : 'opacity-0 max-h-0'}`}>
                    {categories.map((cat) => (
                        <button
                            key={cat}
                            onClick={() => setSelectedCategory(cat)}
                            className={`px-4 py-3 text-sm md:text-base font-bold rounded-t-lg transition-colors whitespace-nowrap ${activeCategory === cat
                                ? 'bg-white text-midnightblue border-t border-x border-gray-200 -mb-px relative z-10'
                                : 'bg-transparent text-gray-500 hover:bg-gray-200 hover:text-gray-700'
                                }`}
                        >
                            {cat}
                        </button>
                    ))}
                </div>
            </CardHeader>
            <div className={`transition-all duration-300 ease-in-out ${isOpen ? 'max-h-[3000px] opacity-100' : 'max-h-0 opacity-0 overflow-hidden'}`}>
                <CardContent className="p-6 md:p-8 bg-white min-h-[200px]">
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {groups.map((group, idx) => (
                            <div key={idx} className="bg-gray-50 rounded-xl p-4 border border-gray-100">
                                <h3 className="font-bold text-primary mb-3 border-b border-gray-200 pb-2">{group.name}</h3>
                                <ul className="space-y-2">
                                    {group.teams.map((team, tIdx) => (
                                        <li key={tIdx} className="flex justify-between items-start text-sm">
                                            <span className="font-bold text-gray-800">{team.name}</span>
                                            <div className="flex items-center gap-1 text-gray-500 text-xs mt-0.5">
                                                <MapPin className="h-3 w-3" />
                                                <span>{team.city}</span>
                                            </div>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        ))}
                        {groups.length === 0 && (
                            <p className="text-gray-500 text-center col-span-full py-8">
                                No hay equipos registrados para esta categoría.
                            </p>
                        )}
                    </div>
                </CardContent>
            </div>
        </Card>
    );
}

