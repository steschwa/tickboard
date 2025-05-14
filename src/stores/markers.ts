import type { Marker } from "@/lib/marker"
import { getRandomId } from "@/lib/random"
import { createLocalStorageKey } from "@/lib/storage"
import { atom } from "jotai"
import { atomWithStorage } from "jotai/utils"
import { gymAtom, gymLevelAtom } from "./gym"
import { activeWorkspaceAtom } from "./workspaces"

export const markersAtom = atomWithStorage<Marker[]>(
    createLocalStorageKey("markers", 4),
    [],
)

export const gymLevelMarkersAtom = atom(get => {
    const gym = get(gymAtom)
    const level = get(gymLevelAtom)
    const activeWorkspace = get(activeWorkspaceAtom)

    return get(markersAtom).filter(marker => {
        return (
            marker.gym === gym &&
            marker.level === level &&
            marker.workspace === activeWorkspace
        )
    })
})

type AddMarkerParams = Pick<Marker, "x" | "y">
export const addMarkerAtom = atom(null, (get, set, params: AddMarkerParams) => {
    const marker: Marker = {
        id: getRandomId(),
        gym: get(gymAtom),
        level: get(gymLevelAtom),
        x: Math.round(params.x),
        y: Math.round(params.y),
        status: "todo",
        workspace: get(activeWorkspaceAtom),
    }

    set(markersAtom, prev => [...prev, marker])
})
