import clsx from "clsx"

type InputProps = React.ComponentPropsWithoutRef<"input">

export function Input(props: InputProps) {
    return (
        <input
            {...props}
            className={clsx(
                "h-10 px-3 rounded-lg bg-gray-100 text-gray-900 text-sm border border-gray-200",
                "placeholder:text-gray-500",
                "focus:outline-none focus:border-gray-400",
            )}
        />
    )
}
