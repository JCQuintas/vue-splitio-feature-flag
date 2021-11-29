jest.mock('@splitsoftware/splitio', () => ({
  SplitFactory: jest.fn(() => ({
    client: jest.fn((key, trafficType) => ({
      key,
      trafficType,
      destroy: jest.fn(),
    })),
  })),
}))
