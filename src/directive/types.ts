export type Input = {
  shouldDisable: boolean
  shouldHide: boolean
  shouldWatch: boolean
  expectedTreatments: string[]
  features: string[]
  key?: string
  attributes?: SplitIO.Attributes
}
