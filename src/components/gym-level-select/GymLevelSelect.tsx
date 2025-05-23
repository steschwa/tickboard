import { type BlocHuetteLevel, type GymLevel, getLevelsByGym } from "@/lib/gym"
import { gymAtom, gymLevelAtom } from "@/stores/gym"
import { markersAtom } from "@/stores/markers"
import { workspaceAtom } from "@/stores/workspaces"
import { Select } from "@/ui/select/Select"
import clsx from "clsx"
import { useAtom } from "jotai"
import { useAtomValue } from "jotai"

export function GymLevelSelect() {
    const gym = useAtomValue(gymAtom)
    const [gymLevel, setGymLevel] = useAtom(gymLevelAtom)

    const levels = getLevelsByGym(gym)

    return (
        <Select
            value={gymLevel}
            onValueChange={level => {
                setGymLevel(level as GymLevel)
            }}>
            <Select.Trigger placeholder="Kategorie auswählen">
                <LevelValue level={gymLevel} />
            </Select.Trigger>
            <Select.Content title="Kategorie auswählen">
                <Select.List>
                    {Array.from(levels).map(level => (
                        <LevelItem key={level} level={level} />
                    ))}
                </Select.List>
            </Select.Content>
        </Select>
    )
}

type LevelItemProps = {
    level: GymLevel
}
function LevelItem(props: LevelItemProps) {
    switch (props.level) {
        case "BLOC_HUETTE_GELB":
        case "BLOC_HUETTE_GRUEN":
        case "BLOC_HUETTE_ORANGE":
        case "BLOC_HUETTE_WEISS":
        case "BLOC_HUETTE_BLAU":
        case "BLOC_HUETTE_ROT":
        case "BLOC_HUETTE_SCHWARZ":
            return <BlocHuetteItem level={props.level} />
        default:
            props.level satisfies never
    }
}

type ItemProps = {
    value: GymLevel

    level?: React.ReactNode
    text: React.ReactNode
}
function Item(props: ItemProps) {
    const activeGym = useAtomValue(gymAtom)
    const activeWorkspace = useAtomValue(workspaceAtom)
    const allMarkers = useAtomValue(markersAtom)

    const markersCount = allMarkers.filter(marker => {
        return (
            marker.gym === activeGym &&
            marker.workspace === activeWorkspace &&
            marker.level === props.value
        )
    }).length

    return (
        <Select.Item value={props.value}>
            <div className="flex items-center justify-between">
                <div className="flex items-center gap-x-3">
                    {props.level}
                    <span>{props.text}</span>
                </div>

                <span
                    className={clsx(
                        "text-xs rounded-full bg-gray-100 text-gray-600 inline-flex items-center justify-center size-6",
                        "group-data-[selected=true]:bg-gray-600 group-data-[selected=true]:text-white",
                    )}>
                    {markersCount}
                </span>
            </div>
        </Select.Item>
    )
}

type BlocHuetteItemProps = {
    level: BlocHuetteLevel
}
function BlocHuetteItem(props: BlocHuetteItemProps) {
    return (
        <Item
            value={props.level}
            level={<BlocHuetteDot level={props.level} />}
            text={formatBlocHuetteLevelText(props.level)}
        />
    )
}

type LevelValueProps = {
    level: GymLevel
}
function LevelValue(props: LevelValueProps) {
    switch (props.level) {
        case "BLOC_HUETTE_GELB":
        case "BLOC_HUETTE_GRUEN":
        case "BLOC_HUETTE_ORANGE":
        case "BLOC_HUETTE_WEISS":
        case "BLOC_HUETTE_BLAU":
        case "BLOC_HUETTE_ROT":
        case "BLOC_HUETTE_SCHWARZ":
            return <BlocHuetteValue level={props.level} />
        default:
            props.level satisfies never
    }
}

type BlocHuetteValueProps = {
    level: BlocHuetteLevel
}
function BlocHuetteValue(props: BlocHuetteValueProps) {
    return (
        <div className="flex items-center gap-x-2 text-gray-900">
            <BlocHuetteDot level={props.level} />
            <span>{formatBlocHuetteLevelText(props.level)}</span>
        </div>
    )
}

type BlocHuetteDotProps = {
    level: BlocHuetteLevel
}
function BlocHuetteDot(props: BlocHuetteDotProps) {
    let classes: string
    switch (props.level) {
        case "BLOC_HUETTE_GELB":
            classes = "bg-yellow-300 border-yellow-300"
            break
        case "BLOC_HUETTE_GRUEN":
            classes = "bg-lime-500 border-lime-500"
            break
        case "BLOC_HUETTE_ORANGE":
            classes = "bg-orange-400 border-orange-400"
            break
        case "BLOC_HUETTE_WEISS":
            classes = "bg-white border-gray-300"
            break
        case "BLOC_HUETTE_BLAU":
            classes = "bg-blue-700 border-blue-700"
            break
        case "BLOC_HUETTE_ROT":
            classes = "bg-red-500 border-red-500"
            break
        case "BLOC_HUETTE_SCHWARZ":
            classes =
                "bg-gray-800 border-gray-800 group-data-[selected]:border-gray-500"
            break
    }

    return <Dot className={classes} />
}

type DotProps = {
    className?: string
}
function Dot(props: DotProps) {
    return (
        <span
            className={clsx(
                "size-4 rounded-full shrink-0 border",
                props.className,
            )}
        />
    )
}

function formatBlocHuetteLevelText(level: BlocHuetteLevel): string {
    switch (level) {
        case "BLOC_HUETTE_GELB":
            return "Gelb"
        case "BLOC_HUETTE_GRUEN":
            return "Grün"
        case "BLOC_HUETTE_ORANGE":
            return "Orange"
        case "BLOC_HUETTE_WEISS":
            return "Weiß"
        case "BLOC_HUETTE_BLAU":
            return "Blau"
        case "BLOC_HUETTE_ROT":
            return "Rot"
        case "BLOC_HUETTE_SCHWARZ":
            return "Schwarz"
    }
}
