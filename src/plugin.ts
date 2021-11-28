import { SplitFactory } from '@splitsoftware/splitio'
import _Vue from 'vue'
import { createInitClient } from './create-init-client'

export type VueSplitIOOptions = {
  getCustomKey?: () => SplitIO.SplitKey | undefined
  getTrafficType?: () => string | undefined
  initImmediate?: boolean
  splitio: SplitIO.IBrowserSettings
}

export const VueSplitIOPlugin = {
  install(Vue: typeof _Vue, options: VueSplitIOOptions) {
    const factory = SplitFactory({ ...options.splitio })

    const clientMap = new Map<SplitIO.SplitKey | undefined, SplitIO.IClient>()
    Vue.prototype.$splitIO = {}
    Vue.prototype.$splitIO.clientMap = clientMap

    const initClient = createInitClient(Vue, factory, options, clientMap)

    options.initImmediate && initClient()

    Vue.prototype.$splitIO.factory = factory
    Vue.prototype.$splitIO.initClient = initClient
  },
}
