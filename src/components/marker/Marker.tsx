import type { Marker as MarkerModel } from "@/lib/marker"
import clsx from "clsx"

type MarkerProps = {
    marker: MarkerModel
    children?: React.ReactNode
}

export function Marker(props: MarkerProps) {
    return (
        <g>
            <circle
                key={props.marker.id}
                cx={props.marker.x}
                cy={props.marker.y}
                r="1.25rem"
                className={circleClasses(props.marker)}
            />

            <text
                x={props.marker.x}
                y={props.marker.y}
                textAnchor="middle"
                alignmentBaseline="central"
                className={clsx("text-lg", textClasses(props.marker))}>
                {props.children}
            </text>
        </g>
    )
}

function circleClasses(marker: MarkerModel): string {
    switch (marker.level) {
        case "BLOC_HUETTE_GELB":
            return "fill-yellow-300 stroke-yellow-300"
        case "BLOC_HUETTE_GRUEN":
            return "fill-lime-500 stroke-lime-500"
        case "BLOC_HUETTE_ORANGE":
            return "fill-orange-300 stroke-orange-300"
        case "BLOC_HUETTE_WEISS":
            return "fill-white stroke-gray-300"
        case "BLOC_HUETTE_BLAU":
            return "fill-blue-700 stroke-blue-700"
        case "BLOC_HUETTE_ROT":
            return "fill-red-500 stroke-red-500"
        case "BLOC_HUETTE_SCHWARZ":
            return "fill-gray-800 stroke-gray-800"
    }
}

function textClasses(marker: MarkerModel): string {
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
