import Image from 'next/image';
import { Card, CardContent } from '@/components/ui/card';
import { teamMembers } from '@/lib/data';

export default function TeamSection() {
    return (
        <section id="team" className="py-20 bg-gray-50">
            <div className="mx-auto w-full responsive-padding">
                <div className="text-center pb-12">
                    <span className="inline-block px-4 py-3 bg-secondary/30 text-primary rounded-full text-sm mb-4">
                        PERSONAS QUE LO HACEN POSIBLE
                    </span>
                    <h2 className="text-3xl md:text-4xl font-bold pb-4">
                        Nuestro Fundador
                    </h2>
                    <p className="text-gray-700">
                    </p>
                </div>

                <div className="relative max-w-5xl mx-auto">
                    <div className="grid md:grid-cols-1 gap-8 max-w-2xl mx-auto">
                        <Card>
                            <CardContent className="p-8">
                                <div className="w-48 h-48 rounded-full overflow-hidden mx-auto pb-6 relative">
                                    <Image
                                        src={teamMembers[0].image}
                                        alt={teamMembers[0].name}
                                        fill
                                        className="object-cover"
                                        sizes="192px"
                                    />
                                </div>
                                <h3 className="text-2xl font-bold text-center pb-4">{teamMembers[0].name}</h3>
                                <p className="text-lg text-gray-600 text-center pb-6">{teamMembers[0].role}</p>
                                <p className="text-gray-700 text-center leading-relaxed">{teamMembers[0].description}</p>
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </div>
        </section>
    );
}
