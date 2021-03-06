import type { VNode } from 'vue'
import { VueSplitIOError } from '../utilities/vue-splitio-error'
import type { Input } from './input'

export const getClient = async (
  vnode: VNode,
  key: Input['key'],
): Promise<SplitIO.IClient> => {
  const client = vnode.context?.$splitIO.client(key)

  if (!client)
    throw new VueSplitIOError(
      `Couldn't start a new client with key ${key || ''}`,
    )

  await client?.ready()
  return client
}
