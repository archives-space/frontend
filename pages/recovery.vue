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
              <v-toolbar-side-icon
                style="cursor: pointer"
                @click="$router.push({name: 'login'})"
              >
                <v-icon>mdi-arrow-left-circle</v-icon>
              </v-toolbar-side-icon>
              <v-toolbar-title class="ml-3">
                Account Recovery
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
                  label="Username or email"
                  type="text"
                />
              </v-form>
            </v-card-text>
            <v-card-actions>
              <v-spacer />
              <v-btn
                color="primary"
                min-width="90px"
                @click="executeRecovery"
              >
                Submit
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
    username: ''
  }),
  created () {
  },
  methods: {
    executeRecovery () {

    }
  },
  head () {
    return {
      title: 'Recover your precious account'
    }
  }
}
</script>
