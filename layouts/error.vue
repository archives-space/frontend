<template>
  <div class="mt-5 container d-flex justify-center text-center">
    <div>
      <h1 class="text-h3 mt-4">
        We're sorry :(
      </h1>
      <h3 class="text-h1 mt-4">{{ error.statusCode }}</h3>
      <div class="mt-3">
        <NuxtLink to="/">Home page</NuxtLink>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: ['error'],
  layout: 'blog' // you can set a custom layout for the error page
}
</script>
