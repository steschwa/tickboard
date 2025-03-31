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
        if (variant !== "selection") {
            return
        }

        if (["Enter", "Space"].includes(event.code)) {
            onSelect?.()
        }
    }

    const handleSelect = () => {
        if (variant !== "selection") {
            return
        }

        onSelect?.()
    }

    return (
        <div
            {...restProps}
            onKeyDown={mergeEventListeners(handleKeyDown, restProps.onKeyDown)}
            onClick={mergeEventListeners(handleSelect, restProps.onClick)}
            className={clsx(
                "flex h-10 rounded-xl border text-sm font-normal overflow-hidden",
                {
                    "bg-white text-gray-900 border-gray-100":
                        !selected || variant !== "selection",
                    "bg-gray-800 text-white border-gray-900":
                        selected && variant === "selection",
                },
                restProps.className,
            )}>
            <div className="flex-1 flex items-center px-4">
                {restProps.children}
            </div>

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
                    {props.onEdit && (
                        <ManagementButton
                            variant="edit"
                            onClick={props.onEdit}
                        />
                    )}
                    {props.onDelete && (
                        <ManagementButton
                            variant="delete"
                            onClick={props.onDelete}
                        />
                    )}
                </div>
            )}
        </div>
    )
}

export type ItemVariant = "selection" | "management"

type ManagementButtonProps = {
    variant: "edit" | "delete"
    onClick?: () => void
}
function ManagementButton(props: ManagementButtonProps) {
    return (
        <button
            type="button"
            onClick={props.onClick}
            className={clsx("px-3 inline-flex items-center justify-center ", {
                "bg-blue-50 text-blue-500": props.variant === "edit",
                "bg-red-50 text-red-500": props.variant === "delete",
            })}>
            {props.variant === "edit" && <PencilIcon className="size-4" />}
            {props.variant === "delete" && <Trash2Icon className="size-4" />}
        </button>
    )
}
