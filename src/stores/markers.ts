import type { Marker } from "@/lib/marker"
import { atom } from "jotai"
import { atomWithStorage } from "jotai/utils"
import { readOnlyHalleLevelAtom } from "./halle-level"

export const markersAtom = atomWithStorage<Marker[]>("markers", [])

export const readOnlyHalleLevelMarkersAtom = atom(get => {
    const level = get(readOnlyHalleLevelAtom)
    return get(markersAtom).filter(marker => {
        return marker.level === level
    })
})
