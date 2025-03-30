import "./list.css"

type ListProps = {
    title?: React.ReactNode
    children: React.ReactNode
}

export function List(props: ListProps) {
    return (
        <div className="list">
            {props.title && (
                <h4 className="mb-3 text-sm font-medium text-gray-900">
                    {props.title}
                </h4>
            )}
            <div className="flex flex-col gap-y-2">{props.children}</div>
        </div>
    )
}
