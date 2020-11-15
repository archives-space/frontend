<template>
  <div>
    <v-img
      :src="'https://images.pexels.com/photos/2156/sky-earth-space-working.jpg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940'"
      class="white--text align-end"
      gradient="to top right, rgba(41, 128, 185, 0.70), rgba(52, 152, 219, 0.8)"
      height="200px"
    >
      <v-container class="d-flex align-center justify-center" style="height: 200px">
        <v-card-title
          class="text-h4 justify-center pt-3 pb-3 mb-0 home-header-title"
        >
          About
        </v-card-title>
      </v-container>
    </v-img>
    <v-container>
      <div class="d-flex justify-center">
        <v-col cols="12" md="8">
          <p class="mt-4">
            WikiArchives.space is a collaborative photo gallery aiming to host every single public domain and CC-NC space photos ever taken, and distribute it to everyone for free.
          </p>
          <p>
            Each photo added is carefully and manually treated by an archivist, to make sure you get the date and location it was taken, an extensive description, and the source.
          </p>
          <p>
            The amount of work is enormous, and for now, we don't allow registration, but we aim to allow you to register, and add photos to contribute the gallery.
          </p>
          <p>
            If you spot mistakes or have suggestions, you can contact the Main archivist on Twitter, <a href="https://twitter.com/AstroVicnet">@astrovicnet</a> or on <a href="https://discord.gg/ypmx5ne">Discord</a>
          </p>
        </v-col>
      </div>
    </v-container>
  </div>
</template>

<script>
export default {
  data: () => ({}),
  head () {
    return {
      title: 'About this wonderful website'
    }
  }
}
</script>
