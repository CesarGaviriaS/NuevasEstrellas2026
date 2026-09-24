'use client';

import React, { useRef } from 'react';

// In-memory cache for downloaded blob URLs to completely prevent redundant network requests
const blobCache = new Map<string, string>();
const lastDownloadTimestamps = new Map<string, number>();

interface DownloadLinkProps extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
    href: string;
    downloadFileName?: string;
    cooldownMs?: number;
    children: React.ReactNode;
}

export default function DownloadLink({
    href,
    downloadFileName,
    cooldownMs = 3000,
    className = '',
    children,
    onClick,
    ...rest
}: DownloadLinkProps) {
    const isDownloadingRef = useRef(false);

    const handleClick = async (e: React.MouseEvent<HTMLAnchorElement>) => {
        const now = Date.now();
        const lastClick = lastDownloadTimestamps.get(href) || 0;

        // 1. Invisible Cooldown / Throttling: Ignore rapid spam clicks within cooldownMs
        if (now - lastClick < cooldownMs || isDownloadingRef.current) {
            e.preventDefault();
            return;
        }

        lastDownloadTimestamps.set(href, now);
        isDownloadingRef.current = true;

        if (onClick) {
            onClick(e);
        }

        // If not a local/static document link, let default anchor behavior handle
        if (!href.startsWith('/') && !href.startsWith(window.location.origin)) {
            isDownloadingRef.current = false;
            return;
        }

        e.preventDefault();

        try {
            // 2. In-memory / HTTP Cache check
            let blobUrl = blobCache.get(href);

            if (!blobUrl) {
                const res = await fetch(href, { cache: 'force-cache' });
                if (!res.ok) throw new Error(`HTTP error ${res.status}`);
                const blob = await res.blob();
                blobUrl = URL.createObjectURL(blob);
                blobCache.set(href, blobUrl);
            }

            // 3. Trigger seamless download without UI disturbance
            const tempLink = document.createElement('a');
            tempLink.href = blobUrl;
            tempLink.download = downloadFileName || href.split('/').pop() || 'documento';
            document.body.appendChild(tempLink);
            tempLink.click();
            document.body.removeChild(tempLink);
        } catch {
            // Graceful fallback: trigger native download
            const tempLink = document.createElement('a');
            tempLink.href = href;
            tempLink.download = downloadFileName || href.split('/').pop() || 'documento';
            document.body.appendChild(tempLink);
            tempLink.click();
            document.body.removeChild(tempLink);
        } finally {
            setTimeout(() => {
                isDownloadingRef.current = false;
            }, cooldownMs);
        }
    };

    return (
        <a
            href={href}
            download={downloadFileName || true}
            onClick={handleClick}
            className={className}
            {...rest}
        >
            {children}
        </a>
    );
}
