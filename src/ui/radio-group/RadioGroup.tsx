import { RadioGroup as RadioGroupPrimitive } from "@base-ui-components/react/radio-group"
import { useId } from "react"

type RadioGroupProps = {
    title?: React.ReactNode
    value?: string[]
    defaultValue?: string[]
    onValueChange?: (value: string[]) => void

    children: React.ReactNode
}

export function RadioGroup(props: RadioGroupProps) {
    const labeledById = useId()

    return (
        <RadioGroupPrimitive
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
