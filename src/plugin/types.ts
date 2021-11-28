export type ClientMap = Map<SplitIO.SplitKey | undefined, SplitIO.IClient>

export type VueSplitIOOptions = SplitIO.IBrowserSettings & {
  getCustomKey?: () => SplitIO.SplitKey | undefined
  getTrafficType?: () => string | undefined
  initImmediate?: boolean
}
