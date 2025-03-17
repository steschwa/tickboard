import { SettingsIcon } from "lucide-react"
import { ColorPill } from "../color-pill/ColorPill"

export function Toolbar() {
    return (
        <div className="border-b border-gray-100 flex items-center justify-between px-4 py-2 gap-x-3">
            <div className="flex-1 overflow-x-auto scrollbar-hidden flex items-center gap-x-2">
                <ColorPill
                    active
                    className="bg-white text-gray-900 border-gray-200">
                    weiß
                </ColorPill>
                <ColorPill
                    active={false}
                    className="bg-blue-700 text-white border-blue-700">
                    blau
                </ColorPill>
                <ColorPill
                    active={false}
                    className="bg-red-700 text-white border-red-700">
                    rot
                </ColorPill>
                <ColorPill
                    active={false}
                    className="bg-gray-800 text-white border-gray-800">
                    schwarz
                </ColorPill>
            </div>

            <button type="button" className="text-gray-500 focus:outline-none">
                <SettingsIcon className="size-6" />
            </button>
        </div>
    )
}
