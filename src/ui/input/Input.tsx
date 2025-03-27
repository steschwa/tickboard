import clsx from "clsx"

type InputProps = React.ComponentPropsWithoutRef<"input">

export function Input(props: InputProps) {
    return (
        <input
            {...props}
            className={clsx(
                "h-10 px-3 rounded-lg border border-gray-200 text-gray-900 bg-white text-sm",
                "placeholder:text-gray-400",
                "focus:outline-3 outline-gray-100",
            )}
        />
    )
}
