<template>
  <div class="mb-10 pb-10">
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
                Register
              </v-toolbar-title>
            </v-toolbar>
            <v-card-text>
              <v-form
                ref="form"
                v-model="valid"
                lazy-validation
              >
                <v-text-field
                  v-model="username"
                  prepend-icon="mdi-account"
                  autocomplete="username"
                  autofocus
                  name="login"
                  :rules="rules.username"
                  label="Username"
                  type="text"
                />
                <v-text-field
                  v-model="email"
                  prepend-icon="mdi-at"
                  autocomplete="email"
                  name="email"
                  :rules="rules.email"
                  label="Email"
                  type="text"
                />
                <v-text-field
                  id="password"
                  v-model="password"
                  :loading="passwordWatcher"
                  prepend-icon="mdi-lock"
                  autocomplete="new-password"
                  name="password"
                  :rules="rules.password"
                  label="Password"
                  :append-icon="passwordVisibility ? 'mdi-eye' : 'mdi-eye-off'"
                  :type="passwordVisibility ? 'password' : 'text'"
                  @click:append="passwordVisibility = !passwordVisibility"
                >
                  <template v-slot:progress>
                    <v-progress-linear
                      slot="progress"
                      :value="progress"
                      :color="color"
                      height="7"
                      absolute
                    />
                  </template>
                </v-text-field>
                <v-text-field
                  id="password_confirm"
                  v-model="confirmedPassword"
                  prepend-icon="mdi-lock"
                  name="password_confirm"
                  autocomplete="new-password"
                  label="Confirm your password"
                  required
                  :rules="rules.confirmedPassword"
                  :append-icon="passwordConfirmationVisibility ? 'mdi-eye' : 'mdi-eye-off'"
                  :type="passwordConfirmationVisibility ? 'password' : 'text'"
                  @click:append="passwordConfirmationVisibility = !passwordConfirmationVisibility"
                />
                <v-checkbox
                  v-model="terms"
                  class="cgu-checkbox"
                  required
                  color="primary"
                  :rules="rules.terms"
                >
                  <span slot="label">I accept <a href="https://google.com">the rules</a> of the community</span>
                </v-checkbox>
              </v-form>
            </v-card-text>
            <v-card-actions>
              <v-btn
                color="primary"
                text
                @click="$router.push('/login')"
              >
                Login
              </v-btn>
              <v-spacer />
              <v-btn
                color="primary"
                min-width="110px"
                @click="executeRegister"
              >
                Register
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
import zxcvbn from 'zxcvbn'
import Banner from '~/components/Banner'

export default {
  components: {
    Banner
  },
  data: () => ({
    username: '',
    email: '',
    password: '',
    confirmedPassword: '',
    terms: false,
    valid: true,
    rules: {
      username: [
        v => !!v || 'This field is required',
        v => (v && v.length <= 30) || 'The username must be at most 30 characters long',
        v => (v && v.length >= 3) || 'The username must be at least 3 characters long'
      ],
      email: [
        v => !!v || 'An email is required',
        v => /.+@.+/.test(v) || 'The provided email is invalid'
      ],
      password: [
        v => !!v || 'A password is required',
        v => (v && v.length >= 5) || 'The password must be at least 5 characters long'
      ],
      confirmedPassword: [
        v => !!v || 'You must confirm the password'
      ],
      terms: [v => !!v || 'The rules of the community must be read']
    },
    apiErrors: [],
    resetValidation: false,
    passwordVisibility: true,
    passwordConfirmationVisibility: true
  }),
  computed: {
    progress () {
      const progress = (this.passwordStrength * 25)
      return progress === 0 ? 25 : progress
    },
    color () {
      return ['error', 'warning', 'success'][Math.floor(this.progress / 40)]
    },
    passwordWatcher () {
      return this.password.length > 0
    },
    passwordStrength () {
      return zxcvbn(this.password).score
    }
  },
  created () {
  },
  methods: {
    executeRegister () {

    }
  },
  head () {
    return {
      title: 'Register'
    }
  }
}
</script>
