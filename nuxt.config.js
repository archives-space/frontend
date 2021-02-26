export default {
  // Global page headers (https://go.nuxtjs.dev/config-head)
  // example: https://github.com/retrobox/web/blob/master/nuxt.config.js
  head: {
    title: 'wikiarchives.space',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
    ]
  },

  // Global CSS (https://go.nuxtjs.dev/config-css)
  css: [
  ],

  // Plugins to run before rendering page (https://go.nuxtjs.dev/config-plugins)
  plugins: [
    { src: '~/plugins/snackbars.js', mode: 'client' },
    { src: '~/plugins/cookie.js', mode: 'client' }
  ],

  // Auto import components (https://go.nuxtjs.dev/config-components)
  components: true,

  // Modules for dev and build (recommended) (https://go.nuxtjs.dev/config-modules)
  buildModules: [
    // https://go.nuxtjs.dev/eslint
    '@nuxtjs/eslint-module',
    '@nuxtjs/vuetify'
  ],

  // Modules (https://go.nuxtjs.dev/config-modules)
  modules: [
    '@nuxt/http',
    'cookie-universal-nuxt'
  ],

  // Http module config https://http.nuxtjs.org/options
  http: {
    proxy: true,
    retry: false,
    prefix: '/api/'
  },

  // publicRuntimeConfig: {},

  proxy: {
    '/api/': {
      target: process.env.API_BASE_URL,
      pathRewrite: { '^/api/': '' }
    }
  },

  // Build Configuration (https://go.nuxtjs.dev/config-build)
  // build: {
  // },

  eslint: {
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
}
