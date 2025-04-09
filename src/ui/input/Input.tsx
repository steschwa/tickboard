import { Input as InputPrimitive } from "@base-ui-components/react/input"
import clsx from "clsx"

type InputProps = React.ComponentPropsWithoutRef<"input">

export function Input(props: InputProps) {
    return (
        <InputPrimitive
            {...props}
            className={clsx(
                "h-10 px-3 rounded-lg bg-gray-100 text-gray-900 text-base border border-gray-200",
                "placeholder:text-gray-500",
                "focus:outline-2 focus:border-gray-500 outline-gray-600/75",
            )}
        />
    )
}
