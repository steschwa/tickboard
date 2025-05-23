import {
    type BlocHuetteLevel,
    type Gym,
    type GymLevel,
    getDefaultLevelByGym,
    getLevelsByGym,
} from "@/lib/gym"
import { createLocalStorageKey } from "@/lib/storage"
import { atom } from "jotai"
import { atomWithStorage } from "jotai/utils"

const _gymAtom = atomWithStorage<Gym>(
    createLocalStorageKey("gym", 1),
    "BLOC_HUETTE_HAUPTHALLE",
)

export const gymAtom = atom(
    get => get(_gymAtom),
    (get, set, gym: Gym) => {
        set(_gymAtom, gym)

        const permittedLevels = getLevelsByGym(gym)
        const currentLevel = get(gymLevelAtom)
        if (permittedLevels.has(currentLevel)) {
            return
        }

        set(gymLevelAtom, getDefaultLevelByGym(gym))
    },
)

const _gymConfigAtom = atomWithStorage<GymConfig>(
    createLocalStorageKey("gym-config", 1),
    {
        blocHuette: {
            level: "BLOC_HUETTE_BLAU",
        },
    },
)

export const gymLevelAtom = atom(
    get => {
        const gym = get(_gymAtom)

        switch (gym) {
            case "BLOC_HUETTE_HAUPTHALLE":
            case "BLOC_HUETTE_AUSSENBEREICH":
            case "BLOC_HUETTE_NEUEHALLE":
                return get(_gymConfigAtom).blocHuette.level
        }
    },
    (get, set, level: GymLevel) => {
        const gym = get(_gymAtom)

        const permittedLevels = getLevelsByGym(gym)
        if (!permittedLevels.has(level)) {
            return
        }

        set(_gymConfigAtom, prev => {
            const updatedConfig = { ...prev }
            switch (gym) {
                case "BLOC_HUETTE_HAUPTHALLE":
                case "BLOC_HUETTE_AUSSENBEREICH":
                case "BLOC_HUETTE_NEUEHALLE":
                    updatedConfig.blocHuette.level = level
                    break
            }

            return updatedConfig
        })
    },
)

type GymConfig = {
    blocHuette: {
        level: BlocHuetteLevel
    }
}
