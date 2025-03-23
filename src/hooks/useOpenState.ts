import { useState } from "react"

type UseOpenStateReturn<TData> = {
    isOpen: boolean
    data: TData | undefined
    open: (data: TData) => void
    close: () => void
}

export function useOpenState<TData = unknown>(): UseOpenStateReturn<TData> {
    const [isOpen, setIsOpen] = useState(false)
    const [data, setData] = useState<TData>()

    const open = (data: TData) => {
        setData(data)
        setIsOpen(true)
    }

    const close = () => {
        setIsOpen(false)
    }

    return {
        isOpen,
        data,
        open,
        close,
    }
}
