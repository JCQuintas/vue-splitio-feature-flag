import type { DirectiveBinding } from 'vue/types/options'
import { parseModifiers } from './parse-modifiers'

export const parseTreatments = (
  defaultTreatments: string[],
  positivePrefixes: string[],
  modifiers: DirectiveBinding['modifiers'],
  treatments?: string[],
): string[] =>
  [...new Set([...defaultTreatments, ...(treatments || [])])].filter(
    (treatment) => parseModifiers(modifiers, treatment, positivePrefixes),
  )
