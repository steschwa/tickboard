import { Dialog } from "@base-ui-components/react/dialog"
import clsx from "clsx"
import { XIcon } from "lucide-react"

type DrawerProps = {
    children: React.ReactNode
}
export function Drawer(props: DrawerProps) {
    return <Dialog.Root>{props.children}</Dialog.Root>
}

type ContentProps = {
    title: React.ReactNode
    children: React.ReactNode
}
function Content(props: ContentProps) {
    return (
        <Dialog.Portal>
            <Dialog.Backdrop
                className={clsx(
                    "bg-gray-900 shadow fixed inset-0",
                    "transition-opacity opacity-20 data-[starting-style]:opacity-0 data-[ending-style]:opacity-0",
                )}
            />
            <Dialog.Popup
                className={clsx(
                    "fixed top-2 bottom-2 right-0 bg-white rounded-tl-2xl rounded-bl-2xl max-w-4/5 w-full p-4",
                    "transition-all opacity-100 translate-x-0 data-[starting-style]:opacity-0 data-[starting-style]:translate-x-1/2 data-[ending-style]:opacity-0 data-[ending-style]:translate-x-1/2",
                )}>
                <div className="flex items-center justify-between mb-6">
                    <Dialog.Title className="text-base font-semibold text-gray-900">
                        {props.title}
                    </Dialog.Title>
                    <Dialog.Close className="w-8 h-8 rounded-full bg-gray-50 text-gray-500 inline-flex items-center justify-center shrink-0">
                        <XIcon className="size-6" />
                    </Dialog.Close>
                </div>

                {props.children}
            </Dialog.Popup>
        </Dialog.Portal>
    )
}

Drawer.Trigger = Dialog.Trigger
Drawer.Content = Content
