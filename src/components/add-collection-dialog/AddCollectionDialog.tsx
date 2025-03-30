import { Button } from "@/ui/button/Button"
import { Dialog } from "@/ui/dialog/Dialog"
import { Input } from "@/ui/input/Input"

type AddCollectionDialogProps = {
    children: React.ReactElement<Record<string, unknown>>
}

export function AddCollectionDialog(props: AddCollectionDialogProps) {
    return (
        <Dialog>
            <Dialog.Trigger render={props.children} />
            <Dialog.Content title="Neue Sammlung erstellen">
                <div className="flex flex-col gap-y-6">
                    <Input autoFocus placeholder="Bezeichnung" />
                    <Button variant="primary">Sammlung hinzufügen</Button>
                </div>
            </Dialog.Content>
        </Dialog>
    )
}
