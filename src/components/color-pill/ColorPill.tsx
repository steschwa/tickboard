import clsx from "clsx"

type ColorPillProps = {
    className?: string
    active: boolean
    children: React.ReactNode
}

export function ColorPill(props: ColorPillProps) {
    const { className, active, children } = props

    return (
        <div
            className={clsx(
                "py-0.5 px-3 text-xs font-medium rounded-xl text-center inline-block border",
                className,
            )}>
            <span
                className={clsx({
                    invisible: !active,
                })}>
                {children}
            </span>
        </div>
    )
}
