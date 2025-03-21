import { GymLevelSelect } from "@/components/gym-level-select/GymLevelSelect"

export function Toolbar() {
    return (
        <div className="border-b border-gray-100 flex px-4 py-2">
            <GymLevelSelect />
        </div>
    )
}
