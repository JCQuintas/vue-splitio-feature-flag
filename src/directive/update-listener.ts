import { VNode } from 'vue'

export const updateListener = (
  vnode: VNode,
  client: SplitIO.IClient,
  remove?: boolean,
) => {
  if (!vnode.context) return null

  if (!remove) {
    client.addListener(client.Event.SDK_UPDATE, vnode.context.$forceUpdate)
  } else {
    client.removeListener(client.Event.SDK_UPDATE, vnode.context.$forceUpdate)
  }
}
