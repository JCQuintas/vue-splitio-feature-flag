import { VNode } from 'vue'

export const createListener = (vnode: VNode, client: SplitIO.IClient) => {
  if (!vnode.context) return null

  client.addListener(client.Event.SDK_UPDATE, vnode.context.$forceUpdate)
}
