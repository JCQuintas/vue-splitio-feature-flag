import type { DirectiveBinding } from 'vue/types/options'
import { parseModifiers } from './parse-modifiers'
import { parseValue } from './parse-value'
import type { Input } from 'directive/types'
import { parseTreatments } from './parse-treatments'

const disable = 'disable'
const hide = 'hide'
const watch = 'watchForChanges'
const then = ['then']
const and = ['and']

const positivePrefixes = ['or', 'orIs', 'orAre', 'is', 'are']

const defaultTreatments = ['on', 'off', 'control']

export const parseAll = (
  modifiers: DirectiveBinding['modifiers'],
  value: DirectiveBinding['value'],
  treatments?: string[],
): Input => {
  const shouldDisable = parseModifiers(modifiers, disable, then)
  const shouldHide = parseModifiers(modifiers, hide, then)
  const shouldWatch = parseModifiers(modifiers, watch, and)

  const expectedTreatments = parseTreatments(
    defaultTreatments,
    positivePrefixes,
    modifiers,
    treatments,
  )

  return {
    shouldDisable,
    shouldHide,
    shouldWatch,
    expectedTreatments,
    ...parseValue(value),
  }
}
