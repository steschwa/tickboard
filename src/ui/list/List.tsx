import { Children, useState } from "react"
import { ItemContext } from "../item/Item.context"
import "./list.css"
import { Button } from "../button/Button"
import type { ItemVariant } from "../item/Item"

type ListProps = {
    title?: React.ReactNode
    editable?: boolean
    children: React.ReactNode
}

export function List(props: ListProps) {
    const [itemVariant, setItemVariant] = useState<ItemVariant>("selection")

    return (
        <div className="list">
            <Header>
                {props.title && (
                    <h4 className="text-sm font-medium text-gray-900">
                        {props.title}
                    </h4>
                )}

                {props.editable && (
                    <div className="ml-auto">
                        {itemVariant === "selection" && (
                            <Button
                                size="small"
                                variant="seconary"
                                onClick={() => {
                                    setItemVariant("management")
                                }}>
                                Bearbeiten
                            </Button>
                        )}

                        {itemVariant === "management" && (
                            <Button
                                size="small"
                                variant="seconary"
                                onClick={() => {
                                    setItemVariant("selection")
                                }}>
                                Fertig
                            </Button>
                        )}
                    </div>
                )}
            </Header>

            <ItemContext.Provider value={{ variant: itemVariant }}>
                <div className="flex flex-col gap-y-2">{props.children}</div>
            </ItemContext.Provider>
        </div>
    )
}

type HeaderProps = {
    children: React.ReactNode
}
function Header(props: HeaderProps) {
    if (Children.count(props.children) === 0) {
        return null
    }

    return <div className="flex items-center mb-3">{props.children}</div>
}
