import { GYM_MARKER_RADIUS } from "@/components/gym-marker/GymMarker"
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

type MarkerStatus = "done"

const INTERSECTION_TOLERANCE = GYM_MARKER_RADIUS * 1.5
export function intersects(marker: Marker, point: DOMPoint): boolean {
    const minX = marker.x - INTERSECTION_TOLERANCE
    const maxX = marker.x + INTERSECTION_TOLERANCE
    if (point.x < minX || point.x > maxX) {
        return false
    }

    const minY = marker.y - INTERSECTION_TOLERANCE
    const maxY = marker.y + INTERSECTION_TOLERANCE
    if (point.y < minY || point.y > maxY) {
        return false
    }

    return true
}
