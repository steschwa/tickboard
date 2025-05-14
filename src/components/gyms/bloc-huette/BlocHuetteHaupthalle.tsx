export function BlocHuetteHaupthalle(
    props: React.ComponentPropsWithRef<"svg">,
) {
    return (
        <svg
            {...props}
            viewBox={`0 0 ${BLOC_HUETTE_HAUPTHALLE_VB_WIDTH} ${BLOC_HUETTE_HAUPTHALLE_VB_HEIGHT}`}
            xmlns="http://www.w3.org/2000/svg">
            <title>Bloc-Hütte Haupthalle</title>
            <path
                fill="#929292"
                fillOpacity="0.5"
                fillRule="evenodd"
                stroke="#929292"
                strokeWidth="10"
                d="m225 1030 147-19.29L336 840H225z"
            />
            <path
                fill="#929292"
                fillOpacity="0.5"
                fillRule="evenodd"
                stroke="#929292"
                strokeWidth="10"
                d="M325 766v-22h52l-64-185-66 9-55-115-89 116 44 108 92 62-12 25Z"
            />
            <path
                fill="none"
                stroke="#929292"
                strokeWidth="10"
                d="M631 363v29l-174 55h-57l12 82h55l152-54h47v111l-50 40 50 40v109H487"
            />
            <path
                fill="none"
                stroke="#929292"
                strokeDasharray="20 10"
                strokeDashoffset="0"
                strokeOpacity="0.5"
                strokeWidth="10"
                d="M492 780v322"
            />
            <path
                fill="none"
                stroke="#929292"
                strokeWidth="10"
                d="m23 25 1 120 7 21v92l23 3v20l-23 3v49L5 427v602h126v68h219"
            />
            <path
                fill="none"
                stroke="#929292"
                strokeWidth="10"
                d="m112 25 2 131h41v-31h153l15 33h44l28-32V27h103v101l35 25-104 77-41 92 12 41h48l59-84h125v25"
            />
            <path
                fill="none"
                stroke="#929292"
                strokeDasharray="20 10"
                strokeDashoffset="0"
                strokeOpacity="0.5"
                strokeWidth="10"
                d="m401 363-1 81"
            />
            <path
                fill="none"
                stroke="#929292"
                strokeDasharray="20 10"
                strokeDashoffset="0"
                strokeOpacity="0.5"
                strokeWidth="10"
                d="M192 449 5 433"
            />
            <path
                fill="none"
                stroke="#929292"
                strokeDasharray="20 10"
                strokeDashoffset="0"
                strokeOpacity="0.5"
                strokeWidth="10"
                d="m191 448 121 109"
            />
            <path
                fill="none"
                stroke="#929292"
                strokeDasharray="20 10"
                strokeDashoffset="0"
                strokeOpacity="0.5"
                strokeWidth="10"
                d="M107 568 3 562"
            />
            <path
                fill="none"
                stroke="#929292"
                strokeDasharray="20 10"
                strokeDashoffset="0"
                strokeOpacity="0.5"
                strokeWidth="10"
                d="m225 998-93 32"
            />
            <path
                fill="none"
                stroke="#929292"
                strokeDasharray="20 10"
                strokeDashoffset="0"
                strokeOpacity="0.5"
                strokeWidth="10"
                d="m227 1028-93 31"
            />
            <path
                fill="none"
                stroke="#929292"
                strokeDasharray="20 10"
                strokeDashoffset="0"
                strokeOpacity="0.5"
                strokeWidth="10"
                d="M225 765v75"
            />
            <path
                fill="none"
                stroke="#929292"
                strokeDasharray="20 10"
                strokeDashoffset="0"
                strokeOpacity="0.5"
                strokeWidth="10"
                d="m323 762 13 79"
            />
            <path
                fill="none"
                stroke="#929292"
                strokeWidth="10"
                d="m651.256 333.204-13.763 6.203v-5.955h-25.584v-.497h25.584V327Z"
            />
            <path
                fill="none"
                stroke="#929292"
                strokeWidth="10"
                d="m421.204 1079.744 6.203 13.763h-5.955v25.584h-.497v-25.584H415Z"
            />
            <path
                fill="none"
                stroke="#929292"
                strokeWidth="10"
                d="m69.796 45.256-6.203-13.763h5.955V5.909h.497v25.584H76Z"
            />
            <path
                fill="#74fbea"
                fillOpacity="0.5"
                fillRule="evenodd"
                stroke="#74fbea"
                strokeWidth="10"
                d="m129.699 312.301 86.602 50 50-86.602-86.602-50z"
            />

            {props.children}
        </svg>
    )
}

export const BLOC_HUETTE_HAUPTHALLE_VB_WIDTH = 671
export const BLOC_HUETTE_HAUPTHALLE_VB_HEIGHT = 1125
