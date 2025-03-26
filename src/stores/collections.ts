import type { Collection } from "@/lib/collection"
import { createLocalStorageKey } from "@/lib/storage"
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
