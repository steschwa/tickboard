import type { Gym, GymLevel } from "./gym"

export type Marker = {
    id: string
    gym: Gym
    level: GymLevel
    x: number
    y: number
    status: MarkerStatus
    workspace: number
}

type MarkerStatus = "done" | "todo"
