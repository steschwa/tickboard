import type { Collection } from "@/lib/collection"
import { createLocalStorageKey } from "@/lib/storage"
import { atom } from "jotai"
import { createJSONStorage } from "jotai/utils"
import { atomWithStorage } from "jotai/utils"

export const collectionsAtom = atomWithStorage<Collection[]>(
    createLocalStorageKey("collections", 1),
    [],
    createJSONStorage(() => localStorage, {
        reviver: (key, value) => {
            const collectionKey = key as keyof Collection
            if (collectionKey === "createdAt") {
                return new Date(value as string)
            }

            return value
        },
    }),
)

const _collectionIdAtom = atomWithStorage<Collection["id"] | null>(
    createLocalStorageKey("collection", 1),
    null,
)

export const selectedCollectionAtom = atom(get => {
    const collectionId = get(_collectionIdAtom)
    if (!collectionId) {
        return
    }

    return get(collectionsAtom).find(collection => {
        return collection.id === collectionId
    })
})

export const setSelectedCollectionAtom = atom(
    null,
    (_, set, collectionId: Collection["id"]) => {
        set(_collectionIdAtom, collectionId)
    },
)
