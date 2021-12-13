type HTMLElementsWithDisable =
  | HTMLButtonElement
  | HTMLFieldSetElement
  | HTMLInputElement
  | HTMLOptGroupElement
  | HTMLOptionElement
  | HTMLSelectElement
  | HTMLTextAreaElement

const hasDisabledProperty = (
  element: HTMLElement,
): element is HTMLElementsWithDisable => Reflect.has(element, 'disabled')

export const handleFlagChange = (
  element: HTMLElement,
  shouldDisable?: boolean,
  shouldShow?: boolean,
): void => {
  if (shouldDisable) {
    if (hasDisabledProperty(element)) element.disabled = !shouldShow
  } else {
    element.hidden = !shouldShow
  }
}
