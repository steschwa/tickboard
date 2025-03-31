import type { Collection } from "./collection"
import type { Gym, GymLevel } from "./gym"

export type Marker = {
    id: string
    gym: Gym
    level: GymLevel
    x: number
    y: number
    status: MarkerStatus
    collectionId: Collection["id"] | null
}

type MarkerStatus = "done" | "todo"
