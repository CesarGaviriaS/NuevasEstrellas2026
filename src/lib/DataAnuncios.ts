// Tipos para los diferentes tipos de contenido
export interface Anuncio {
    title: string;
    imageUrl: string;
    linkUrl: string;
    imageAlt: string;
}

export interface NotaPrincipal {
    title: string;
    imageUrl: string;
    linkUrl: string;
    imageAlt: string;
}

export interface NotaSecundaria {
    title: string;
    linkUrl: string;
    date: string;
}

// Anuncios - Array único que se distribuirá dinámicamente en el grid
export const anuncios: Anuncio[] = [
    {
        title: "En la Tierra del Sol brillaron las nuevas estrellas del fútbol - Boyaca 7 Días",
        imageUrl: "/articulos/B7D_9_12_2025.png",
        linkUrl: "https://boyaca7dias.com.co/2025/12/09/en-la-tierra-del-sol-brillaron-las-nuevas-estrellas-del-futbol/",
        imageAlt: "En la Tierra del Sol brillaron las nuevas estrellas del fútbol"
    },
    {
        title: "Veedores de diez clubes del fútbol colombiano, ojo abierto en torneo infantil y juvenil en Boyacá - Gol Caracol",
        imageUrl: "/articulos/golcaracol.webp",
        linkUrl: "https://www.noticiascaracol.com/golcaracol/veedores-de-diez-clubes-ojo-abierto-en-torneo-infantil-y-juvenil-que-se-jugara-en-boyaca-rg10",
        imageAlt: "Fútbol de infantiles y juveniles tendrá su espacio en Boyaca"
    },
    {
        title: "Clubes del Torneo Nuevas Estrellas Electrolit 2025 buscan hoteles con disponibilidad para sus equipos - Boyaca 7 Días",
        imageUrl: "/articulos/20-11-2025.png",
        linkUrl: "https://boyaca7dias.com.co/2025/11/20/clubes-del-torneo-nuevas-estrellas-electrolit-2025-buscan-hoteles-con-disponibilidad-para-sus-equipos/",
        imageAlt: "Clubes buscan hoteles"
    },
    {
        title: "Sogamoso brilla con el Torneo Nuevas Estrellas Electrolit 2025 - Boyaca 7 Días",
        imageUrl: "/articulos/21-10-2025.jpg",
        linkUrl: "https://boyaca7dias.com.co/2025/11/15/sogamoso-brilla-con-el-torneo-nuevas-estrellas-electrolit-2025/",
        imageAlt: "Sogamoso brilla con el Torneo"
    },
    {
        title: "Sogamoso será sede del Torneo Nuevas Estrellas Electrolit 2025 - Boyaca 7 Días",
        imageUrl: "/articulos/20-11-2025.png",
        linkUrl: "https://boyaca7dias.com.co/2025/10/21/sogamoso-sera-sede-del-torneo-nuevas-estrellas-electrolit-2025/",
        imageAlt: "Sogamoso será sede del Torneo"
    }
];

// Nota Principal (Featured)
export const notaPrincipal: NotaPrincipal = {
    title: "En el 2026 la Liga tiene cambios – Luis Francisco Lagos",
    imageUrl: "/articulos/FutbolEntreLineas.png",
    linkUrl: "https://boyaca7dias.com.co/2025/12/13/en-el-2026-la-liga-tiene-cambios-luis-francisco-lagos-columnista7dias/",
    imageAlt: "Artículo Fútbol Entre Líneas"
};

// Notas Secundarias (Título Cards)
export const notasSecundarias: NotaSecundaria[] = [
    {
        title: "Cúcuta Deportivo volvió a la A: los partidos más difíciles se jugaron fuera de la cancha – Luis Francisco Lagos",
        linkUrl: "https://boyaca7dias.com.co/2025/12/08/cucuta-deportivo-volvio-a-la-a-los-partidos-mas-dificiles-se-jugaron-fuera-de-la-cancha-luis-francisco-lagos-columnista7dias/",
        date: "08/12/2025"
    },
    {
        title: "G&J Ferreterías: dos letras en la historia del fútbol boyacense – Luis Francisco Lagos",
        linkUrl: "https://boyaca7dias.com.co/2025/11/29/gj-ferreterias-dos-letras-en-la-historia-del-futbol-boyacense-luis-francisco-lagos-columnista7dias/",
        date: "29/11/2025"
    },
    {
        title: "Los Rueda también lloran – Luis Francisco Lagos",
        linkUrl: "https://boyaca7dias.com.co/2025/11/22/los-rueda-tambien-lloran-luis-francisco-lagos-columnista7dias/",
        date: "22/11/2025"
    },
    {
        title: "Entre la pasión y la estupidez: la otra cara del fútbol – Luis Francisco Lagos",
        linkUrl: "https://boyaca7dias.com.co/2025/11/15/entre-la-pasion-y-la-estupidez-la-otra-cara-del-futbol-luis-francisco-lagos-columnista7dias/",
        date: "15/11/2025"
    },
    {
        title: "Hablando de fútbol y canciones… La gran apuesta por el nuevo La Independencia",
        linkUrl: "https://boyaca7dias.com.co/2025/11/08/hablando-de-futbol-y-canciones-la-gran-apuesta-por-el-nuevo-la-independencia-columnista7dias/",
        date: "08/11/2025"
    },
    {
        title: "Juan Alejandro Mahecha: un boyacense con estrella – Luis Francisco Lagos",
        linkUrl: "https://boyaca7dias.com.co/2025/11/01/juan-alejandro-mahecha-un-boyacense-con-estrella-luis-francisco-lagos-columnista7dias/",
        date: "01/11/2025"
    },
    {
        title: "Las lecciones que dejó la Copa Mundial Sub-20; Marruecos y la confirmación de un modelo – Luis Francisco Lagos",
        linkUrl: "https://boyaca7dias.com.co/2025/11/01/juan-alejandro-mahecha-un-boyacense-con-estrella-luis-francisco-lagos-columnista7dias/",
        date: "25/10/2025"
    }
];
