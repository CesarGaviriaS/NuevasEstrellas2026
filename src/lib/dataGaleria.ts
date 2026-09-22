export interface GalleryItem {
    id: string;
    imageUrl?: string;
    placeholderText: string;
}

export interface EditionGallery {
    editionId: string;
    items: GalleryItem[];
}

const PLACEHOLDER_COUNT = 50;

const generatePlaceholders = (): GalleryItem[] => {
    return Array.from({ length: PLACEHOLDER_COUNT }).map((_, i) => ({
        id: `item-${i + 1}`,
        placeholderText: 'Próximamente'
    }));
};

export const GALLERY_DATA: Record<string, EditionGallery> = {
    '2026': {
        editionId: '2026',
        items: generatePlaceholders()
    },
    '2025': {
        editionId: '2025',
        items: generatePlaceholders()
    },
    '2024': {
        editionId: '2024',
        items: [
            {
                id: 'img-1',
                imageUrl: '/galeria/abrezo grupo.jpg',
                placeholderText: 'Campeones'
            },
            {
                id: 'img-2',
                imageUrl: '/galeria/incio_partido.jpg',
                placeholderText: 'Inicio del Partido'
            },
            ...generatePlaceholders()
        ]
    }
};
