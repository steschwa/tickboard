import { HalleLevelSelect } from "@/components/halle-level-select/HalleLevelSelect"
import { SettingsIcon } from "lucide-react"

export function Toolbar() {
    return (
        <div className="border-b border-gray-100 flex items-center justify-between px-4 py-2 gap-x-3">
            <HalleLevelSelect />

            <button type="button" className="text-gray-500 focus:outline-none">
                <SettingsIcon className="size-6" />
            </button>
        </div>
    )
}
