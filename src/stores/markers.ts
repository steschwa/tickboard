import type { Marker } from "@/lib/marker"
import { createLocalStorageKey } from "@/lib/storage"
import { atom } from "jotai"
import { atomWithStorage } from "jotai/utils"
import { readOnlyHalleLevelAtom } from "./halle-level"

export const markersAtom = atomWithStorage<Marker[]>(
    createLocalStorageKey("markers", 1),
    [],
)

export const readOnlyHalleLevelMarkersAtom = atom(get => {
    const level = get(readOnlyHalleLevelAtom)
    return get(markersAtom).filter(marker => {
        return marker.level === level
    })
})
