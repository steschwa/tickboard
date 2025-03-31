import { createContext } from "react"
import type { ItemVariant } from "./Item"

type ItemContextProps = {
    variant: ItemVariant
}

export const ItemContext = createContext<ItemContextProps>({
    variant: "selection",
})
