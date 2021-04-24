<template>
  <div class="my-5 container d-flex justify-center text-center">
    <div>
      <h1 class="text-h3 mt-4">
        We're sorry :(
      </h1>
      <h3 class="text-h1 mt-4">
        {{ error.statusCode }}
      </h3>
      <div class="mt-3">
        <NuxtLink to="/">
          Home page
        </NuxtLink>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  layout: 'default',
  props: {
    error: {
      type: Object,
      default: () => ({
        statusCode: 500
      })
    }
  },
  head () {
    return {
      title: this.error.statusCode
    }
  }
}
</script>
