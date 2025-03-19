import { Drawer } from "@/components/drawer/Drawer"
import { formatHalle } from "@/lib/formatting/halle"
import type { Halle } from "@/lib/halle"
import { halleAtom } from "@/stores/halle"
import clsx from "clsx"
import { useAtom } from "jotai"
import { CircleCheckIcon } from "lucide-react"

type HallenOverviewDrawerProps = {
    children: React.ReactNode
}

export function HallenOverviewDrawer(props: HallenOverviewDrawerProps) {
    return (
        <Drawer>
            <Drawer.Trigger
                type="button"
                className="text-gray-500 focus:outline-none">
                {props.children}
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
    )
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
                                })}
                            />
                        </button>
                    )
                })}
            </div>
        </div>
    )
}
