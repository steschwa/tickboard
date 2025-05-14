import { GymSelect } from "@/components/gym-select/GymSelect"
import type { Gym } from "@/lib/gym"
import { gymAtom } from "@/stores/gym"
import { activeWorkspaceAtom } from "@/stores/workspaces"
import { IconButton } from "@/ui/icon-button/IconButton"
import clsx from "clsx"
import { useAtom, useAtomValue } from "jotai"
import { MapPinnedIcon } from "lucide-react"

export function Header() {
    const gym = useAtomValue(gymAtom)

    return (
        <header className="border-b border-gray-100 flex items-center justify-between px-4 py-2">
            <h1 className="text-gray-900 font-semibold text-base">
                {formatGym(gym)}
            </h1>

            <div className="flex justify-end gap-x-4 items-center">
                <GymSelect>
                    <IconButton>
                        <MapPinnedIcon />
                    </IconButton>
                </GymSelect>

                <WorkspacesList />
            </div>
        </header>
    )
}

function formatGym(gym: Gym): string {
    switch (gym) {
        case "BLOC_HUETTE_HAUPTHALLE":
            return "Bloc-Hütte: Haupthalle"
        case "BLOC_HUETTE_AUSSENBEREICH":
            return "Bloc-Hütte: Aussenbereich"
        case "BLOC_HUETTE_NEUEHALLE":
            return "Bloc-Hütte: Neue Halle"
    }
}

function WorkspacesList() {
    return (
        <div className="grid grid-cols-2 gap-x-1">
            <WorkspaceButton workspace={1} />
            <WorkspaceButton workspace={2} />
        </div>
    )
}

type WorkspaceButtonProps = {
    workspace: number
}
function WorkspaceButton(props: WorkspaceButtonProps) {
    const [activeWorkspace, setActiveWorkspace] = useAtom(activeWorkspaceAtom)

    const isActive = props.workspace === activeWorkspace

    return (
        <button
            type="button"
            onClick={() => {
                setActiveWorkspace(props.workspace)
            }}
            className={clsx(
                "px-3 h-8 rounded-lg text-base text-center border select-none",
                "focus:outline-none",
                {
                    "bg-gray-800 text-white border-gray-900": isActive,
                    "bg-gray-50 text-gray-600 border-gray-100": !isActive,
                },
            )}>
            {props.workspace}
        </button>
    )
}
