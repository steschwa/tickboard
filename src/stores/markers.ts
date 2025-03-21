import type { Marker } from "@/lib/marker"
import { createLocalStorageKey } from "@/lib/storage"
import { atom } from "jotai"
import { atomWithStorage } from "jotai/utils"
import { readOnlyGymLevelAtom } from "./gym-level"

export const markersAtom = atomWithStorage<Marker[]>(
    createLocalStorageKey("markers", 1),
    [],
)

export const readOnlyGymLevelMarkersAtom = atom(get => {
    const level = get(readOnlyGymLevelAtom)
    return get(markersAtom).filter(marker => {
        return marker.level === level
    })
})
