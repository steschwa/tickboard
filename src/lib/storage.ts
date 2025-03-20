export function createLocalStorageKey(name: string, version: number): string {
    return `tickboard.${name}.v${version}`
}
