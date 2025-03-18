import { HallenOverviewDrawer } from "components/hallen-overview-drawer/HallenOverviewDrawer"
import { useAtomValue } from "jotai"
import { formatHalle } from "lib/formatting/halle"
import { MenuIcon } from "lucide-react"
import { halleAtom } from "stores/halle"

export function Header() {
    const halle = useAtomValue(halleAtom)

    return (
        <header className="border-b border-gray-100 flex items-center justify-between px-4 py-2">
            <h1 className="text-gray-900 font-semibold text-base">
                {formatHalle(halle)}
            </h1>

            <HallenOverviewDrawer>
                <MenuIcon className="size-6" />
            </HallenOverviewDrawer>
        </header>
    )
}
