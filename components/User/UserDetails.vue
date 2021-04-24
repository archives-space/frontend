<template>
  <v-card>
    <v-card-title>
      Edit your details
    </v-card-title>
    <v-card-text>
      <v-form
        ref="form"
        v-model="valid"
        lazy-validation
      >
        <v-text-field
          v-model="user.username"
          label="Username"
          :rules="rules.username"
          prepend-icon="mdi-badge-account-horizontal-outline"
        />
        <v-text-field
          v-model="user.publicName"
          label="Public Name"
          :rules="rules.publicName"
          prepend-icon="mid-empty"
        />
        <v-text-field
          v-model="user.email"
          label="Email"
          :rules="rules.email"
          prepend-icon="mdi-at"
        />
        <v-text-field
          v-model="user.location"
          label="Location"
          :rules="rules.location"
          prepend-icon="mdi-map-marker"
        />
        <v-textarea
          v-model="user.biography"
          label="Biography"
          :rules="rules.biography"
          auto-grow
          prepend-icon="mdi-text"
          :counter="200"
          :rows="3"
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
        @click="save"
      >
        Save
      </v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
import apiErrorField from '~/lib/apiErrorField'

export default {

  props: {
    user: {
      type: Object,
      default: () => ({})
    }
  },

  data () {
    const rulesRaw = {
      username: [_ => apiErrorField(this.apiErrors, 'username')],
      email: [_ => apiErrorField(this.apiErrors, 'email')],
      publicName: [_ => apiErrorField(this.apiErrors, 'publicName')],
      location: [_ => apiErrorField(this.apiErrors, 'location')],
      biography: [_ => apiErrorField(this.apiErrors, 'biography')]
    }
    const rules = []
    Object.keys(rulesRaw).forEach(k => {
      rules[k] = [v => true]
    })
    return {
      valid: true,
      formLoading: false,
      rulesRaw,
      rules,
      apiErrors: []
    }
  },

  watch: {
    username () {
      this.apiErrors = this.apiErrors.filter(c => c.path !== 'username')
    },
    email () {
      this.apiErrors = this.apiErrors.filter(c => c.path !== 'email')
    },
    publicName () {
      this.apiErrors = this.apiErrors.filter(c => c.path !== 'publicName')
    },
    location () {
      this.apiErrors = this.apiErrors.filter(c => c.path !== 'location')
    },
    biography () {
      this.apiErrors = this.apiErrors.filter(c => c.path !== 'biography')
    }
  },

  methods: {
    save () {
      this.rules = this.rulesRaw
      this.apiErrors = []
      this.$nextTick(() => {
        if (!this.$refs.form.validate()) {
          this.$snackbars().add({ color: 'error', text: 'Invalid form' })
          return
        }
        this.formLoading = true
        this.$http.put('/users/' + this.user.id, {
          username: this.user.username,
          email: this.user.email,
          publicName: this.user.publicName,
          location: this.user.location,
          biography: this.user.biography
        }).then(() => {
          this.formLoading = false
          this.$snackbars().add({ color: 'success', text: 'Details saved!' })
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
