<template>
  <v-container>
    <v-row justify="center">
      <v-col
        cols="12"
        xl="12"
        lg="12"
        md="12"
        sm="12"
        xs="12"
      >
        <slot />
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  name: 'Container'
}
</script>
