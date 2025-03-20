import type { Marker } from "@/lib/marker"
import { atomWithStorage } from "jotai/utils"

export const markersStore = atomWithStorage<Marker[]>("markers", [])
