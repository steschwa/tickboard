import { atom } from "jotai"
import type { Halle } from "lib/halle"
import { getDefaultLevelByHalle, getLevelsByHalle } from "lib/halle-level"
import { readOnlyHalleLevelAtom, writeOnlyHalleLevelAtom } from "./halle-level"

const _halleAtom = atom<Halle>("BLOC_HUETTE_HAUPTHALLE")

export const halleAtom = atom(
    get => get(_halleAtom),
    (get, set, halle: Halle) => {
        set(_halleAtom, halle)

        const permittedLevels = getLevelsByHalle(halle)
        const currentLevel = get(readOnlyHalleLevelAtom)
        if (permittedLevels.has(currentLevel)) {
            return
        }

        set(writeOnlyHalleLevelAtom, getDefaultLevelByHalle(halle))
    },
)
