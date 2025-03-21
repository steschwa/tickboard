import { Select } from "@/components/select/Select"
import {
    type BlocHuetteLevel,
    type GymLevel,
    getLevelsByGym,
} from "@/lib/gym-level"
import {
    gymAtom,
    readOnlyGymLevelAtom,
    writeOnlyGymLevelAtom,
} from "@/stores/gym"
import clsx from "clsx"
import { useSetAtom } from "jotai"
import { useAtomValue } from "jotai"

export function GymLevelSelect() {
    const gym = useAtomValue(gymAtom)
    const gymLevel = useAtomValue(readOnlyGymLevelAtom)
    const setGymLevel = useSetAtom(writeOnlyGymLevelAtom)

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

type BlocHuetteItemProps = {
    level: BlocHuetteLevel
}
function BlocHuetteItem(props: BlocHuetteItemProps) {
    return (
        <Select.Item value={props.level}>
            <div className="flex items-center gap-x-3">
                <BlocHuetteDot level={props.level} />
                <span>{formatBlocHuetteLevelText(props.level)}</span>
            </div>
        </Select.Item>
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
