import { HalleLevelSelect } from "@/components/halle-level-select/HalleLevelSelect"

export function Toolbar() {
    return (
        <div className="border-b border-gray-100 flex px-4 py-2">
            <HalleLevelSelect />
        </div>
    )
}
