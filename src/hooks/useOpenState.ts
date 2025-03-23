import type { OpenState } from "@/lib/open-state"
import { useState } from "react"

type UseOpenStateReturn<TData> = {
    state: OpenState<TData>
    open: (data: TData) => void
    close: () => void
}

export function useOpenState<TData = unknown>(): UseOpenStateReturn<TData> {
    const [state, setState] = useState<OpenState<TData>>({
        open: false,
    })

    const open = (data: TData) => {
        setState({
            open: true,
            data,
        })
    }

    const close = () => {
        setState({
            open: false,
        })
    }

    return {
        state,
        open,
        close,
    }
}
