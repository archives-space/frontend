<template>
  <div
    v-show="snackbars.length > 0"
    class="snackbar-stack"
  >
    <v-snackbar
      v-for="snackbar in snackbars"
      :key="snackbar.id"
      v-model="snackbar.enabled"
      :timeout="-1"
      :color="snackbar.color"
      :value="true"
      class="snackbar-stack-entity"
    >
      {{ snackbar.text }}
      <template v-slot:action="{ attrs }">
        <v-btn
          text
          v-bind="attrs"
          @click="remove(snackbar)"
        >
          Close
        </v-btn>
      </template>
    </v-snackbar>
  </div>
</template>

<script>
import { v4 as uuid } from 'uuid'

export default {
  name: 'Snackbar',
  data: () => ({
    snackbars: []
  }),
  methods: {
    add (snackbar) {
      const entity = {
        id: uuid(),
        enabled: true,
        timeout: 3500,
        ...snackbar
      }
      if (entity.timeout >= 0) {
        setTimeout(() => {
          this.remove(entity)
        }, entity.timeout)
      }
      this.snackbars = [
        ...this.snackbars,
        entity
      ]
    },
    remove (snackbar) {
      this.snackbars = this.snackbars.filter(s => s.id !== snackbar.id)
    },
    clear () {
      this.snackbars = []
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
