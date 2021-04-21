<template>
  <div class="users">
    <div class="mb-2 d-flex justify-end">
      <v-btn icon @click="refresh()">
        <v-icon>mdi-refresh</v-icon>
      </v-btn>
    </div>

    <v-data-table
      :headers="headers"
      :items="users"
      class="elevation-1">
      <template v-slot:item.roles="{ item }">
        {{ item.roles.join(', ') }}
      </template>
      <template v-slot:item.actions="{ item }">
        <v-btn
          icon small
          @click="viewItem(item)">
          <v-icon small>
            mdi-information
          </v-icon>
        </v-btn>
        <v-btn
          icon small
          color="info"
          @click="editItem(item)">
          <v-icon small>
            mdi-pencil
          </v-icon>
        </v-btn>
        <v-btn
          icon
          small
          color="error"
          @click="openDestroyUser(item)">
          <v-icon small>
            mdi-delete
          </v-icon>
        </v-btn>
      </template>
    </v-data-table>
    <v-dialog v-model="editDialog" max-width="500px">
      <v-card>
        <v-card-title>
          Edit user: "{{ editUser.username }}"
        </v-card-title>
        <v-card-text>
          <form>
            <!-- <v-checkbox v-model="editUser.is_admin" label="Is admin ?"></v-checkbox> -->
          </form>
        </v-card-text>
        <v-card-actions>
          <v-btn color="red" text @click="editDialog=false">Close</v-btn>
          <v-spacer />
          <v-btn color="primary" text @click="editSubmit()">Submit</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <v-dialog v-model="viewDialog" max-width="500px">
      <v-card>
        <v-card-text>
          <v-layout justify-center row fill-height>
            <v-avatar :tile="false" :size="80" class="mb-4 mt-4">
              <img :src="viewUser.last_avatar" alt="avatar">
            </v-avatar>
          </v-layout>
          <v-list two-line>
            <v-list-item>
              <v-list-item-action>
                <v-icon>mdi-mail</v-icon>
              </v-list-item-action>

              <v-list-item-content>
                <v-list-item-title>{{ viewUser.email }}</v-list-item-title>
                <v-list-item-subtitle>Email</v-list-item-subtitle>
              </v-list-item-content>
            </v-list-item>
            <v-divider inset></v-divider>

            <v-list-item>
              <v-list-item-action>
                <v-icon>mdi-label</v-icon>
              </v-list-item-action>

              <v-list-item-content>
                <v-list-item-title>{{ viewUser.username }}</v-list-item-title>
                <v-list-item-subtitle>Username</v-list-item-subtitle>
              </v-list-item-content>
            </v-list-item>

            <v-list-item @click="$copyText(viewUser.id)" ripple>
              <v-list-item-action />
              <v-list-item-content>
                <v-list-item-title>{{ viewUser.id }}</v-list-item-title>
                <v-list-item-subtitle>API Id</v-list-item-subtitle>
              </v-list-item-content>
            </v-list-item>

            <v-divider inset></v-divider>

            <v-list-item @click="$copyText(viewUser.last_user_agent)" ripple>
              <v-list-item-action>
                <v-icon>mdi-settings_applications</v-icon>
              </v-list-item-action>
              <v-list-item-content>
                <v-list-item-title>{{viewUser.last_user_agent}}</v-list-item-title>
                <v-list-item-subtitle>Last user agent</v-list-item-subtitle>
              </v-list-item-content>
            </v-list-item>

            <v-divider inset></v-divider>

            <!--
            <v-list-item @click="">
              <v-list-item-action>
                <v-icon>mdi-https</v-icon>
              </v-list-item-action>
              <v-list-item-content>
                <v-list-item-title>
                  <span v-if="viewUser.is_admin">
                    Administrator
                  </span>
                  <span v-else>
                    Not a administrator
                  </span>
                </v-list-item-title>
                <v-list-item-subtitle>Is admin ?</v-list-item-subtitle>
              </v-list-item-content>
            </v-list-item>

            <v-divider inset></v-divider>

            <v-list-item @click="$copyText(viewUser.last_ip)" ripple>
              <v-list-item-action>
                <v-icon>mdi-location_on</v-icon>
              </v-list-item-action>
              <v-list-item-content>
                <v-list-item-title>
                  <span v-if="viewUser.last_ip == null">
                    Unknown
                  </span>
                  <span v-else>
                    {{viewUser.last_ip}}
                  </span>
                </v-list-item-title>
                <v-list-item-subtitle>Last ip</v-list-item-subtitle>
              </v-list-item-content>
            </v-list-item>
            <v-divider inset></v-divider>
            -->

            <v-list-item>
              <v-list-item-action>
                <v-icon>mdi-update</v-icon>
              </v-list-item-action>

              <v-list-item-content>
                <v-list-item-title>{{ viewUser.createdAt }}</v-list-item-title>
                <v-list-item-subtitle>Registered at</v-list-item-subtitle>
              </v-list-item-content>
            </v-list-item>

            <v-list-item>
              <v-list-item-action />

              <v-list-item-content>
                <v-list-item-title>
                  <span v-if="viewUser.lastLoginAt == null">
                    Never logged
                  </span>
                  <span v-else>
                    {{ viewUser.lastLoginAt }}
                  </span>
                </v-list-item-title>
                <v-list-item-subtitle>Last login at</v-list-item-subtitle>
              </v-list-item-content>
            </v-list-item>
          </v-list>
        </v-card-text>
        <v-card-actions>
          <v-spacer />
          <v-btn
            color="primary"
            text
            @click="viewDialog = false">
            Close
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <v-dialog v-model="destroyUserModal" max-width="500px">
      <v-card>
        <v-card-title>
          Careful: Do you want to delete this user account?
        </v-card-title>
        <v-card-actions>
          <v-btn text color="primary" @click="destroyUserModal = false">
            Cancel
          </v-btn>
          <v-spacer />
          <v-btn text color="error" @click="destroyUser()">
            Destroy
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
export default {
  layout: 'backoffice',
  async asyncData ({ $http }) {
    const users = (await $http.$get('/users')).data
    return {
      users
    }
  },
  created () {
    this.$store.commit('SET_TITLE', 'Users list')
  },
  data: () => ({
    viewDialog: false,
    viewUser: {},
    editDialog: false,
    editUser: {},
    headers: [
      // {
      //   text: 'Avatar',
      //   align: 'left',
      //   sortable: false,
      //   value: 'last_avatar'
      // },
      { text: 'Username', value: 'username' },
      { text: 'Email', value: 'email' },
      { text: 'Public name', value: 'publicName' },
      { text: 'Roles', value: 'roles' },
      { text: 'Actions', value: 'actions', sortable: false }
    ],
    destroyUserModal: false
  }),
  methods: {
    refresh () {
      this.$nuxt.refresh()
    },
    async viewItem (item) {
      this.viewUser = (await this.$http.$get('/users/' + item.id)).data
      this.viewDialog = true
    },
    async editItem (item) {
      this.editUser = (await this.$http.$get('/users/' + item.id)).data
      this.editDialog = true
    },
    editSubmit () {
      this.editDialog = false
      /*
      this.$apitator.query(this, {
        body: {
          query: `mutation($user: UserUpdateInput!){updateUser(user: $user)}`,
          variables: {
            user: {
              id: this.editUser.id,
              is_admin: this.editUser.is_admin
            }
          }
        }
      }).then((response) => {
        this.$snackbars().add({ color: 'success', text: 'Yay' })
        this.fetchData()
      }).catch(() => {
        this.editDialog = true
      })
      */
    },
    openDestroyUser (user) {
      this.destroyUserModal = true
      this.toDestroyUser = user
    },
    destroyUser () {
      /*
      this.$apitator.query(this, {
        body: {
          query: `mutation($id: ID!){
            destroyUser(id: $id)
          }`,
          variables: {
            id: this.toDestroyUser.id
          }
        }
      }).then((response) => {
        this.destroyUserModal = false
        this.$snackbars().add({ color: 'success', text: 'User destroyed' })
        this.fetchData()
      }).catch(() => {
        this.destroyUserModal = false
      })
      */
    }
  }
}
</script>
