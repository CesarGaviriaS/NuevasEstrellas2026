import { anuncios as staticAnuncios, notaPrincipal as staticNotaPrincipal, notasSecundarias as staticNotasSecundarias, Anuncio, NotaPrincipal, NotaSecundaria } from './DataAnuncios';
import { sponsors as staticSponsors, contactInfo as staticContactInfo, heroSlides as staticHeroSlides, impactText as staticImpactText, whoWeAreData as staticWhoWeAre } from './data';
import { TORNEOS, TournamentEdition, Sponsor, Venue, Document } from './dataTorneos';
import { CategoryData } from './tournamentData';

export interface WordPressMedia {
    id: number;
    source_url: string;
    alt_text?: string;
}

export interface WordPressCategory {
    id: number;
    name: string;
    slug: string;
}

export interface WordPressPost {
    id: number;
    date: string;
    slug: string;
    link: string;
    title: {
        rendered: string;
    };
    content: {
        rendered: string;
    };
    excerpt: {
        rendered: string;
    };
    featured_media: number;
    categories: number[];
    _embedded?: {
        author?: Array<{
            id: number;
            name: string;
            avatar_urls?: Record<string, string>;
        }>;
        'wp:featuredmedia'?: Array<{
            id: number;
            source_url: string;
            alt_text?: string;
        }>;
        'wp:term'?: Array<Array<{
            id: number;
            name: string;
            slug: string;
            taxonomy: string;
        }>>;
    };
}

export interface HomeSectionConfig {
    mostrar_intro: boolean;
    mostrar_hero: boolean;
    mostrar_quienes_somos: boolean;
    mostrar_acerca_de: boolean;
    mostrar_modelo: boolean;
    mostrar_impacto: boolean;
    mostrar_metricas: boolean;
    mostrar_premios: boolean;
    mostrar_talento: boolean;
    mostrar_galeria: boolean;
    mostrar_patrocinadores: boolean;
    mostrar_equipo: boolean;
    mostrar_contacto: boolean;
    hero_titulo?: string;
    hero_subtitulo?: string;
    sponsors_titulo?: string;
    sponsors_descripcion?: string;
    contacto_whatsapp?: string;
    contacto_email?: string;
    contacto_representante?: string;
    torneo_edicion_activa?: string;
    torneo_estado_inscripcion?: string;
    torneo_reglamento_pdf?: string;
    torneo_fecha_inicio?: string;
    metric_participantes?: string;
    metric_proyectados?: string;
    metric_categorias?: string;
    impact_texto?: string;
    whoweare_intro?: string;
    whoweare_imagen?: string;
    hero_slide_1?: string;
    hero_slide_2?: string;
    hero_slide_3?: string;
    impact_imagen?: string;
    talento_imagen?: string;
    premios_imagen?: string;
    sponsors?: Array<{ name: string; logo: string }>;
}

export const defaultHomeConfig: HomeSectionConfig = {
    mostrar_intro: true,
    mostrar_hero: true,
    mostrar_quienes_somos: true,
    mostrar_acerca_de: true,
    mostrar_modelo: true,
    mostrar_impacto: true,
    mostrar_metricas: true,
    mostrar_premios: true,
    mostrar_talento: true,
    mostrar_galeria: true,
    mostrar_patrocinadores: true,
    mostrar_equipo: true,
    mostrar_contacto: true,
    hero_titulo: 'Nuevas Estrellas: Desarrollo de Talento',
    hero_subtitulo: 'Impulsando el desarrollo integral de jóvenes futbolistas talentosos de Colombia.',
    sponsors_titulo: 'Nuestros Patrocinadores',
    sponsors_descripcion: 'Estamos orgullosos de colaborar con estos aliados clave. Su apoyo vital ayuda a Nuevas Estrellas a impulsar el desarrollo del talento juvenil en el fútbol colombiano.',
    contacto_whatsapp: staticContactInfo.phone || '+57 310 000 0000',
    contacto_email: staticContactInfo.email || 'director@nuevasestrellas.com',
    contacto_representante: staticContactInfo.representative || 'Luis Francisco Lagos R.',
    torneo_edicion_activa: '2026',
    torneo_estado_inscripcion: 'Inscripciones Abiertas',
    torneo_fecha_inicio: 'Diciembre 2026',
    metric_participantes: '1,200+',
    metric_proyectados: '50+',
    metric_categorias: '4',
    impact_texto: staticImpactText,
    whoweare_intro: staticWhoWeAre.introduction
};

const WP_API_URL = 'https://nuevasestrellas.com/cms/wp-json/wp/v2';

export function parseBoolean(val: any, defaultVal: boolean = true): boolean {
    if (val === undefined || val === null) return defaultVal;
    if (val === false || val === 0 || val === '0' || val === 'false' || val === '') return false;
    if (val === true || val === 1 || val === '1' || val === 'true') return true;
    return Boolean(val);
}

/**
 * Obtiene la configuración de interruptores y textos del Home desde WordPress (ACF)
 */
export async function getHomeConfig(): Promise<HomeSectionConfig> {
    try {
        const isBrowser = typeof window !== 'undefined';
        const options: RequestInit = isBrowser 
            ? { cache: 'no-store' } 
            : { next: { revalidate: 60 } };

        const res = await fetch(`${WP_API_URL}/pages?slug=inicio`, options);
        if (!res.ok) return defaultHomeConfig;

        const pages = await res.json();
        if (!pages || pages.length === 0) return defaultHomeConfig;

        const acf = pages[0]?.acf;
        if (!acf) return defaultHomeConfig;

        return {
            mostrar_intro: parseBoolean(acf.mostrar_intro, true),
            mostrar_hero: parseBoolean(acf.mostrar_hero, true),
            mostrar_quienes_somos: parseBoolean(acf.mostrar_quienes_somos, true),
            mostrar_acerca_de: parseBoolean(acf.mostrar_acerca_de, true),
            mostrar_modelo: parseBoolean(acf.mostrar_modelo, true),
            mostrar_impacto: parseBoolean(acf.mostrar_impacto, true),
            mostrar_metricas: parseBoolean(acf.mostrar_metricas, true),
            mostrar_premios: parseBoolean(acf.mostrar_premios, true),
            mostrar_talento: parseBoolean(acf.mostrar_talento, true),
            mostrar_galeria: parseBoolean(acf.mostrar_galeria, true),
            mostrar_patrocinadores: parseBoolean(acf.mostrar_patrocinadores, true),
            mostrar_equipo: parseBoolean(acf.mostrar_equipo, true),
            mostrar_contacto: parseBoolean(acf.mostrar_contacto, true),
            hero_titulo: acf.hero_titulo || defaultHomeConfig.hero_titulo,
            hero_subtitulo: acf.hero_subtitulo || defaultHomeConfig.hero_subtitulo,
            sponsors_titulo: acf.sponsors_titulo || defaultHomeConfig.sponsors_titulo,
            sponsors_descripcion: acf.sponsors_descripcion || defaultHomeConfig.sponsors_descripcion,
            contacto_whatsapp: acf.contacto_whatsapp || defaultHomeConfig.contacto_whatsapp,
            contacto_email: acf.contacto_email || defaultHomeConfig.contacto_email,
            contacto_representante: acf.contacto_representante || defaultHomeConfig.contacto_representante,
            torneo_edicion_activa: acf.torneo_edicion_activa ? String(acf.torneo_edicion_activa) : defaultHomeConfig.torneo_edicion_activa,
            torneo_estado_inscripcion: acf.torneo_estado_inscripcion || defaultHomeConfig.torneo_estado_inscripcion,
            torneo_reglamento_pdf: parseMediaUrl(acf.torneo_reglamento_pdf) || undefined,
            torneo_fecha_inicio: acf.torneo_fecha_inicio || defaultHomeConfig.torneo_fecha_inicio,
            metric_participantes: acf.metric_participantes ? String(acf.metric_participantes) : defaultHomeConfig.metric_participantes,
            metric_proyectados: acf.metric_proyectados ? String(acf.metric_proyectados) : defaultHomeConfig.metric_proyectados,
            metric_categorias: acf.metric_categorias ? String(acf.metric_categorias) : defaultHomeConfig.metric_categorias,
            impact_texto: acf.impact_texto || defaultHomeConfig.impact_texto,
            whoweare_intro: acf.whoweare_intro || defaultHomeConfig.whoweare_intro,
            whoweare_imagen: parseMediaUrl(acf.whoweare_imagen) || undefined,
            hero_slide_1: parseMediaUrl(acf.hero_slide_1) || undefined,
            hero_slide_2: parseMediaUrl(acf.hero_slide_2) || undefined,
            hero_slide_3: parseMediaUrl(acf.hero_slide_3) || undefined,
            impact_imagen: parseMediaUrl(acf.impact_imagen) || undefined,
            talento_imagen: parseMediaUrl(acf.talento_imagen) || undefined,
            premios_imagen: parseMediaUrl(acf.premios_imagen) || undefined,
            sponsors: (() => {
                const list: Array<{ name: string; logo: string }> = [];
                for (let i = 1; i <= 8; i++) {
                    const name = acf[`sponsor_${i}_name`];
                    const logo = parseMediaUrl(acf[`sponsor_${i}_logo`]);
                    if (logo) {
                        list.push({
                            name: name || `Patrocinador ${i}`,
                            logo
                        });
                    }
                }
                return list.length > 0 ? list : undefined;
            })()
        };
    } catch (e) {
        console.warn('Error consultando configuración del Home en WordPress:', e);
        return defaultHomeConfig;
    }
}

/**
 * Obtiene todas las entradas (posts) de WordPress con medios y categorías embebidos.
 */
export async function getPosts(): Promise<WordPressPost[]> {
    try {
        const isBrowser = typeof window !== 'undefined';
        const options: RequestInit = isBrowser 
            ? { cache: 'no-store' } 
            : { next: { revalidate: 60 } };

        const res = await fetch(`${WP_API_URL}/posts?_embed&per_page=50`, options);

        if (!res.ok) {
            console.warn(`WordPress REST API (${res.status}): ${res.statusText}`);
            return [];
        }

        return await res.json();
    } catch (error) {
        console.error('Error conectando a WordPress REST API:', error);
        return [];
    }
}

/**
 * Obtiene un post específico por su slug (ej: 'mi-primera-noticia')
 */
export async function getPostBySlug(slug: string): Promise<WordPressPost | null> {
    try {
        const isBrowser = typeof window !== 'undefined';
        const options: RequestInit = isBrowser 
            ? { cache: 'no-store' } 
            : { next: { revalidate: 60 } };

        const res = await fetch(`${WP_API_URL}/posts?slug=${encodeURIComponent(slug)}&_embed`, options);

        if (!res.ok) {
            return null;
        }

        const posts: WordPressPost[] = await res.json();
        return posts.length > 0 ? posts[0] : null;
    } catch (error) {
        console.error(`Error buscando post con slug "${slug}":`, error);
        return null;
    }
}

/**
 * Obtiene la lista de slugs de todos los posts para generar rutas estáticas en build time
 */
export async function getAllPostSlugs(): Promise<string[]> {
    const posts = await getPosts();
    return posts.map(p => p.slug).filter(Boolean);
}

/**
 * Extrae la URL de la imagen destacada de un post de WordPress, o retorna un fallback.
/**
 * Helper para resolver URLs de imágenes o archivos devueltos por ACF / WordPress Media Library
 * (soporta strings, objetos de media con url, o tamaños específicos)
 */
export function parseMediaUrl(val: any, fallbackUrl: string = ''): string {
    if (!val) return fallbackUrl;
    if (typeof val === 'string') return val.trim();
    if (typeof val === 'object') {
        return val.url || val.source_url || val.src || val.sizes?.large?.url || val.sizes?.full?.url || fallbackUrl;
    }
    return fallbackUrl;
}

/**
 * Helper para extraer la URL de la imagen destacada desde _embedded
 */
export function getFeaturedImageUrl(post: WordPressPost, fallbackUrl: string = '/articulos/FutbolEntreLineas.png'): string {
    const media = post._embedded?.['wp:featuredmedia']?.[0];
    if (media?.source_url) {
        return media.source_url;
    }
    return fallbackUrl;
}

/**
 * Helper para formatear fechas ISO (YYYY-MM-DD...) a formato legible (ej: 19 de Septiembre, 2026 o DD/MM/YYYY)
 */
export function formatWPDate(dateStr: string): string {
    if (!dateStr) return '';
    try {
        const date = new Date(dateStr);
        return new Intl.DateTimeFormat('es-CO', {
            day: 'numeric',
            month: 'long',
            year: 'numeric'
        }).format(date);
    } catch {
        return dateStr;
    }
}

/**
 * Helper para calcular tiempo estimado de lectura (minutos)
 */
export function calculateReadingTime(contentHtml: string): number {
    if (!contentHtml) return 1;
    const text = stripHtml(contentHtml);
    const words = text.trim().split(/\s+/).length;
    return Math.max(1, Math.ceil(words / 200));
}

/**
 * Limpia tags HTML que vienen en title.rendered o excerpt.rendered de WordPress
 */
export function stripHtml(html: string): string {
    if (!html) return '';
    return html
        .replace(/<[^>]*>?/gm, '')
        .replace(/&amp;/g, '&')
        .replace(/&#8211;/g, '-')
        .replace(/&#8212;/g, '—')
        .replace(/&#8216;/g, "'")
        .replace(/&#8217;/g, "'")
        .replace(/&#8220;/g, '"')
        .replace(/&#8221;/g, '"')
        .replace(/&quot;/g, '"')
        .replace(/&nbsp;/g, ' ')
        .trim();
}

export interface AnunciosYNotasState {
    anuncios: Anuncio[];
    notaPrincipal: NotaPrincipal | null;
    notasSecundarias: NotaSecundaria[];
}

/**
 * Retorna el estado inicial vacío sin datos estáticos
 */
export function getStaticAnunciosYNotas(): AnunciosYNotasState {
    return {
        anuncios: [],
        notaPrincipal: null,
        notasSecundarias: []
    };
}

/**
 * Verifica si un post pertenece estrictamente a la categoría de Noticias
 */
export function isNoticiaPost(post: WordPressPost): boolean {
    const terms = post._embedded?.['wp:term']?.[0] || [];
    return terms.some(t => {
        const name = (t.name || '').toLowerCase().trim();
        const slug = (t.slug || '').toLowerCase().trim();
        return (
            slug === 'noticias' ||
            slug === 'noticia' ||
            name === 'noticias' ||
            name === 'noticia'
        );
    });
}

/**
 * Verifica si un post pertenece estrictamente a la categoría de Columnas / Fútbol Entre Líneas
 */
export function isColumnaPost(post: WordPressPost): boolean {
    const terms = post._embedded?.['wp:term']?.[0] || [];
    return terms.some(t => {
        const name = (t.name || '').toLowerCase().trim();
        const slug = (t.slug || '').toLowerCase().trim();
        return (
            slug === 'columnas' ||
            slug === 'columna' ||
            slug === 'futbol-entre-lineas' ||
            slug === 'opinion' ||
            name === 'columnas' ||
            name === 'columna' ||
            name === 'fútbol entre líneas' ||
            name === 'futbol entre lineas' ||
            name === 'opinión' ||
            name === 'opinion'
        );
    });
}

/**
 * Obtiene los anuncios y notas estructurados directamente y exclusivamente desde WordPress REST API.
 * Filtra estrictamente por la categoría asignada: "Noticias" para anuncios y "Columnas" para Fútbol Entre Líneas.
 */
export async function getAnunciosYNotasData(): Promise<AnunciosYNotasState> {
    const posts = await getPosts();

    // Filtramos posts activos que no sean el demo "hello-world"
    const validPosts = posts.filter(p => p.slug !== 'hello-world' || p.title.rendered !== 'Hello world!');

    if (validPosts.length === 0) {
        return {
            anuncios: [],
            notaPrincipal: null,
            notasSecundarias: []
        };
    }

    // Filtrar estrictamente por la categoría oficial de WordPress
    const noticiasPosts = validPosts.filter(p => isNoticiaPost(p));
    const columnasPosts = validPosts.filter(p => isColumnaPost(p));

    // Formatear Noticias (solo si tienen categoría Noticias)
    const dynamicAnuncios: Anuncio[] = noticiasPosts.map(p => ({
        title: stripHtml(p.title.rendered),
        imageUrl: getFeaturedImageUrl(p, '/articulos/FutbolEntreLineas.png'),
        linkUrl: `/anuncios-notas/${p.slug}`,
        imageAlt: stripHtml(p.title.rendered)
    }));

    // Formatear Columnas (solo si tienen categoría Columnas / Fútbol Entre Líneas)
    let dynamicNotaPrincipal: NotaPrincipal | null = null;
    let dynamicNotasSecundarias: NotaSecundaria[] = [];

    if (columnasPosts.length > 0) {
        const main = columnasPosts[0];
        dynamicNotaPrincipal = {
            title: stripHtml(main.title.rendered),
            imageUrl: getFeaturedImageUrl(main, '/articulos/FutbolEntreLineas.png'),
            linkUrl: `/anuncios-notas/${main.slug}`,
            imageAlt: stripHtml(main.title.rendered)
        };

        if (columnasPosts.length > 1) {
            dynamicNotasSecundarias = columnasPosts.slice(1).map(p => ({
                title: stripHtml(p.title.rendered),
                linkUrl: `/anuncios-notas/${p.slug}`,
                date: formatWPDate(p.date)
            }));
        }
    }

    return {
        anuncios: dynamicAnuncios,
        notaPrincipal: dynamicNotaPrincipal,
        notasSecundarias: dynamicNotasSecundarias
    };
}

/**
 * Obtiene los datos completos de una edición de torneo desde WordPress (ACF) con fallback local.
 */
export async function getTournamentEditionData(year: string): Promise<TournamentEdition | null> {
    const fallbackEdition = TORNEOS.find(t => t.id === year || t.year === year) || null;

    try {
        const isBrowser = typeof window !== 'undefined';
        const options: RequestInit = isBrowser 
            ? { cache: 'no-store' } 
            : { next: { revalidate: 60 } };

        // 1. Buscamos primero en el CPT Torneos (/wp-json/wp/v2/torneos)
        const slugsToTry = [`edicion-${year}`, `torneo-${year}`, `torneo-${year}-sogamoso`, year];
        let acfData: Record<string, any> | null = null;

        for (const slug of slugsToTry) {
            try {
                const res = await fetch(`${WP_API_URL}/torneos?slug=${slug}`, options);
                if (res.ok) {
                    const items = await res.json();
                    if (items && items.length > 0 && items[0].acf && Object.keys(items[0].acf).length > 0) {
                        acfData = items[0].acf;
                        break;
                    }
                }
            } catch (err) {
                console.warn(`Error buscando torneo con slug ${slug}:`, err);
            }
        }

        // Si no se encontró por slug directo, listamos todos los torneos y buscamos coincidencia por año o título
        if (!acfData) {
            try {
                const res = await fetch(`${WP_API_URL}/torneos?per_page=50`, options);
                if (res.ok) {
                    const allTorneos = await res.json();
                    if (Array.isArray(allTorneos) && allTorneos.length > 0) {
                        const match = allTorneos.find((t: any) => 
                            t.slug === `edicion-${year}` || 
                            t.slug === `torneo-${year}` || 
                            t.slug === year ||
                            t.slug?.includes(year) ||
                            t.acf?.edition_year === year ||
                            t.title?.rendered?.includes(year)
                        );
                        if (match && match.acf && Object.keys(match.acf).length > 0) {
                            acfData = match.acf;
                        }
                    }
                }
            } catch (err) {
                console.warn('Error listando /torneos:', err);
            }
        }

        // Si no se encontró en torneos, probamos en páginas
        if (!acfData) {
            for (const slug of slugsToTry) {
                try {
                    const res = await fetch(`${WP_API_URL}/pages?slug=${slug}`, options);
                    if (res.ok) {
                        const pages = await res.json();
                        if (pages && pages.length > 0 && pages[0].acf) {
                            acfData = pages[0].acf;
                            break;
                        }
                    }
                } catch {}
            }
        }

        // Si no se encontró en páginas, probamos en posts
        if (!acfData) {
            for (const slug of slugsToTry) {
                try {
                    const res = await fetch(`${WP_API_URL}/posts?slug=${slug}`, options);
                    if (res.ok) {
                        const posts = await res.json();
                        if (posts && posts.length > 0 && posts[0].acf) {
                            acfData = posts[0].acf;
                            break;
                        }
                    }
                } catch {}
            }
        }

        if (!acfData) {
            return fallbackEdition;
        }

        // Extraer sedes (soporta tanto repetidores Pro como campos slot de ACF Free)
        let venuesList: Venue[] = [];
        if (acfData.venues && Array.isArray(acfData.venues) && acfData.venues.length > 0) {
            venuesList = acfData.venues.map((v: any) => ({ name: v.name || '', mapUrl: v.mapUrl || '' }));
        } else {
            for (let i = 1; i <= 5; i++) {
                const name = acfData[`venue_${i}_name`];
                const mapUrl = acfData[`venue_${i}_map`];
                if (name) {
                    venuesList.push({ name, mapUrl: mapUrl || '' });
                }
            }
        }

        // Extraer documentos (soporta tanto repetidores Pro como campos slot de ACF Free)
        let documentsList: Document[] = [];
        if (acfData.documents && Array.isArray(acfData.documents) && acfData.documents.length > 0) {
            documentsList = acfData.documents.map((d: any) => ({ title: d.title || '', subtitle: d.subtitle || 'Descargar PDF', url: parseMediaUrl(d.url || d.file || d) }));
        } else {
            for (let i = 1; i <= 5; i++) {
                const title = acfData[`doc_${i}_title`];
                const file = parseMediaUrl(acfData[`doc_${i}_file`]);
                if (title && file) {
                    documentsList.push({ title, subtitle: 'Descargar PDF', url: file });
                }
            }
        }

        // Extraer scouts (soporta tanto repetidores Pro como campos slot de ACF Free)
        let scoutsList: Sponsor[] = [];
        if (acfData.scouts_list && Array.isArray(acfData.scouts_list) && acfData.scouts_list.length > 0) {
            scoutsList = acfData.scouts_list.map((s: any) => ({ name: s.name || '', logo: parseMediaUrl(s.logo || s.image || s) }));
        } else {
            for (let i = 1; i <= 10; i++) {
                const name = acfData[`scout_${i}_name`];
                const logo = parseMediaUrl(acfData[`scout_${i}_logo`]);
                if (name && logo) {
                    scoutsList.push({ name, logo });
                }
            }
        }

        // Extraer fotos de galería
        let galleryImages: string[] = [];
        if (acfData.gallery_images && Array.isArray(acfData.gallery_images) && acfData.gallery_images.length > 0) {
            galleryImages = acfData.gallery_images.map((g: any) => parseMediaUrl(g.image_url || g.url || g)).filter(Boolean);
        } else {
            for (let i = 1; i <= 6; i++) {
                const img = parseMediaUrl(acfData[`gal_img_${i}`]);
                if (img) galleryImages.push(img);
            }
        }

        // 3. Consultar CPTs dedicados (Documentos, Sedes, Scouts) si existen entradas publicadas
        try {
            const [docsRes, sedesRes, scoutsRes] = await Promise.all([
                fetch(`${WP_API_URL}/documentos?per_page=50`, options).catch(() => null),
                fetch(`${WP_API_URL}/sedes?per_page=50`, options).catch(() => null),
                fetch(`${WP_API_URL}/scouts?per_page=50`, options).catch(() => null)
            ]);

            if (docsRes && docsRes.ok) {
                const docsData = await docsRes.json();
                if (Array.isArray(docsData) && docsData.length > 0) {
                    const matchingDocs = docsData
                        .filter((d: any) => !d.acf?.torneo_edicion || d.acf?.torneo_edicion === year)
                        .map((d: any) => ({
                            title: stripHtml(d.title?.rendered || ''),
                            subtitle: d.acf?.documento_subtitulo || 'Descargar PDF',
                            url: parseMediaUrl(d.acf?.documento_pdf)
                        }))
                        .filter((d: any) => d.title && d.url);
                    if (matchingDocs.length > 0) documentsList = matchingDocs;
                }
            }

            if (sedesRes && sedesRes.ok) {
                const sedesData = await sedesRes.json();
                if (Array.isArray(sedesData) && sedesData.length > 0) {
                    const matchingSedes = sedesData
                        .filter((s: any) => !s.acf?.torneo_edicion || s.acf?.torneo_edicion === year)
                        .map((s: any) => ({
                            name: stripHtml(s.title?.rendered || ''),
                            mapUrl: s.acf?.mapa_embed_url || ''
                        }))
                        .filter((s: any) => s.name);
                    if (matchingSedes.length > 0) venuesList = matchingSedes;
                }
            }

            if (scoutsRes && scoutsRes.ok) {
                const scoutsData = await scoutsRes.json();
                if (Array.isArray(scoutsData) && scoutsData.length > 0) {
                    const matchingScouts = scoutsData
                        .filter((s: any) => !s.acf?.torneo_edicion || s.acf?.torneo_edicion === year)
                        .map((s: any) => ({
                            name: stripHtml(s.title?.rendered || ''),
                            logo: parseMediaUrl(s.acf?.scout_logo)
                        }))
                        .filter((s: any) => s.name && s.logo);
                    if (matchingScouts.length > 0) scoutsList = matchingScouts;
                }
            }
        } catch (cptErr) {
            console.warn('Error consultando CPTs en WordPress:', cptErr);
        }

        // Si encontramos datos ACF, combinamos los campos dinámicos sobre la estructura base
        const edition: TournamentEdition = {
            id: year,
            year: acfData.edition_year || fallbackEdition?.year || year,
            title: acfData.edition_title || fallbackEdition?.title || `Edición ${year}`,
            coverImage: parseMediaUrl(acfData.edition_cover, fallbackEdition?.coverImage || '/balones y fondo.jpg'),
            description: acfData.edition_description || fallbackEdition?.description || '',
            sections: {
                scouts: {
                    enabled: parseBoolean(acfData.scouts_enabled, fallbackEdition?.sections.scouts.enabled ?? true),
                    title: acfData.scouts_title || fallbackEdition?.sections.scouts.title || 'Scouting Garantizado',
                    data: scoutsList.length > 0 ? scoutsList : (fallbackEdition?.sections.scouts.data || [])
                },
                honorRoll: {
                    enabled: parseBoolean(acfData.honor_enabled, fallbackEdition?.sections.honorRoll.enabled ?? false),
                    data: fallbackEdition?.sections.honorRoll.data || {}
                },
                participatingTeams: {
                    enabled: parseBoolean(acfData.teams_enabled, fallbackEdition?.sections.participatingTeams.enabled ?? true),
                    data: fallbackEdition?.sections.participatingTeams.data || {}
                },
                gallery: {
                    enabled: parseBoolean(acfData.gallery_enabled, fallbackEdition?.sections.gallery.enabled ?? false),
                    data: galleryImages.length > 0 ? galleryImages : (fallbackEdition?.sections.gallery.data || []),
                    fullGalleryLink: acfData.full_gallery_link || fallbackEdition?.sections.gallery.fullGalleryLink || `/galeria/${year}`
                },
                cronograma: {
                    enabled: parseBoolean(acfData.cronograma_enabled, fallbackEdition?.sections.cronograma.enabled ?? true),
                    title: acfData.cronograma_title || fallbackEdition?.sections.cronograma.title || `Cronograma e Inscripciones ${year}`,
                    venues: venuesList.length > 0 ? venuesList : (fallbackEdition?.sections.cronograma.venues || []),
                    documents: documentsList.length > 0 ? documentsList : (fallbackEdition?.sections.cronograma.documents || []),
                    status: {
                        registrationStatus: acfData.registration_status || fallbackEdition?.sections.cronograma.status.registrationStatus || 'ABIERTAS',
                        registrationDeadline: acfData.registration_deadline || fallbackEdition?.sections.cronograma.status.registrationDeadline || 'Por definir',
                        technicalCongressDate: acfData.technical_congress_date || fallbackEdition?.sections.cronograma.status.technicalCongressDate || 'Por definir',
                        startDate: acfData.start_date || fallbackEdition?.sections.cronograma.status.startDate || 'Por definir',
                        finalDate: acfData.final_date || fallbackEdition?.sections.cronograma.status.finalDate || 'Por definir'
                    },
                    scoutingImages: scoutsList.length > 0 ? scoutsList.map(s => s.logo).filter(Boolean) : (fallbackEdition?.sections.cronograma.scoutingImages || []),
                    data: fallbackEdition?.sections.cronograma.data || {}
                }
            }
        };

        return edition;
    } catch (e) {
        console.warn(`Error cargando edición ${year} desde WordPress:`, e);
        return fallbackEdition;
    }
}

/**
 * Obtiene la lista de todas las ediciones de torneos combinando WordPress con el fallback estático.
 */
export async function getTournamentsList(): Promise<TournamentEdition[]> {
    try {
        const isBrowser = typeof window !== 'undefined';
        const options: RequestInit = isBrowser ? { cache: 'no-store' } : { next: { revalidate: 60 } };
        const res = await fetch(`${WP_API_URL}/torneos?per_page=50`, options);
        if (res.ok) {
            const remoteTorneos = await res.json();
            if (Array.isArray(remoteTorneos) && remoteTorneos.length > 0) {
                return TORNEOS.map(localT => {
                    const match = remoteTorneos.find((r: any) => 
                        r.slug === `edicion-${localT.id}` || 
                        r.slug === `torneo-${localT.id}` || 
                        r.slug === localT.id ||
                        r.acf?.edition_year === localT.id ||
                        r.title?.rendered?.includes(localT.id)
                    );
                    if (match && match.acf) {
                        return {
                            ...localT,
                            title: match.acf.edition_title || stripHtml(match.title?.rendered) || localT.title,
                            description: match.acf.edition_description || localT.description,
                            coverImage: parseMediaUrl(match.acf.edition_cover, localT.coverImage),
                            year: match.acf.edition_year || localT.year
                        };
                    }
                    return localT;
                });
            }
        }
    } catch (err) {
        console.warn('Error cargando lista de torneos desde WP:', err);
    }
    return TORNEOS;
}