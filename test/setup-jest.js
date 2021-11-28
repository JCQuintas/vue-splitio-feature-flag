jest.mock('@splitsoftware/splitio', () => ({
  SplitFactory: () => ({
    client: jest.fn((key, trafficType) => ({
      key,
      trafficType,
      destroy: jest.fn(),
    })),
  }),
}))
