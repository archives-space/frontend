<template>
  <v-fade-transition>
    <div
      v-if="loading"
      class="loading-global"
    >
      <v-progress-circular
        indeterminate
        size="50"
        class="mb-2"
        style="color:white"
      />
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
      // debouncing
      setTimeout(() => {
        if (this.hold) {
          // enable the actual loader
          document.body.setAttribute('class', document.body.className + ' body-no-overflow')
          this.loading = true
          this.hold = false
        }
      }, 100)
    },
    finish () {
      this.loading = false
      this.hold = false
      document.body.setAttribute('class', document.body.className.replace(' body-no-overflow', ''))
    }
  }
}
</script>

<style>
  .body-no-overflow {
    overflow: hidden;
  }
  .loading-global{
    position: fixed;
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
