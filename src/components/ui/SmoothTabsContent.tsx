'use client';

import { useState, useEffect } from 'react';
import { TabsContent } from '@/components/ui/tabs';

interface SmoothTabsContentProps {
    value: string;
    children: React.ReactNode;
    className?: string;
}

export function SmoothTabsContent({ value, children, className = "" }: SmoothTabsContentProps) {
    const [isVisible, setIsVisible] = useState(false);
    const [displayValue, setDisplayValue] = useState(value);

    useEffect(() => {
        if (value !== displayValue) {
            setIsVisible(false);
            const timer = setTimeout(() => {
                setDisplayValue(value);
                setIsVisible(true);
            }, 300);
            return () => clearTimeout(timer);
        } else {
            setIsVisible(true);
        }
    }, [value, displayValue]);

    if (value !== displayValue) return null;

    return (
        <TabsContent
            value={value}
            className={`${className} transition-all duration-500 ease-in-out ${isVisible
                    ? 'opacity-100 transform translate-y-0'
                    : 'opacity-0 transform translate-y-4'
                }`}
        >
            {children}
        </TabsContent>
    );
}
