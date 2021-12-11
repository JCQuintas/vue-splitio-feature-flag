import { VNode } from 'vue'

export const removeListener = (vnode: VNode, client: SplitIO.IClient) => {
  if (!vnode.context) return null

  client.removeListener(client.Event.SDK_UPDATE, vnode.context.$forceUpdate)
}
