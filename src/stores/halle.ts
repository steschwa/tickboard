import type { Gym } from "@/lib/gym"
import { getDefaultLevelByGym, getLevelsByBy } from "@/lib/gym-level"
import { atom } from "jotai"
import { readOnlyGymLevelAtom, writeOnlyGymLevelAtom } from "./gym-level"

const _halleAtom = atom<Gym>("BLOC_HUETTE_HAUPTHALLE")

export const halleAtom = atom(
    get => get(_halleAtom),
    (get, set, halle: Gym) => {
        set(_halleAtom, halle)

        const permittedLevels = getLevelsByBy(halle)
        const currentLevel = get(readOnlyGymLevelAtom)
        if (permittedLevels.has(currentLevel)) {
            return
        }

        set(writeOnlyGymLevelAtom, getDefaultLevelByGym(halle))
    },
)
