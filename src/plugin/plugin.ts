import { SplitFactory } from '@splitsoftware/splitio'
import _Vue from 'vue'
import { createInitClient } from './create-init-client'
import type { VueSplitIOOptions } from './options'
import type { ClientMap } from './client-map'

export const VueSplitIOPlugin = {
  install(Vue: typeof _Vue, options: VueSplitIOOptions) {
    const { getCustomKey, getTrafficType, initImmediate, ...splitio } = options

    const factory = SplitFactory({ ...splitio })

    const clientMap: ClientMap = new Map()
    Vue.prototype.$splitIO = {}
    Vue.prototype.$splitIO.clientMap = clientMap

    const initClient = createInitClient(
      Vue,
      factory,
      clientMap,
      getCustomKey,
      getTrafficType,
    )

    initImmediate && initClient()

    Vue.prototype.$splitIO.factory = factory
    Vue.prototype.$splitIO.initClient = initClient
  },
}
