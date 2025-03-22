import { useAtomValue } from "jotai"
import { useSetAtom } from "jotai"
import { useState } from "react"
import { GymMarker } from "./components/gym-marker/GymMarker"
import { BlocHuetteAussenbereich } from "./components/gyms/bloc-huette/BlocHuetteAussenbereich"
import { BlocHuetteHaupthalle } from "./components/gyms/bloc-huette/BlocHuetteHaupthalle"
import { BlocHuetteNeueHalle } from "./components/gyms/bloc-huette/BlocHuetteNeueHalle"
import { Header } from "./components/header/Header"
import { Toolbar } from "./components/toolbar/Toolbar"
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
    const [selectedMarkerId, setSelectedMarkerId] = useState<Marker["id"]>()

    let Comp: React.ElementType<React.ComponentPropsWithoutRef<"svg">>
    switch (gym) {
        case "BLOC_HUETTE_HAUPTHALLE":
            Comp = BlocHuetteHaupthalle
            break
        case "BLOC_HUETTE_AUSSENBEREICH":
            Comp = BlocHuetteAussenbereich
            break
        case "BLOC_HUETTE_NEUEHALLE":
            Comp = BlocHuetteNeueHalle
            break
    }

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
                id: new Date().toISOString(),
                gym,
                level: gymLevel,
                x: transformedPoint.x,
                y: transformedPoint.y,
                status: null,
            },
        ])
    }

    return (
        <Comp
            onClick={handleClick}
            className="max-w-full max-h-full overflow-visible">
            {markers.map((marker, index) => (
                <GymMarker
                    key={marker.id}
                    marker={marker}
                    selected={selectedMarkerId === marker.id}
                    onSelect={() => {
                        setSelectedMarkerId(marker.id)
                    }}>
                    {index + 1}
                </GymMarker>
            ))}
        </Comp>
    )
}
