type IconButtonProps = React.ComponentPropsWithoutRef<"button">

export function IconButton(props: IconButtonProps) {
    return (
        <button
            {...props}
            type="button"
            className="text-gray-500 rounded-full inline-flex items-center justify-center focus:outline-none icon:size-5">
            {props.children}
        </button>
    )
}
