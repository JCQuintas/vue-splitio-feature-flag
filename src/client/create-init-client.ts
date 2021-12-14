import '@splitsoftware/splitio'
import type { ClientMap } from './types'
import type { SplitIOOptions } from 'common/splitio-options'

export const createInitClient =
  (
    factory: SplitIO.ISDK,
    clientMap: ClientMap,
    getCustomKey?: SplitIOOptions['getCustomKey'],
    getTrafficType?: SplitIOOptions['getTrafficType'],
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
