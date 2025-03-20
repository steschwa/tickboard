import { Select as SelectPrimitive } from "@base-ui-components/react/select"
import clsx from "clsx"
import { CheckIcon, ChevronsUpDownIcon } from "lucide-react"

type SelectProps = {
    value?: string
    defaultValue?: string
    onValueChange?: (value: string) => void

    children: React.ReactNode
}
export function Select(props: SelectProps) {
    return (
        <SelectPrimitive.Root
            value={props.value}
            defaultValue={props.defaultValue}
            onValueChange={props.onValueChange}
            alignItemToTrigger={false}>
            {props.children}
        </SelectPrimitive.Root>
    )
}

type TriggerProps = {
    placeholder: string
    children?: React.ReactNode
}
function Trigger(props: TriggerProps) {
    return (
        <SelectPrimitive.Trigger className="px-3 flex items-center gap-x-4 justify-between h-8 border border-gray-200 rounded-lg focus:outline-none">
            <SelectPrimitive.Value
                placeholder={props.placeholder}
                className="text-gray-900 text-sm font-normal">
                {value => {
                    return props.children ?? value
                }}
            </SelectPrimitive.Value>
            <SelectPrimitive.Icon>
                <ChevronsUpDownIcon className="size-4 text-gray-200" />
            </SelectPrimitive.Icon>
        </SelectPrimitive.Trigger>
    )
}

type ContentProps = {
    children: React.ReactNode
}
function Content(props: ContentProps) {
    return (
        <SelectPrimitive.Portal>
            <SelectPrimitive.Positioner align="start" sideOffset={4}>
                <SelectPrimitive.Popup
                    className={clsx(
                        "rounded-lg p-1 bg-white border border-gray-200 shadow flex flex-col gap-y-1",
                    )}>
                    {props.children}
                </SelectPrimitive.Popup>
            </SelectPrimitive.Positioner>
        </SelectPrimitive.Portal>
    )
}

type ItemProps = {
    value: string
    children: React.ReactNode
}
function Item(props: ItemProps) {
    return (
        <SelectPrimitive.Item
            value={props.value}
            className="px-2 py-1 grid grid-cols-[20px_1fr] items-center gap-x-2 min-w-(--anchor-width) select-none data-[highlighted]:bg-gray-100 rounded-md focus:outline-none">
            <SelectPrimitive.ItemIndicator
                className={state => {
                    return clsx("col-start-1 text-gray-900", {
                        invisible: !state.selected,
                    })
                }}>
                <CheckIcon className="size-4" />
            </SelectPrimitive.ItemIndicator>

            <SelectPrimitive.ItemText className="col-start-2">
                {props.children}
            </SelectPrimitive.ItemText>
        </SelectPrimitive.Item>
    )
}

Select.Trigger = Trigger
Select.Content = Content
Select.Item = Item
