import { useAtomValue } from "jotai"
import { useSetAtom } from "jotai"
import { useImperativeHandle, useLayoutEffect, useRef } from "react"
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
import { addMarkerAtom, readOnlyGymLevelMarkersAtom } from "./stores/markers"

export function App() {
    const activeGymRef = useRef<ActiveGymRef>(null)

    useLayoutEffect(() => {
        const originalHeight = getViewportHeight()

        const handleVResize = () => {
            const height = getViewportHeight()
            setDeviceBottomOffset(originalHeight - height)
        }

        const handleFocusOut = (event: FocusEvent) => {
            if (!event.target) {
                return
            }

            // `event.target` is the element losing focus
            const element = event.target as HTMLElement
            if (element instanceof HTMLInputElement) {
                setDeviceBottomOffset(0)
            }
        }

        // device virtual keyboard
        window.visualViewport?.addEventListener("resize", handleVResize)

        // WHY?
        // after closing the virtual keyboard
        // safari takes about ~1s to fire "resize" again.
        // in the meantime this shows a floating dialog, which is not what i want
        //
        // HOW?
        // listening for the "focusout" event (element losing focus), we handle
        // dialogs that contain elements which are likely to
        // have triggered the virtual keyboard
        document.addEventListener("focusout", handleFocusOut)

        return () => {
            window.visualViewport?.removeEventListener("resize", handleVResize)
            document.removeEventListener("focusout", handleFocusOut)
        }
    }, [])

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
    const markers = useAtomValue(readOnlyGymLevelMarkersAtom)
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

function getViewportHeight(): number {
    return window.visualViewport?.height || window.innerHeight
}

function setDeviceBottomOffset(offset: number) {
    document.body.style.setProperty("--vv-offset-bottom", `${offset}px`)
}
