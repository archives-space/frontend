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
                  id="username"
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
                  label="Email"
                  type="text"
                  :rules="rules.email"
                />
                <v-text-field
                  id="password"
                  v-model="password"
                  prepend-icon="mdi-lock"
                  autocomplete="new-password"
                  name="password"
                  label="Password"
                  :loading="passwordWatcher"
                  :rules="rules.password"
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
                :loading="formLoading"
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
import login from '~/lib/login'

export default {
  components: {
    Banner
  },
  data () {
    const apiErrorField = (value, propertyPath) => {
      const errors = this.apiErrors.filter(e => e.propertyPath === propertyPath)
      if (errors.length === 0) {
        return true
      }
      return errors[0].message
    }
    const rulesRaw = {
      username: [
        v => !!v || 'This field is required',
        v => (v && v.length <= 30) || 'The username must be at most 30 characters long',
        v => (v && v.length >= 3) || 'The username must be at least 3 characters long',
        v => apiErrorField(v, 'username')
      ],
      email: [
        v => !!v || 'An email is required',
        v => /.+@.+/.test(v) || 'The provided email is invalid',
        v => apiErrorField(v, 'email')
      ],
      password: [
        v => !!v || 'A password is required',
        v => (v && v.length >= 5) || 'The password must be at least 5 characters long',
        v => apiErrorField(v, 'password')
        // v => this.resetValidation === true ||
        //  !!this.apiErrors['QUERY_INT_EXPECTED'] || 'The password is too weak'
      ],
      confirmedPassword: [
        v => !!v || 'You must confirm the password',
        v => (v && this.password === v) || 'The confirmed password must equal',
        v => apiErrorField(v, 'confirmedPassword')
      ],
      terms: [v => v || 'You must read the rules']
    }
    const rules = []
    Object.keys(rulesRaw).forEach(k => {
      rules[k] = [v => true]
    })
    return {
      username: '',
      email: '',
      password: '',
      confirmedPassword: '',
      terms: false,
      valid: true,
      rulesRaw,
      rules,
      apiErrors: [],
      resetValidation: false,
      passwordVisibility: true,
      passwordConfirmationVisibility: true,
      formLoading: false,
      erroredValues: []
    }
  },
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
  watch: {
    username () {
      this.apiErrors = this.apiErrors.filter(c => c.propertyPath !== 'username')
    },
    email () {
      this.apiErrors = this.apiErrors.filter(c => c.propertyPath !== 'email')
    },
    password () {
      this.apiErrors = this.apiErrors.filter(c => c.propertyPath !== 'password')
    }
  },
  created () {
  },
  methods: {
    executeRegister () {
      this.rules = this.rulesRaw
      this.apiErrors = []
      this.$nextTick(() => {
        if (!this.$refs.form.validate()) {
          this.$snackbars().add({ color: 'error', text: 'Invalid form' })
          return
        }
        this.formLoading = true
        this.$http.post('/register', {
          username: this.username,
          password: this.password,
          email: this.email
        }).then(async () => {
          const loginData = await this.$http.$post('/login', { username: this.username, password: this.password })
          login(this, loginData.data.token)

          this.formLoading = false
          this.$snackbars().add({ color: 'success', text: 'The registration succeded' })
        }).catch(err => {
          this.formLoading = false
          if (err.response && err.response.code !== 400) {
            this.$snackbars().add({ color: 'error', text: 'Invalid form' })
            this.apiErrors = err.response.data.errors
            this.$nextTick(() => {
              this.$refs.form.validate()
            })
            return
          }
          this.$snackbars().add({ color: 'error', text: 'API request failed' })
        })
      })
    }
  },
  head () {
    return {
      title: 'Register'
    }
  }
}
</script>

<style>
#username {
  margin-top: 0;
}
.cgu-checkbox {
  margin-top: 1em;
  margin-bottom: -.35em;
}
</style>
