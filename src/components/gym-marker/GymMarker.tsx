import type { Marker as MarkerModel } from "@/lib/marker"
import clsx from "clsx"

type GymMarkerProps = {
    marker: MarkerModel
    selected: boolean
    onSelect: () => void
    children?: React.ReactNode
}

export function GymMarker(props: GymMarkerProps) {
    const handleKeyDown = (event: React.KeyboardEvent) => {
        if (!["Space", "Enter"].includes(event.code)) {
            return
        }

        event.stopPropagation()
        event.preventDefault()

        props.onSelect()
    }

    const handleClick = (event: React.MouseEvent) => {
        event.stopPropagation()

        props.onSelect()
    }

    return (
        <g
            tabIndex={0}
            onKeyDown={handleKeyDown}
            onClick={handleClick}
            className="focus:outline-none">
            <circle
                cx={props.marker.x}
                cy={props.marker.y}
                r={GYM_MARKER_RADIUS}
                className={clsx(
                    fillClasses(props.marker),
                    strokeClasses(props.marker),
                )}
            />

            {props.selected && (
                <circle
                    cx={props.marker.x}
                    cy={props.marker.y}
                    r={GYM_MARKER_RADIUS + 10}
                    strokeWidth={7}
                    strokeDasharray="12 4"
                    className={clsx(
                        "fill-transparent",
                        strokeClasses(props.marker),
                    )}
                />
            )}

            <text
                x={props.marker.x}
                y={props.marker.y}
                textAnchor="middle"
                alignmentBaseline="central"
                className={clsx("text-lg", textFillClasses(props.marker))}>
                {props.children}
            </text>
        </g>
    )
}

export const GYM_MARKER_RADIUS = 20

function fillClasses(marker: MarkerModel): string {
    switch (marker.level) {
        case "BLOC_HUETTE_GELB":
            return "fill-yellow-300"
        case "BLOC_HUETTE_GRUEN":
            return "fill-lime-500"
        case "BLOC_HUETTE_ORANGE":
            return "fill-orange-300"
        case "BLOC_HUETTE_WEISS":
            return "fill-white"
        case "BLOC_HUETTE_BLAU":
            return "fill-blue-700"
        case "BLOC_HUETTE_ROT":
            return "fill-red-500"
        case "BLOC_HUETTE_SCHWARZ":
            return "fill-gray-800"
    }
}

function strokeClasses(marker: MarkerModel): string {
    switch (marker.level) {
        case "BLOC_HUETTE_GELB":
            return "stroke-yellow-300"
        case "BLOC_HUETTE_GRUEN":
            return "stroke-lime-500"
        case "BLOC_HUETTE_ORANGE":
            return "stroke-orange-300"
        case "BLOC_HUETTE_WEISS":
            return "stroke-gray-300"
        case "BLOC_HUETTE_BLAU":
            return "stroke-blue-700"
        case "BLOC_HUETTE_ROT":
            return "stroke-red-500"
        case "BLOC_HUETTE_SCHWARZ":
            return "stroke-gray-800"
    }
}

function textFillClasses(marker: MarkerModel): string {
    switch (marker.level) {
        case "BLOC_HUETTE_GELB":
            return "fill-yellow-950"
        case "BLOC_HUETTE_GRUEN":
            return "fill-lime-950"
        case "BLOC_HUETTE_ORANGE":
            return "fill-orange-950"
        case "BLOC_HUETTE_WEISS":
            return "text-gray-900"
        case "BLOC_HUETTE_BLAU":
            return "fill-blue-50"
        case "BLOC_HUETTE_ROT":
            return "fill-red-50"
        case "BLOC_HUETTE_SCHWARZ":
            return "fill-gray-50"
    }
}
