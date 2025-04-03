import type { Marker } from "@/lib/marker"

type GymMarkerProps = {
    marker: Marker
    /**
     * @default "prominent"
     */
    variant?: GymMarkerVariant
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
                fill={getFillColor(props.marker)}
                stroke={getStrokeColor(props.marker)}
            />

            {props.selected && (
                <circle
                    cx={props.marker.x}
                    cy={props.marker.y}
                    r={GYM_MARKER_RADIUS}
                    strokeWidth={8}
                    stroke={getStrokeColor(props.marker)}
                    fill="transparent">
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
                fontSize={18}
                fill={getTextFillColor(props.marker)}>
                {props.children}
            </text>
        </g>
    )
}

export type GymMarkerVariant = "prominent" | "light"

const GYM_MARKER_RADIUS = 25

function getFillColor(marker: Marker): string {
    switch (marker.level) {
        case "BLOC_HUETTE_GELB":
            return "#ffdb1d"
        case "BLOC_HUETTE_GRUEN":
            return "#71c800"
        case "BLOC_HUETTE_ORANGE":
            return "#ff7e08"
        case "BLOC_HUETTE_WEISS":
            return "#ffffff"
        case "BLOC_HUETTE_BLAU":
            return "#143ee2"
        case "BLOC_HUETTE_ROT":
            return "#e4000e"
        case "BLOC_HUETTE_SCHWARZ":
            return "#1c2532"
    }
}

function getStrokeColor(marker: Marker): string {
    switch (marker.level) {
        case "BLOC_HUETTE_GELB":
            return "#ffdb1d"
        case "BLOC_HUETTE_GRUEN":
            return "#71c800"
        case "BLOC_HUETTE_ORANGE":
            return "#ff7e08"
        case "BLOC_HUETTE_WEISS":
            return "#cacfd7"
        case "BLOC_HUETTE_BLAU":
            return "#143ee2"
        case "BLOC_HUETTE_ROT":
            return "#e4000e"
        case "BLOC_HUETTE_SCHWARZ":
            return "#1c2532"
    }
}

function getTextFillColor(marker: Marker): string {
    switch (marker.level) {
        case "BLOC_HUETTE_GELB":
            return "#3b1d09"
        case "BLOC_HUETTE_GRUEN":
            return "#182907"
        case "BLOC_HUETTE_ORANGE":
            return "#3c140a"
        case "BLOC_HUETTE_WEISS":
            return "#070b13"
        case "BLOC_HUETTE_BLAU":
            return "#ecf4ff"
        case "BLOC_HUETTE_ROT":
            return "#fef0f0"
        case "BLOC_HUETTE_SCHWARZ":
            return "#f8f9fb"
    }
}

function getCircleOpacity(variant: GymMarkerVariant): number {
    switch (variant) {
        case "prominent":
            return 1
        case "light":
            return 0.5
    }
}
