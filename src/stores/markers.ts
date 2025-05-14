import type { Marker } from "@/lib/marker"
import { getRandomId } from "@/lib/random"
import { createLocalStorageKey } from "@/lib/storage"
import { atom } from "jotai"
import { atomWithStorage } from "jotai/utils"
import { gymAtom, readOnlyGymLevelAtom } from "./gym"

export const markersAtom = atomWithStorage<Marker[]>(
    createLocalStorageKey("markers", 4),
    [],
)

export const readOnlyGymLevelMarkersAtom = atom(get => {
    const gym = get(gymAtom)
    const level = get(readOnlyGymLevelAtom)

    return get(markersAtom).filter(marker => {
        return marker.gym === gym && marker.level === level
    })
})

type AddMarkerParams = Pick<Marker, "x" | "y">
export const addMarkerAtom = atom(null, (get, set, params: AddMarkerParams) => {
    const marker: Marker = {
        id: getRandomId(),
        gym: get(gymAtom),
        level: get(readOnlyGymLevelAtom),
        x: Math.round(params.x),
        y: Math.round(params.y),
        status: "todo",
    }

    set(markersAtom, prev => [...prev, marker])
})
