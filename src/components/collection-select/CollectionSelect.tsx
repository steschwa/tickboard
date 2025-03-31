import type { Collection } from "@/lib/collection"
import { collectionsAtom, selectedCollectionAtom } from "@/stores/collections"
import { Dialog } from "@/ui/dialog/Dialog"
import { Item } from "@/ui/item/Item"
import { List } from "@/ui/list/List"
import { useAtomValue } from "jotai"
import { useAtom } from "jotai"
import { PlusIcon } from "lucide-react"
import { useState } from "react"
import { AddCollectionDialog } from "../add-collection-dialog/AddCollectionDialog"

type CollectionSelectProps = {
    children: React.ReactElement<Record<string, unknown>>
}

export function CollectionSelect(props: CollectionSelectProps) {
    const collections = useAtomValue(collectionsAtom)
    const [selectedCollection, setSelectedCollection] = useAtom(
        selectedCollectionAtom,
    )

    const [open, setOpen] = useState(false)

    const handleNoCollectionSelect = () => {
        setSelectedCollection(null)
        setOpen(false)
    }

    const handleCollectionSelect = (collectionId: Collection["id"]) => {
        setSelectedCollection(collectionId)
        setOpen(false)
    }

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <Dialog.Trigger render={props.children} />
            <Dialog.Content title="Sammlungen verwalten">
                <List>
                    <Item
                        selected={!selectedCollection}
                        onSelect={handleNoCollectionSelect}>
                        Keine Sammlung
                    </Item>
                </List>

                <List editable title="Deine Sammlungen">
                    <AddCollectionDialog>
                        <Item>
                            <div className="flex items-center gap-x-3">
                                <PlusIcon className="text-gray-500 size-5" />
                                <span className="text-gray-900">
                                    Neue Sammlung
                                </span>
                            </div>
                        </Item>
                    </AddCollectionDialog>

                    {collections.map(collection => (
                        <Item
                            key={collection.id}
                            selected={selectedCollection?.id === collection.id}
                            onSelect={() =>
                                handleCollectionSelect(collection.id)
                            }
                            onEdit={() => {
                                console.log(`edit ${collection.name}`)
                            }}
                            onDelete={() => {
                                console.log(`delete ${collection.name}`)
                            }}>
                            {collection.name}
                        </Item>
                    ))}
                </List>
            </Dialog.Content>
        </Dialog>
    )
}
