import type { Gym } from "@/lib/gym"
import { gymAtom } from "@/stores/gym"
import { Select } from "@/ui/select/Select"
import { useAtom } from "jotai"

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
    if (props.gyms.length === 0) {
        return null
    }

    return (
        <Select.List title={props.title}>
            {props.gyms.map(gym => (
                <Select.Item key={gym} value={gym}>
                    {formatGym(gym)}
                </Select.Item>
            ))}
        </Select.List>
    )
}

function formatGym(gym: Gym): string {
    switch (gym) {
        case "BLOC_HUETTE_HAUPTHALLE":
            return "Haupthalle"
        case "BLOC_HUETTE_AUSSENBEREICH":
            return "Aussenbereich"
        case "BLOC_HUETTE_NEUEHALLE":
            return "Neue Halle"
    }
}
