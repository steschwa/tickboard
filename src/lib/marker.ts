import type { Gym } from "./gym"
import type { GymLevel } from "./gym-level"

export type Marker = {
    id: string
    gym: Gym
    level: GymLevel
    x: number
    y: number
    status: MarkerStatus | null
}

type MarkerStatus = "done" | "todo"
