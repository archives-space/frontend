<template>
  <div>
    <div v-if="showTop">
      <v-breadcrumbs
        :items="catalog.breadcrumbs"
        large
      >
        <template v-slot:item="{ item }">
          <v-breadcrumbs-item
            :to="item.href"
            :disabled="item.disabled"
          >
            {{ item.text }}
          </v-breadcrumbs-item>
        </template>
      </v-breadcrumbs>
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

export default {
  name: 'Browser',
  components: { BrowserCard, CreateCatalog },
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
