'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { titleSequence, titleTimings } from '@/lib/data';

export default function IntroSection() {
    const [titleText, setTitleText] = useState('Nuevas Estrellas');
    const [isTitleVisibleAnimation, setIsTitleVisibleAnimation] = useState(true);

    // Complete title sequence animation
    useEffect(() => {
        let animationTimeout: NodeJS.Timeout;

        const runTitleSequence = () => {
            let currentIndex = 0;

            const showNextTitle = () => {
                const title = titleSequence[currentIndex];
                const duration = titleTimings[currentIndex];

                setTitleText(title);
                setIsTitleVisibleAnimation(true);

                // Hide after the title's duration
                animationTimeout = setTimeout(() => {
                    setIsTitleVisibleAnimation(false);

                    // Move to next title after 1 second (animation time)
                    animationTimeout = setTimeout(() => {
                        currentIndex = (currentIndex + 1) % titleSequence.length;

                        // If we completed a full cycle, start immediately like the other subtitles
                        if (currentIndex === 0) {
                            animationTimeout = setTimeout(showNextTitle, 0);
                        } else {
                            showNextTitle();
                        }
                    }, 1000);
                }, duration * 1000);
            };

            // Start with first title after 2 seconds
            animationTimeout = setTimeout(showNextTitle, 2000);
        };

        runTitleSequence();

        return () => {
            clearTimeout(animationTimeout);
        };
    }, []);

    return (
        <section className="min-h-screen py-20 bg-primary text-white flex items-center justify-center relative overflow-hidden">
            <div className="mx-auto w-full responsive-padding">
                <div className="flex flex-col md:flex-row items-center justify-center gap-6 sm:gap-8 md:gap-12">
                    <div className="flex-shrink-0 order-1 md:order-1 relative h-32 w-32 sm:h-44 sm:w-44 md:h-56 md:w-56 lg:h-64 lg:w-64">
                        <Image
                            src="/logo-nuevas-estrellas.png"
                            alt="Nuevas Estrellas Logo"
                            fill
                            className="object-contain"
                            sizes="(max-width: 768px) 176px, 256px"
                            priority
                        />
                    </div>
                    <div className="w-full flex-1 max-w-3xl min-w-0 order-2 md:order-2">
                        <div className="relative overflow-hidden py-4">
                            <h2
                                className={`font-bold text-center md:text-left text-white leading-tight break-words ${titleText === 'Nuevas Estrellas'
                                    ? 'text-3xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl'
                                    : 'text-xl sm:text-2xl md:text-4xl lg:text-5xl'
                                    }`}
                            >
                                {titleText}
                            </h2>
                            {/* Moving reveal overlay */}
                            <div
                                className={`absolute inset-y-0 left-0 bg-primary transition-transform duration-1000 ease-in-out ${isTitleVisibleAnimation ? 'translate-x-full' : 'translate-x-0'
                                    }`}
                                style={{ width: '100%' }}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
