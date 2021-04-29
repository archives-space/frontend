<template>
  <div>
    <v-card>
      <v-card-text>
        <v-list>
          <v-list-item>
            <v-list-item-content>
              <v-list-item-title>
                Delete your account
              </v-list-item-title>
            </v-list-item-content>
            <v-list-item-action>
              <v-btn
                color="error" outlined
                @click="destroyModal = true"
              >
                Delete
              </v-btn>
            </v-list-item-action>
          </v-list-item>
        </v-list>
      </v-card-text>
    </v-card>
    <v-dialog
      v-model="destroyModal"
      max-width="600px"
    >
      <v-card>
        <v-card-title>
          Are you sure that you want to delete your account?
        </v-card-title>
        <v-card-text>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Minima reiciendis fuga et! Ad labore aliquam beatae, cum voluptates quia mollitia inventore in repellendus atque soluta at quibusdam error vitae iusto?
        </v-card-text>
        <v-card-actions>
          <v-btn
            min-width="6em"
            text color="primary"
            @click="destroyModal = false"
          >
            Cancel
          </v-btn>
          <v-spacer />
          <v-btn
            min-width="6em"
            text color="error"
            :loading="loading"
            @click="destroyUser"
          >
            Delete
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
export default {
  name: 'UserDelete',

  props: {
    user: {
      type: Object,
      default: () => ({})
    }
  },

  data: () => ({
    loading: false,
    destroyModal: false
  }),

  methods: {
    openModal () {
      console.log(this.destroyModal)
      this.destroyModal = true
      console.log(this.destroyModal)
    },
    destroyUser () {
      const confirm = alert('ARE YOU FUCKING SURE???')
      if (!confirm) {
        return
      }
      this.loading = true
      this.$http.delete('/users/w' + this.user.id).then(() => {
        this.loading = false

        this.$store.commit('LOGOUT')
        this.$cookies.remove('wikiArchiveUserToken')
        this.$router.push('/')

        this.$snackbars().add({ color: 'success', text: 'Youre out!' })
      }).catch(err => {
        console.log(err)
        this.loading = false
        this.$snackbars().add({ color: 'error', text: 'API Request error' })
      })
    }
  }
}
</script>
