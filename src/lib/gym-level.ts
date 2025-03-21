import type { Gym } from "./gym"

export type GymLevel = BlocHuetteLevel

export type BlocHuetteLevel =
    | "BLOC_HUETTE_GELB"
    | "BLOC_HUETTE_GRUEN"
    | "BLOC_HUETTE_ORANGE"
    | "BLOC_HUETTE_WEISS"
    | "BLOC_HUETTE_BLAU"
    | "BLOC_HUETTE_ROT"
    | "BLOC_HUETTE_SCHWARZ"

export const BLOC_HUETTE_LEVELS = new Set<BlocHuetteLevel>([
    "BLOC_HUETTE_GELB",
    "BLOC_HUETTE_GRUEN",
    "BLOC_HUETTE_ORANGE",
    "BLOC_HUETTE_WEISS",
    "BLOC_HUETTE_BLAU",
    "BLOC_HUETTE_ROT",
    "BLOC_HUETTE_SCHWARZ",
])

export function getLevelsByBy(gym: Gym): Set<GymLevel> {
    switch (gym) {
        case "BLOC_HUETTE_HAUPTHALLE":
        case "BLOC_HUETTE_AUSSENBEREICH":
        case "BLOC_HUETTE_NEUEHALLE":
            return BLOC_HUETTE_LEVELS
    }
}

export function getDefaultLevelByGym(gym: Gym): GymLevel {
    switch (gym) {
        case "BLOC_HUETTE_HAUPTHALLE":
        case "BLOC_HUETTE_AUSSENBEREICH":
        case "BLOC_HUETTE_NEUEHALLE":
            return "BLOC_HUETTE_BLAU"
    }
}
