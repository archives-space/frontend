<template>
  <v-card class="mt-6">
    <v-card-title>
      Edit password
    </v-card-title>
    <v-card-text>
      <v-form
        ref="form"
        @submit.prevent="changePassword()"
        v-model="valid"
        lazy-validation
      >
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
      </v-form>
    </v-card-text>
    <v-card-actions>
      <v-spacer />
      <v-btn
        color="primary"
        text
        min-width="110px"
        :loading="formLoading"
        @click="changePassword"
      >
        Change password
      </v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>

import zxcvbn from 'zxcvbn'
import apiErrorField from '~/lib/apiErrorField'

export default {
  data () {
    const rulesRaw = {
      password: [
        v => !!v || 'A password is required',
        v => (v && v.length >= 5) || 'The password must be at least 5 characters long',
        _ => apiErrorField(this.apiErrors, 'password')
        // v => this.resetValidation === true ||
        //  !!this.apiErrors['QUERY_INT_EXPECTED'] || 'The password is too weak'
      ],
      confirmedPassword: [
        v => !!v || 'You must confirm the password',
        v => (v && this.password === v) || 'The confirmed password must equal',
        _ => apiErrorField(this.apiErrors, 'confirmedPassword')
      ]
    }
    const rules = []
    Object.keys(rulesRaw).forEach(k => {
      rules[k] = [v => true]
    })
    return {
      password: '',
      confirmedPassword: '',
      valid: true,
      formLoading: false,
      rulesRaw,
      rules,
      apiErrors: [],
      passwordVisibility: true,
      passwordConfirmationVisibility: true
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
    password () {
      if (this.password === this.confirmedPassword) {
        this.rules = []
      }
      this.apiErrors = this.apiErrors.filter(c => c.path !== 'password')
    }
  },

  methods: {
    changePassword () {
      this.rules = this.rulesRaw
      this.apiErrors = []
      this.$nextTick(() => {
        if (!this.$refs.form.validate()) {
          this.$snackbars().add({ color: 'error', text: 'Invalid form' })
          return
        }
        this.formLoading = true
        this.$http.post('/users/' + this.$store.state.user.id + '/password', {
          password: this.password
        }).then(() => {
          this.formLoading = false
          this.$snackbars().add({ color: 'success', text: 'Your password was changed!' })
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
  }
}
</script>
