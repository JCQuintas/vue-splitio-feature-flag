import { VueSplitIOError } from 'utilities/vue-splitio-error'

export const checkErrors = (
  shouldDisable: boolean,
  shouldHide: boolean,
  name: string,
): void => {
  if (!shouldDisable && !shouldHide)
    throw new VueSplitIOError(
      `The ${name} directive needs one of ".hide" or ".disable" modifiers, eg: <div ${name}.hide="'FEATURE'"`,
    )

  if (shouldDisable && shouldHide)
    throw new VueSplitIOError(
      `The ${name} directive should only receive one of ".hide" or ".disable"`,
    )
}
