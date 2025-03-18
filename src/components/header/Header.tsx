import { useAtomValue } from "jotai"
import type { Halle } from "lib/types"
import { MenuIcon } from "lucide-react"
import { halleAtom } from "stores/halle"

export function Header() {
    const halle = useAtomValue(halleAtom)

    return (
        <header className="border-b border-gray-100 flex items-center justify-between px-4 py-2">
            <h1 className="text-gray-900 font-semibold text-base">
                {formatHalle(halle)}
            </h1>

            <button type="button" className="text-gray-500 focus:outline-none">
                <MenuIcon className="size-6" />
            </button>
        </header>
    )
}

function formatHalle(halle: Halle): string {
    switch (halle) {
        case "BLOC_HUETTE_HAUPTHALLE":
            return "Bloc-Hütte Haupthalle"
        case "BLOC_HUETTE_AUSSENBEREICH":
            return "Bloc-Hütte Aussenbereich"
        case "BLOC_HUETTE_NEUEHALLE":
            return "Bloc-Hütte Neue Halle"
    }
}
