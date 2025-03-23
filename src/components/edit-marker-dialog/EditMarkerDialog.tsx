import type { Marker } from "@/lib/marker"
import type { OpenState } from "@/lib/open-state"
import { markersAtom } from "@/stores/markers"
import { Dialog } from "@/ui/dialog/Dialog"
import { ToggleGroup } from "@/ui/toggle-group/ToggleGroup"
import { Toggle } from "@/ui/toggle/Toggle"
import { useSetAtom } from "jotai"

type EditMarkerDialogProps = {
    state: OpenState<EditMarkerData>

    onClose: () => void
}

export function EditMarkerDialog(props: EditMarkerDialogProps) {
    const setMarkers = useSetAtom(markersAtom)

    const handleDelete = () => {
        const state = props.state
        if (!state.open) {
            return
        }

        setMarkers(prev => {
            return prev.filter(marker => {
                return marker.id !== state.data.id
            })
        })
        props.onClose()
    }

    let title = "Markierung"
    if (props.state.open) {
        title = `Markierung ${props.state.data.label}`
    }

    return (
        <Dialog
            open={props.state.open}
            onOpenChange={open => {
                if (open) {
                    return
                }
                props.onClose()
            }}>
            <Dialog.Content title={title}>
                <div className="grid grid-cols-3 gap-2">
                    <div className="col-span-2">
                        <ToggleGroup>
                            <Toggle value="todo">TODO</Toggle>
                            <Toggle value="done">DONE</Toggle>
                        </ToggleGroup>
                    </div>

                    <button
                        type="button"
                        onClick={handleDelete}
                        className="h-8 text-center px-3 rounded-lg bg-red-50 text-red-700 text-sm border border-red-200 font-medium">
                        Entfernen
                    </button>
                </div>
            </Dialog.Content>
        </Dialog>
    )
}

export type EditMarkerData = Pick<Marker, "id"> & { label: string }
