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

  asyncData ({ error, redirect, $http, route }) {
    let id = route.params.id
    if (id == null) {
      id = route.params.pathMatch
    }
    return $http.get('/catalogs/' + id).then(async res => {
      const catalog = (await res.json()).data
      let path = ''
      const breadcrumbs = []
      catalog.breadcrumbs.forEach(item => {
        if (item.slug === 'root') {
          breadcrumbs.push({
            text: 'Home',
            slug: 'root',
            disabled: false,
            href: '/'
          })
          return
        }
        path += catalog.slug === 'root' ? '/' : '/' + item.slug
        breadcrumbs.push({
          text: item.title,
          slug: item.slug,
          href: '/catalog/' + item.id + path,
          path
        })
      })
      //console.log(JSON.parse(JSON.stringify(breadcrumbs)))
      const last = breadcrumbs[breadcrumbs.length - 1]
      last.disabled = true
      breadcrumbs[breadcrumbs.length - 1] = last
      catalog.breadcrumbs = breadcrumbs
      catalog.path = breadcrumbs[breadcrumbs.length - 1].path

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
