<template>
  <div>
    <Container :md="11" :lg="9">
      <h2 class="display-1 mb-6 ml-4">
        Your contributions
      </h2>
      <v-card>
        <v-tabs
          v-model="tab" centered
          tile
          background-color="transparent"
        >
          <v-tab>Pending (9)</v-tab>
          <v-tab>Accepted (100)</v-tab>
          <v-tab>Rejected (10)</v-tab>
        </v-tabs>
        <v-tabs-items v-model="tab">
          <!-- Pending -->
          <v-tab-item>
            <v-card-text>
              Pending
            </v-card-text>
          </v-tab-item>
          <!-- Accepted -->
          <v-tab-item>
            <v-card-text>
              Accepted
            </v-card-text>
          </v-tab-item>
          <!-- Rejected -->
          <v-tab-item>
            <v-card-text>
              Rejected
            </v-card-text>
          </v-tab-item>
        </v-tabs-items>
      </v-card>
    </Container>
  </div>
</template>

<script>
import Container from '~/components/Container'

export default {
  components: { Container },
  async asyncData ({ $http, store }) {
    const user = (await $http.$get('/users/' + store.state.user.id)).data
    return { user }
  },
  data: () => ({
    user: {},
    tab: 0
  }),
  mounted () {
    console.log(this.user)
  },
  head: () => ({
    title: 'Your contributions'
  })
}
</script>
