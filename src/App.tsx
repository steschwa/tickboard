import { useAtomValue } from "jotai"
import { useSetAtom } from "jotai"
import { useImperativeHandle, useRef } from "react"
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
import { shareSvg } from "./lib/svg"
import { addMarkerAtom, gymLevelMarkersAtom } from "./stores/markers"

export function App() {
    const activeGymRef = useRef<ActiveGymRef>(null)

    const handleShare = async () => {
        const gymElement = activeGymRef.current?.getGym()
        if (!gymElement) {
            return
        }

        try {
            await shareSvg(gymElement)
        } catch (err) {
            console.error("failed to share svg")
            console.error(err)
        }
    }

    return (
        <div className="h-dvh flex flex-col">
            <Header />
            <Toolbar onShare={handleShare} />

            <div className="flex-1 p-4 flex justify-center items-center overflow-hidden relative">
                <ActiveGym ref={activeGymRef} />
            </div>
        </div>
    )
}

type ActiveGymRef = {
    getGym: () => SVGSVGElement | undefined
}

type ActiveGymProps = {
    ref?: React.Ref<ActiveGymRef>
}

function ActiveGym(props: ActiveGymProps) {
    const markers = useAtomValue(gymLevelMarkersAtom)
    const addMarker = useSetAtom(addMarkerAtom)

    const editState = useOpenState<Marker["id"]>()
    const gymRef = useRef<SVGSVGElement>(null)

    const [ActiveGymComp] = useRenderActiveGym()

    useImperativeHandle(props.ref, () => ({
        getGym: () => gymRef.current ?? undefined,
    }))

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
                ref={gymRef}
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
