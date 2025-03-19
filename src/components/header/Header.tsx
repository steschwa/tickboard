import { HallenOverviewDrawer } from "@/components/hallen-overview-drawer/HallenOverviewDrawer"
import { formatHalle } from "@/lib/formatting/halle"
import { halleAtom } from "@/stores/halle"
import { useAtomValue } from "jotai"
import { MenuIcon } from "lucide-react"

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
