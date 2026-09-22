/**
 * Script de sincronización e inyección directa a WordPress REST API
 * Permite actualizar textos, interruptores del Home y datos de Torneos directamente.
 */

const user = 'admin_estrellas';
const pass = 'T5Hi gY19 6IMt v9si iDnu P0Hl';
const auth = Buffer.from(user + ':' + pass).toString('base64');
const WP_API = 'https://nuevasestrellas.com/cms/wp-json/wp/v2';

const headers = {
    'Authorization': 'Basic ' + auth,
    'Content-Type': 'application/json'
};

async function updateHomePage(fields) {
    console.log('🔄 Actualizando página de Inicio en WordPress...');
    const searchRes = await fetch(`${WP_API}/pages?slug=inicio`, { headers });
    const pages = await searchRes.json();
    
    let pageId = pages && pages.length > 0 ? pages[0].id : null;
    
    if (!pageId) {
        console.log('Creando página de Inicio nueva...');
        const createRes = await fetch(`${WP_API}/pages`, {
            method: 'POST',
            headers,
            body: JSON.stringify({
                title: 'Configuración de Inicio (Home)',
                slug: 'inicio',
                status: 'publish',
                acf: fields
            })
        });
        const created = await createRes.json();
        console.log('✅ Página creada con ID:', created.id);
        return created;
    } else {
        const updateRes = await fetch(`${WP_API}/pages/${pageId}`, {
            method: 'POST',
            headers,
            body: JSON.stringify({
                acf: fields
            })
        });
        const updated = await updateRes.json();
        console.log('✅ Página de Inicio actualizada con éxito en WordPress (ID:', pageId, ')');
        return updated;
    }
}

async function syncTorneoPage(year, data) {
    console.log(`🔄 Sincronizando Torneo ${year} en WordPress...`);
    const slug = `torneo-${year}`;
    const searchRes = await fetch(`${WP_API}/pages?slug=${slug}`, { headers });
    const pages = await searchRes.json();
    
    let pageId = pages && pages.length > 0 ? pages[0].id : null;
    
    const payload = {
        title: `Torneo Nuevas Estrellas ${year}`,
        slug: slug,
        status: 'publish',
        acf: data
    };
    
    if (!pageId) {
        const createRes = await fetch(`${WP_API}/pages`, {
            method: 'POST',
            headers,
            body: JSON.stringify(payload)
        });
        const created = await createRes.json();
        console.log(`✅ Página Torneo ${year} creada con ID: ${created.id}`);
        return created;
    } else {
        const updateRes = await fetch(`${WP_API}/pages/${pageId}`, {
            method: 'POST',
            headers,
            body: JSON.stringify(payload)
        });
        const updated = await updateRes.json();
        console.log(`✅ Página Torneo ${year} actualizada con éxito (ID: ${pageId})`);
        return updated;
    }
}

async function run() {
    console.log('🚀 Conectando a WordPress REST API (nuevasestrellas.com/cms)...');
    
    // 1. Sincronizar Torneo 2026 (Limpio / Por definir)
    await syncTorneoPage('2026', {
        edition_year: '2026',
        edition_title: 'Edición 2026 (Próximamente)',
        edition_description: 'La edición 2026 del Torneo Nuevas Estrellas Electrolit en Yopal, Casanare.',
        registration_status: 'ABIERTAS',
        registration_deadline: 'Por definir',
        technical_congress_date: 'Por definir',
        start_date: 'Por definir',
        final_date: 'Por definir',
        scouts_enabled: false,
        scouts_title: 'Scouting 2026',
        scouts_list: [],
        venues: [],
        documents: [],
        teams_enabled: true,
        cronograma_enabled: true,
        honor_enabled: false,
        gallery_enabled: false,
        gallery_images: [],
        full_gallery_link: '/galeria/2026'
    });

    // 2. Sincronizar Torneo 2025
    await syncTorneoPage('2025', {
        edition_year: '2025',
        edition_title: 'Edición 2025',
        edition_description: 'La edición 2025 del Torneo Nuevas Estrellas',
        registration_status: 'FINALIZADO',
        teams_enabled: true,
        cronograma_enabled: true,
        honor_enabled: true,
        gallery_enabled: true,
        full_gallery_link: '/galeria/2025'
    });

    console.log('\n✨ ¡Sincronización completada con éxito!');
}

run().catch(console.error);
