import {
    type GymLevel,
    getDefaultLevelByGym,
    getLevelsByBy,
} from "@/lib/gym-level"
import { atom } from "jotai"
import { atomWithDefault } from "jotai/utils"
import { gymAtom } from "./gym"

const _gymLevelAtom = atomWithDefault(get => {
    return getDefaultLevelByGym(get(gymAtom))
})

export const readOnlyGymLevelAtom = atom(get => {
    return get(_gymLevelAtom)
})

export const writeOnlyGymLevelAtom = atom(null, (get, set, level: GymLevel) => {
    const permittedLevels = getLevelsByBy(get(gymAtom))
    if (!permittedLevels.has(level)) {
        return
    }

    set(_gymLevelAtom, level)
})
