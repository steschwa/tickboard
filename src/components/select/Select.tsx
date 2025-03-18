import { Select as SelectPrimitive } from "@base-ui-components/react/select"
import clsx from "clsx"
import { CheckIcon, ChevronsUpDownIcon } from "lucide-react"

type SelectProps = {
    children: React.ReactNode
}
export function Select(props: SelectProps) {
    return (
        <SelectPrimitive.Root alignItemToTrigger={false}>
            {props.children}
        </SelectPrimitive.Root>
    )
}

type TriggerProps = {
    placeholder: string
    children?: (value: string) => React.ReactNode
}
function Trigger(props: TriggerProps) {
    return (
        <SelectPrimitive.Trigger className="px-3 flex items-center gap-x-4 h-8 border border-gray-200 rounded-lg">
            <SelectPrimitive.Value
                placeholder={props.placeholder}
                className="text-red-600">
                {value => {
                    return props.children?.(value) ?? value
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
            <SelectPrimitive.Positioner>
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
            className="px-2 py-1 flex items-center gap-x-2">
            <SelectPrimitive.ItemIndicator
                className={state => {
                    return clsx("text-gray-900", {
                        invisible: !state.selected,
                    })
                }}>
                <CheckIcon className="size-4" />
            </SelectPrimitive.ItemIndicator>

            <SelectPrimitive.ItemText className="flex-1">
                {props.children}
            </SelectPrimitive.ItemText>
        </SelectPrimitive.Item>
    )
}

Select.Trigger = Trigger
Select.Content = Content
Select.Item = Item
