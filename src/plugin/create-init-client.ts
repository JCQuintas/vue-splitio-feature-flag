import _Vue from 'vue'
import '@splitsoftware/splitio'
import type { VueSplitIOOptions, ClientMap } from './types'

export const createInitClient =
  (
    Vue: typeof _Vue,
    factory: SplitIO.ISDK,
    clientMap: ClientMap,
    getCustomKey?: VueSplitIOOptions['getCustomKey'],
    getTrafficType?: VueSplitIOOptions['getTrafficType'],
  ) =>
  (key?: SplitIO.SplitKey, trafficType?: string): SplitIO.IClient => {
    const selectedKey = key || getCustomKey?.()
    const selectedTrafficType = trafficType || getTrafficType?.()

    if (!clientMap.has(selectedKey)) {
      clientMap.set(
        selectedKey,
        factory.client(
          // @ts-expect-error This is an issue on SplitIO typing
          // client can accept undefined value for key
          selectedKey,
          selectedKey && selectedTrafficType,
        ),
      )

      window.addEventListener('beforeunload', () => {
        clientMap?.get?.(selectedKey)?.destroy()
      })
    }

    Vue.prototype.$splitIO.client = clientMap.get(selectedKey)

    // @ts-expect-error We know it exists because we set it up above
    return clientMap.get(selectedKey)
  }
