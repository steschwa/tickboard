import type { Marker as MarkerModel } from "@/lib/marker"

type MarkerProps = {
    marker: MarkerModel
}

export function Marker(props: MarkerProps) {
    return (
        <circle
            key={props.marker.id}
            cx={props.marker.x}
            cy={props.marker.y}
            r={20}
            className={classes(props.marker)}
        />
    )
}

function classes(marker: MarkerModel): string {
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
