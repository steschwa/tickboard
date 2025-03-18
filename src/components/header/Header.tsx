import clsx from "clsx"
import { Drawer } from "components/drawer/Drawer"
import { useAtom, useAtomValue } from "jotai"
import type { Halle } from "lib/types"
import { CircleCheckIcon, MenuIcon } from "lucide-react"
import { halleAtom } from "stores/halle"

export function Header() {
    const halle = useAtomValue(halleAtom)

    return (
        <header className="border-b border-gray-100 flex items-center justify-between px-4 py-2">
            <h1 className="text-gray-900 font-semibold text-base">
                {formatHalle(halle)}
            </h1>

            <Drawer>
                <Drawer.Trigger
                    type="button"
                    className="text-gray-500 focus:outline-none">
                    <MenuIcon className="size-6" />
                </Drawer.Trigger>

                <Drawer.Content title="Hallenübersicht">
                    <HallenList
                        title="Bloc-Hütte"
                        hallen={[
                            "BLOC_HUETTE_HAUPTHALLE",
                            "BLOC_HUETTE_AUSSENBEREICH",
                            "BLOC_HUETTE_NEUEHALLE",
                        ]}
                    />
                </Drawer.Content>
            </Drawer>
        </header>
    )
}

function formatHalle(halle: Halle): string {
    switch (halle) {
        case "BLOC_HUETTE_HAUPTHALLE":
            return "Bloc-Hütte Haupthalle"
        case "BLOC_HUETTE_AUSSENBEREICH":
            return "Bloc-Hütte Aussenbereich"
        case "BLOC_HUETTE_NEUEHALLE":
            return "Bloc-Hütte Neue Halle"
    }
}

type HallenListProps = {
    title: React.ReactNode
    hallen: Halle[]
}
function HallenList(props: HallenListProps) {
    const [selectedHalle, setSelectedHalle] = useAtom(halleAtom)

    if (props.hallen.length === 0) {
        return null
    }

    return (
        <div>
            <h4 className="mb-3 text-sm font-medium text-gray-900">
                {props.title}
            </h4>
            <div className="flex flex-col gap-y-2">
                {props.hallen.map(halle => {
                    const selected = halle === selectedHalle

                    return (
                        <button
                            key={halle}
                            type="button"
                            onClick={() => {
                                setSelectedHalle(halle)
                            }}
                            className={clsx(
                                "flex items-center justify-between p-3 rounded-xl border text-sm font-normal",
                                {
                                    "bg-white text-gray-900 border-gray-100":
                                        !selected,
                                    "bg-gray-800 text-white border-gray-900":
                                        selected,
                                },
                            )}>
                            {formatHalle(halle)}
                            <CircleCheckIcon
                                className={clsx("size-5", {
                                    invisible: !selected,
                                    visible: selected,
                                })}
                            />
                        </button>
                    )
                })}
            </div>
        </div>
    )
}
