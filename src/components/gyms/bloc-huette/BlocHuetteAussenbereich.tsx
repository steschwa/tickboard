export function BlocHuetteAussenbereich(
    props: React.ComponentPropsWithoutRef<"svg">,
) {
    return (
        <svg
            {...props}
            viewBox={`0 0 ${BLOC_HUETTE_AUSSENBEREICH_VB_WIDTH} ${BLOC_HUETTE_AUSSENBEREICH_VB_HEIGHT}`}
            xmlns="http://www.w3.org/2000/svg">
            <title>Bloc-Hütte Aussenhalle</title>
            <path
                fill="none"
                stroke="#929292"
                strokeWidth={10}
                d="M 26 567.050415 L 49.853912 567.050415 L 49.853912 372.34082 L 63.106087 337.885254 L 62.443478 299.453857 L 49.853912 266.323486 L 49.853912 115.813965 L 175.08696 64.130493 L 224.782608 64.130493 L 236.709564 96.598267 L 278.453918 96.598267 L 293.693909 64.130493 L 407 64.130493 L 407 31"
            />
            <path
                fill="none"
                stroke="#929292"
                strokeWidth={10}
                d="M 26 686.927124 L 51.014172 686.927124 L 51.014172 957.914063 L 51.709011 1237.239014 L 514.471191 1237.239014 L 514.471191 620.917603 L 464.442841 620.917603 L 464.442841 492.372559 L 485.982849 467.358398 L 485.982849 347.151428 L 425.531921 336.033936 L 425.531921 295.733276 L 514.471191 271.41394 L 515.471191 66.606445 L 489.762177 66.741943 L 489.762177 32"
            />
            <path
                fill="#74fbea"
                fillOpacity={0.5}
                fillRule="evenodd"
                stroke="#74fbea"
                strokeWidth={10}
                d="M 466 909.661255 L 505 909.661255 L 505 631 L 466 631 Z"
            />
            <path
                fill="none"
                stroke="#929292"
                strokeWidth={10}
                d="M 11.743809 627.796448 L 25.507021 621.592957 L 25.507021 627.54834 L 51.091125 627.54834 L 51.091125 628.044617 L 25.507021 628.044617 L 25.507021 634 Z"
            />
            <path
                fill="none"
                stroke="#929292"
                strokeWidth={10}
                d="M 449.203522 12.743774 L 455.407043 26.50708 L 449.45166 26.50708 L 449.45166 52.091064 L 448.955383 52.091064 L 448.955383 26.50708 L 443 26.50708 Z"
            />
            <path
                fill="#74fbea"
                fillOpacity={0.5}
                fillRule="evenodd"
                stroke="#74fbea"
                strokeWidth={10}
                d="M 466 1228 L 505 1228 L 505 1105.661255 L 466 1105.661255 Z"
            />
            <g>
                <path
                    fill="none"
                    stroke="#929292"
                    strokeWidth={10}
                    strokeOpacity={0.5}
                    strokeDasharray="20 10"
                    strokeDashoffset={0}
                    d="M 432 296.11969 L 298.671814 296.11969 L 298.671814 103"
                />
                <path
                    fill="none"
                    stroke="#929292"
                    strokeWidth={10}
                    strokeOpacity={0.5}
                    strokeDasharray="20 10"
                    strokeDashoffset={0}
                    d="M 255.374512 103 L 255.374512 296 L 61 296"
                />
                <path
                    fill="none"
                    stroke="#929292"
                    strokeWidth={10}
                    strokeOpacity={0.5}
                    strokeDasharray="20 10"
                    strokeDashoffset={0}
                    d="M 432 335.980713 L 63 336"
                />
            </g>
            <path
                fill="none"
                stroke="#929292"
                strokeWidth={10}
                strokeOpacity={0.5}
                strokeDasharray="20 10"
                strokeDashoffset={0}
                d="M 51.000801 566.998901 L 454.999359 566.99939"
            />
            <path
                fill="none"
                stroke="#929292"
                strokeWidth={10}
                strokeOpacity={0.5}
                strokeDasharray="20 10"
                strokeDashoffset={0}
                d="M 50.999748 519.000427 L 464.000366 519.000183"
            />
            <path
                fill="none"
                stroke="#929292"
                strokeWidth={10}
                strokeOpacity={0.5}
                strokeDasharray="20 10"
                strokeDashoffset={0}
                d="M 55 1074 L 216.648743 1074 L 216.648743 869 L 55 869"
            />

            {props.children}
        </svg>
    )
}

export const BLOC_HUETTE_AUSSENBEREICH_VB_WIDTH = 521
export const BLOC_HUETTE_AUSSENBEREICH_VB_HEIGHT = 1243
