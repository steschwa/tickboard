import type { Halle } from "./halle"
import type { HalleLevel } from "./halle-level"

export type Marker = {
    id: string
    halle: Halle
    level: HalleLevel
    x: number
    y: number
    status: MarkerStatus | null
}

type MarkerStatus = "done"
