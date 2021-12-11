export const componentName = 'feature'

const allowedIsValues = ['allowed', 'forbidden', 'control']

export const componentHandler = {
  name: componentName,
  props: {
    flags: {
      type: [String, Array],
      required: true,
      validator: (item) =>
        typeof item === 'string' ||
        (Array.isArray(item) && item.every((v) => typeof v === 'string')),
    },
    states: {
      type: [String, Array],
      default: 'allowed',
      validator: (item) =>
        (typeof item === 'string' && allowedIsValues.includes(item)) ||
        (Array.isArray(item) && item.every((v) => allowedIsValues.includes(v))),
    },
  },
  data() {
    return {
      isVisible: false,
    }
  },
  render: function () {
    if (!this.isVisible) return null

    return this.$slots.default
  },
  computed: {
    parsedFlags() {
      const flags = Array.isArray(this.flags) ? this.flags : [this.flags]
      return flags.filter((flag) => typeof flag === 'string')
    },
    parsedStates() {
      const states = Array.isArray(this.states) ? this.states : [this.states]
      return states.filter((state) => allowedIsValues.includes(state))
    },
    expectedStates() {
      return [
        this.parsedStates.includes('allowed') && 'on',
        this.parsedStates.includes('forbidden') && 'off',
        this.parsedStates.includes('control') && 'control',
      ].filter(Boolean)
    },
  },
  methods: {
    async updateVisibility() {
      this.isVisible = await this.shouldShowFeature()
    },
    async shouldShowFeature() {
      const client = this.$featureFlagClient
      await client.ready().catch(() => {})

      const result = Object.values(client.getTreatments(this.parsedFlags))

      const shouldShow =
        result.length >= 1 &&
        result.every((treatment) => this.expectedStates.includes(treatment))

      return shouldShow
    },
  },
  async created() {
    this.updateVisibility()
  },
}
