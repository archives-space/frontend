<template>
  <div class="snackbar-stack">
    <v-snackbar
      v-for="(snackbar, index) in snackbars"
      :key="index"
      v-model="snackbar.enabled"
      :color="snackbar.color"
      class="snackbar-stack-entity"
    >
      {{ snackbar.text }}
      <template v-slot:action="{ attrs }">
        <v-btn
          text
          v-bind="attrs"
          @click="remove(index)"
        >
          Close
        </v-btn>
      </template>
    </v-snackbar>
  </div>
</template>

<script>
export default {
  name: 'Snackbar',
  data () {
    const defaultTimeout = 3600
    const snackbars = []
    for (let i = 0; i < 10; i++) {
      snackbars.push({ enabled: false, text: 'hello-world', color: 'primary', timeout: defaultTimeout })
    }
    return {
      defaultTimeout,
      snackbars,
      pointer: 10
    }
  },
  methods: {
    add (snackbar) {
      this.pointer--
      if (this.pointer < 0 || this.pointer >= 10) {
        this.pointer = 9
      }
      const pointer = this.pointer
      this.snackbars[pointer].timeout = snackbar.timeout ?? this.defaultTimeout
      this.snackbars[pointer].text = snackbar.text
      this.snackbars[pointer].color = snackbar.color
      this.$nextTick(() => {
        this.snackbars[pointer].enabled = true
      })
      /* const timeout = this.snackbars[this.pointer].timeout */
      /* if (Number.isSafeInteger(timeout) && timeout >= 0) {
        setTimeout(() => {
          this.remove(pointer)
        }, this.snackbars[this.pointer].timeout)
      } */
      return pointer
    },
    remove (pointer) {
      this.snackbars[pointer].enabled = false
    },
    clear () {
      this.snackbars = this.snackbars.map(s => ({ ...s, enabled: false }))
    }
  }
}
</script>

<style scoped>
.snackbar-stack {
  height: 100vh;
  width: 100%;
  position: fixed;
  z-index: 1000;
  pointer-events: none;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  align-items: flex-end;
  padding: 1rem;
}
.snackbar-stack-entity {
  position: relative;
  height: auto;
  width: auto;
}
</style>
