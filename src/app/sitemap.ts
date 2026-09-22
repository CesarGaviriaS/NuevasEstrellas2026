import { MetadataRoute } from 'next';

export const dynamic = 'force-static';

export default function sitemap(): MetadataRoute.Sitemap {
    const baseUrl = 'https://nuevasestrellas.com';

    // Rutas estáticas
    const routes = [
        '',
        '/torneos',
        '/anuncios-notas',
    ].map((route) => ({
        url: `${baseUrl}${route}`,
        lastModified: new Date(),
        changeFrequency: 'weekly' as const,
        priority: route === '' ? 1 : 0.8,
    }));

    // Rutas dinámicas de torneos
    const editions = ['2024', '2025'];
    const tournamentRoutes = editions.map((edition) => ({
        url: `${baseUrl}/torneos/${edition}`,
        lastModified: new Date(),
        changeFrequency: 'weekly' as const,
        priority: 0.9,
    }));

    return [...routes, ...tournamentRoutes];
}
