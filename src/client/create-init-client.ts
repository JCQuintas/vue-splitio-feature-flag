import '@splitsoftware/splitio'
import type { SplitIOClientOptions, ClientMap } from './types'

export const createInitClient =
  (
    factory: SplitIO.ISDK,
    clientMap: ClientMap,
    getCustomKey?: SplitIOClientOptions['getCustomKey'],
    getTrafficType?: SplitIOClientOptions['getTrafficType'],
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
        void clientMap?.get?.(selectedKey)?.destroy()
      })
    }

    // @ts-expect-error We know it exists because we set it up above
    return clientMap.get(selectedKey)
  }
