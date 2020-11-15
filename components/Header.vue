<template>
  <v-toolbar elevation="2" color="primary" dark>
    <!-- <v-app-bar-nav-icon></v-app-bar-nav-icon> -->
    <v-toolbar-title style="cursor: pointer" @click="$router.push('/')">
      WikiArchives.space
    </v-toolbar-title>
    <v-spacer />
    <template v-if="$vuetify.breakpoint.smAndUp">
      <v-text-field
        v-model="searchQuery"
        hide-details
        autocomplete="off"
        style="max-width: 300px;"
        placeholder="Search into thousands of pictures"
      />
      <v-btn icon dark class="mr-2">
        <v-icon>mdi-magnify</v-icon>
      </v-btn>
      <v-btn text outlined @click="$router.push('/login')">
        Login
      </v-btn>
      <v-btn
        class="ml-2 mr-2"
        dark
        text
        outlined
        @click="$router.push('/register')"
      >
        Register
      </v-btn>
      <v-btn
        icon
        dark
        class="mr-2"
        @click="switchTheme"
      >
        <v-icon>mdi-invert-colors</v-icon>
      </v-btn>
    </template>
    <template v-else>
      <v-btn icon dark class="mr-2">
        <v-icon>mdi-magnify</v-icon>
      </v-btn>
      <v-menu
        left
        bottom
      >
        <template v-slot:activator="{ on, attrs }">
          <v-btn
            icon
            v-bind="attrs"
            v-on="on"
          >
            <v-icon>mdi-dots-vertical</v-icon>
          </v-btn>
        </template>

        <v-list>
          <v-list-item
            @click="switchTheme"
          >
            <v-list-item-title>Toggle dark mode</v-list-item-title>
          </v-list-item>
          <v-list-item
            @click="$router.push('/login')"
          >
            <v-list-item-title>Login</v-list-item-title>
          </v-list-item>
          <v-list-item
            @click="$router.push('/register')"
          >
            <v-list-item-title>Register</v-list-item-title>
          </v-list-item>
        </v-list>
      </v-menu>
    </template>
  </v-toolbar>
</template>

<script>
export default {
  name: 'Header',
  data: () => ({
    searchQuery: ''
  }),
  methods: {
    switchTheme () {
      this.$vuetify.theme.dark = !this.$vuetify.theme.dark
    }
  }
}
</script>
