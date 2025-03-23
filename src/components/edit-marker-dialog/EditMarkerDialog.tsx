import type { Marker } from "@/lib/marker"
import { markersAtom } from "@/stores/markers"
import { Dialog } from "@/ui/dialog/Dialog"
import { ToggleGroup } from "@/ui/toggle-group/ToggleGroup"
import { Toggle } from "@/ui/toggle/Toggle"
import { useSetAtom } from "jotai"

type EditMarkerDialogProps = {
    open: boolean
    data: EditMarkerData | undefined

    onClose: () => void
}

export function EditMarkerDialog(props: EditMarkerDialogProps) {
    const setMarkers = useSetAtom(markersAtom)

    const handleDelete = () => {
        const id = props.data?.id
        if (!id) {
            return
        }

        setMarkers(prev => {
            return prev.filter(marker => {
                return marker.id !== id
            })
        })
        props.onClose()
    }

    const handleStatusChange = (value: string[]) => {
        const id = props.data?.id
        if (!id) {
            return
        }

        setMarkers(prev => {
            return prev.map(marker => {
                if (marker.id !== id) {
                    return marker
                }

                return { ...marker, status: parseStatus(value) }
            })
        })
    }

    let title = "Markierung"
    if (props.data) {
        title = `Markierung ${props.data.label}`
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
            <Dialog.Content title={title}>
                <div className="grid grid-cols-3 gap-2">
                    <div className="col-span-2">
                        <ToggleGroup
                            value={getToggleGroupValue(props.data)}
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

export type EditMarkerData = Pick<Marker, "id" | "status"> & { label: string }

function getToggleGroupValue(data: EditMarkerData | undefined): string[] {
    if (!data) {
        return []
    }

    switch (data.status) {
        case "done":
            return ["done"]
        case "todo":
            return ["todo"]
        case null:
            return []
        default:
            data.status satisfies never
            return []
    }
}

function parseStatus(value: string[]): Marker["status"] {
    if (value.length === 0) {
        return null
    }

    const [status] = value
    switch (status) {
        case "done":
            return "done"
        case "todo":
            return "todo"
    }

    return null
}
