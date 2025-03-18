import { SettingsIcon } from "lucide-react"

export function Toolbar() {
    return (
        <div className="border-b border-gray-100 flex items-center justify-between px-4 py-2 gap-x-3">
            <div className="flex-1 overflow-x-auto scrollbar-hidden gap-x-2 grid grid-cols-4"></div>

            <button type="button" className="text-gray-500 focus:outline-none">
                <SettingsIcon className="size-6" />
            </button>
        </div>
    )
}
