import { mergeEventListeners } from "@/lib/events"
import clsx from "clsx"
import { CircleCheckIcon, PencilIcon, Trash2Icon } from "lucide-react"
import { useContext } from "react"
import { ItemContext } from "./Item.context"

type ItemProps = React.ComponentPropsWithoutRef<"div"> & {
    selected?: boolean

    onSelect?: () => void
    edit?: React.ReactNode
    delete?: React.ReactNode
}

export function Item(props: ItemProps) {
    const {
        selected,
        onSelect,
        edit,
        delete: deleteElement,
        ...restProps
    } = props

    const { variant } = useContext(ItemContext)

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
                    {edit}
                    {deleteElement}
                </div>
            )}
        </div>
    )
}

export type ItemVariant = "selection" | "management"

type ActionButtonProps = React.ComponentPropsWithoutRef<"button">
function ActionButton(props: ActionButtonProps) {
    return (
        <button
            {...props}
            type="button"
            className={clsx(
                "px-3 inline-flex items-center justify-center icon:size-4",
                props.className,
            )}
        />
    )
}

function EditActionButton(props: ActionButtonProps) {
    return (
        <ActionButton
            {...props}
            className={clsx("bg-blue-50 text-blue-500", props.className)}>
            <PencilIcon />
        </ActionButton>
    )
}
Item.Edit = EditActionButton

function DeleteActionButton(props: ActionButtonProps) {
    return (
        <ActionButton
            {...props}
            className={clsx("bg-red-50 text-red-500", props.className)}>
            <Trash2Icon />
        </ActionButton>
    )
}
Item.Delete = DeleteActionButton
