import { VueSplitIOPlugin } from './plugin'
import Vue from 'vue'
import { SplitFactory } from '@splitsoftware/splitio'
import { createInitClient } from './create-init-client'
import { VueSplitIOOptions } from '.'

jest.mock('./create-init-client')

const mockedInitClient = jest.fn()
const mockedGetKey = jest.fn()
const mockedGetTrafficType = jest.fn()
const mockedCreateInitClient = (createInitClient as jest.Mock).mockReturnValue(
  mockedInitClient,
)

const install = (options?: Partial<VueSplitIOOptions>) =>
  VueSplitIOPlugin.install(Vue, {
    core: { authorizationKey: 'localhost', key: 'test' },
    getCustomKey: mockedGetKey,
    getTrafficType: mockedGetTrafficType,
    ...options,
  })

beforeEach(() => {
  jest.clearAllMocks()
})

it('should call SplitFactory once when installing', () => {
  install()

  expect(SplitFactory).toHaveBeenCalledTimes(1)
  expect(SplitFactory).toHaveBeenCalledWith({
    core: { authorizationKey: 'localhost', key: 'test' },
  })
})

it('should call createInitClient once when installing', () => {
  install()

  expect(mockedCreateInitClient).toHaveBeenCalledTimes(1)
  expect(mockedCreateInitClient).toHaveBeenCalledWith(
    expect.anything(),
    expect.anything(),
    mockedGetKey,
    mockedGetTrafficType,
  )
})

it('should call initClient when initImmediate = true', () => {
  install({ initImmediate: true })

  expect(mockedInitClient).toHaveBeenCalled()
})

it('should not call initClient when initImmediate = false', () => {
  install({ initImmediate: false })

  expect(mockedInitClient).not.toHaveBeenCalled()
})

it('should initialize all variables in vue prototype', () => {
  install()

  expect(Vue.prototype.$splitIO).toBeDefined()
  expect(Vue.prototype.$splitIO.clientMap).toBeDefined()
  expect(Vue.prototype.$splitIO.factory).toBeDefined()
  expect(Vue.prototype.$splitIO.client).toBeDefined()
})
