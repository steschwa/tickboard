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

            <div className="flex flex-col gap-y-2">{props.children}</div>
        </RadioGroupPrimitive>
    )
}

type RadioProps = {
    value: string
    children: React.ReactNode
}
export function Radio(props: RadioProps) {
    return (
        // biome-ignore lint/a11y/noLabelWithoutControl: biome does not detect <Radio> as control
        <label className="flex items-center gap-x-4 bg-white">
            <RadioPrimitive.Root
                value={props.value}
                className="size-6 inline-flex items-center justify-center rounded-full border outline-none data-[checked]:bg-gray-800 data-[checked]:border-gray-900 data-[unchecked]:bg-white data-[unchecked]:border-gray-200">
                <RadioPrimitive.Indicator className="inline-block size-3 bg-white data-[unchecked]:hidden" />
            </RadioPrimitive.Root>

            {props.children}
        </label>
    )
}
