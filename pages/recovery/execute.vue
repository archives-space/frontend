<template>
  <div class="d-flex justify-center align-center" style="height: 20em">
    <v-progress-circular
      indeterminate
      color="primary"
      size="50"
    />
  </div>
</template>

<script>
import login from '~/lib/login'

export default {
  mounted () {
    if (this.$isServer) {
      return
    }
    window.onload = () => {
      this.executeRecovery()
    }
  },
  methods: {
    executeRecovery () {
      if (this.$route.query.token == null) {
        this.$snackbars().add({ color: 'error', text: 'No token provided' })
        return
      }
      this.$http.post('/recovery/execute', {
        token: this.$route.query.token
      }).then(async res => {
        const loginData = await res.json()
        login(this, loginData.data.token)
        this.$snackbars().add({ color: 'success', text: 'Your account was recovered!' })
        this.$router.push('/account')
      }).catch(err => {
        console.log('err', err)
        if (err.response && err.response.status === 400) {
          if (err.response.data.errors[0].key === 'RECOVERY_INVALID_TOKEN') {
            this.$snackbars().add({ color: 'error', text: 'The token is invalid', timeout: -1 })
            return
          }
          if (err.response.data.errors[0].key === 'RECOVERY_EXPIRED_TOKEN') {
            this.$snackbars().add({ color: 'error', text: 'The token is expired', timeout: -1 })
            return
          }
        }
        this.$snackbars().add({ color: 'error', text: 'API request failed', timeout: -1 })
      })
    }
  },
  head () {
    return {
      title: 'Loading...'
    }
  }
}
</script>
