import { mergeEventListeners } from "@/lib/events"
import clsx from "clsx"
import { CircleCheckIcon, PencilIcon, Trash2Icon } from "lucide-react"

type ItemProps = React.ComponentPropsWithoutRef<"div"> & {
    /**
     * @default "selection"
     */
    variant?: ItemVariant
    selected?: boolean

    onSelect?: () => void
    onEdit?: () => void
    onDelete?: () => void
}

export function Item(props: ItemProps) {
    const {
        variant = "selection",
        selected,
        onSelect,
        onEdit,
        onDelete,
        ...restProps
    } = props

    const handleKeyDown = (event: React.KeyboardEvent) => {
        if (["Enter", "Space"].includes(event.code)) {
            onSelect?.()
        }
    }

    return (
        <div
            {...restProps}
            onKeyDown={mergeEventListeners(handleKeyDown, restProps.onKeyDown)}
            onClick={mergeEventListeners(onSelect, restProps.onClick)}
            className={clsx(
                "flex items-center h-10 rounded-xl border text-sm font-normal",
                {
                    "bg-white text-gray-900 border-gray-100":
                        !selected || variant !== "selection",
                    "bg-gray-800 text-white border-gray-900":
                        selected && variant === "selection",
                },
                restProps.className,
            )}>
            <div className="px-4 flex-1">{restProps.children}</div>

            <div className="ml-auto">
                {variant === "selection" && (
                    <div className="flex items-center justify-end mr-4">
                        <CircleCheckIcon
                            className={clsx(
                                "size-5",
                                selected ? "inline-block" : "hidden",
                            )}
                        />
                    </div>
                )}
                {variant === "management" && (
                    <div className="flex items-stretch justify-end">
                        <button
                            type="button"
                            onClick={props.onEdit}
                            className="p-3 inline-flex items-center justify-center bg-blue-100 text-blue-600">
                            <PencilIcon className="size-5" />
                        </button>
                        <button
                            type="button"
                            onClick={props.onDelete}
                            className="p-3 inline-flex items-center justify-center bg-red-100 text-red-600">
                            <Trash2Icon className="size-5" />
                        </button>
                    </div>
                )}
            </div>
        </div>
    )
}

export type ItemVariant = "selection" | "management"
