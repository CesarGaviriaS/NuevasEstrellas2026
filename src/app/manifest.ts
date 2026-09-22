import { MetadataRoute } from 'next';

export const dynamic = 'force-static';

export default function manifest(): MetadataRoute.Manifest {
    return {
        name: 'Nuevas Estrellas',
        short_name: 'Nuevas Estrellas',
        description: 'Impulsando el desarrollo integral de jóvenes futbolistas talentosos de Colombia.',
        start_url: '/',
        display: 'standalone',
        background_color: '#ffffff',
        theme_color: '#1e1e90', // Approximate hex for hsl(240, 52%, 37%)
        icons: [
            {
                src: '/logo%20nuevas%20estrellas%20con%20letras.png',
                sizes: 'any',
                type: 'image/png',
            },
        ],
    };
}
