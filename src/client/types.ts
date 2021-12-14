export type ClientMap = Map<SplitIO.SplitKey | undefined, SplitIO.IClient>

export type SplitIOClientOptions = SplitIO.IBrowserSettings & {
  getCustomKey?: () => SplitIO.SplitKey | undefined
  getTrafficType?: () => string | undefined
  initImmediate?: boolean
}
