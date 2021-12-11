export type Input = {
  shouldDisable: boolean
  shouldHide: boolean
  shouldWatch: boolean
  expectedCustomTreatments: string[]
  features: string[]
  key?: string
  attributes?: SplitIO.Attributes
}
