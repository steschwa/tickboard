import { Radio as RadioPrimitive } from "@base-ui-components/react/radio"

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
