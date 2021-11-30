import { SplitFactory } from '@splitsoftware/splitio'
import _Vue from 'vue'
import { createInitClient } from './create-init-client'
import type { VueSplitIOOptions, ClientMap } from './types'

export const VueSplitIOPlugin = {
  install(Vue: typeof _Vue, options: VueSplitIOOptions) {
    const { getCustomKey, getTrafficType, initImmediate, ...splitio } = options

    const factory = SplitFactory({ ...splitio })

    const clientMap: ClientMap = new Map()

    const initClient = createInitClient(
      factory,
      clientMap,
      getCustomKey,
      getTrafficType,
    )

    const shouldInit = initImmediate ?? true
    shouldInit && initClient()

    Vue.prototype.$splitIO = {}
    Vue.prototype.$splitIO.clientMap = clientMap
    Vue.prototype.$splitIO.factory = factory
    Vue.prototype.$splitIO.client = initClient
  },
}
