export default {
  name: 'text-or-input',
  props: ['showInput', 'textData', 'inputData', 'holder'],
  data () {
    return {

    }
  },
  methods: {
    change () {
      this.$emit('change', this.inputData)
    }
  }
}
