import Vue from 'vue'

Vue.filter('capitalize', val => val.toUpperCase())

// Convert a number to a english formatted string
Vue.filter('number', val => val.toString()
  .replace(/,/g, '')
  .replace(/\B(?=(\d{3})+(?!\d))/g, ',')
)

Vue.filter('formatDate', s => {
  if (s == null) {
    return ''
  }
  const d = new Date(s)
  return d.toLocaleString('en-GB', { timeZone: 'Europe/Paris' })
})
