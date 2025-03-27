export function mergeEventListeners<TEvent extends React.SyntheticEvent>(
    ...handlers: Array<React.EventHandler<TEvent> | undefined>
): React.EventHandler<TEvent> {
    return event => {
        for (const handler of handlers) {
            handler?.(event)
        }
    }
}
