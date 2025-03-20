import { useAtomValue } from "jotai"
import { useSetAtom } from "jotai"
import { BlocHuetteAussenbereich } from "./components/hallen/bloc-huette/BlocHuetteAussenbereich"
import { BlocHuetteHaupthalle } from "./components/hallen/bloc-huette/BlocHuetteHaupthalle"
import { BlocHuetteNeueHalle } from "./components/hallen/bloc-huette/BlocHuetteNeueHalle"
import { Header } from "./components/header/Header"
import { Toolbar } from "./components/toolbar/Toolbar"
import { halleAtom } from "./stores/halle"
import { readOnlyHalleLevelAtom } from "./stores/halle-level"
import { markersStore } from "./stores/markers"

export function App() {
    const halle = useAtomValue(halleAtom)
    const halleLevel = useAtomValue(readOnlyHalleLevelAtom)

    const setMarkers = useSetAtom(markersStore)

    const handleAddMarker = (event: React.PointerEvent) => {
        setMarkers(prev => [
            ...prev,
            {
                id: new Date().toISOString(),
                halle,
                level: halleLevel,
                x: event.nativeEvent.offsetX,
                y: event.nativeEvent.offsetY,
                status: null,
            },
        ])
    }

    return (
        <div className="h-dvh flex flex-col">
            <Header />
            <Toolbar />

            <div className="flex-1 p-4 flex justify-center items-center overflow-hidden">
                <div
                    className="contents [&>svg]:max-w-full [&>svg]:max-h-full"
                    onPointerDown={handleAddMarker}>
                    <ActiveHalle />
                </div>
            </div>
        </div>
    )
}

function ActiveHalle() {
    const halle = useAtomValue(halleAtom)

    switch (halle) {
        case "BLOC_HUETTE_HAUPTHALLE":
            return <BlocHuetteHaupthalle />
        case "BLOC_HUETTE_AUSSENBEREICH":
            return <BlocHuetteAussenbereich />
        case "BLOC_HUETTE_NEUEHALLE":
            return <BlocHuetteNeueHalle />
    }
}
