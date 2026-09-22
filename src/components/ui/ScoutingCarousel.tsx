'use client';

import { useState, useEffect, useCallback, useRef } from 'react';
import Image from 'next/image';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface ScoutingCarouselProps {
    images: string[];
    autoScrollInterval?: number;
}

export default function ScoutingCarousel({ images, autoScrollInterval = 3000 }: ScoutingCarouselProps) {
    // Group animation state to ensure atomic updates and prevent flickering
    const [state, setState] = useState({
        currentIndex: 0,
        isTransitioning: false,
        slideDirection: null as 'next' | 'prev' | null,
    });

    const [isAutoScrolling, setIsAutoScrolling] = useState(true);
    const timeoutRef = useRef<NodeJS.Timeout | null>(null);

    const len = images.length;

    // Calculate the 3 items to render: [Prev, Current, Next]
    const getIndices = () => {
        const { currentIndex } = state;
        const prev = (currentIndex - 1 + len) % len;
        const next = (currentIndex + 1) % len;
        return [prev, currentIndex, next];
    };

    const activeIndices = getIndices();

    const nextSlide = useCallback(() => {
        setState(prev => {
            if (prev.isTransitioning) return prev;
            return { ...prev, isTransitioning: true, slideDirection: 'next' };
        });
    }, []);

    const prevSlide = () => {
        setState(prev => {
            if (prev.isTransitioning) return prev;
            return { ...prev, isTransitioning: true, slideDirection: 'prev' };
        });
    };

    const handleTransitionEnd = (e?: React.TransitionEvent) => {
        if (e && e.target !== e.currentTarget) return;

        setState(prev => {
            if (!prev.isTransitioning) return prev;

            let nextIndex = prev.currentIndex;
            if (prev.slideDirection === 'next') {
                nextIndex = (prev.currentIndex + 1) % len;
            } else if (prev.slideDirection === 'prev') {
                nextIndex = (prev.currentIndex - 1 + len) % len;
            }

            return {
                currentIndex: nextIndex,
                isTransitioning: false,
                slideDirection: null
            };
        });
    };

    // Auto-scroll
    useEffect(() => {
        if (isAutoScrolling && !state.isTransitioning) {
            timeoutRef.current = setInterval(nextSlide, autoScrollInterval);
        }

        // Safety timeout in case transitionEnd doesn't fire
        let safetyTimeout: NodeJS.Timeout;
        if (state.isTransitioning) {
            safetyTimeout = setTimeout(() => {
                handleTransitionEnd();
            }, 800);
        }

        return () => {
            if (timeoutRef.current) clearInterval(timeoutRef.current);
            if (safetyTimeout) clearTimeout(safetyTimeout);
        };
    }, [isAutoScrolling, state.isTransitioning, nextSlide, autoScrollInterval]);

    const handleMouseEnter = () => setIsAutoScrolling(false);
    const handleMouseLeave = () => setIsAutoScrolling(true);

    if (!images || images.length === 0) return null;

    const goToSlide = (index: number) => {
        setState(prev => {
            if (prev.isTransitioning) return prev;
            return { ...prev, currentIndex: index };
        });
    };

    // Calculate transform based on state
    // We have 3 items. Width is 300%.
    // Item 1 (Prev): 0-33%
    // Item 2 (Curr): 33-66%
    // Item 3 (Next): 66-100%
    // Idle: Show Item 2 -> translateX(-33.33%)
    // Next: Show Item 3 -> translateX(-66.66%)
    // Prev: Show Item 1 -> translateX(0%)
    let transformValue = -33.333333;
    if (state.isTransitioning) {
        if (state.slideDirection === 'next') transformValue = -66.666666;
        if (state.slideDirection === 'prev') transformValue = 0;
    }

    return (
        <div
            className="relative w-full h-32 md:h-40 flex items-center overflow-hidden group"
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
        >
            {/* Sliding Container */}
            <div
                className="flex items-center h-full flex-shrink-0"
                style={{
                    transform: `translateX(${transformValue}%)`,
                    transition: state.isTransitioning ? 'transform 700ms ease-in-out' : 'none',
                    width: '300%',
                }}
                onTransitionEnd={handleTransitionEnd}
            >
                {activeIndices.map((imgIndex, i) => {
                    // Calculate opacity
                    // i=0 (Prev), i=1 (Curr), i=2 (Next)
                    let opacity = 0;

                    if (!state.isTransitioning) {
                        // Idle: Only Current (i=1) is visible
                        opacity = i === 1 ? 1 : 0;
                    } else {
                        // Transitioning
                        if (state.slideDirection === 'next') {
                            // Moving to Next (i=2)
                            // Curr (i=1) fades out, Next (i=2) fades in
                            if (i === 1) opacity = 0;
                            if (i === 2) opacity = 1;
                        } else if (state.slideDirection === 'prev') {
                            // Moving to Prev (i=0)
                            // Curr (i=1) fades out, Prev (i=0) fades in
                            if (i === 1) opacity = 0;
                            if (i === 0) opacity = 1;
                        }
                    }

                    return (
                        <div
                            key={i} // Stable key to prevent remounting
                            className="flex items-center justify-center h-full flex-shrink-0"
                            style={{
                                width: '33.333333%',
                                opacity: opacity,
                                transition: state.isTransitioning ? 'opacity 700ms ease-in-out' : 'none'
                            }}
                        >
                            <div className="relative w-20 h-20 md:w-28 md:h-28">
                                <Image
                                    src={images[imgIndex]}
                                    alt={`Escudo equipo ${imgIndex}`}
                                    fill
                                    className="object-contain"
                                    sizes="(max-width: 768px) 80px, 112px"
                                />
                            </div>
                        </div>
                    );
                })}
            </div>

            {/* Navigation Arrows */}
            <button
                onClick={(e) => {
                    e.stopPropagation();
                    prevSlide();
                }}
                className="absolute left-0 z-20 p-2 m-2 rounded-full bg-black/30 text-white hover:bg-black/50 transition-all opacity-0 group-hover:opacity-100 focus:outline-none transform -translate-x-2 group-hover:translate-x-0"
                aria-label="Anterior"
            >
                <ChevronLeft size={24} />
            </button>
            <button
                onClick={(e) => {
                    e.stopPropagation();
                    nextSlide();
                }}
                className="absolute right-0 z-20 p-2 m-2 rounded-full bg-black/30 text-white hover:bg-black/50 transition-all opacity-0 group-hover:opacity-100 focus:outline-none transform translate-x-2 group-hover:translate-x-0"
                aria-label="Siguiente"
            >
                <ChevronRight size={24} />
            </button>

            {/* Indicators */}
            <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2 z-20 flex space-x-2">
                {images.map((_, index) => (
                    <button
                        key={index}
                        onClick={() => goToSlide(index)}
                        className={`w-2 h-2 rounded-full transition-all ${state.currentIndex === index
                                ? 'bg-white w-4'
                                : 'bg-white/50 hover:bg-white/80'
                            }`}
                        aria-label={`Ir a imagen ${index + 1}`}
                    />
                ))}
            </div>
        </div>
    );
}
