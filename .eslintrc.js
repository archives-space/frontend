module.exports = {
  root: true,
  env: {
    browser: true,
    node: true
  },
  parserOptions: {
    parser: 'babel-eslint'
  },
  extends: [
    '@nuxtjs',
    'plugin:nuxt/recommended'
  ],
  plugins: [
  ],
  // add your custom rules here
  rules: {
    "vue/max-attributes-per-line": ["warn", {
      "singleline": 2,
      "multiline": {
        "max": 2,
        "allowFirstLine": false
      }
    }],
    "arrow-parens": ["warn", "as-needed"]
  }
}
