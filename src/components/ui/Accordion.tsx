'use client';

import * as React from 'react';
import { ChevronDown } from 'lucide-react';
import { cn } from '@/lib/utils';

const Accordion = React.forwardRef<
    HTMLDivElement,
    React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
    <div ref={ref} className={cn('space-y-2', className)} {...props} />
));
Accordion.displayName = 'Accordion';

const AccordionItem = React.forwardRef<
    HTMLDivElement,
    React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
    <div ref={ref} className={cn('border rounded-xl overflow-hidden', className)} {...props} />
));
AccordionItem.displayName = 'AccordionItem';

const AccordionTrigger = React.forwardRef<
    HTMLButtonElement,
    React.ButtonHTMLAttributes<HTMLButtonElement> & { isOpen: boolean; onToggle: () => void }
>(({ className, children, isOpen, onToggle, ...props }, ref) => (
    <button
        ref={ref}
        onClick={onToggle}
        className={cn(
            'flex flex-1 items-center justify-between py-4 px-6 font-medium transition-all w-full text-left',
            isOpen ? 'bg-primary/5 text-primary' : 'bg-white hover:bg-gray-50',
            className
        )}
        {...props}
    >
        {children}
        <ChevronDown
            className={cn('h-5 w-5 shrink-0 transition-transform duration-200', isOpen && 'rotate-180')}
        />
    </button>
));
AccordionTrigger.displayName = 'AccordionTrigger';

const AccordionContent = React.forwardRef<
    HTMLDivElement,
    React.HTMLAttributes<HTMLDivElement> & { isOpen: boolean }
>(({ className, children, isOpen, ...props }, ref) => (
    <div
        ref={ref}
        className={cn(
            'overflow-hidden transition-all duration-300 ease-in-out',
            isOpen ? 'max-h-[1000px] opacity-100' : 'max-h-0 opacity-0'
        )}
        {...props}
    >
        <div className={cn('p-6 bg-white', className)}>{children}</div>
    </div>
));
AccordionContent.displayName = 'AccordionContent';

export { Accordion, AccordionItem, AccordionTrigger, AccordionContent };
