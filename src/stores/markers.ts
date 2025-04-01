import type { Marker } from "@/lib/marker"
import { getRandomId } from "@/lib/random"
import { createLocalStorageKey } from "@/lib/storage"
import { atom } from "jotai"
import { atomWithStorage } from "jotai/utils"
import { selectedCollectionAtom } from "./collections"
import { gymAtom, readOnlyGymLevelAtom } from "./gym"

export const markersAtom = atomWithStorage<Marker[]>(
    createLocalStorageKey("markers", 3),
    [],
)

export const readOnlyGymLevelMarkersAtom = atom(get => {
    const gym = get(gymAtom)
    const level = get(readOnlyGymLevelAtom)
    const collectionId = get(selectedCollectionAtom)?.id ?? null

    return get(markersAtom).filter(marker => {
        return (
            marker.gym === gym &&
            marker.level === level &&
            marker.collectionId === collectionId
        )
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
        collectionId: get(selectedCollectionAtom)?.id ?? null,
    }

    set(markersAtom, prev => [...prev, marker])
})
