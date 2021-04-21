<template>
  <div>
    Bienvenue sur le back office!
  </div>
</template>

<script>
export default {
  layout: 'backoffice',
  mounted () {
    this.$store.commit('SET_TITLE', 'Backoffice!')
  }
}
</script>
