import { GymLevelSelect } from "@/components/gym-level-select/GymLevelSelect"
import { IconButton } from "@/ui/icon-button/IconButton"
import { LayersIcon, ShareIcon } from "lucide-react"
import { CollectionSelect } from "../collection-select/CollectionSelect"

type ToolbarProps = {
    onShare: () => void
}

export function Toolbar(props: ToolbarProps) {
    return (
        <div className="border-b border-gray-100 flex items-center justify-between px-4 py-2">
            <GymLevelSelect />

            <div className="flex justify-end gap-x-4 items-center">
                <IconButton onClick={props.onShare}>
                    <ShareIcon />
                </IconButton>
                <CollectionSelect>
                    <IconButton>
                        <LayersIcon />
                    </IconButton>
                </CollectionSelect>
            </div>
        </div>
    )
}
