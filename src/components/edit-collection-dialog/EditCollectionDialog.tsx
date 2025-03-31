import type { Collection } from "@/lib/collection"
import { updateCollectionAtom } from "@/stores/collections"
import { Button } from "@/ui/button/Button"
import { Dialog } from "@/ui/dialog/Dialog"
import { Input } from "@/ui/input/Input"
import { useSetAtom } from "jotai"
import { useState } from "react"

type EditCollectionDialogProps = {
    collection: Collection | undefined
    children?: React.ReactElement<Record<string, unknown>>
}

export function EditCollectionDialog(props: EditCollectionDialogProps) {
    const updateCollection = useSetAtom(updateCollectionAtom)

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

    return (
        <Dialog open={open} onOpenChange={handleOpenChange}>
            <Dialog.Trigger render={props.children} />
            <Dialog.Content title="Neue Sammlung erstellen">
                <form onSubmit={handleSubmit} className="flex flex-col gap-y-6">
                    <Input
                        autoFocus
                        placeholder="Bezeichnung"
                        required
                        value={name}
                        onChange={event => {
                            setName(event.currentTarget.value)
                        }}
                    />
                    <Button type="submit" variant="primary">
                        Speichern
                    </Button>
                </form>
            </Dialog.Content>
        </Dialog>
    )
}
