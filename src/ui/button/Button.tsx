import clsx from "clsx"

type ButtonProps = React.ComponentPropsWithoutRef<"button"> & {
    /**
     * @default "primary"
     */
    variant?: "primary" | "seconary" | "destructive"
    /**
     * @default "normal"
     */
    size?: "small" | "normal"
}

export function Button(props: ButtonProps) {
    const { variant = "primary", size = "normal", ...restProps } = props

    return (
        <button
            type="button"
            {...restProps}
            className={clsx(
                "text-center font-medium rounded-lg border focus:outline-none",
                {
                    "bg-gray-800 text-white border-gray-900":
                        variant === "primary",
                    "bg-gray-50 text-gray-900 border-gray-200":
                        variant === "seconary",
                    "bg-red-50 text-red-700 border-red-200":
                        variant === "destructive",
                },
                {
                    "h-7 px-3 text-sm": size === "small",
                    "h-10 px-4 text-base": size === "normal",
                },
                restProps.className,
            )}
        />
    )
}
