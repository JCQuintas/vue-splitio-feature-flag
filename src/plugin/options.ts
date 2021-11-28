export type VueSplitIOOptions = SplitIO.IBrowserSettings & {
  getCustomKey?: () => SplitIO.SplitKey | undefined
  getTrafficType?: () => string | undefined
  initImmediate?: boolean
}
