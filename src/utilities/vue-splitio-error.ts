export class VueSplitIOError extends Error {
  name = 'VueSplitIOError'

  constructor(message: string) {
    super(message)

    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, VueSplitIOError)
    }
  }
}
