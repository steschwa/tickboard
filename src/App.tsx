import { useAtomValue } from "jotai"
import { useSetAtom } from "jotai"
import { useLayoutEffect } from "react"
import { EditMarkerDialog } from "./components/edit-marker-dialog/EditMarkerDialog"
import {
    GymMarker,
    type GymMarkerVariant,
} from "./components/gym-marker/GymMarker"
import { Header } from "./components/header/Header"
import { Toolbar } from "./components/toolbar/Toolbar"
import { useOpenState } from "./hooks/useOpenState"
import { useRenderActiveGym } from "./hooks/useRenderActiveGym"
import type { Marker } from "./lib/marker"
import { addMarkerAtom, readOnlyGymLevelMarkersAtom } from "./stores/markers"

export function App() {
    useLayoutEffect(() => {
        const originalHeight = getViewportHeight()

        // device virtual keyboard
        window.visualViewport?.addEventListener("resize", () => {
            const height = getViewportHeight()
            document.body.style.setProperty(
                "--vv-offset-bottom",
                `${originalHeight - height}px`,
            )
        })
    }, [])

    return (
        <div className="h-dvh flex flex-col">
            <Header />
            <Toolbar />

            <div className="flex-1 p-4 flex justify-center items-center overflow-hidden relative">
                <ActiveGym />
            </div>
        </div>
    )
}

function ActiveGym() {
    const markers = useAtomValue(readOnlyGymLevelMarkersAtom)

    const addMarker = useSetAtom(addMarkerAtom)

    const editState = useOpenState<Marker["id"]>()
    const [ActiveGymComp] = useRenderActiveGym()

    const handleClick = (event: React.MouseEvent<SVGSVGElement>) => {
        const svg = event.currentTarget

        const matrix = svg.getScreenCTM()
        if (!matrix) {
            return
        }

        const pt = svg.createSVGPoint()
        pt.x = event.clientX
        pt.y = event.clientY
        const transformedPoint = pt.matrixTransform(matrix.inverse())

        addMarker({
            x: Math.round(transformedPoint.x),
            y: Math.round(transformedPoint.y),
        })
    }

    return (
        <>
            <ActiveGymComp
                onClick={handleClick}
                className="max-w-full max-h-full overflow-visible">
                {markers.map((marker, index) => {
                    return (
                        <GymMarker
                            key={marker.id}
                            variant={getGymMarkerVariant(marker.status)}
                            marker={marker}
                            onSelect={() => {
                                editState.open(marker.id)
                            }}>
                            {index + 1}
                        </GymMarker>
                    )
                })}
            </ActiveGymComp>

            <EditMarkerDialog
                open={editState.isOpen}
                markerId={editState.data}
                onClose={editState.close}
            />
        </>
    )
}

function getGymMarkerVariant(status: Marker["status"]): GymMarkerVariant {
    switch (status) {
        case "done":
            return "light"
        case "todo":
            return "prominent"
    }
}

function getViewportHeight(): number {
    return window.visualViewport?.height || window.innerHeight
}
