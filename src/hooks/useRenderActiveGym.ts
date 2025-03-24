import {
    BLOC_HUETTE_AUSSENBEREICH_VB_HEIGHT,
    BLOC_HUETTE_AUSSENBEREICH_VB_WIDTH,
    BlocHuetteAussenbereich,
} from "@/components/gyms/bloc-huette/BlocHuetteAussenbereich"
import {
    BLOC_HUETTE_HAUPTHALLE_VB_HEIGHT,
    BLOC_HUETTE_HAUPTHALLE_VB_WIDTH,
    BlocHuetteHaupthalle,
} from "@/components/gyms/bloc-huette/BlocHuetteHaupthalle"
import {
    BLOC_HUETTE_NEUE_HALLE_VB_HEIGHT,
    BLOC_HUETTE_NEUE_HALLE_VB_WIDTH,
    BlocHuetteNeueHalle,
} from "@/components/gyms/bloc-huette/BlocHuetteNeueHalle"
import { gymAtom } from "@/stores/gym"
import { useAtomValue } from "jotai"

export function useRenderActiveGym(): readonly [
    element: React.ElementType<React.ComponentPropsWithoutRef<"svg">>,
    viewboxWidth: number,
    viewboxHeight: number,
] {
    const gym = useAtomValue(gymAtom)

    switch (gym) {
        case "BLOC_HUETTE_HAUPTHALLE":
            return [
                BlocHuetteHaupthalle,
                BLOC_HUETTE_HAUPTHALLE_VB_WIDTH,
                BLOC_HUETTE_HAUPTHALLE_VB_HEIGHT,
            ]
        case "BLOC_HUETTE_AUSSENBEREICH":
            return [
                BlocHuetteAussenbereich,
                BLOC_HUETTE_AUSSENBEREICH_VB_WIDTH,
                BLOC_HUETTE_AUSSENBEREICH_VB_HEIGHT,
            ]
        case "BLOC_HUETTE_NEUEHALLE":
            return [
                BlocHuetteNeueHalle,
                BLOC_HUETTE_NEUE_HALLE_VB_WIDTH,
                BLOC_HUETTE_NEUE_HALLE_VB_HEIGHT,
            ]
    }
}
