<template>
  <div>
    <Browser :catalog="catalog" />
  </div>
</template>

<script>
/**
 * Route to show a album
 */

import Browser from '~/components/Browser'

export default {
  components: {
    Browser
  },

  async asyncData ({ $http, route }) {
    const catalog = (await $http.$get('/catalogs/' + route.params.pathMatch)).data
    catalog.breadcrumbs = catalog.breadcrumbs.map(item => {
      if (item.title === 'root') {
        return {
          text: 'Home',
          disabled: false,
          href: '/'
        }
      }
      return {
        text: item.title,
        href: '/catalog/' + item.id
      }
    })
    return { catalog }
  },

  data: () => ({
    catalog: {}
  }),

  created () {
    console.log(this.$route.params.pathMatch)
  },

  head () {
    return {
      title: this.catalog.name
    }
  }
}
</script>
