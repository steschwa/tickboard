import { createContext } from "react"

type ItemContextProps = {
    showActions: boolean
}

export const ItemContext = createContext<ItemContextProps>({
    showActions: false,
})
