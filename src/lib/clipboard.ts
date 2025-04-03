export async function copyImageToClipboard(imageBlob: Blob | Promise<Blob>) {
    const item = new ClipboardItem({ "image/png": imageBlob })
    await navigator.clipboard.write([item])
}
