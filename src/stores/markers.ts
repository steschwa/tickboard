import type { Marker } from "@/lib/marker"
import { createLocalStorageKey } from "@/lib/storage"
import { atom } from "jotai"
import { atomWithStorage } from "jotai/utils"
import { gymAtom, readOnlyGymLevelAtom } from "./gym"

export const markersAtom = atomWithStorage<Marker[]>(
    createLocalStorageKey("markers", 2),
    [],
)

export const readOnlyGymLevelMarkersAtom = atom(get => {
    const gym = get(gymAtom)
    const level = get(readOnlyGymLevelAtom)

    return get(markersAtom).filter(marker => {
        return marker.gym === gym && marker.level === level
    })
})
