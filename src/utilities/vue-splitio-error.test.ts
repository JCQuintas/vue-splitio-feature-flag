import { VueSplitIOError } from './vue-splitio-error'

it('should throw the custom error', () => {
  expect(() => {
    throw new VueSplitIOError('test error')
  }).toThrowError(VueSplitIOError)
})

it('should have the proper name, message and stack', () => {
  const error = new VueSplitIOError('test error')
  expect(error.name).toBe('VueSplitIOError')
  expect(error.message).toBe('test error')
  expect(error.stack).toMatch(/^VueSplitIOError: test error/)
})
