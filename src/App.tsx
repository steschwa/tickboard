import { useAtomValue } from "jotai"
import { BlocHuetteAussenbereich } from "./components/hallen/bloc-huette/BlocHuetteAussenbereich"
import { BlocHuetteHaupthalle } from "./components/hallen/bloc-huette/BlocHuetteHaupthalle"
import { BlocHuetteNeueHalle } from "./components/hallen/bloc-huette/BlocHuetteNeueHalle"
import { Header } from "./components/header/Header"
import { Toolbar } from "./components/toolbar/Toolbar"
import { halleAtom } from "./stores/halle"

export function App() {
    return (
        <div className="h-dvh flex flex-col">
            <Header />
            <Toolbar />

            <div className="flex-1 p-2 flex justify-center items-center overflow-hidden">
                <RenderedHalle />
            </div>
        </div>
    )
}

function RenderedHalle() {
    const halle = useAtomValue(halleAtom)

    switch (halle) {
        case "BLOC_HUETTE_HAUPTHALLE":
            return <BlocHuetteHaupthalle className="max-w-full max-h-full" />
        case "BLOC_HUETTE_AUSSENBEREICH":
            return <BlocHuetteAussenbereich className="max-w-full max-h-full" />
        case "BLOC_HUETTE_NEUEHALLE":
            return <BlocHuetteNeueHalle className="max-w-full max-h-full" />
    }
}
