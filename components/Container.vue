<template>
  <v-container>
    <v-row justify="center">
      <v-col
        cols="12"
        :xl="xl"
        :lg="lg"
        :md="md"
        :sm="sm"
        :xs="xs"
      >
        <slot />
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
const props = Object.fromEntries(
  ['sm', 'xs', 'md', 'lg', 'xl']
    .map(e => [
      e,
      { type: [Boolean, String, Number], default: false }
    ])
)

export default {
  name: 'Container',
  props
}
</script>
