import { Dialog } from "@/ui/dialog/Dialog"
import { Item as ItemPrimitive } from "@/ui/item/Item"
import { List } from "@/ui/list/List"
import { Dialog as DialogPrimitive } from "@base-ui-components/react/dialog"
import clsx from "clsx"
import { ChevronsUpDownIcon } from "lucide-react"
import { createContext, useContext, useState } from "react"

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
                className={clsx("text-base font-normal", {
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

type ItemProps = React.ComponentPropsWithoutRef<"div"> & {
    value: string
    keepOpen?: boolean
    children: React.ReactNode
}
function Item(props: ItemProps) {
    const { value, keepOpen = false, children, ...restProps } = props
    const {
        value: selectedValue,
        onValueChange,
        onOpenChange,
    } = useContext(SelectContext)

    const selected = selectedValue === value

    return (
        <ItemPrimitive
            {...restProps}
            selected={selected}
            onSelect={() => {
                onValueChange(value)
                if (!keepOpen) {
                    onOpenChange(false)
                }
            }}>
            {children}
        </ItemPrimitive>
    )
}

Select.Trigger = Trigger
Select.TriggerPlain = DialogPrimitive.Trigger
Select.Content = Dialog.Content
Select.List = List
Select.Item = Item
