<template>
  <v-card
    ripple
    class="mx-auto"
    elevation="3"
    min-width="260"
    :max-width="maxWidth"
    :min-height="minHeight"
    style="cursor: pointer;"
    @click="navigate"
  >
    <v-img
      class="white--text align-end"
      :height="minHeight*0.75"
      :src="data.image"
    />

    <v-card-subtitle
      v-if="entityType == 'album'"
      class="pb-0 text-caption"
    >
      {{ data.photosCount }} pictures in {{ data.albumsCount }} sub-albums
    </v-card-subtitle>

    <v-card-text class="album-title text-subtitle-2 font-weight-bold mb-0 mt-2">
      {{ data.name }}
    </v-card-text>
  </v-card>
</template>

<script>
export default {
  name: 'BrowserCard',
  props: {
    entityType: {
      type: String,
      default: 'album'
    },
    data: {
      type: Object,
      default: () => ({
        name: '',
        slug: '',
        image: '',
        photosCount: 0,
        albumsCount: 0
      })
    }
  },
  computed: {
    maxWidth () {
      switch (this.$vuetify.breakpoint.name) {
        case 'xs':
          return 275
        case 'sm':
          return 200
        case 'xl':
          return 275
      }
      return 265
    },
    minHeight () {
      switch (this.$vuetify.breakpoint.name) {
        case 'xl':
          return 250
      }
      return 232
    }
  },
  methods: {
    navigate () {
      if (this.entityType === 'album') {
        this.$router.push('/album/' + this.data.slug)
      } else {
        this.$router.push('/picture/' + this.data.slug)
      }
    }
  }
}
</script>

<style scoped>
.album-title {
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
</style>
