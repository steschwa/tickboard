import { Dialog } from "@base-ui-components/react/dialog"
import clsx from "clsx"
import { ChevronsUpDownIcon, CircleCheckIcon, XIcon } from "lucide-react"
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
            <Dialog.Root open={open} onOpenChange={setOpen}>
                {props.children}
            </Dialog.Root>
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
        <Dialog.Trigger className="px-3 flex items-center gap-x-4 justify-between h-8 border border-gray-200 rounded-lg focus:outline-none">
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
        </Dialog.Trigger>
    )
}

type ContentProps = {
    title: React.ReactNode
    children: React.ReactNode
}
function Content(props: ContentProps) {
    return (
        <Dialog.Portal>
            <Dialog.Backdrop
                className={clsx(
                    "bg-gray-900 fixed inset-0",
                    "transition-opacity opacity-20 data-[starting-style]:opacity-0 data-[ending-style]:opacity-0",
                )}
            />
            <Dialog.Popup
                className={clsx(
                    "fixed bottom-0 left-0 right-0 bg-white rounded-tl-2xl rounded-tr-2xl p-4 max-h-4/5",
                    "transition-all opacity-100 translate-y-0 data-[starting-style]:opacity-0 data-[starting-style]:translate-y-1/2 data-[ending-style]:opacity-0 data-[ending-style]:translate-y-1/2",
                )}>
                <div className="flex items-center justify-between mb-6">
                    <Dialog.Title className="text-base font-semibold text-gray-900">
                        {props.title}
                    </Dialog.Title>
                    <Dialog.Close className="w-8 h-8 rounded-full bg-gray-50 text-gray-500 inline-flex items-center justify-center shrink-0">
                        <XIcon className="size-6" />
                    </Dialog.Close>
                </div>

                {props.children}
            </Dialog.Popup>
        </Dialog.Portal>
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
    children: React.ReactNode
}
function Item(props: ItemProps) {
    const { value, onValueChange, onOpenChange } = useContext(SelectContext)

    const handleClick = () => {
        onValueChange(props.value)
        onOpenChange(false)
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
Select.TriggerPlain = Dialog.Trigger
Select.Content = Content
Select.List = List
Select.Item = Item
