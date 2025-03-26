import { useAtomValue } from "jotai"
import { useSetAtom } from "jotai"
import { EditMarkerDialog } from "./components/edit-marker-dialog/EditMarkerDialog"
import { GymMarker } from "./components/gym-marker/GymMarker"
import { Header } from "./components/header/Header"
import { Toolbar } from "./components/toolbar/Toolbar"
import { useOpenState } from "./hooks/useOpenState"
import { useRenderActiveGym } from "./hooks/useRenderActiveGym"
import type { Marker } from "./lib/marker"
import { gymAtom, readOnlyGymLevelAtom } from "./stores/gym"
import { markersAtom, readOnlyGymLevelMarkersAtom } from "./stores/markers"

export function App() {
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
    const gym = useAtomValue(gymAtom)
    const gymLevel = useAtomValue(readOnlyGymLevelAtom)
    const markers = useAtomValue(readOnlyGymLevelMarkersAtom)

    const setMarkers = useSetAtom(markersAtom)

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

        setMarkers(prev => [
            ...prev,
            {
                id: prev.length.toString(),
                gym,
                level: gymLevel,
                x: Math.round(transformedPoint.x),
                y: Math.round(transformedPoint.y),
                status: "todo",
            },
        ])
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
