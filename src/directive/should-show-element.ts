import type { Input } from './input'

export const shouldShowElement = (
  client: SplitIO.IClient,
  input: Input,
): boolean => {
  const result = Object.values(
    client.getTreatments(input.features, input.attributes) || {},
  )

  const shouldShow =
    result.length >= 1 &&
    result.every((treatment) => input.expectedTreatments.includes(treatment))

  return shouldShow
}
