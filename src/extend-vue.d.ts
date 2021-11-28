import '@splitsoftware/splitio'
import 'vue'
import { ClientMap } from './plugin'

declare module 'vue/types/vue' {
  interface Vue {
    $splitIO: {
      clientMap: ClientMap
      client: SplitIO.IClient
      initClient: (
        key?: SplitIO.SplitKey,
        trafficType?: string,
      ) => SplitIO.IClient
      factory: SplitIO.ISDK
    }
  }
}
