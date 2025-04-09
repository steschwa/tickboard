import { Field as FieldPrimitive } from "@base-ui-components/react/field"

type FieldProps = {
    label: React.ReactNode
    children: React.ReactNode
}
export function Field(props: FieldProps) {
    return (
        <FieldPrimitive.Root className="flex flex-col gap-y-1">
            <FieldPrimitive.Label className="text-sm font-medium text-gray-900">
                {props.label}
            </FieldPrimitive.Label>
            {props.children}
        </FieldPrimitive.Root>
    )
}
