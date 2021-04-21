<template>
  <v-fade-transition>
    <div v-if="loading" class="loading-global">
      <v-progress-circular indeterminate size="50" style="color:white" />
    </div>
  </v-fade-transition>
</template>

<script>
export default {
  data: () => ({
    loading: false,
    hold: false
  }),
  methods: {
    start () {
      this.hold = true
      setTimeout(() => {
        if (this.hold) {
          this.loading = true
          this.hold = false
        }
      }, 100) // debouncing
    },
    finish () {
      this.loading = false
      this.hold = false
    }
  }
}
</script>

<style scoped>
  .loading-global{
    position: absolute;
    top: 0;
    left: 0;
    z-index: 9999;
    width: 100%;
    height: 100vh;
    background-color: rgba(44, 62, 80, 0.5);
    display: flex;
    justify-content: center;
    align-items: center;
  }
</style>
