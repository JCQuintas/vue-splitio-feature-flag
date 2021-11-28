import '@splitsoftware/splitio'
import 'vue'

declare module 'vue/types/vue' {
  interface Vue {
    $splitIO: {
      clientMap: Map<SplitIO.SplitKey | undefined, SplitIO.IClient>
      client: SplitIO.IClient
      initClient: (
        key?: SplitIO.SplitKey,
        trafficType?: string,
      ) => SplitIO.IClient
      factory: SplitIO.ISDK
    }
  }
}
