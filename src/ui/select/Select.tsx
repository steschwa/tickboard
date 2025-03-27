import { Dialog } from "@/ui/dialog/Dialog"
import { Dialog as DialogPrimitive } from "@base-ui-components/react/dialog"
import clsx from "clsx"
import { ChevronsUpDownIcon, CircleCheckIcon } from "lucide-react"
import { createContext, useContext, useState } from "react"
import "./select.css"

type SelectContextProps = {
    value: string | undefined
    onValueChange: (value: string) => void

    open: boolean
    onOpenChange: (open: boolean) => void
}
const SelectContext = createContext<SelectContextProps>({
    value: undefined,
    onValueChange: () => {},

    open: false,
    onOpenChange: () => {},
})

type SelectProps = {
    value: string | undefined
    onValueChange: (value: string) => void

    children: React.ReactNode
}
export function Select(props: SelectProps) {
    const [open, setOpen] = useState(false)

    return (
        <SelectContext.Provider
            value={{
                value: props.value,
                onValueChange: props.onValueChange,
                open,
                onOpenChange: setOpen,
            }}>
            <Dialog open={open} onOpenChange={setOpen}>
                {props.children}
            </Dialog>
        </SelectContext.Provider>
    )
}

type TriggerProps = {
    placeholder?: string
    children?: React.ReactNode
}
function Trigger(props: TriggerProps) {
    const { value } = useContext(SelectContext)

    const showPlaceholder = value === undefined

    let renderedValue: React.ReactNode
    if (showPlaceholder) {
        renderedValue = props.placeholder || ""
    } else {
        renderedValue = props.children ?? value
    }

    return (
        <DialogPrimitive.Trigger className="px-3 flex items-center gap-x-4 justify-between h-8 border border-gray-200 rounded-lg focus:outline-none">
            <span
                className={clsx("text-sm font-normal", {
                    "text-gray-500": showPlaceholder,
                    "text-gray-900": !showPlaceholder,
                })}>
                {renderedValue}
            </span>
            <span>
                <ChevronsUpDownIcon className="size-4 text-gray-200" />
            </span>
        </DialogPrimitive.Trigger>
    )
}

type ListProps = {
    title?: React.ReactNode
    children: React.ReactNode
}
function List(props: ListProps) {
    return (
        <div className="select-list">
            {props.title && (
                <h4 className="mb-3 text-sm font-medium text-gray-900">
                    {props.title}
                </h4>
            )}
            <div className="flex flex-col gap-y-2">{props.children}</div>
        </div>
    )
}

type ItemProps = {
    value: string
    keepOpen?: boolean
    children: React.ReactNode
}
function Item(props: ItemProps) {
    const { keepOpen = false } = props
    const { value, onValueChange, onOpenChange } = useContext(SelectContext)

    const handleClick = () => {
        onValueChange(props.value)

        if (!keepOpen) {
            onOpenChange(false)
        }
    }

    const handleKeyDown = (event: React.KeyboardEvent) => {
        if (["Enter", "Space"].includes(event.code)) {
            onValueChange(props.value)
        }
    }

    const selected = value === props.value

    return (
        <div
            onKeyDown={handleKeyDown}
            onClick={handleClick}
            data-selected={selected ? "" : undefined}
            className={clsx(
                "group flex items-center py-3 px-4 rounded-xl border text-sm font-normal",
                {
                    "bg-white text-gray-900 border-gray-100": !selected,
                    "bg-gray-800 text-white border-gray-900": selected,
                },
            )}>
            {props.children}
            <CircleCheckIcon
                className={clsx("ml-auto size-5", {
                    invisible: !selected,
                })}
            />
        </div>
    )
}

Select.Trigger = Trigger
Select.TriggerPlain = DialogPrimitive.Trigger
Select.Content = Dialog.Content
Select.List = List
Select.Item = Item
