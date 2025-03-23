import { Toggle as TogglePrimitive } from "@base-ui-components/react/toggle"

type ToggleProps = {
    value: string
    children: React.ReactNode
}
export function Toggle(props: ToggleProps) {
    return (
        <TogglePrimitive
            value={props.value}
            className="px-2 text-center bg-white text-gray-500 rounded-md select-none data-[pressed]:bg-gray-800 data-[pressed]:text-white">
            {props.children}
        </TogglePrimitive>
    )
}
