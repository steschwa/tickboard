import { collectionsAtom, selectedCollectionAtom } from "@/stores/collections"
import { Select } from "@/ui/select/Select"
import { useAtomValue } from "jotai"
import { useAtom } from "jotai"
import { PlusIcon } from "lucide-react"
import { AddCollectionDialog } from "../add-collection-dialog/AddCollectionDialog"

type CollectionSelectProps = {
    children: React.ReactElement<Record<string, unknown>>
}

export function CollectionSelect(props: CollectionSelectProps) {
    const collections = useAtomValue(collectionsAtom)
    const [selectedCollection, setSelectedCollection] = useAtom(
        selectedCollectionAtom,
    )

    const handleValueChange = (value: string) => {
        switch (value) {
            case NONE_VALUE:
                setSelectedCollection(null)
                break
            case ADD_VALUE:
                return
            default:
                setSelectedCollection(value)
        }
    }

    return (
        <>
            <Select
                value={selectedCollection?.id || NONE_VALUE}
                onValueChange={handleValueChange}>
                <Select.TriggerPlain render={props.children} />
                <Select.Content title="Sammlung auswählen">
                    <Select.List>
                        <Select.Item value={NONE_VALUE}>
                            Keine Sammlung
                        </Select.Item>
                    </Select.List>

                    <Select.List title="Deine Sammlungen">
                        <AddCollectionDialog>
                            <Select.Item keepOpen value={ADD_VALUE}>
                                <div className="flex items-center gap-x-3">
                                    <PlusIcon className="text-gray-500 size-5" />
                                    <span className="text-gray-900">
                                        Neue Sammlung
                                    </span>
                                </div>
                            </Select.Item>
                        </AddCollectionDialog>
                        {collections.map(collection => (
                            <Select.Item
                                key={collection.id}
                                value={collection.id}>
                                {collection.name}
                            </Select.Item>
                        ))}
                    </Select.List>
                </Select.Content>
            </Select>
        </>
    )
}

const NONE_VALUE = crypto.randomUUID()
const ADD_VALUE = crypto.randomUUID()
