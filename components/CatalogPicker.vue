<template>
  <v-dialog v-model="enabled" max-width="500px">
    <v-card
      v-if="loading"
      min-height="40vh"
      class="d-flex justify-center align-center"
    >
      <v-progress-circular indeterminate />
    </v-card>
    <v-card
      v-if="!loading"
      class="mx-auto"
      max-width="500"
    >
      <v-sheet class="pa-4 primary">
        <v-text-field
          v-model="search"
          label="Search into catalogs"
          dark flat
          solo-inverted
          hide-details
          clearable
          clear-icon="mdi-close-circle-outline"
        />
      </v-sheet>
      <v-card-text>
        <v-treeview
          :items="catalogs"
          :search="search"
          item-children="childrens"
          :active.sync="activeCatalogs"
          activatable
          open-on-click
        >
          <!--        <template v-slot:prepend="{ item }">-->
          <!--          <v-icon-->
          <!--            v-if="item.children"-->
          <!--            v-text="`mdi-${item.id === 1 ? 'home-variant' : 'folder-network'}`"-->
          <!--          />-->
          <!--        </template>-->
        </v-treeview>
      </v-card-text>
      <v-card-actions>
        <v-btn
          text min-width="6em"
          @click="close"
        >
          Cancel
        </v-btn>
        <v-spacer />
        <v-btn
          min-width="6em"
          text color="primary"
          :loading="doneSelectionLoading"
          @click="doneSelection"
        >
          Confirm
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
import { generatePath } from '~/lib/catalog'

export default {
  name: 'CatalogPicker',
  data () {
    return {
      loading: true,
      enabled: false,
      search: '',
      activeCatalogs: [],
      catalogs: [],
      doneSelectionLoading: false
    }
  },
  mounted () {
    this.$http.get('/catalogs/root').then(async res => {
      this.loading = false
      const data = await res.json()
      this.catalogs = data.data.childrens
    }).catch(err => {
      this.loading = false
      console.log(err)
      this.$pushSnackbar('error', 'Uh, oh we have a little trouble fetching the catalogs')
    })
  },
  methods: {
    open () {
      this.enabled = true
    },
    close () {
      this.enabled = false
    },
    setEnabled (status) {
      this.enabled = status
    },
    doneSelection () {
      console.log(this.activeCatalogs)
      const id = this.activeCatalogs[0]
      this.doneSelectionLoading = true
      this.$http.get('/catalogs/' + id).then(async res => {
        let catalog = (await res.json()).data
        catalog = { catalog, ...generatePath(catalog) }
        this.doneSelectionLoading = false
        this.$emit('selection', catalog)
        this.close()
      }).catch(err => {
        console.error(err)
        this.$pushSnackbar('error', 'Cannot fetch the selected catalog')
        this.doneSelectionLoading = false
      })
    }
  }
}
</script>
