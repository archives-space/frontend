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
export default {
  name: 'Container',
  props: {
    xs: {
      default: false
    },
    sm: {
      default: false
    },
    md: {
      default: false
    },
    lg: {
      default: false
    },
    xl: {
      default: false
    }
  }
}
</script>
