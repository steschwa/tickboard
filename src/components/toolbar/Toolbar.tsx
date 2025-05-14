import { GymLevelSelect } from "@/components/gym-level-select/GymLevelSelect"
import { IconButton } from "@/ui/icon-button/IconButton"
import { ShareIcon } from "lucide-react"

type ToolbarProps = {
    onShare: () => void
}

export function Toolbar(props: ToolbarProps) {
    return (
        <div className="border-b border-gray-100 flex items-center justify-between px-4 py-2">
            <GymLevelSelect />

            <IconButton onClick={props.onShare}>
                <ShareIcon />
            </IconButton>
        </div>
    )
}
