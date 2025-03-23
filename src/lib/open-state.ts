export type OpenState<TData = unknown> =
    | {
          open: true
          data: TData
      }
    | {
          open: false
      }
