import { CategoryData, TOURNAMENT_DATA as DEFAULT_DATA, TOURNAMENT_DATA_2024 } from './tournamentData';

export interface Sponsor {
    name: string;
    logo: string;
}

export interface Venue {
    name: string;
    mapUrl: string;
}

export interface Document {
    title: string;
    subtitle: string;
    url: string;
}

export interface TournamentSectionConfig {
    enabled: boolean;
    title?: string;
}

export interface TournamentEdition {
    id: string;
    year: string;
    title: string;
    coverImage: string;
    description: string;

    // Section Configuration & Data
    sections: {
        scouts: TournamentSectionConfig & {
            data: Sponsor[];
        };
        honorRoll: TournamentSectionConfig & {
            data: Record<string, CategoryData>; // Reusing CategoryData structure
        };
        participatingTeams: TournamentSectionConfig & {
            data: Record<string, CategoryData>;
        };
        gallery: TournamentSectionConfig & {
            data: string[];
            fullGalleryLink: string;
        };
        cronograma: TournamentSectionConfig & {
            venues: Venue[];
            documents: Document[];
            // Status Info
            status: {
                registrationStatus: string;
                registrationDeadline: string;
                technicalCongressDate: string;
                startDate: string;
                finalDate: string;
            };
            scoutingImages: string[]; // For the inner carousel in Cronograma
            data: Record<string, CategoryData>; // Schedule data
        };
    };
}

export const TORNEOS: TournamentEdition[] = [
    {
        id: "2026",
        year: "2026",
        title: "Edición 2026 (Próximamente)",
        coverImage: "/balones y fondo.jpg",
        description: "La edición 2026 del Torneo Nuevas Estrellas Electrolit en Yopal, Casanare.",
        sections: {
            scouts: {
                enabled: true,
                title: "Scouting 2026",
                data: []
            },
            honorRoll: {
                enabled: false,
                data: {}
            },
            participatingTeams: {
                enabled: true,
                data: {}
            },
            gallery: {
                enabled: false,
                data: [],
                fullGalleryLink: "/galeria/2026"
            },
            cronograma: {
                enabled: true,
                title: "Cronograma e Inscripciones 2026",
                venues: [],
                documents: [],
                status: {
                    registrationStatus: "ABIERTAS",
                    registrationDeadline: "Por definir",
                    technicalCongressDate: "Por definir",
                    startDate: "Por definir",
                    finalDate: "Por definir"
                },
                scoutingImages: [],
                data: {}
            }
        }
    },
    {
        id: "2025",
        year: "2025",
        title: "Edición 2025",
        coverImage: "/galeria/incio_partido.jpg",
        description: "La edición 2025 del Torneo Nuevas Estrellas",
        sections: {
            scouts: {
                enabled: true,
                title: "Scouting Garantizado",
                data: [
                    { name: "Bogota FC", logo: "/EscudosFutbol/BogotaFC.png" },
                    { name: "Deportes Tolima", logo: "/EscudosFutbol/D_Tolima.png" },
                    { name: "EFC Cheroes", logo: "/EscudosFutbol/EFC_Cheroes.png" },
                    { name: "Real Santander", logo: "/EscudosFutbol/R_santander.png" },
                    { name: "Cucuta Deportivo", logo: "/EscudosFutbol/cucuta.png" },
                    { name: "Junior FC", logo: "/EscudosFutbol/junior.png" },
                    { name: "Llaneros FC", logo: "/EscudosFutbol/llanerosFC.png" },
                    { name: "Real Cundinamarca", logo: "/EscudosFutbol/realcundinamarca.png" },
                ]
            },
            honorRoll: {
                enabled: true,
                data: DEFAULT_DATA
            },
            participatingTeams: {
                enabled: true,
                data: DEFAULT_DATA
            },
            gallery: {
                enabled: true,
                data: [
                    '/galeria/abrezo grupo.jpg',
                    '/galeria/incio_partido.jpg',
                    '/galeria/coaching.jpg',
                ],
                fullGalleryLink: "/galeria/2025"
            },
            cronograma: {
                enabled: true,
                title: "Cronograma y más información",
                venues: [
                    {
                        name: "Centro Deportivo Melgarejo Gomez",
                        mapUrl: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d4776.269225382693!2d-72.9389387242443!3d5.729523494252634!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8e6a477650037b0d%3A0x767f6803f18e4620!2sCentro%20Deportivo%20Melgarejo%20G%C3%B3mez!5e1!3m2!1ses-419!2sco!4v1763686283219!5m2!1ses-419!2sco"
                    },
                    {
                        name: "Canchas Monumental",
                        mapUrl: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d992.4692162229701!2d-72.92285970302464!3d5.730869897797825!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8e6a47d0699a6f69%3A0x98a7e8fe25c1ceb8!2sCanchas%20monumental%20-%20Atl.%20Nacional%20Boyac%C3%A1!5e0!3m2!1ses-419!2sco!4v1764560951164!5m2!1ses-419!2sco"
                    },
                    {
                        name: "Libertadores de America",
                        mapUrl: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d662.1333830733757!2d-72.92353463169957!3d5.730911702431372!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8e6a47a2fcd9f5bf%3A0x2d46c65dcb4f0997!2sEscuela%20de%20Futbol%20Libertadores%20de%20America!5e1!3m2!1ses-419!2sco!4v1764557483573!5m2!1ses-419!2sco"
                    }
                ],
                documents: [
                    { title: "Autorización de imagen", subtitle: "Descargar PDF", url: "/pdf/AUTORIZACIÃ_N DE USO DE IMAGEN TORNEO 2025.pdf" },
                    { title: "Carta autorización", subtitle: "Descargar PDF", url: "/pdf/Carta de AutorizaciÃ³n y ExoneraciÃ³n de Responsabilidad.pdf" },
                    { title: "Planilla de inscripción", subtitle: "Descargar PDF", url: "/pdf/PLANILLA DE INSCRIPCIÃ_N TORNEO NUEVAS ESTRELLAS ELECTROLIT 2025..pdf" }
                ],
                status: {
                    registrationStatus: "FINALIZADO",
                    registrationDeadline: "Hasta el 31 de Octubre",
                    technicalCongressDate: "6 Nov - 6:00 PM",
                    startDate: "1 Dic 2025",
                    finalDate: "6 Dic 2025"
                },
                scoutingImages: [
                    "/EscudosFutbol/BogotaFC.png",
                    "/EscudosFutbol/D_Tolima.png",
                    "/EscudosFutbol/EFC_Cheroes.png",
                    "/EscudosFutbol/R_santander.png",
                    "/EscudosFutbol/cucuta.png",
                    "/EscudosFutbol/junior.png",
                    "/EscudosFutbol/llanerosFC.png",
                    "/EscudosFutbol/realcundinamarca.png",
                ],
                data: DEFAULT_DATA
            }
        }
    },
    {
        id: "2024",
        year: "2024",
        title: "Edición 2024",
        coverImage: "/galeria/abrezo grupo.jpg",
        description: "La edición 2024 del Torneo Nuevas Estrellas",
        sections: {
            scouts: {
                enabled: false,
                data: []
            },
            honorRoll: {
                enabled: false,
                data: {}
            },
            participatingTeams: {
                enabled: false,
                data: TOURNAMENT_DATA_2024
            },
            gallery: {
                enabled: true,
                data: [
                    '/galeria/abrezo grupo.jpg',
                    '/galeria/incio_partido.jpg',
                ],
                fullGalleryLink: "/galeria/2024"
            },
            cronograma: {
                enabled: false,
                venues: [],
                documents: [],
                status: {
                    registrationStatus: "FINALIZADO",
                    registrationDeadline: "-",
                    technicalCongressDate: "-",
                    startDate: "-",
                    finalDate: "-"
                },
                scoutingImages: [],
                data: {}
            }
        }
    }
];
