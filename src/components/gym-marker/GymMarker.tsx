import type { Marker } from "@/lib/marker"
import clsx from "clsx"

type GymMarkerProps = {
    marker: Marker
    /**
     * @default "prominent"
     */
    variant?: Variant
    selected?: boolean
    onSelect?: () => void
    children?: React.ReactNode
}

export function GymMarker(props: GymMarkerProps) {
    const { variant = "prominent" } = props

    const handleKeyDown = (event: React.KeyboardEvent) => {
        if (!["Space", "Enter"].includes(event.code)) {
            return
        }

        event.stopPropagation()
        event.preventDefault()

        props.onSelect?.()
    }

    const handleClick = (event: React.MouseEvent) => {
        event.stopPropagation()

        props.onSelect?.()
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
                opacity={getCircleOpacity(variant)}
                className={clsx(
                    getFillClasses(props.marker),
                    getStrokeClasses(props.marker),
                )}
            />

            {props.selected && (
                <circle
                    cx={props.marker.x}
                    cy={props.marker.y}
                    r={GYM_MARKER_RADIUS}
                    strokeWidth={8}
                    className={clsx(
                        "fill-transparent",
                        getStrokeClasses(props.marker),
                    )}>
                    <animate
                        attributeName="r"
                        from={GYM_MARKER_RADIUS * 1.2}
                        to={GYM_MARKER_RADIUS * 1.8}
                        dur="1.5s"
                        begin="0s"
                        repeatCount="indefinite"
                    />
                    <animate
                        attributeName="opacity"
                        from="0.75"
                        to="0"
                        dur="1.5s"
                        begin="0s"
                        repeatCount="indefinite"
                    />
                </circle>
            )}

            <text
                x={props.marker.x}
                y={props.marker.y}
                textAnchor="middle"
                alignmentBaseline="central"
                className={clsx("text-lg", getTextFillClasses(props.marker))}>
                {props.children}
            </text>
        </g>
    )
}

type Variant = "prominent" | "light"

const GYM_MARKER_RADIUS = 20

function getFillClasses(marker: Marker): string {
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
            return "fill-red-600"
        case "BLOC_HUETTE_SCHWARZ":
            return "fill-gray-800"
    }
}

function getStrokeClasses(marker: Marker): string {
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

function getTextFillClasses(marker: Marker): string {
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

function getCircleOpacity(variant: Variant): number {
    switch (variant) {
        case "prominent":
            return 1
        case "light":
            return 0.5
    }
}
