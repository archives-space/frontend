<template>
  <div>
    <Container :sm="12" :md="8" :lg="6">
      <h2 class="display-1 mb-2">
        Hello {{ user.username }}!
      </h2>
      <UserDetails ref="userDetails" />
      <UserPassword ref="userPassword" />
    </Container>
  </div>
</template>

<script>
import UserDetails from '~/components/UserDetails'
import UserPassword from '~/components/UserPassword'

export default {
  components: {
    UserDetails,
    UserPassword
  },
  async asyncData ({ $http, store }) {
    const user = (await $http.$get('/users/' + store.state.user.id)).data
    return {
      user
    }
  },
  mounted () {
    console.log(this.user)
    this.$refs.userDetails.loadUser(this.user)
  }
}
</script>
