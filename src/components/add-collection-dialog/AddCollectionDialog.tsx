import { addCollectionAtom } from "@/stores/collections"
import { Button } from "@/ui/button/Button"
import { Dialog } from "@/ui/dialog/Dialog"
import { Input } from "@/ui/input/Input"
import { useSetAtom } from "jotai"
import { useState } from "react"

type AddCollectionDialogProps = {
    children: React.ReactElement<Record<string, unknown>>
}

export function AddCollectionDialog(props: AddCollectionDialogProps) {
    const addCollection = useSetAtom(addCollectionAtom)

    const [open, setOpen] = useState(false)
    const [name, setName] = useState("")

    const handleSubmit = (event: React.FormEvent) => {
        event.preventDefault()

        if (!name) {
            return
        }

        addCollection(name)
        setOpen(false)
    }

    return (
        <Dialog open={open} onOpenChange={setOpen}>
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
                        Sammlung hinzufügen
                    </Button>
                </form>
            </Dialog.Content>
        </Dialog>
    )
}
