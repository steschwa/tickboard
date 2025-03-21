import type { Gym } from "@/lib/gym"
import { getDefaultLevelByGym, getLevelsByBy } from "@/lib/gym-level"
import { atom } from "jotai"
import { readOnlyGymLevelAtom, writeOnlyGymLevelAtom } from "./gym-level"

const _gymAtom = atom<Gym>("BLOC_HUETTE_HAUPTHALLE")

export const gymAtom = atom(
    get => get(_gymAtom),
    (get, set, gym: Gym) => {
        set(_gymAtom, gym)

        const permittedLevels = getLevelsByBy(gym)
        const currentLevel = get(readOnlyGymLevelAtom)
        if (permittedLevels.has(currentLevel)) {
            return
        }

        set(writeOnlyGymLevelAtom, getDefaultLevelByGym(gym))
    },
)
