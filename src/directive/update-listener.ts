import type { VNode } from 'vue'

export const updateListener = (
  vnode: VNode,
  client: SplitIO.IClient,
  remove?: boolean,
): void => {
  if (!vnode.context) return

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
