import type { SplitIOOptions } from 'common/splitio-options'
import type _Vue from 'vue'
import { createDirectiveHandler } from './handler'

export const SplitIODirectives = {
  install(Vue: typeof _Vue, options?: SplitIOOptions): void {
    Vue.directive('if-feature', createDirectiveHandler(options))
    Vue.directive('if-features', createDirectiveHandler(options))
  },
}
