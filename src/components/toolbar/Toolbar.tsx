import { GymLevelSelect } from "@/components/gym-level-select/GymLevelSelect"
import { IconButton } from "@/ui/icon-button/IconButton"
import { LayersIcon } from "lucide-react"
import { CollectionSelect } from "../collection-select/CollectionSelect"

export function Toolbar() {
    return (
        <div className="border-b border-gray-100 flex items-center justify-between px-4 py-2">
            <GymLevelSelect />

            <CollectionSelect>
                <IconButton>
                    <LayersIcon />
                </IconButton>
            </CollectionSelect>
        </div>
    )
}
