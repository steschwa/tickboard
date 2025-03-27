import clsx from "clsx"

type ButtonProps = React.ComponentPropsWithoutRef<"button"> & {
    /**
     * @default "primary"
     */
    variant?: "primary" | "destructive"
}

export function Button(props: ButtonProps) {
    const { variant = "primary", ...restProps } = props

    return (
        <button
            {...restProps}
            type="button"
            className={clsx(
                "h-8 text-center font-medium px-3 rounded-lg text-sm border focus:outline-none",
                {
                    "bg-gray-800 text-white border-gray-900":
                        variant === "primary",
                    "bg-red-50 text-red-700 border-red-200":
                        variant === "destructive",
                },
            )}
        />
    )
}
