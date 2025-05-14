import { mergeEventListeners } from "@/lib/events"
import clsx from "clsx"
import { CircleCheckIcon, SettingsIcon } from "lucide-react"
import { useContext } from "react"
import { ItemContext } from "./Item.context"

type ItemProps = React.ComponentPropsWithoutRef<"div"> & {
    selected?: boolean
    onSelect?: () => void

    actions?: React.ReactNode
}

export function Item(props: ItemProps) {
    const { selected, onSelect, actions, ...restProps } = props

    const { showActions } = useContext(ItemContext)

    const handleKeyDown = (event: React.KeyboardEvent) => {
        if (["Enter", "Space"].includes(event.code)) {
            onSelect?.()
        }
    }

    const handleSelect = () => {
        onSelect?.()
    }

    return (
        <div
            className="flex items-center gap-x-2 group"
            data-selected={selected}>
            <div
                {...restProps}
                onKeyDown={mergeEventListeners(
                    handleKeyDown,
                    restProps.onKeyDown,
                )}
                onClick={mergeEventListeners(handleSelect, restProps.onClick)}
                className={clsx(
                    "flex-1 flex items-center h-12 px-4 rounded-xl border text-base font-normal overflow-hidden",
                    {
                        "bg-white text-gray-900 border-gray-100": !selected,
                        "bg-gray-800 text-white border-gray-900": selected,
                    },
                    restProps.className,
                )}>
                <div className="flex-1">{restProps.children}</div>

                <CircleCheckIcon
                    className={clsx(
                        "size-5",
                        selected ? "inline-block" : "hidden",
                    )}
                />
            </div>

            {showActions && actions}
        </div>
    )
}

type SettingsButtonProps = React.ComponentPropsWithoutRef<"button">
function SettingsButton(props: SettingsButtonProps) {
    return (
        <button
            type="button"
            {...props}
            className="size-10 rounded-full inline-flex justify-center items-center icon:size-5 icon:text-gray-500">
            <SettingsIcon />
        </button>
    )
}

Item.Settings = SettingsButton
