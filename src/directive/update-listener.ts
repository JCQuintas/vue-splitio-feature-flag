import { VNode } from 'vue'

export const updateListener = (
  vnode: VNode,
  client: SplitIO.IClient,
  remove?: boolean,
) => {
  if (!vnode.context) return null

  if (!remove) {
    client.addListener(
      client.Event.SDK_UPDATE,
      vnode.context.$forceUpdate.bind(vnode.context),
    )
  } else {
    client.removeListener(
      client.Event.SDK_UPDATE,
      vnode.context.$forceUpdate.bind(vnode.context),
    )
  }
}
