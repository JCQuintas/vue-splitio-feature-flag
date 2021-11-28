import { createInitClient } from './create-init-client'
import Vue from 'vue'
import { SplitFactory } from '@splitsoftware/splitio'

jest.mock('@splitsoftware/splitio', () => ({
  SplitFactory: () => ({
    client: jest.fn((key?: string, trafficType?: string) => ({
      key,
      trafficType,
      destroy: jest.fn(),
    })),
  }),
}))

const createFactory = () =>
  SplitFactory({
    core: {
      authorizationKey: 'localhost',
    },
  })
const clientMap = new Map()

beforeEach(() => {
  Vue.prototype.$splitIO = {}
  clientMap.clear()
})

it('should return a function when called', () => {
  const result = createInitClient(Vue, createFactory(), clientMap)

  expect(typeof result).toBe('function')
})

it('should return a client when initialized', () => {
  const initClient = createInitClient(Vue, createFactory(), clientMap)
  const client = initClient()

  expect(client).toBeDefined()
})

it('should use the provided getter functions', () => {
  const key = 'test-get-key'
  const getKey = jest.fn().mockReturnValue(key)
  const getTraffic = jest.fn()
  const initClient = createInitClient(
    Vue,
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
  const initClient = createInitClient(Vue, createFactory(), clientMap)
  initClient(key)

  expect(clientMap.get(key)).toBeDefined()
})

it('should only instantiate a client once for every key', () => {
  const key = 'test-key'
  const factory = createFactory()
  const initClient = createInitClient(Vue, factory, clientMap)
  initClient(key)
  initClient(key)

  expect(factory.client).toHaveBeenCalledTimes(1)
})

it('should define client instance on Vue prototype', () => {
  const initClient = createInitClient(Vue, createFactory(), clientMap)
  initClient()

  expect(Vue.prototype.$splitIO.client).toBeDefined()
})

it('should destroy the created client on window unload', () => {
  const initClient = createInitClient(Vue, createFactory(), clientMap)
  const client = initClient()

  window.dispatchEvent(new Event('beforeunload'))
  expect(client.destroy).toHaveBeenCalled()
})
