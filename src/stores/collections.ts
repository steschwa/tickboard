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

export const selectedCollectionAtom = atom(
    get => {
        const collectionId = get(_collectionIdAtom)
        if (!collectionId) {
            return
        }

        return get(collectionsAtom).find(collection => {
            return collection.id === collectionId
        })
    },
    (_, set, collectionId: Collection["id"] | null) => {
        set(_collectionIdAtom, collectionId)
    },
)

export const addCollectionAtom = atom(null, (get, set, name: string) => {
    const collection: Collection = {
        id: get(collectionsAtom).length.toString(),
        name,
        createdAt: new Date(),
    }

    set(collectionsAtom, prev => [...prev, collection])
})

export const deleteCollectionAtom = atom(
    null,
    (_, set, id: Collection["id"]) => {
        set(collectionsAtom, prev => {
            return prev.filter(collection => {
                return collection.id !== id
            })
        })

        set(_collectionIdAtom, prev => {
            if (prev === id) {
                return null
            }
            return prev
        })
    },
)

type UpdateCollectionFn = (collection: Collection) => Collection
export const updateCollectionAtom = atom(
    null,
    (_, set, id: Collection["id"], updateFn: UpdateCollectionFn) => {
        set(collectionsAtom, prev => {
            return prev.map(collection => {
                if (collection.id === id) {
                    return updateFn(collection)
                }
                return collection
            })
        })
    },
)
