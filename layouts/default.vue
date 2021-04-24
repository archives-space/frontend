<template>
  <v-app class="sticky-footer-container">
    <v-main class="sticky-footer-up">
      <Header />
      <Nuxt />
    </v-main>
    <Footer />
    <SnackbarsStack ref="snackbarsStack" />
  </v-app>
</template>

<script>
import Header from '~/components/Header'
import Footer from '~/components/Footer'
import SnackbarsStack from '~/components/SnackbarsStack.vue'

export default {
  name: 'DefaultLayout',
  components: {
    Header,
    Footer,
    SnackbarsStack
  },
  data: () => ({
    searchQuery: ''
  }),
  created () {
    this.$vuetify.theme.dark = true
  },
  mounted () {
    this.$setSnackbars(this.$refs.snackbarsStack)
  }
}
</script>

<style>
html, body {
  overflow-x: hidden;
}

.sticky-footer-up {
  flex: 1 0 auto;
}
.sticky-footer {
  flex-shrink: 0;
}
</style>
