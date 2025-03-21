import type { Gym } from "@/lib/gym"
import { gymAtom } from "@/stores/gym"
import { useAtomValue } from "jotai"
import { MapPinnedIcon } from "lucide-react"
import { HalleSelect } from "../halle-select/HalleSelect"

export function Header() {
    const halle = useAtomValue(gymAtom)

    return (
        <header className="border-b border-gray-100 flex items-center justify-between px-4 py-2">
            <h1 className="text-gray-900 font-semibold text-base">
                {formatHalle(halle)}
            </h1>

            <HalleSelect>
                <MapPinnedIcon />
            </HalleSelect>
        </header>
    )
}

function formatHalle(halle: Gym): string {
    switch (halle) {
        case "BLOC_HUETTE_HAUPTHALLE":
            return "Bloc-Hütte: Haupthalle"
        case "BLOC_HUETTE_AUSSENBEREICH":
            return "Bloc-Hütte: Aussenbereich"
        case "BLOC_HUETTE_NEUEHALLE":
            return "Bloc-Hütte: Neue Halle"
    }
}
