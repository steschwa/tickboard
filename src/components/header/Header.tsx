import { GymSelect } from "@/components/gym-select/GymSelect"
import type { Gym } from "@/lib/gym"
import { gymAtom } from "@/stores/gym"
import { useAtomValue } from "jotai"
import { MapPinnedIcon } from "lucide-react"

export function Header() {
    const gym = useAtomValue(gymAtom)

    return (
        <header className="border-b border-gray-100 flex items-center justify-between px-4 py-2">
            <h1 className="text-gray-900 font-semibold text-base">
                {formatGym(gym)}
            </h1>

            <GymSelect>
                <MapPinnedIcon />
            </GymSelect>
        </header>
    )
}

function formatGym(gym: Gym): string {
    switch (gym) {
        case "BLOC_HUETTE_HAUPTHALLE":
            return "Bloc-Hütte: Haupthalle"
        case "BLOC_HUETTE_AUSSENBEREICH":
            return "Bloc-Hütte: Aussenbereich"
        case "BLOC_HUETTE_NEUEHALLE":
            return "Bloc-Hütte: Neue Halle"
    }
}
