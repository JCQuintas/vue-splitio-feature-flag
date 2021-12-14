import { SplitIOClient } from './splitio-client'
import Vue from 'vue'
import { SplitFactory } from '@splitsoftware/splitio'
import { createInitClient } from './create-init-client'
import type { SplitIOOptions } from 'common/splitio-options'

jest.mock('./create-init-client')

const mockedInitClient = jest.fn()
const mockedGetKey = jest.fn()
const mockedGetTrafficType = jest.fn()
const mockedCreateInitClient = (createInitClient as jest.Mock).mockReturnValue(
  mockedInitClient,
)

const install = (options?: Partial<SplitIOOptions>) =>
  SplitIOClient.install(Vue, {
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

it('should call initClient when initImmediate = undefined', () => {
  install()

  expect(mockedInitClient).toHaveBeenCalled()
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

  // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
  expect(Vue.prototype.$splitIO).toBeDefined()
  // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
  expect(Vue.prototype.$splitIO.clientMap).toBeDefined()
  // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
  expect(Vue.prototype.$splitIO.factory).toBeDefined()
  // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
  expect(Vue.prototype.$splitIO.client).toBeDefined()
})
