import type { Marker } from "@/lib/marker"
import type { OpenState } from "@/lib/open-state"
import { Dialog } from "@/ui/dialog/Dialog"

type EditMarkerDialogProps = {
    state: OpenState<EditMarkerData>

    onClose: () => void
}

export function EditMarkerDialog(props: EditMarkerDialogProps) {
    return (
        <Dialog
            open={props.state.open}
            onOpenChange={open => {
                if (open) {
                    return
                }
                props.onClose()
            }}>
            <Dialog.Content title="Markierung">
                <div className="grid grid-cols-3 gap-2">
                    <button
                        type="button"
                        className="size-8 inline-flex items-center justify-center rounded-xl">
                        A
                    </button>
                    <button
                        type="button"
                        className="size-8 inline-flex items-center justify-center rounded-xl">
                        B
                    </button>
                    <button
                        type="button"
                        className="size-8 inline-flex items-center justify-center rounded-xl">
                        C
                    </button>
                </div>
            </Dialog.Content>
        </Dialog>
    )
}

export type EditMarkerData = Pick<Marker, "id">
