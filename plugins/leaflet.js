import Vue from 'vue'
import { LMap, LTileLayer, LMarker } from 'vue2-leaflet'
import 'leaflet/dist/leaflet.css'
import { latLng } from 'leaflet'

Vue.component('l-map', LMap)
Vue.component('l-tile-layer', LTileLayer)
Vue.component('l-marker', LMarker)

export default (app, inject) => {
  inject('parsePosition', params => {
    console.log('wow', params)
    return latLng(params)
  })
}
