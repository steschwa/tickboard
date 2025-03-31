import { Dialog as DialogPrimitive } from "@base-ui-components/react/dialog"
import clsx from "clsx"
import { XIcon } from "lucide-react"

type DialogProps = {
    open?: boolean
    onOpenChange?: (open: boolean) => void

    children: React.ReactNode
}
export function Dialog(props: DialogProps) {
    return (
        <DialogPrimitive.Root
            open={props.open}
            onOpenChange={props.onOpenChange}>
            {props.children}
        </DialogPrimitive.Root>
    )
}

type ContentProps = {
    title: React.ReactNode
    children: React.ReactNode
}
function Content(props: ContentProps) {
    return (
        <DialogPrimitive.Portal>
            <DialogPrimitive.Backdrop
                className={clsx(
                    "bg-gray-900 fixed inset-0",
                    "transition-opacity opacity-20 data-[starting-style]:opacity-0 data-[ending-style]:opacity-0",
                )}
            />
            <DialogPrimitive.Popup
                className={clsx(
                    "fixed bottom-0 left-0 right-0 bg-white rounded-tl-2xl rounded-tr-2xl p-4 max-h-4/5",
                    "transition-all opacity-100 translate-y-0 data-[starting-style]:opacity-0 data-[starting-style]:translate-y-1/2 data-[ending-style]:opacity-0 data-[ending-style]:translate-y-1/2",
                    "data-[has-nested-dialogs]:opacity-0",
                )}>
                <div className="flex items-center justify-between mb-6">
                    <DialogPrimitive.Title className="text-base font-semibold text-gray-900">
                        {props.title}
                    </DialogPrimitive.Title>
                    <DialogPrimitive.Close className="w-8 h-8 rounded-full bg-gray-50 text-gray-500 inline-flex items-center justify-center shrink-0">
                        <XIcon className="size-6" />
                    </DialogPrimitive.Close>
                </div>

                {props.children}
            </DialogPrimitive.Popup>
        </DialogPrimitive.Portal>
    )
}

Dialog.Trigger = DialogPrimitive.Trigger
Dialog.Content = Content
