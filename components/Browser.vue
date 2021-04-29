<template>
  <div>
    <div v-if="showTop">
      <CatalogBreadcrumb :items="catalog.breadcrumbs" />
      <v-divider />
    </div>
    <v-row justify="center">
      <div
        v-for="child in catalog.childrens"
        :key="child.id"
        class="pa-3"
      >
        <BrowserCard
          :data="child"
          :base-path="catalog.path"
          entity-type="album"
        />
      </div>
    </v-row>
    <v-row justify="center">
      <div
        v-for="picture in catalog.pictures"
        :key="picture.id"
        class="pa-3"
      >
        <BrowserCard
          :data="picture"
          entity-type="picture"
        />
      </div>
    </v-row>
    <CreateCatalog
      ref="createCatalog"
      class="mt-5"
    />
  </div>
</template>

<script>
import BrowserCard from '~/components/BrowserCard'
import CreateCatalog from '~/components/Catalog/CreateCatalog'
import CatalogBreadcrumb from '~/components/CatalogBreadcrumb'

export default {
  name: 'Browser',
  components: { CatalogBreadcrumb, BrowserCard, CreateCatalog },
  props: {
    catalog: {
      type: Object,
      default: () => {}
    },
    showTop: {
      type: Boolean,
      default: true
    }
  }
}
</script>
