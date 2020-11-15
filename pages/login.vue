<template>
  <div>
    <Banner />
    <v-container>
      <v-row justify="center">
        <v-col
          cols="12"
          xl="3"
          lg="4"
          md="5"
          sm="6"
          xs="10"
        >
          <v-card>
            <v-toolbar dark color="primary">
              <v-toolbar-title class="ml-2">
                Login
              </v-toolbar-title>
            </v-toolbar>
            <v-card-text>
              <v-form @submit.prevent="executeLogin()">
                <v-text-field
                  v-model="username"
                  prepend-icon="mdi-account"
                  autocomplete="username"
                  autofocus
                  name="username"
                  label="Username"
                  type="text"
                />
                <v-text-field
                  id="password"
                  v-model="password"
                  prepend-icon="mdi-lock"
                  autocomplete="current-password"
                  name="password"
                  :append-icon="passwordVisibility ? 'mdi-eye' : 'mdi-eye-off'"
                  label="Password"
                  :type="passwordVisibility ? 'password' : 'text'"
                  @click:append="passwordVisibility = !passwordVisibility"
                  @keydown.enter="executeLogin"
                />
                <p class="caption d-flex justify-end pa-0 ma-0">
                  <a @click="$router.push({name: 'recovery'})">
                    I forgot my password
                  </a>
                </p>
              </v-form>
            </v-card-text>
            <v-card-actions>
              <v-btn
                color="primary"
                text
                @click="$router.push('/register')"
              >
                Register
              </v-btn>
              <v-spacer />
              <v-btn
                color="primary"
                min-width="90px"
                @click="executeLogin"
              >
                Login
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
import Banner from '~/components/Banner'

export default {
  components: { Banner },
  data: () => ({
    username: '',
    password: '',
    passwordVisibility: true
  }),
  created () {
  },
  methods: {
    executeLogin () {

    }
  },
  head () {
    return {
      title: 'Login'
    }
  }
}
</script>
