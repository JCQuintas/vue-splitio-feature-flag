import type { DirectiveBinding } from 'vue/types/options'

export const parseModifiers = (
  modifiers: DirectiveBinding['modifiers'],
  keyName: string,
  helpers: string[],
): boolean => {
  const expectedKeys = [
    keyName,
    ...helpers.map(
      (helper) =>
        `${helper}${keyName.charAt(0).toUpperCase()}${keyName.slice(1)}`,
    ),
  ]

  return Object.keys(modifiers).some((key) => expectedKeys.includes(key))
}
