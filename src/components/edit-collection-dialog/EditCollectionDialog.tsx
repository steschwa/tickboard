import type { Collection } from "@/lib/collection"
import {
    deleteCollectionAtom,
    updateCollectionAtom,
} from "@/stores/collections"
import { Button } from "@/ui/button/Button"
import { Dialog } from "@/ui/dialog/Dialog"
import { Field } from "@/ui/field/Field"
import { Input } from "@/ui/input/Input"
import { useSetAtom } from "jotai"
import { useState } from "react"

type EditCollectionDialogProps = {
    collection: Collection | undefined
    children?: React.ReactElement<Record<string, unknown>>
}

export function EditCollectionDialog(props: EditCollectionDialogProps) {
    const updateCollection = useSetAtom(updateCollectionAtom)
    const deleteCollection = useSetAtom(deleteCollectionAtom)

    const [open, setOpen] = useState(false)
    const [name, setName] = useState("")

    const handleOpenChange = (v: boolean) => {
        setOpen(v)

        if (v) {
            setName(props.collection?.name || "")
        }
    }

    const handleSubmit = (event: React.FormEvent) => {
        event.preventDefault()

        if (!props.collection) {
            return
        }
        if (!name) {
            return
        }

        updateCollection(props.collection.id, c => ({
            ...c,
            name,
        }))
        setOpen(false)
    }

    const handleDelete = () => {
        if (!props.collection) {
            return
        }

        deleteCollection(props.collection.id)
    }

    return (
        <Dialog open={open} onOpenChange={handleOpenChange}>
            <Dialog.Trigger render={props.children} />
            <Dialog.Content title="Sammlung bearbeiten">
                <form onSubmit={handleSubmit} className="flex flex-col gap-y-6">
                    <Field label="Bezeichnung">
                        <Input
                            autoFocus
                            placeholder="Bezeichnung"
                            required
                            value={name}
                            onChange={event => {
                                setName(event.currentTarget.value)
                            }}
                        />
                    </Field>
                    <Button type="submit" variant="primary">
                        Speichern
                    </Button>
                </form>

                <div className="h-px my-6 -mx-4 bg-gray-100" />

                <Button
                    className="w-full"
                    variant="destructive"
                    onClick={handleDelete}>
                    Sammlung löschen
                </Button>
            </Dialog.Content>
        </Dialog>
    )
}
