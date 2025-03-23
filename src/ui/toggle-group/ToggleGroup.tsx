import { ToggleGroup as ToggleGroupPrimitive } from "@base-ui-components/react/toggle-group"

type ToggleGroupProps = {
    children: React.ReactNode
}
export function ToggleGroup(props: ToggleGroupProps) {
    return (
        <ToggleGroupPrimitive className="h-8 flex gap-px rounded-lg border border-gray-200 p-0.5 *:flex-1">
            {props.children}
        </ToggleGroupPrimitive>
    )
}
