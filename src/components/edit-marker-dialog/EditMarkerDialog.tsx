import { useRenderActiveGym } from "@/hooks/useRenderActiveGym"
import type { Marker } from "@/lib/marker"
import { markersAtom, gymLevelMarkersAtom } from "@/stores/markers"
import { Dialog } from "@/ui/dialog/Dialog"
import { useAtom, useAtomValue } from "jotai"
import { GymMarker } from "../gym-marker/GymMarker"
import "./editMarkerDialog.css"
import { Button } from "@/ui/button/Button"
import { Radio, RadioGroup } from "@/ui/radio/Radio"

type EditMarkerDialogProps = {
    open: boolean
    markerId: Marker["id"] | undefined

    onClose: () => void
}

export function EditMarkerDialog(props: EditMarkerDialogProps) {
    const [allMarkers, setMarkers] = useAtom(markersAtom)
    const activeGymMarkers = useAtomValue(gymLevelMarkersAtom)

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

    const handleStatusChange = (value: string) => {
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
                if (!open) {
                    props.onClose()
                }
            }}>
            <Dialog.Content title="Markierung bearbeiten">
                <div className="overflow-hidden mb-6 edit-marker-dialog-preview-container">
                    <ActiveGym
                        className="overflow-visible edit-marker-dialog-preview"
                        style={activeGymStyles}>
                        {activeGymMarkers.map((marker, index) => {
                            const selected = marker.id === props.markerId

                            return (
                                <GymMarker
                                    key={marker.id}
                                    selected={selected}
                                    variant={selected ? "prominent" : "light"}
                                    marker={marker}>
                                    {index + 1}
                                </GymMarker>
                            )
                        })}
                    </ActiveGym>
                </div>

                <RadioGroup
                    title="Status"
                    value={marker?.status || ""}
                    onValueChange={handleStatusChange}>
                    <Radio value="todo">TODO</Radio>
                    <Radio value="done">DONE</Radio>
                </RadioGroup>

                <div className="h-px my-6 -mx-4 bg-gray-100" />

                <Button
                    className="w-full"
                    variant="destructive"
                    onClick={handleDelete}>
                    Markierung löschen
                </Button>
            </Dialog.Content>
        </Dialog>
    )
}

function parseStatus(value: string): Marker["status"] {
    switch (value) {
        case "done":
            return "done"
        case "todo":
            return "todo"
        default:
            return "todo"
    }
}
