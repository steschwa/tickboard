import type { Gym } from "@/lib/gym"
import { gymAtom } from "@/stores/gym"
import { markersAtom } from "@/stores/markers"
import { workspaceAtom } from "@/stores/workspaces"
import { Select } from "@/ui/select/Select"
import clsx from "clsx"
import { useAtom, useAtomValue } from "jotai"

type GymSelectProps = {
    children: React.ReactElement<Record<string, unknown>>
}
export function GymSelect(props: GymSelectProps) {
    const [selectedGym, setSelectedGym] = useAtom(gymAtom)

    return (
        <Select
            value={selectedGym}
            onValueChange={gym => {
                setSelectedGym(gym as Gym)
            }}>
            <Select.TriggerPlain render={props.children} />
            <Select.Content title="Halle auswählen">
                <GymList
                    title="Bloc-Hütte"
                    gyms={[
                        "BLOC_HUETTE_HAUPTHALLE",
                        "BLOC_HUETTE_AUSSENBEREICH",
                        "BLOC_HUETTE_NEUEHALLE",
                    ]}
                />
            </Select.Content>
        </Select>
    )
}

type GymListProps = {
    title: React.ReactNode
    gyms: Gym[]
}
function GymList(props: GymListProps) {
    const activeWorkspace = useAtomValue(workspaceAtom)
    const allMarkers = useAtomValue(markersAtom)

    if (props.gyms.length === 0) {
        return null
    }

    const workspaceMarkers = allMarkers.filter(marker => {
        return marker.workspace === activeWorkspace
    })

    return (
        <Select.List title={props.title}>
            {props.gyms.map(gym => {
                const markersCount = workspaceMarkers.filter(marker => {
                    return marker.gym === gym
                }).length

                return (
                    <Select.Item key={gym} value={gym}>
                        <div className="flex items-center justify-between">
                            <span>{formatGymName(gym)}</span>

                            <span
                                className={clsx(
                                    "text-xs rounded-full bg-gray-100 text-gray-600 inline-flex items-center justify-center size-6",
                                    "group-data-[selected=true]:bg-gray-600 group-data-[selected=true]:text-white",
                                )}>
                                {markersCount}
                            </span>
                        </div>
                    </Select.Item>
                )
            })}
        </Select.List>
    )
}

function formatGymName(gym: Gym): string {
    switch (gym) {
        case "BLOC_HUETTE_HAUPTHALLE":
            return "Haupthalle"
        case "BLOC_HUETTE_AUSSENBEREICH":
            return "Aussenbereich"
        case "BLOC_HUETTE_NEUEHALLE":
            return "Neue Halle"
    }
}
