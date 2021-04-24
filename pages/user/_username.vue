<template>
  <div>
    <!-- Public presentation page of a user -->
    <Container :md="11" :lg="8">
      <div class="user-banner my-4 d-flex align-center ml-3">
        <v-avatar
          size="150"
        >
          <v-img :src="user.avatar.url" />
        </v-avatar>
        <div class="user-banner-title-container ml-10">
          <div class="text-h3">
            <span v-if="user.publicName != null">{{ user.publicName }}</span>
            <span v-else>{{ user.username }}</span>
          </div>
          <div class="roles mt-5">
            <v-chip
              class="mr-2"
              color="green"
              text-color="white"
            >
              Contributeur
            </v-chip>
            <v-chip
              class="mr-2"
              color="purple"
              text-color="white"
            >
              Modérateur
            </v-chip>
            <v-chip
              class="mr-2"
              color="primary"
              text-color="white"
            >
              Développeur
            </v-chip>
            <v-chip
              class="mr-2"
              text-color="white"
            >
              Administrateur
            </v-chip>
          </div>
        </div>
      </div>
      <v-row class="mt-3">
        <v-col
          cols="12"
          md="5"
        >
          <v-card>
            <v-card-text>
              <v-list two-line class="pt-0">
                <v-subheader>About this user</v-subheader>
                <v-divider />
                <v-list-item>
                  <v-list-item-icon>
                    <v-icon color="indigo">
                      mdi-text
                    </v-icon>
                  </v-list-item-icon>
                  <v-list-item-content>
                    <div
                      v-for="line in user.biography"
                      :key="line.index"
                      :class="{'mb-2': line.index+1 != user.biography.length }"
                    >
                      {{ line.value }}<br>
                    </div>
                  </v-list-item-content>
                </v-list-item>

                <template v-if="user.location != null">
                  <v-divider />
                  <v-list-item>
                    <v-list-item-icon>
                      <v-icon color="indigo">
                        mdi-map-marker
                      </v-icon>
                    </v-list-item-icon>
                    <v-list-item-content>
                      <v-list-item-title>
                        {{ user.location }}
                      </v-list-item-title>
                      <v-list-item-subtitle>
                        Location
                      </v-list-item-subtitle>
                    </v-list-item-content>
                  </v-list-item>
                </template>

                <v-divider />

                <v-list-item>
                  <v-list-item-icon>
                    <v-icon color="indigo">
                      mdi-source-branch
                    </v-icon>
                  </v-list-item-icon>
                  <v-list-item-content>
                    <v-list-item-title>
                      {{ user.score|number }}
                    </v-list-item-title>
                    <v-list-item-subtitle>Contributions</v-list-item-subtitle>
                  </v-list-item-content>
                </v-list-item>

                <v-divider />

                <v-list-item>
                  <v-list-item-icon>
                    <v-icon color="indigo">
                      mdi-update
                    </v-icon>
                  </v-list-item-icon>
                  <v-list-item-content>
                    <v-list-item-title>{{ user.createdAt }}</v-list-item-title>
                    <v-list-item-subtitle>Registration date</v-list-item-subtitle>
                  </v-list-item-content>
                </v-list-item>
              </v-list>
            </v-card-text>
          </v-card>
        </v-col>

        <v-col
          cols="12"
          md="7"
        >
          <v-card>
            <v-tabs
              v-model="tab"
              centered
              color="white"
              tile
              background-color="primary"
            >
              <v-tab>Activity</v-tab>
              <v-tab>Badges</v-tab>
            </v-tabs>
            <v-tabs-items v-model="tab">
              <v-tab-item>
                <v-container fluid>
                  <!-- https://vuetifyjs.com/en/components/timelines/#advanced -->
                  <UserActivity />
                </v-container>
              </v-tab-item>

              <v-tab-item>
                <v-container fluid>
                  List of users badges
                </v-container>
              </v-tab-item>
            </v-tabs-items>
          </v-card>
        </v-col>
      </v-row>
    </Container>
  </div>
</template>

<script>
/** Path exemple: /user/{username} */
import Container from '~/components/Container'
import UserActivity from '~/components/User/UserActivity'

export default {
  components: {
    Container,
    UserActivity
  },
  async asyncData ({ $http, route }) {
    const user = (await $http.$get('/users/' + route.params.username)).data
    user.biography = user.biography.split('\n').map((value, index) => ({ value, index }))
    user.createdAt = (new Date(user.createdAt)).toLocaleDateString('en', { year: 'numeric', month: 'long' })
    return { user }
  },
  data: () => ({
    tab: 0,
    user: {},
    changes: []
  }),
  mounted () {
    console.log(this.user)
  },
  head () {
    return {
      title: this.user.username
    }
  }
}
</script>
