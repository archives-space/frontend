<template>
  <div>
    <v-row>
      <v-col
        cols="12" xs="12"
        sm="6"
      >
        <v-text-field
          v-model="latitude"
          label="Latitude"
        />
      </v-col>
      <v-col
        cols="12" xs="12"
        sm="6"
      >
        <v-text-field
          v-model="longitude"
          label="Longitude"
        />
      </v-col>
    </v-row>
    <no-ssr>
      <l-map
        ref="map"
        :zoom="leaflet.zoom"
        :center="leaflet.center"
        :options="leaflet.mapOptions"
      >
        <l-tile-layer
          :url="leaflet.url"
          :attribution="leaflet.attribution"
        />
        <l-marker :lat-lng="leaflet.marker" />
      </l-map>
    </no-ssr>
  </div>
</template>

<script>
export default {
  data: () => ({
    defaultPos: {
      lat: 47.41322,
      lng: -1.219482
    },
    leaflet: {
      zoom: 13,
      marker: [],
      center: [],
      mapOptions: {
        zoomSnap: 0.5
      },
      url: 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
      attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
    },
    latitude: 0,
    longitude: 0
  }),
  created () {
    if (this.$isServer) {
      return
    }
    this.leaflet.center = this.$parsePosition(this.leaflet.center)
    this.leaflet.marker = this.$parsePosition(this.leaflet.marker)
  },
  mounted () {
    if (this.$isServer) {
      return
    }
    this.setPos(this.defaultPos)
    this.$nextTick(() => {
      this.$nextTick(() => {
        console.log(this.$refs)
        this.$refs.map.mapObject.on('click', event => {
          this.leaflet.marker = event.latlng
          this.latitude = event.latlng.lat
          this.longitude = event.latlng.lng
        })
      })
    })
  },
  watch: {
    latitude () { this.refreshPosition() },
    longitude () { this.refreshPosition() }
  },
  methods: {
    getPos () {
      return { lat: this.latitude, lng: this.longitude }
    },
    setPos (pos) {
      this.latitude = pos.lat
      this.longitude = pos.lng
      this.leaflet.center = [pos.lat, pos.lng]
      this.leaflet.marker = [pos.lat, pos.lng]
    },
    refreshPosition () {
      this.setPos({ lat: this.latitude, lng: this.longitude })
    }
  }
}
</script>
