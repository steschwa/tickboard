import { copyImageToClipboard } from "./clipboard"

function svgToImage(svg: SVGSVGElement): HTMLImageElement {
    const { width, height } = svg.getBoundingClientRect()

    const copy = svg.cloneNode(true) as SVGSVGElement
    copy.setAttribute("width", `${width}px`)
    copy.setAttribute("height", `${height}px`)

    const vb = copy.viewBox.baseVal
    copy.setAttribute("viewBox", `-50 -50 ${vb.width + 100} ${vb.height + 100}`)

    const xml = new XMLSerializer().serializeToString(copy)
    const svgBlob = new Blob([xml], {
        type: "image/svg+xml",
    })

    const url = URL.createObjectURL(svgBlob)

    const img = new Image()
    img.src = url

    return img
}

function imageToCanvas(image: HTMLImageElement): Promise<HTMLCanvasElement> {
    const canvas = document.createElement("canvas")

    return new Promise((resolve, reject) => {
        image.addEventListener("load", () => {
            const ctx = canvas.getContext("2d")
            const scale = window.devicePixelRatio || 1

            if (!ctx) {
                reject("failed to get canvas context")
                return
            }

            canvas.width = image.width * scale
            canvas.height = image.height * scale
            canvas.style.width = `${image.width}px`
            canvas.style.height = `${image.height}px`

            ctx.scale(scale, scale)

            ctx.fillStyle = "white"
            ctx.fillRect(0, 0, canvas.width, canvas.height)

            ctx.drawImage(image, 0, 0)

            resolve(canvas)
        })
    })
}

function canvasToBlob(canvas: HTMLCanvasElement) {
    return new Promise<Blob>((resolve, reject) => {
        canvas.toBlob(blob => {
            if (!blob) {
                reject("creating blob from canvas failed")
                return
            }

            resolve(blob)
        })
    })
}

export async function shareSvg(svg: SVGSVGElement) {
    const image = svgToImage(svg)
    const canvas = await imageToCanvas(image)
    const blob = await canvasToBlob(canvas)

    await copyImageToClipboard(blob)

    image.remove()
    canvas.remove()
}
