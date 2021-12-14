import { checkErrors } from './check-errors'
import { handleFlagChange } from './handle-flag-change'
import type { DirectiveOptions } from 'vue'
import { parseAll } from './parsers/parse-all'
import { shouldShowElement } from './should-show-element'
import { isSameArray } from 'utilities/is-same-array'
import { getClient } from './get-client'
import { parseValue } from './parsers/parse-value'
import { updateListener } from './update-listener'
import type { SplitIOOptions } from 'common/splitio-options'

const bindAndUpdate =
  (options?: SplitIOOptions): DirectiveOptions['bind'] =>
  async (element, { modifiers, value, name, oldValue }, vnode) => {
    const input = parseAll(modifiers, value, options?.treatments)
    const oldInput = parseValue(oldValue)
    const client = await getClient(vnode, input.key)

    checkErrors(input.shouldDisable, input.shouldHide, name)

    if (isSameArray(oldInput.features, input.features)) return null

    if (input.shouldWatch) updateListener(vnode, client, true)

    handleFlagChange(element, input.shouldDisable)

    const shouldShow = shouldShowElement(client, input)

    handleFlagChange(element, input.shouldDisable, shouldShow)

    if (input.shouldWatch) updateListener(vnode, client)
  }

export const createDirectiveHandler = (
  options?: SplitIOOptions,
): DirectiveOptions => ({
  bind: bindAndUpdate(options),
  update: bindAndUpdate(options),
  unbind: async (_, { modifiers, value }, vnode) => {
    const input = parseAll(modifiers, value, options?.treatments)

    const client = await getClient(vnode, input.key)

    input.shouldWatch && updateListener(vnode, client, true)
  },
})
