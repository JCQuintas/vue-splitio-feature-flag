import '@splitsoftware/splitio'
import 'vue'
import type { ClientMap } from './common/client'

declare module 'vue/types/vue' {
  interface Vue {
    $splitIO: {
      clientMap: ClientMap
      client: (key?: SplitIO.SplitKey, trafficType?: string) => SplitIO.IClient
      factory: SplitIO.ISDK
    }
  }
}
