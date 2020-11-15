<template>
  <v-app class="sticky-footer-container">
    <v-main class="sticky-footer-up">
      <Header />
      <Nuxt />
    </v-main>
    <Footer />
  </v-app>
</template>

<script>
import Header from '~/components/Header'
import Footer from '~/components/Footer'

export default {
  components: {
    Header,
    Footer
  },
  data: () => ({
    searchQuery: ''
  }),
  created () {
    this.$vuetify.theme.dark = true
  },
  head () {
    return {
      titleTemplate: '%s - WikiArchives.space',
      meta: [],
      htmlAttrs: {
        lang: 'en'
      }
    }
  }
}
</script>

<style>
.sticky-footer-up {
  flex: 1 0 auto;
}
.sticky-footer {
  flex-shrink: 0;
}
</style>
