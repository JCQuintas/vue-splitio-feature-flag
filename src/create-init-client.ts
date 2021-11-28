import _Vue from 'vue'
import '@splitsoftware/splitio'
import { VueSplitIOOptions } from '.'

export const createInitClient =
  (
    Vue: typeof _Vue,
    factory: SplitIO.ISDK,
    options: VueSplitIOOptions,
    clientMap: Map<SplitIO.SplitKey | undefined, SplitIO.IClient>,
  ) =>
  (key?: SplitIO.SplitKey, trafficType?: string): SplitIO.IClient => {
    const selectedKey = key || options?.getCustomKey?.()
    const selectedTrafficType = trafficType || options?.getTrafficType?.()

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

    // We know it exists because we set it up above
    return clientMap.get(selectedKey) as SplitIO.IClient
  }
