'use client';

import { useState, useRef, useEffect } from 'react';
import { X, Move } from 'lucide-react';

interface DraggableVideoModalProps {
    onClose: () => void;
    videoSrc: string;
}

export default function DraggableVideoModal({ onClose, videoSrc }: DraggableVideoModalProps) {
    const [position, setPosition] = useState({ x: 20, y: 20 });
    const [isDragging, setIsDragging] = useState(false);
    const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });
    const modalRef = useRef<HTMLDivElement>(null);

    // Center initially on desktop
    useEffect(() => {
        if (typeof window !== 'undefined' && window.innerWidth >= 768) {
            setPosition({
                x: window.innerWidth / 2 - 280, // Center X (560px width / 2)
                y: window.innerHeight / 2 - 200  // Center Y
            });
        }
    }, []);

    const handleMouseDown = (e: React.MouseEvent) => {
        setIsDragging(true);
        setDragOffset({
            x: e.clientX - position.x,
            y: e.clientY - position.y
        });
    };

    const handleMouseMove = (e: MouseEvent) => {
        if (isDragging) {
            setPosition({
                x: e.clientX - dragOffset.x,
                y: e.clientY - dragOffset.y
            });
        }
    };

    const handleMouseUp = () => {
        setIsDragging(false);
    };

    useEffect(() => {
        if (isDragging) {
            window.addEventListener('mousemove', handleMouseMove);
            window.addEventListener('mouseup', handleMouseUp);
        } else {
            window.removeEventListener('mousemove', handleMouseMove);
            window.removeEventListener('mouseup', handleMouseUp);
        }
        return () => {
            window.removeEventListener('mousemove', handleMouseMove);
            window.removeEventListener('mouseup', handleMouseUp);
        };
    }, [isDragging]);

    return (
        <div
            ref={modalRef}
            className="fixed z-50 shadow-2xl rounded-lg overflow-hidden bg-black border border-gray-700 w-full md:w-[560px] max-w-[95vw]"
            style={{
                left: typeof window !== 'undefined' && window.innerWidth < 768 ? '50%' : `${position.x}px`,
                top: typeof window !== 'undefined' && window.innerWidth < 768 ? '50%' : `${position.y}px`,
                transform: typeof window !== 'undefined' && window.innerWidth < 768 ? 'translate(-50%, -50%)' : 'none'
            }}
        >
            {/* Header / Handle */}
            <div
                className="bg-gray-900 text-white p-2 flex justify-between items-center cursor-move select-none"
                onMouseDown={handleMouseDown}
            >
                <div className="flex items-center gap-2 text-sm font-medium">
                    <Move className="h-4 w-4 text-gray-400" />
                    <span>Video Destacado</span>
                </div>
                <button
                    onClick={onClose}
                    className="hover:bg-gray-700/50 rounded p-1 transition-colors"
                    title="Cerrar video"
                >
                    <X className="h-5 w-5 text-white" />
                </button>
            </div>

            {/* Video Content */}
            <div className="aspect-video w-full bg-black">
                <iframe
                    src={videoSrc}
                    width="100%"
                    height="100%"
                    style={{ border: 'none', overflow: 'hidden' }}
                    scrolling="no"
                    frameBorder="0"
                    allowFullScreen={true}
                    allow="autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share"
                />
            </div>
        </div>
    );
}
