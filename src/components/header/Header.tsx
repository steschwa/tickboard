import type { Halle } from "@/lib/halle"
import { halleAtom } from "@/stores/halle"
import { useAtomValue } from "jotai"
import { HouseIcon } from "lucide-react"
import { HalleSelect } from "../halle-select/HalleSelect"

export function Header() {
    const halle = useAtomValue(halleAtom)

    return (
        <header className="border-b border-gray-100 flex items-center justify-between px-4 py-2">
            <h1 className="text-gray-900 font-semibold text-base">
                {formatHalle(halle)}
            </h1>

            <HalleSelect>
                <HouseIcon />
            </HalleSelect>
        </header>
    )
}

export function formatHalle(halle: Halle): string {
    switch (halle) {
        case "BLOC_HUETTE_HAUPTHALLE":
            return "Bloc-Hütte: Haupthalle"
        case "BLOC_HUETTE_AUSSENBEREICH":
            return "Bloc-Hütte: Aussenbereich"
        case "BLOC_HUETTE_NEUEHALLE":
            return "Bloc-Hütte: Neue Halle"
    }
}
