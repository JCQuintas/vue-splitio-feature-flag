import { checkErrors } from './check-errors'
import { handleFlagChange } from './handle-flag-change'
import type { DirectiveOptions } from 'vue'
import { parseAllInput } from './parse-all-input'
import { shouldShowElement } from './should-show-element'
import { createListener } from './create-listener'
import { isSameArray } from '../utilities/is-same-array'
import { removeListener } from './remove-listener'
import { getClient } from './get-client'

// v-if-feature.isOn.orIsOff.thenHide.andWatchForChanges
export const createDirectiveHandler = (
  treatments: string[],
): DirectiveOptions => ({
  bind: async (element, { modifiers, value, name }, vnode) => {
    const input = parseAllInput(treatments, modifiers, value)

    checkErrors(input.shouldDisable, input.shouldHide, name)

    handleFlagChange(element, input.shouldDisable)

    const client = await getClient(vnode, input.key)

    const shouldShow = await shouldShowElement(client, input)

    handleFlagChange(element, input.shouldDisable, shouldShow)

    input.shouldWatch && createListener(vnode, client)
  },
  update: async (element, { modifiers, value, name, oldValue }, vnode) => {
    const input = parseAllInput(treatments, modifiers, value)
    const oldInput = parseAllInput(treatments, modifiers, oldValue)

    checkErrors(input.shouldDisable, input.shouldHide, name)

    if (isSameArray(oldInput.features, input.features)) return null

    const client = await getClient(vnode, input.key)

    input.shouldWatch && removeListener(vnode, client)

    handleFlagChange(element, input.shouldDisable)

    const shouldShow = shouldShowElement(client, input)

    handleFlagChange(element, input.shouldDisable, shouldShow)

    input.shouldWatch && createListener(vnode, client)
  },
  unbind: async (_, { modifiers, value }, vnode) => {
    const input = parseAllInput(treatments, modifiers, value)

    const client = await getClient(vnode, input.key)

    input.shouldWatch && removeListener(vnode, client)
  },
})
