<template>
  <div>
    <v-breadcrumbs
      v-if="!hideBreadcrumbs"
      :items="navigationItems"
      large
    />
    <v-row justify="center">
      <div
        v-for="album in albums"
        :key="album.id"
        class="pa-3"
      >
        <BrowserCard
          :data="album"
          entity-type="album"
        />
      </div>
    </v-row>
  </div>
</template>

<script>
import BrowserCard from '~/components/BrowserCard'

export default {
  name: 'Browser',
  components: { BrowserCard },
  props: {
    albums: {
      type: Array,
      default: () => []
    },
    pictures: {
      type: Array,
      default: () => []
    },
    hideBreadcrumbs: {
      type: Boolean,
      default: false
    }
  },
  data: () => ({
    navigationItems: [
      {
        text: 'Dashboard',
        disabled: false,
        href: 'breadcrumbs_dashboard'
      },
      {
        text: 'Link 1',
        disabled: false,
        href: 'breadcrumbs_link_1'
      },
      {
        text: 'Link 2',
        disabled: true,
        href: 'breadcrumbs_link_2'
      }
    ]
  })
}
</script>
