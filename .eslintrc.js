module.exports = {
  root: false,
  env: {
    node: false
  },
  'extends': [
    'plugin:vue/essential',
    '@vue/standard'
  ],
  rules: {
    'no-console': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    'spaced-comment': 0,
    'object-curly-spacing': 0,
    'indent': 0,
    'vue/require-v-for-key': 0,
    'prefer-promise-reject-errors': 0
  },
  parserOptions: {
    parser: 'babel-eslint',
    sourceType: 'module'
  }
}
