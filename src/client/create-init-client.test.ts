import { createInitClient } from './create-init-client'
import { SplitFactory } from '@splitsoftware/splitio'
import type { ClientMap } from 'common/client-map'

const createFactory = () =>
  SplitFactory({
    core: {
      authorizationKey: 'localhost',
    },
  })
const clientMap: ClientMap = new Map()

beforeEach(() => {
  clientMap.clear()
})

it('should return a function when called', () => {
  const result = createInitClient(createFactory(), clientMap)

  expect(typeof result).toBe('function')
})

it('should return a client when initialized', () => {
  const initClient = createInitClient(createFactory(), clientMap)
  const client = initClient()

  expect(client).toBeDefined()
})

it('should use the provided getter functions', () => {
  const key = 'test-get-key'
  const getKey = jest.fn().mockReturnValue(key)
  const getTraffic = jest.fn()
  const initClient = createInitClient(
    createFactory(),
    clientMap,
    getKey,
    getTraffic,
  )
  initClient()

  expect(clientMap.get(key)).toBeDefined()
  expect(getKey).toHaveBeenCalled()
  expect(getTraffic).toHaveBeenCalled()
})

it('should use the provided key to create a client instance', () => {
  const key = 'test-key'
  const initClient = createInitClient(createFactory(), clientMap)
  initClient(key)

  expect(clientMap.get(key)).toBeDefined()
})

it('should only instantiate a client once for every key', () => {
  const key = 'test-key'
  const factory = createFactory()
  const initClient = createInitClient(factory, clientMap)
  initClient(key)
  initClient(key)

  expect(factory.client).toHaveBeenCalledTimes(1)
})

it('should destroy the created client on window unload', () => {
  const initClient = createInitClient(createFactory(), clientMap)
  const client = initClient()

  window.dispatchEvent(new Event('beforeunload'))
  expect(client.destroy).toHaveBeenCalled()
})
