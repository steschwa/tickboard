import type { Marker } from "@/lib/marker"
import { markersAtom } from "@/stores/markers"
import { Dialog } from "@/ui/dialog/Dialog"
import { ToggleGroup } from "@/ui/toggle-group/ToggleGroup"
import { Toggle } from "@/ui/toggle/Toggle"
import { useAtom } from "jotai"

type EditMarkerDialogProps = {
    open: boolean
    markerId: Marker["id"] | undefined

    onClose: () => void
}

export function EditMarkerDialog(props: EditMarkerDialogProps) {
    const [markers, setMarkers] = useAtom(markersAtom)

    const markerId = props.markerId
    if (!markerId) {
        return null
    }

    const marker = markers.find(marker => marker.id === markerId)

    const handleDelete = () => {
        setMarkers(prev => {
            return prev.filter(marker => {
                return marker.id !== markerId
            })
        })
        props.onClose()
    }

    const handleStatusChange = (value: string[]) => {
        setMarkers(prev => {
            return prev.map(marker => {
                if (marker.id !== markerId) {
                    return marker
                }

                return { ...marker, status: parseStatus(value) }
            })
        })
    }

    return (
        <Dialog
            open={props.open}
            onOpenChange={open => {
                if (open) {
                    return
                }
                props.onClose()
            }}>
            <Dialog.Content title="Markierung bearbeiten">
                <div className="grid grid-cols-3 gap-2">
                    <div className="col-span-2">
                        <ToggleGroup
                            value={getToggleGroupValue(marker?.status)}
                            onValueChange={handleStatusChange}>
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

function getToggleGroupValue(status: Marker["status"] | undefined): string[] {
    switch (status) {
        case "done":
            return ["done"]
        case "todo":
            return ["todo"]
        case undefined:
        case null:
            return []
        default:
            status satisfies never
            return []
    }
}

function parseStatus(value: string[]): Marker["status"] {
    const [status] = value
    switch (status) {
        case "done":
            return "done"
        case "todo":
            return "todo"
        default:
            return "todo"
    }
}
