import { atom } from "jotai"
import { HALLE, type Halle } from "lib/types"

export const halleAtom = atom<Halle>(HALLE.BLOC_HUETTE_HAUPTHALLE)
