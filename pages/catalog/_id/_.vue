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
import { generatePath } from '~/lib/catalog'

export default {
  components: {
    Browser
  },

  asyncData ({ error, redirect, $http, route }) {
    let id = route.params.id
    if (id == null) {
      id = route.params.pathMatch
    }
    return $http.get('/catalogs/' + id).then(async res => {
      let catalog = (await res.json()).data
      catalog = { ...catalog, ...generatePath(catalog) }

      let pathMatch = route.params.pathMatch
      if (pathMatch.charAt(0) !== '/') {
        pathMatch = '/' + pathMatch
      }
      if (catalog.path !== pathMatch) {
        redirect('/catalog/' + catalog.id + catalog.path)
      }

      return { catalog }
    }).catch(e => {
      console.log('wow')
      console.log(e.statusCode)
      return error({ statusCode: 404, message: 'Catalog not found' })
    })
  },

  data: () => ({
    catalog: {}
  }),

  created () {
    // console.log(this.$route.params.id)
    // console.log(this.$route.params.pathMatch)
  },

  head () {
    return {
      title: this.catalog.name
    }
  }
}
</script>
