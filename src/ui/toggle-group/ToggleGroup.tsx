import { ToggleGroup as ToggleGroupPrimitive } from "@base-ui-components/react/toggle-group"

type ToggleGroupProps = {
    value?: string[]
    defaultValue?: string[]
    onValueChange?: (value: string[]) => void

    children: React.ReactNode
}
export function ToggleGroup(props: ToggleGroupProps) {
    return (
        <ToggleGroupPrimitive
            className="h-8 flex gap-px rounded-lg border border-gray-200 p-0.5 *:flex-1"
            value={props.value}
            defaultValue={props.defaultValue}
            onValueChange={props.onValueChange}>
            {props.children}
        </ToggleGroupPrimitive>
    )
}
