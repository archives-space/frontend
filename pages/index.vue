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
      <Browser
        hide-breadcrumbs
        :albums="albums"
      />
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
  data: () => ({
    albums: [
      {
        id: '4258',
        name: 'US SPACE PROGRAM',
        image: 'https://www.wikiarchives.space/_data/i/upload/2020/07/22/20200722233701-f5d23cea-cu_e520x360.jpg',
        photosCount: 41792,
        albumsCount: 1266
      },
      {
        id: '58754',
        name: 'ISS',
        image: 'https://www.wikiarchives.space/_data/i/upload/2020/11/07/20201107132220-d995c15a-cu_e520x360.jpg',
        photosCount: 10105,
        albumsCount: 72
      },
      {
        id: '42558',
        name: 'MATED VERTICAL GROUND VIBRATION TEST',
        image: 'https://www.wikiarchives.space/_data/i/upload/2020/09/15/20200915012502-b10ef965-cu_e520x360.jpg',
        photosCount: 41792,
        albumsCount: 1266
      },
      {
        id: '4251',
        name: 'MICHOUD ASSEMBLY FACILITY',
        image: 'https://www.wikiarchives.space/_data/i/upload/2020/07/16/20200716201332-40f08ee9-cu_e520x360.jpg',
        photosCount: 1154,
        albumsCount: 7
      },
      {
        id: '7899',
        name: 'RUSSIAN SPACE PROGRAM',
        image: 'https://www.wikiarchives.space/_data/i/upload/2020/11/07/20201107134813-7c1be938-cu_e520x360.jpg',
        photosCount: 249,
        albumsCount: 11
      },
      {
        id: '4250',
        name: 'EUROPEAN SPACE PROGRAM',
        image: 'https://www.wikiarchives.space/_data/i/upload/2020/07/16/20200716201332-40f08ee9-cu_e520x360.jpg',
        photosCount: 1154,
        albumsCount: 7
      }
    ]
  }),
  head () {
    return {
      title: 'Home'
    }
  }
}
</script>

<style>
body {
  overflow-y: auto !important;
}

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
