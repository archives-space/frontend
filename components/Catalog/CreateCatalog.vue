<template>
  <div>
    <div class="d-flex justify-center">
      <v-btn
        color="primary"
        outlined
        @click="dialog = true"
      >
        <v-icon left>
          mdi-plus
        </v-icon>
        Create Album
      </v-btn>
    </div>
    <v-dialog
      v-model="dialog"
      max-width="500px"
    >
      <v-form
        ref="form"
        lazy-validation
        @submit.prevent="submit"
      >
        <v-card>
          <v-card-title>
            Create a catalog
          </v-card-title>
          <v-card-text>
            <v-text-field
              v-model="catalog.name"
              label="Name"
              autofocus
              required
              :rules="rules.name"
            />
            <v-text-field
              v-model="catalog.description"
              label="Description"
            />
          </v-card-text>
          <v-card-actions>
            <v-btn
              text
              min-width="6em"
              @click="dialog = false"
            >
              Close
            </v-btn>
            <v-spacer />
            <v-btn
              text
              min-width="6em"
              color="primary"
              type="submit"
              :loading="saveLoading"
            >
              Save
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-form>
    </v-dialog>
  </div>
</template>

<script>

export default {
  name: 'CreateCatalog',
  data () {
    const defaultForm = Object.freeze({
      name: '',
      description: ''
    })

    return {
      rules: {
        name: [
          val => ((val || '').length >= 3 && (val || '').length <= 50) || 'This field must be between 3 and 50 caracters in length'
        ]
      },
      defaultForm,
      dialog: false,
      catalog: Object.assign({}, defaultForm),
      saveLoading: false
    }
  },
  methods: {
    submit () {
      if (!this.$refs.form.validate()) {
        this.$snackbars().add({ color: 'error', text: 'Invalid form' })
        return
      }
      this.saveLoading = true
      this.$http.post('/catalogs', this.catalog).then(async res => {
        const data = await res.json()
        console.log('created catalog with id', data.data.id)
        this.saveLoading = false
        // we redirect to the catalog page, but we must known the slug of all the ancestors and the new catalog slug
        this.$router.push('/catalogs/' + data.data.id)
        this.$snackbars().add({ color: 'success', text: 'Catalog created!' })
      }).catch(err => {
        console.log('err', err)
        this.saveLoading = false
        this.$snackbars().add({ color: 'error', text: 'API request failed' })
      })
    }
  }
}
</script>
