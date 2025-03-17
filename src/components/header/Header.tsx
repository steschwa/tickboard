import { MenuIcon } from "lucide-react"

export function Header() {
    return (
        <header className="border-b border-gray-100 flex items-center justify-between px-4 py-2">
            <h1 className="text-gray-900 font-semibold text-base">
                Bloc-Hütte Haupthalle
            </h1>

            <button type="button" className="text-gray-500 focus:outline-none">
                <MenuIcon className="size-6" />
            </button>
        </header>
    )
}
