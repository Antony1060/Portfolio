module.exports = {
  root: true,
  env: {
    node: true
  },
  'extends': [
    'plugin:vue/essential',
    'eslint:recommended'
  ],
  parserOptions: {
    parser: 'babel-eslint'
  },
  rules: {
    'no-console': 'off',
    'no-debugger': 'off',
    'vue/valid-v-on': 'off',
    'vue/no-parsing-error': ["error", {
      // Color codes in terminal on home page break if this is enabled, I'm too lazy to fix this so yeah
      "control-character-in-input-stream": false
    }]
  }
}
