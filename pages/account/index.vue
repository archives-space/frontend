<template>
  <div>
    <Container :md="11" :lg="9">
      <h2 class="display-1 mb-3 ml-4">
        Hello {{ user.username }}!
      </h2>
      <v-row justify="center">
        <v-col
          cols="12"
          md="5"
        >
          <UserAvatar :user="user" />
          <UserPassword class="mt-6" />
        </v-col>
        <v-col
          cols="12"
          md="7"
        >
          <UserDetails :user="user" />
          <UserDelete
            class="mt-5"
            :user="user"
          />
        </v-col>
      </v-row>
    </Container>
  </div>
</template>

<script>
import UserDetails from '~/components/User/UserDetails'
import UserDelete from '~/components/User/UserDelete'
import UserPassword from '~/components/User/UserPassword'
import UserAvatar from '~/components/User/UserAvatar'

export default {
  components: {
    UserDetails,
    UserPassword,
    UserAvatar,
    UserDelete
  },
  async asyncData ({ $http, store }) {
    const user = (await $http.$get('/users/' + store.state.user.id)).data
    return { user }
  },
  mounted () {
    console.log(this.user)
  },
  head: () => ({
    title: 'Your account'
  })
}
</script>
