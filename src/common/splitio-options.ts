export type SplitIOOptions = SplitIO.IBrowserSettings & {
  getCustomKey?: () => SplitIO.SplitKey | undefined
  getTrafficType?: () => string | undefined
  initImmediate?: boolean
  treatments?: string[]
}
