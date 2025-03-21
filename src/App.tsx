import { useAtomValue } from "jotai"
import { useSetAtom } from "jotai"
import { BlocHuetteAussenbereich } from "./components/hallen/bloc-huette/BlocHuetteAussenbereich"
import { BlocHuetteHaupthalle } from "./components/hallen/bloc-huette/BlocHuetteHaupthalle"
import { BlocHuetteNeueHalle } from "./components/hallen/bloc-huette/BlocHuetteNeueHalle"
import { Header } from "./components/header/Header"
import { Marker } from "./components/marker/Marker"
import { Toolbar } from "./components/toolbar/Toolbar"
import { gymAtom } from "./stores/gym"
import { readOnlyGymLevelAtom } from "./stores/gym-level"
import { markersAtom, readOnlyGymLevelMarkersAtom } from "./stores/markers"

export function App() {
    return (
        <div className="h-dvh flex flex-col">
            <Header />
            <Toolbar />

            <div className="flex-1 p-4 flex justify-center items-center overflow-hidden relative">
                <ActiveHalle />
            </div>
        </div>
    )
}

function ActiveHalle() {
    const gym = useAtomValue(gymAtom)
    const gymLevel = useAtomValue(readOnlyGymLevelAtom)
    const markers = useAtomValue(readOnlyGymLevelMarkersAtom)

    const setMarkers = useSetAtom(markersAtom)

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

    const handleAddMarker = (event: React.MouseEvent<SVGSVGElement>) => {
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
            onClick={handleAddMarker}
            className="max-w-full max-h-full overflow-visible">
            {markers.map((marker, index) => (
                <Marker key={marker.id} marker={marker}>
                    {index + 1}
                </Marker>
            ))}
        </Comp>
    )
}
