import type { DirectiveBinding } from 'vue/types/options'
import { VueSplitIOError } from '../../utilities/vue-splitio-error'
import type { Input } from '../types'

type Feature = string | string[]
type DirectiveValue = Partial<Pick<Input, 'key' | 'features' | 'attributes'>>

const isObject = (value: unknown): value is DirectiveValue =>
  typeof value === 'object' && !Array.isArray(value) && value !== null

const isValidArray = (value: unknown): value is string[] =>
  Array.isArray(value) && value.every((v) => typeof v === 'string')

export const parseValue = (
  value: DirectiveBinding['value'],
): Pick<Input, 'features' | 'key' | 'attributes'> => {
  const isDirectiveShape = isObject(value)

  const featureNames = isDirectiveShape ? value.features : (value as Feature)
  const key = isDirectiveShape ? value.key : undefined
  const attributes = isDirectiveShape ? value.attributes : undefined

  const features = Array.isArray(featureNames) ? featureNames : [featureNames]

  if (!isValidArray(features))
    throw new VueSplitIOError(
      'At least one feature name must be present on input',
    )

  return {
    features,
    key,
    attributes,
  }
}
