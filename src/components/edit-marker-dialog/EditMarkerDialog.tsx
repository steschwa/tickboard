import { useRenderActiveGym } from "@/hooks/useRenderActiveGym"
import type { Marker } from "@/lib/marker"
import { markersAtom, readOnlyGymLevelMarkersAtom } from "@/stores/markers"
import { Dialog } from "@/ui/dialog/Dialog"
import { ToggleGroup } from "@/ui/toggle-group/ToggleGroup"
import { Toggle } from "@/ui/toggle/Toggle"
import { useAtom, useAtomValue } from "jotai"
import { GymMarker } from "../gym-marker/GymMarker"
import "./editMarkerDialog.css"

type EditMarkerDialogProps = {
    open: boolean
    markerId: Marker["id"] | undefined

    onClose: () => void
}

export function EditMarkerDialog(props: EditMarkerDialogProps) {
    const [allMarkers, setMarkers] = useAtom(markersAtom)
    const activeGymMarkers = useAtomValue(readOnlyGymLevelMarkersAtom)

    const [ActiveGym, , viewboxHeight] = useRenderActiveGym()

    const marker = allMarkers.find(marker => marker.id === props.markerId)

    const handleDelete = () => {
        setMarkers(prev => {
            return prev.filter(marker => {
                return marker.id !== props.markerId
            })
        })
        props.onClose()
    }

    const handleStatusChange = (value: string[]) => {
        setMarkers(prev => {
            return prev.map(marker => {
                if (marker.id !== props.markerId) {
                    return marker
                }

                return { ...marker, status: parseStatus(value) }
            })
        })
    }

    const activeGymStyles: React.CSSProperties & Record<string, unknown> = {}
    if (marker) {
        activeGymStyles["--marker-ratio-y"] = marker.y / viewboxHeight
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
                <div className="overflow-hidden mb-6 edit-marker-dialog-preview-container">
                    <ActiveGym
                        className="overflow-visible edit-marker-dialog-preview"
                        style={activeGymStyles}>
                        {activeGymMarkers.map(marker => {
                            const selected = marker.id === props.markerId

                            return (
                                <GymMarker
                                    key={marker.id}
                                    selected={selected}
                                    variant={selected ? "prominent" : "light"}
                                    marker={marker}
                                />
                            )
                        })}
                    </ActiveGym>
                </div>

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
