import { Radio as RadioPrimitive } from "@base-ui-components/react/radio"
import { RadioGroup as RadioGroupPrimitive } from "@base-ui-components/react/radio-group"
import { useId } from "react"

type RadioGroupProps = {
    title?: React.ReactNode
    value?: string
    defaultValue?: string
    onValueChange?: (value: string) => void

    children: React.ReactNode
}
export function RadioGroup(props: RadioGroupProps) {
    const labeledById = useId()

    const handleValueChange = (value: unknown) => {
        if (typeof value !== "string") {
            return
        }

        props.onValueChange?.(value)
    }

    return (
        <RadioGroupPrimitive
            value={props.value}
            defaultValue={props.defaultValue}
            onValueChange={handleValueChange}
            aria-labelledby={props.title ? labeledById : undefined}>
            {props.title && (
                <h4
                    id={labeledById}
                    className="mb-3 text-sm font-medium text-gray-900">
                    {props.title}
                </h4>
            )}

            <div className="flex gap-px rounded-lg border border-gray-200 bg-gray-50 p-1">
                {props.children}
            </div>
        </RadioGroupPrimitive>
    )
}

type RadioProps = {
    value: string
    children: React.ReactNode
}
export function Radio(props: RadioProps) {
    return (
        <RadioPrimitive.Root
            value={props.value}
            className="flex-1 flex items-center justify-center text-sm font-medium p-2 outline-none rounded-md data-[checked]:bg-gray-800 data-[checked]:text-white">
            {props.children}
        </RadioPrimitive.Root>
    )
}
