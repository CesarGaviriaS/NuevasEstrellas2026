import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Trophy, Medal, Goal, Shield, ChevronDown, ChevronUp, PlayCircle } from 'lucide-react';
import { CategoryData } from '@/lib/tournamentData';
import DraggableVideoModal from '@/components/ui/DraggableVideoModal';

interface HonorRollProps {
    data: Record<string, CategoryData>;
}

export default function HonorRoll({ data }: HonorRollProps) {
    const keys = Object.keys(data);
    const [selectedCategory, setSelectedCategory] = useState(keys[0] || 'Sub 12');
    const [isOpen, setIsOpen] = useState(true);
    const [showVideo, setShowVideo] = useState(false);
    const [videoUrl, setVideoUrl] = useState<string | null>(null);

    const categoryData = data[selectedCategory]?.honorRoll;

    if (!categoryData || keys.length === 0) return null;

    const categories = keys;

    const handleOpenVideo = (url: string) => {
        setVideoUrl(url);
        setShowVideo(true);
    };

    const renderVideoButton = (position: keyof NonNullable<typeof categoryData.videos>) => {
        const url = categoryData.videos?.[position];
        if (!url) return null;

        return (
            <button
                onClick={() => handleOpenVideo(url)}
                className="flex items-center gap-1.5 bg-yellow-100/80 hover:bg-yellow-200 text-yellow-800 text-xs px-2 py-0.5 rounded-full transition-all border border-yellow-300 mt-1 z-10 relative shadow-sm"
            >
                <PlayCircle className="h-3 w-3" />
                <span className="font-bold">Ver</span>
            </button>
        );
    };

    return (
        <Card className="border-none shadow-lg overflow-hidden bg-white relative">

            {showVideo && videoUrl && (
                <DraggableVideoModal
                    videoSrc={videoUrl}
                    onClose={() => setShowVideo(false)}
                />
            )}

            <CardHeader className="bg-gradient-to-r from-midnightblue to-blue-900 text-white pb-0 pt-6">
                <div className="flex items-center justify-between mb-4 px-2">
                    <div className="flex items-center gap-2">
                        <Trophy className="h-6 w-6 text-yellow-400" />
                        <CardTitle className="text-xl md:text-2xl">Cuadro de Honor</CardTitle>
                    </div>

                    <button onClick={() => setIsOpen(!isOpen)} className="p-1 hover:bg-white/10 rounded-full transition-colors">
                        {isOpen ? <ChevronUp className="h-6 w-6 text-white" /> : <ChevronDown className="h-6 w-6 text-white" />}
                    </button>
                </div>

                {/* Internal Navbar for Categories */}
                <div className={`flex overflow-x-auto gap-2 pb-0 no-scrollbar transition-all duration-300 ${isOpen ? 'opacity-100 max-h-20' : 'opacity-0 max-h-0 overflow-hidden'}`}>
                    {categories.map((cat) => (
                        <button
                            key={cat}
                            onClick={() => setSelectedCategory(cat)}
                            className={`px-4 py-3 text-sm md:text-base font-bold rounded-t-lg transition-colors whitespace-nowrap ${selectedCategory === cat
                                ? 'bg-white text-midnightblue'
                                : 'bg-white/10 text-blue-100 hover:bg-white/20'
                                }`}
                        >
                            {cat}
                        </button>
                    ))}
                </div>
            </CardHeader>
            <div className={`transition-all duration-300 ease-in-out ${isOpen ? 'max-h-[2500px] opacity-100' : 'max-h-0 opacity-0 overflow-hidden'}`}>
                <CardContent className="p-6 md:p-8 bg-white min-h-[300px]">
                    <div className="flex flex-col xl:flex-row gap-8 items-center justify-between">

                        {/* Left: Goleador */}
                        <div className="xl:w-1/4 w-full flex flex-col items-center justify-center p-6 bg-blue-50 rounded-xl border border-blue-100 order-2 xl:order-1">
                            <Goal className="h-10 w-10 text-primary mb-3" />
                            <h3 className="font-bold text-gray-500 uppercase tracking-widest text-sm mb-1">Goleador</h3>
                            <p className="text-xl md:text-2xl font-black text-midnightblue text-center">
                                {categoryData.topScorer}
                            </p>
                        </div>

                        {/* Center: Podium */}
                        <div className="xl:w-1/2 w-full grid grid-cols-1 sm:grid-cols-2 gap-4 order-1 xl:order-2">
                            {/* Champion */}
                            <div className="col-span-1 sm:col-span-2 flex flex-col items-center p-6 bg-yellow-50 border border-yellow-200 rounded-xl relative overflow-hidden">
                                <div className="absolute top-0 right-0 p-2 opacity-10">
                                    <Trophy className="h-24 w-24 text-yellow-600" />
                                </div>
                                <Medal className="h-12 w-12 text-yellow-500 mb-2" />
                                <h3 className="font-bold text-yellow-700 uppercase tracking-widest text-sm mb-1">Campeón</h3>
                                <p className="text-2xl md:text-3xl font-black text-midnightblue text-center">
                                    {categoryData.champion}
                                </p>

                                {renderVideoButton('champion')}
                            </div>

                            {/* SubChampion */}
                            <div className="col-span-1 flex flex-col items-center p-4 bg-gray-50 border border-gray-200 rounded-xl">
                                <Medal className="h-8 w-8 text-gray-400 mb-2" />
                                <h3 className="font-bold text-gray-500 uppercase tracking-widest text-xs mb-1">Subcampeón</h3>
                                <p className="text-lg md:text-xl font-bold text-midnightblue text-center leading-tight">
                                    {categoryData.runnerUp}
                                </p>
                                {renderVideoButton('runnerUp')}
                            </div>

                            {/* 3rd Place */}
                            <div className="col-span-1 flex flex-col items-center p-4 bg-orange-50 border border-orange-200 rounded-xl">
                                <Medal className="h-8 w-8 text-orange-400 mb-2" />
                                <h3 className="font-bold text-orange-700 uppercase tracking-widest text-xs mb-1">Tercer Lugar</h3>
                                <p className="text-lg md:text-xl font-bold text-midnightblue leading-tight text-center">
                                    {categoryData.thirdPlace}
                                </p>
                                {renderVideoButton('thirdPlace')}
                            </div>
                            {/* 4th Place */}
                            <div className="col-span-1 sm:col-span-2 flex flex-col items-center p-3 bg-slate-50 border border-slate-100 rounded-xl mt-1">
                                <span className="text-sm text-gray-500 font-bold uppercase mr-2">Cuarto Lugar:</span>
                                <span className="text-base font-bold text-midnightblue">{categoryData.fourthPlace}</span>
                                {renderVideoButton('fourthPlace')}
                            </div>
                        </div>

                        {/* Right: Valla Menos Vencida */}
                        <div className="xl:w-1/4 w-full flex flex-col items-center justify-center p-6 bg-blue-50 rounded-xl border border-blue-100 order-3 xl:order-3">
                            <Shield className="h-10 w-10 text-primary mb-3" />
                            <h3 className="font-bold text-gray-500 uppercase tracking-widest text-sm mb-1 text-center">Valla Menos Vencida</h3>
                            <p className="text-xl md:text-2xl font-black text-midnightblue text-center">
                                {categoryData.leastConceded}
                            </p>
                        </div>

                    </div>
                </CardContent>
            </div>
        </Card>
    );
}
