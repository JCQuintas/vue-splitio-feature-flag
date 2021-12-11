import { DirectiveBinding } from 'vue/types/options'
import { parseModifiers } from './parse-modifiers'
import { parseValue } from './parse-value'
import { Input } from './types'

const disable = 'disable'
const hide = 'hide'
const watch = 'watchForChanges'
const then = ['then']
const and = ['and']

const positivePrefixes = ['or', 'orIs', 'orAre', 'is', 'are']

const defaultTreatments = ['on', 'off', 'control']

export const parseAllInput = (
  treatments: string[],
  modifiers: DirectiveBinding['modifiers'],
  value: DirectiveBinding['value'],
): Input => {
  const shouldDisable = parseModifiers(modifiers, disable, then)
  const shouldHide = parseModifiers(modifiers, hide, then)
  const shouldWatch = parseModifiers(modifiers, watch, and)

  const expectedCustomTreatments = [
    ...new Set([...defaultTreatments, ...treatments]),
  ].filter((treatment) =>
    parseModifiers(modifiers, treatment, positivePrefixes),
  )

  return {
    shouldDisable,
    shouldHide,
    shouldWatch,
    expectedCustomTreatments,
    ...parseValue(value),
  }
}
