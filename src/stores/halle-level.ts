import { atom } from "jotai"
import { atomWithDefault } from "jotai/utils"
import {
    type HalleLevel,
    getDefaultLevelByHalle,
    getLevelsByHalle,
} from "lib/halle-level"
import { halleAtom } from "./halle"

const _halleLevelAtom = atomWithDefault(get => {
    return getDefaultLevelByHalle(get(halleAtom))
})

export const readOnlyHalleLevelAtom = atom(get => {
    return get(_halleLevelAtom)
})

export const writeOnlyHalleLevelAtom = atom(
    null,
    (get, set, level: HalleLevel) => {
        const permittedLevels = getLevelsByHalle(get(halleAtom))
        if (!permittedLevels.has(level)) {
            return
        }

        set(_halleLevelAtom, level)
    },
)
