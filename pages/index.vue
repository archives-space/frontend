<template>
  <div>
    <Banner
      class="cover-container"
      height="250px"
      title="The human spaceflight archive"
    >
      <div class="d-flex justify-center mt-2">
        <v-card-title class="text-h4 text-md-h3 home-header-title">
          The human spaceflight archive
        </v-card-title>
      </div>
    </Banner>

    <Container>
      <v-row justify="center">
        <v-col
          cols="12"
          xl="9"
          lg="10"
          md="11"
          xs="12"
        >
          <slot />
          <Browser
            :show-top="false"
            :catalog="catalog"
          />
        </v-col>
      </v-row>
    </Container>
  </div>
</template>

<script>
import Banner from '~/components/Banner'
import Browser from '~/components/Browser'
import Container from '~/components/Container'

export default {
  components: {
    Banner,
    Browser,
    Container
  },
  async asyncData ({ $http }) {
    const data = (await $http.$get('/catalogs/root')).data
    return { catalog: data }
  },
  data: () => ({
    catalogs: [],
    pictures: []
  }),
  head: () => ({
    title: 'Home'
  })
}
</script>

<style>
.header-title-container {
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
}

.home-header-title {
  word-break: initial !important;
  line-height: 1.5em !important;
}

.cover-container .v-responsive__content {
  height: 100%;
}
.cover-container .v-responsive__content div:first-child {
  height: 100%;
}
</style>
