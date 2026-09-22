export interface Team {
    name: string;
    city: string;
    logo?: string;
}

export interface Match {
    time: string;
    team1: string;
    team2: string;
    location: string;
    group?: string;
}

export interface MatchDay {
    date: string;
    matches: Match[];
}

export interface Group {
    name: string;
    teams: Team[];
}

export interface HonorRoll {
    champion: string;
    runnerUp: string;
    thirdPlace: string;
    fourthPlace: string;
    topScorer: string;
    leastConceded: string;
    videos?: {
        champion?: string;
        runnerUp?: string;
        thirdPlace?: string;
        fourthPlace?: string;
    };
}

export interface CategoryData {
    groups: Group[];
    schedule: MatchDay[];
    honorRoll?: HonorRoll;
}

export const TOURNAMENT_DATA: Record<string, CategoryData> = {
    "Sub 12": {
        groups: [
            {
                name: "Grupo A",
                teams: [
                    { name: "Alcaraván", city: "-" },
                    { name: "Sport Boys", city: "-" },
                    { name: "Independiente", city: "-" },
                    { name: "Criollanos", city: "-" },
                    { name: "Academia FC", city: "-" },
                    { name: "Racing Cundinamarca", city: "-" }
                ]
            }
        ],
        schedule: [
            {
                date: "LUNES 1 DE DICIEMBRE",
                matches: [
                    { time: "12:00 m.", team1: "Alcaraván", team2: "Criollanos", location: "SEDE DEPORTIVA LIBERTADORES DE AMÉRICA", group: "GA" },
                    { time: "1:45 p.m.", team1: "Independiente", team2: "Racing Cundinamarca", location: "SEDE DEPORTIVA LIBERTADORES DE AMÉRICA", group: "GA" },
                    { time: "3:30 p.m.", team1: "Sport Boys", team2: "Academia", location: "SEDE DEPORTIVA LIBERTADORES DE AMÉRICA", group: "GA" }
                ]
            }
        ],
        honorRoll: {
            champion: "Por definir",
            runnerUp: "Por definir",
            thirdPlace: "Por definir",
            fourthPlace: "Por definir",
            topScorer: "Por definir",
            leastConceded: "Por definir"
        }
    },
    "Sub 14": {
        groups: [
            {
                name: "Grupo A",
                teams: [
                    { name: "Libertadores de A.", city: "-" },
                    { name: "Liga de Boyacá", city: "-" },
                    { name: "Alcaraván", city: "-" },
                    { name: "CD Santis", city: "-" }
                ]
            },
            {
                name: "Grupo B",
                teams: [
                    { name: "Patriotas", city: "-" },
                    { name: "Chivas", city: "-" },
                    { name: "Sport Boys", city: "-" },
                    { name: "Deporllano", city: "-" }
                ]
            },
            {
                name: "Grupo C",
                teams: [
                    { name: "Unión Meta", city: "-" },
                    { name: "Sport Bacatá", city: "-" },
                    { name: "Real Sociedad", city: "-" },
                    { name: "Independiente", city: "-" }
                ]
            },
            {
                name: "Grupo D",
                teams: [
                    { name: "Valle del Sol", city: "-" },
                    { name: "CD Camacho", city: "-" },
                    { name: "Yop Cas", city: "-" },
                    { name: "Racing Soacha", city: "-" }
                ]
            },
            {
                name: "Grupo E",
                teams: [
                    { name: "Criollanos", city: "-" },
                    { name: "Embajadores", city: "-" },
                    { name: "Camaritas", city: "-" },
                    { name: "Academia", city: "-" }
                ]
            }
        ],
        schedule: [
            {
                date: "LUNES 1 DE DICIEMBRE",
                matches: [
                    { time: "7:30 a.m.", team1: "Criollanos", team2: "Embajadores", location: "Deportivo Melgarejo Gómez Cancha 4", group: "GE" },
                    { time: "9:30 a.m.", team1: "Libertadores de A.", team2: "Liga de Boyacá", location: "Deportivo Melgarejo Gómez Cancha 4", group: "GA" },
                    { time: "11:30 a.m.", team1: "Real Sociedad", team2: "Independiente", location: "Deportivo Melgarejo Gómez Cancha 4", group: "GC" },
                    { time: "11:30 a.m.", team1: "Camaritas", team2: "Academia FC", location: "Cancha 1 Monumental", group: "GE" },
                    { time: "11:30 a.m.", team1: "Patriotas", team2: "Chivas", location: "Cancha 2 Monumental", group: "GB" },
                    { time: "1:30 p.m.", team1: "Yop Cas", team2: "Racing Soacha", location: "Deportivo Melgarejo Gómez Cancha 4", group: "GD" },
                    { time: "1:30 p.m.", team1: "Sport Boys", team2: "Deporllano", location: "Cancha 1 Monumental", group: "GB" },
                    { time: "1:30 p.m.", team1: "Valle del Sol", team2: "CD Camacho", location: "Cancha 2 Monumental", group: "GD" },
                    { time: "3:30 p.m.", team1: "Alcaraván", team2: "CD Santis", location: "Deportivo Melgarejo Gómez Cancha 4", group: "GA" },
                    { time: "3:30 p.m.", team1: "Unión Meta", team2: "Sport Bacatá", location: "Cancha 1 Monumental", group: "GC" }
                ]
            }
        ],
        honorRoll: {
            champion: "Por definir",
            runnerUp: "Por definir",
            thirdPlace: "Por definir",
            fourthPlace: "Por definir",
            topScorer: "Por definir",
            leastConceded: "Por definir",
            videos: {
                champion: "https://www.facebook.com/plugins/video.php?height=314&href=https%3A%2F%2Fwww.facebook.com%2FCanalDuitama%2Fvideos%2F2338048099975545%2F&show_text=false&width=560&t=0"
            }
        }
    },
    "Sub 16": {
        groups: [
            {
                name: "Grupo A",
                teams: [
                    { name: "Cantera HD", city: "-" },
                    { name: "Independiente", city: "-" },
                    { name: "Alianza Casanare", city: "-" },
                    { name: "Deporllano", city: "-" }
                ]
            },
            {
                name: "Grupo B",
                teams: [
                    { name: "Racing Soacha", city: "-" },
                    { name: "CD Camacho", city: "-" },
                    { name: "Alianza Nacional", city: "-" },
                    { name: "CD Santis", city: "-" }
                ]
            },
            {
                name: "Grupo C",
                teams: [
                    { name: "Liga de Boyacá", city: "-" },
                    { name: "Academia FC", city: "-" },
                    { name: "Yop Cas", city: "-" },
                    { name: "Cantera 80", city: "-" }
                ]
            },
            {
                name: "Grupo D",
                teams: [
                    { name: "Sport Bacatá", city: "-" },
                    { name: "Real Sociedad", city: "-" },
                    { name: "Libertadores de América", city: "-" },
                    { name: "Villa Juvenil", city: "-" }
                ]
            }
        ],
        schedule: [
            {
                date: "LUNES 1 DE DICIEMBRE",
                matches: [
                    { time: "7:30 a.m.", team1: "Libertadores de A.", team2: "Sport Boys", location: "DEPORTIVO MELGAREJO GÓMEZ CANCHA 3", group: "GD" },
                    { time: "9:30 a.m.", team1: "Cantera HD", team2: "Independiente", location: "DEPORTIVO MELGAREJO GÓMEZ CANCHA 3", group: "GA" },
                    { time: "11:30 a.m.", team1: "Sport Bacatá", team2: "Real Sociedad", location: "DEPORTIVO MELGAREJO GÓMEZ CANCHA 3", group: "GD" },
                    { time: "1:30 p.m.", team1: "Alianza Casanare", team2: "Deporllano", location: "DEPORTIVO MELGAREJO GÓMEZ CANCHA 3", group: "GA" },
                    { time: "3:30 p.m.", team1: "Racing de soacha", team2: "CD Camacho", location: "DEPORTIVO MELGAREJO GÓMEZ CANCHA 3", group: "GB" },
                    { time: "7:30 a.m.", team1: "Alianza Nacional", team2: "CD Santis", location: "DEPORTIVO MELGAREJO GÓMEZ CANCHA 2", group: "GB" },
                    { time: "9:30 a.m.", team1: "Liga de Boyacá", team2: "Academia FC", location: "DEPORTIVO MELGAREJO GÓMEZ CANCHA 2", group: "GC" },
                    { time: "11:30 a.m.", team1: "Yop Cas", team2: "Cantera 80", location: "DEPORTIVO MELGAREJO GÓMEZ CANCHA 2", group: "GC" }
                ]
            }
        ],
        honorRoll: {
            champion: "Por definir",
            runnerUp: "Por definir",
            thirdPlace: "Por definir",
            fourthPlace: "Por definir",
            topScorer: "Por definir",
            leastConceded: "Por definir"
        }
    },
    "Sub 18": {
        groups: [
            {
                name: "Grupo A",
                teams: [
                    { name: "Lanceros Boyacá FC", city: "-" },
                    { name: "Unión Meta", city: "-" },
                    { name: "Futbol por Siempre", city: "-" },
                    { name: "Cantera HD", city: "-" },
                    { name: "Patriotas C", city: "-" }
                ]
            },
            {
                name: "Grupo B",
                teams: [
                    { name: "Patriotas B", city: "-" },
                    { name: "Sport Boys", city: "-" },
                    { name: "Cantera 80", city: "-" },
                    { name: "Alianza Casanare", city: "-" }
                ]
            },
            {
                name: "Grupo C",
                teams: [
                    { name: "Racing Soacha", city: "-" },
                    { name: "Perritos FC", city: "-" },
                    { name: "Patriotas A", city: "-" },
                    { name: "Academia - Independiente", city: "-" },
                    { name: "Deporllano", city: "-" }
                ]
            }
        ],
        schedule: [
            {
                date: "LUNES 1 DE DICIEMBRE",
                matches: [
                    { time: "7:30 a.m.", team1: "Patriotas A", team2: "Academia - Independiente", location: "DEPORTIVO MELGAREJO GÓMEZ CANCHA 1", group: "GC" },
                    { time: "9:30 a.m.", team1: "Patriotas B", team2: "Sport Boys", location: "DEPORTIVO MELGAREJO GÓMEZ CANCHA 1", group: "GB" },
                    { time: "11:30 a.m.", team1: "Deporllano", team2: "Patriotas C", location: "DEPORTIVO MELGAREJO GÓMEZ CANCHA 1", group: "GC" },
                    { time: "1:30 p.m.", team1: "Lanceros Boyacá", team2: "Unión Meta", location: "DEPORTIVO MELGAREJO GÓMEZ CANCHA 1", group: "GA" },
                    { time: "3:30 p.m.", team1: "Racing Soacha", team2: "Perritos FC", location: "DEPORTIVO MELGAREJO GÓMEZ CANCHA 1", group: "GC" },
                    { time: "1:30 p.m.", team1: "Futbol por Siempre", team2: "Cantera HD", location: "DEPORTIVO MELGAREJO GÓMEZ CANCHA 2", group: "GA" },
                    { time: "3:30 p.m.", team1: "Cantera 80", team2: "Alianza Casanare", location: "DEPORTIVO MELGAREJO GÓMEZ CANCHA 2", group: "GB" }
                ]
            }
        ],
        honorRoll: {
            champion: "Por definir",
            runnerUp: "Por definir",
            thirdPlace: "Por definir",
            fourthPlace: "Por definir",
            topScorer: "Por definir",
            leastConceded: "Por definir"
        }
    }
};

export const TOURNAMENT_DATA_2024: Record<string, CategoryData> = {
    // Example structure for 2024. Can be filled with real data.
    "Sub 12": {
        groups: [
            {
                name: "Grupo A",
                teams: [
                    { name: "Equipo Ejemplo 2024", city: "Ciudad" }
                ]
            }
        ],
        schedule: [],
        honorRoll: {
            champion: "Campeón 2024",
            runnerUp: "Subcampeón 2024",
            thirdPlace: "Tercero 2024",
            fourthPlace: "Cuarto 2024",
            topScorer: "Goleador 2024",
            leastConceded: "Valla Menos Vencida"
        }
    }
};
