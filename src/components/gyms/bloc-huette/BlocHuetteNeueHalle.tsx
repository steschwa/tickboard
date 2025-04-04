export function BlocHuetteNeueHalle(props: React.ComponentPropsWithRef<"svg">) {
    return (
        <svg
            {...props}
            viewBox={`0 0 ${BLOC_HUETTE_NEUE_HALLE_VB_WIDTH}} ${BLOC_HUETTE_NEUE_HALLE_VB_HEIGHT}`}
            xmlns="http://www.w3.org/2000/svg">
            <title>Bloc-Hütte Neue Halle</title>
            <path
                fill="none"
                stroke="#929292"
                strokeWidth={10}
                d="M 597.441956 1231 L 597.441956 1138.49585 L 553.230408 1138.49585 L 553.230408 1073.19873 L 341.69516 1073.19873 L 243.749588 1129.653564 L 138.322037 1129.653564 L 55.340366 1046.671875 L 55.340366 684.817322 L 90.709602 684.817322 L 90.709602 648.767883 L 7.047751 648.767883 L 7.047751 265.827881 L 80.506943 265.827881 L 80.506943 217.535278 L 5.007218 217.535278 L 5.007218 10.76123 L 317.208771 10.76123 L 394.749023 74.697998 L 394.749023 179.445313 L 334.213226 225.697388 L 334.213226 291.674622 L 378.424774 320.922241 L 551.18988 320.922241 L 551.18988 214.134399 L 526.703491 193.729004 L 526.703491 110.747314 L 550.509705 94.423096 L 550.509705 6 L 743 7.360352 L 743 1231"
            />
            <path
                fill="none"
                stroke="#929292"
                strokeWidth={10}
                strokeOpacity={0.5}
                strokeDasharray="20 10"
                strokeDashoffset={0}
                d="M 334.001007 290.999817 L 366.999298 466.000427"
            />
            <path
                fill="none"
                stroke="#929292"
                strokeWidth={10}
                strokeOpacity={0.5}
                strokeDasharray="20 10"
                strokeDashoffset={0}
                d="M 551.001526 319.000244 L 523.002563 510.999878"
            />
            <path
                fill="none"
                stroke="#929292"
                strokeWidth={10}
                d="M 673.203552 1203.743774 L 679.407043 1217.50708 L 673.45166 1217.50708 L 673.45166 1243.091064 L 672.955383 1243.091064 L 672.955383 1217.50708 L 667 1217.50708 Z"
            />
            <path
                fill="#929292"
                fillOpacity={0.5}
                fillRule="evenodd"
                stroke="#929292"
                strokeWidth={10}
                d="M 550 907 L 550 543.252075 L 486.14682 465.767334 L 364.180054 465.767334 L 291 627.193909 L 333.329651 655.1745 L 333.329651 907 L 550 907 Z"
            />

            {props.children}
        </svg>
    )
}

export const BLOC_HUETTE_NEUE_HALLE_VB_WIDTH = 748
export const BLOC_HUETTE_NEUE_HALLE_VB_HEIGHT = 1249
