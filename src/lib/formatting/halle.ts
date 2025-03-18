import type { Halle } from "lib/types"

export function formatHalle(halle: Halle): string {
    switch (halle) {
        case "BLOC_HUETTE_HAUPTHALLE":
            return "Bloc-Hütte Haupthalle"
        case "BLOC_HUETTE_AUSSENBEREICH":
            return "Bloc-Hütte Aussenbereich"
        case "BLOC_HUETTE_NEUEHALLE":
            return "Bloc-Hütte Neue Halle"
    }
}
