<template>
  <v-img
    :src="image"
    class="white--text align-end"
    gradient="to top right, rgba(41, 128, 185, 0.70), rgba(52, 152, 219, 0.8)"
    :height="height"
  >
    <Container class="custom">
      <slot />
    </Container>
  </v-img>
</template>

<script>
import Container from '~/components/Container'

export default {
  name: 'Banner',
  components: {
    Container
  },
  props: {
    image: {
      type: String,
      default: 'https://images.pexels.com/photos/2156/sky-earth-space-working.jpg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940'
    },
    title: {
      type: String,
      default: ''
    },
    height: {
      type: String,
      default: '100px'
    }
  }
}
</script>
