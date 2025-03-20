import type { Halle } from "@/lib/halle"
import { halleAtom } from "@/stores/halle"
import { useAtom } from "jotai"
import { Select } from "../select/Select"

type HalleSelectProps = {
    children: React.ReactNode
}
export function HalleSelect(props: HalleSelectProps) {
    const [selectedHalle, setSelectedHalle] = useAtom(halleAtom)

    return (
        <Select
            value={selectedHalle}
            onValueChange={halle => {
                setSelectedHalle(halle as Halle)
            }}>
            <Select.Trigger variant="icon">{props.children}</Select.Trigger>
            <Select.Content title="Halle auswählen">
                <HallenList
                    title="Bloc-Hütte"
                    hallen={[
                        "BLOC_HUETTE_HAUPTHALLE",
                        "BLOC_HUETTE_AUSSENBEREICH",
                        "BLOC_HUETTE_NEUEHALLE",
                    ]}
                />
            </Select.Content>
        </Select>
    )
}

type HallenListProps = {
    title: React.ReactNode
    hallen: Halle[]
}
function HallenList(props: HallenListProps) {
    if (props.hallen.length === 0) {
        return null
    }

    return (
        <Select.List title={props.title}>
            {props.hallen.map(halle => (
                <Select.Item key={halle} value={halle}>
                    {formatHalle(halle)}
                </Select.Item>
            ))}
        </Select.List>
    )
}

function formatHalle(halle: Halle): string {
    switch (halle) {
        case "BLOC_HUETTE_HAUPTHALLE":
            return "Haupthalle"
        case "BLOC_HUETTE_AUSSENBEREICH":
            return "Aussenbereich"
        case "BLOC_HUETTE_NEUEHALLE":
            return "Neue Halle"
    }
}
