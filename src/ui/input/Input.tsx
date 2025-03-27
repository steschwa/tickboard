type InputProps = React.ComponentPropsWithoutRef<"input">

export function Input(props: InputProps) {
    return (
        <input
            {...props}
            className="h-8 px-3 rounded-lg border border-gray-200 text-gray-900 bg-white text-sm focus:outline-none placeholder:text-gray-400"
        />
    )
}
